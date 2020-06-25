"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacherProvider/fakes/FakeCacheProvider"));

var _CreateUserServer = _interopRequireDefault(require("./CreateUserServer"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/Fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUser;
let fakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserServer.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123'
    });
    await expect(createUser.execute({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});