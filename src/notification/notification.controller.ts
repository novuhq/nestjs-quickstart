import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('emails')
  sendEmail(@Body() body: { email: string; description: string }) {
    return this.notificationService.sendEmail(body.email, body.description);
  }
}
