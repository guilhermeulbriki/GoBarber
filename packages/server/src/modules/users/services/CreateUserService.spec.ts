import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacherProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserServer';
import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'camile cauduro',
      email: 'camilecauduro@gmail.com',
      password: '123',
    });

    await expect(
      createUser.execute({
        name: 'camile cauduro',
        email: 'camilecauduro@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
