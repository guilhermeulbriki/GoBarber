import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserSerice from '@modules/users/services/CreateUserServer';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserSerice);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
