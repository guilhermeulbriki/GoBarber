import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fake/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacherProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsReposiory from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsReposiory: FakeAppointmentsReposiory;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsReposiory = new FakeAppointmentsReposiory();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsReposiory,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 14, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 14, 10, 13),
      user_id: '132132312',
      provider_id: '874',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('874');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 14, 10, 14).getTime();
    });

    const appointmentDate = new Date(2020, 14, 10, 14);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '132132312',
      provider_id: '8767',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '132132312',
        provider_id: '8767',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 14, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 14, 10, 11),
        user_id: '13213',
        provider_id: '132132312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with yourself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 14, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 14, 10, 13),
        user_id: '132132312',
        provider_id: '132132312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before before 8am and after 5pm ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 14, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 14, 11, 18),
        user_id: '132132312',
        provider_id: '6788',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 14, 11, 7),
        user_id: '132132312',
        provider_id: '6788',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
