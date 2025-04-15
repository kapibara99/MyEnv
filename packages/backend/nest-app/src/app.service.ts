import { Injectable } from '@nestjs/common';
import { User } from '@shared-types/models';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getMessage(): string {
    const user: User = {
      id: 'id',
      name: 'name',
      email: 'email@sample',
    };
    console.log('user', user);

    return user.email;
  }
}
