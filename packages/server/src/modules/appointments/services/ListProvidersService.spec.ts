// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/Fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'camile pauduro',
      email: 'camilecauduro@gmail.com',
      password: '123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'camile caumole',
      email: 'camilecauduro@gmail.com',
      password: '123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
