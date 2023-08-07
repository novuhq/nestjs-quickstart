import { Injectable } from '@nestjs/common';
import { Novu, TriggerRecipientsTypeEnum } from '@novu/node';
import { InjectNovu } from './novu.provider';

@Injectable()
export class NotificationService {
  constructor(
    @InjectNovu()
    private readonly novu: Novu,
  ) {}

  async createSubscriber(subscriberId: string, email: string) {
    const result = await this.novu.subscribers.identify(subscriberId, {
      email,
      firstName: 'Subscriber',
    });

    return result.data;
  }

  async sendEmail(subscriberId: string, email: string, description: string) {
    const result = await this.novu.trigger('email-quickstart', {
      to: {
        subscriberId,
        email,
      },
      payload: {
        email,
        description,
      },
    });

    return result.data;
  }

  async createTopic(key: string, name: string) {
    const result = await this.novu.topics.create({
      key,
      name,
    });

    return result.data;
  }

  async addTopicSubscriber(key: string, subscriberId: string) {
    const result = await this.novu.topics.addSubscribers(key, {
      subscribers: [subscriberId],
    });

    return result.data;
  }

  async sendTopicNotification(key: string, description: string) {
    const result = await this.novu.trigger('email-quickstart', {
      to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: key }],
      payload: { description },
    });

    return result.data;
  }
}
