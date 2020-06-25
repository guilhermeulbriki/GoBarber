"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/Fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/Fakes/FakeUserTokensRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepository;
let resetPassword;
let fakeHashProvider;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      password: '1234',
      token
    });
    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('1234');
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe('1234');
  });
  it('should not be able to reset the password with non-existing token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: '123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password with non-existing user', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('non-existing-token');
    await expect(resetPassword.execute({
      token,
      password: '123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      password: '1234',
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});