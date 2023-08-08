import { Body, Controller, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('subscribers')
  createSubscriber(@Body() body: { subscriberId: string; email: string }) {
    return this.notificationService.createSubscriber(
      body.subscriberId,
      body.email,
    );
  }

  @Post('emails')
  sendEmail(
    @Body() body: { subscriberId: string; email: string; description: string },
  ) {
    return this.notificationService.sendEmail(
      body.subscriberId,
      body.email,
      body.description,
    );
  }

  @Post('topics')
  createTopic(@Body() body: { key: string; name: string }) {
    return this.notificationService.createTopic(body.key, body.name);
  }

  @Post('topics/:key/subscribers')
  addSubscriberToTopic(
    @Param('key') key: string,
    @Body('subscriberId') subscriberId: string,
  ) {
    return this.notificationService.addTopicSubscriber(key, subscriberId);
  }

  @Post('topics/:key/send')
  sendTopicNotification(
    @Param('key') key: string,
    @Body('description') description: string,
  ) {
    return this.notificationService.sendTopicNotification(key, description);
  }
}
