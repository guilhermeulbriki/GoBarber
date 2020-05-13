import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Joel',
      email: 'sla@sla.com',
    });

    expect(updatedUser.name).toBe('Joel');
    expect(updatedUser.email).toBe('sla@sla.com');
  });

  it('should not be able to update the profile with non existing', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'test',
        email: 'test@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the email to an already used', async () => {
    await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@gmail.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'camile cauduro',
        email: 'camilecauduro@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Joel',
      email: 'sla@sla.com',
      old_password: '123',
      password: '1234',
    });

    expect(updatedUser.password).toBe('1234');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joel',
        email: 'sla@sla.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joel',
        email: 'sla@sla.com',
        old_password: 'wrong-old-password',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
