import { Notification } from "src/entity/notification";

export class NotificationDto {
    notifications: Notification[];
    total: number;
}