import { Injectable } from '@nestjs/common';
import { Novu } from '@novu/node';
import { InjectNovu } from './novu.provider';

@Injectable()
export class NotificationService {
  constructor(
    @InjectNovu()
    private readonly novu: Novu,
  ) {}

  async sendEmail(email: string, description: string) {
    await this.novu.subscribers.identify('123', {
      email: email,
      firstName: 'Subscriber',
    });

    const result = await this.novu.trigger('email-quickstart', {
      to: {
        subscriberId: '123',
        email: email,
      },
      payload: {
        email: email,
        description: description,
      },
    });

    return result.data;
  }
}
