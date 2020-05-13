import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsReposiory from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsReposiory: FakeAppointmentsReposiory;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsReposiory = new FakeAppointmentsReposiory();
    createAppointment = new CreateAppointmentService(fakeAppointmentsReposiory);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '132132312',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('132132312');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '132132312',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '132132312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
