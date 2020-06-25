"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/Fakes/FakeUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeStorageprovider;
let updateUserAvatar;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeStorageprovider = new _FakeStorageProvider.default();
    updateUserAvatar = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageprovider);
  });
  it('should be able to update avatar from anyone', async () => {
    const user = await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update avatar from nobody', async () => {
    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFileName: 'avatar.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete old avatar when new updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageprovider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});