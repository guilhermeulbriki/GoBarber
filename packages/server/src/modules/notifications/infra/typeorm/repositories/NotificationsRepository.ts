import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      recipient_id,
      content,
    });

    this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
