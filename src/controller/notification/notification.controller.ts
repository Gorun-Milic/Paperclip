import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationDto } from 'src/dto/NotificationDto';
import { Notification } from 'src/entity/notification';
import { Product } from 'src/entity/product';
import { User } from 'src/entity/user';
import { NotificationService } from 'src/service/notification/notification.service';

@Controller('notification')
export class NotificationController {

    constructor(
        private notificationService: NotificationService
    ) {}

    @Post('count')
    async countNotifications(@Body() user: User): Promise<NotificationDto> {
        return await this.notificationService.countNotifications(user);
    }

    @Post('view')
    async viewNotifications(@Body() product: Product): Promise<any> {
        return await this.notificationService.viewNotification(product);
    }

    @Post('old')
    async getOldNotifications(@Body()user: User): Promise<Notification[]> {
        return await this.notificationService.getOldNotifications(user);
    }

}
