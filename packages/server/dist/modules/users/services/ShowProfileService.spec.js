"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/Fakes/FakeUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let showProfile;
describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showProfile = new _ShowProfileService.default(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('camile cauduro');
    expect(profile.email).toBe('camilecauduro@gmail.com');
  });
  it('should not be able to show the profile with non existing', async () => {
    await expect(showProfile.execute({
      user_id: 'non-existing-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});