import AppError from '@shared/errors/AppError';

import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('camile cauduro');
    expect(profile.email).toBe('camilecauduro@gmail.com');
  });

  it('should not be able to show the profile with non existing', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
