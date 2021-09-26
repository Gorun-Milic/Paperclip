import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from 'src/controller/notification/notification.controller';
import { Notification } from 'src/entity/notification';
import { NotificationService } from 'src/service/notification/notification.service';

@Module({
    imports: [TypeOrmModule.forFeature([Notification])],
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: [NotificationService]
})
export class NotificationModule {}
