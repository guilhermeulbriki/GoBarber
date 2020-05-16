import FakeUsersRepository from '@modules/users/repositories/Fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacherProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
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
