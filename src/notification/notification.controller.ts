import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('emails/send')
  sendEmail(@Body() body: { email: string; description: string }) {
    return this.notificationService.sendEmail(body.email, body.description);
  }

  @Post('topics/create')
  createTopic(@Body() body: { key: string; name: string }) {
    return this.notificationService.createTopic(body.key, body.name);
  }

  @Post('topics/send')
  sendToTopic(
    @Body() body: { topicKey: string; email: string; description: string },
  ) {
    return this.notificationService.sendToTopic(
      body.topicKey,
      body.email,
      body.description,
    );
  }
}
