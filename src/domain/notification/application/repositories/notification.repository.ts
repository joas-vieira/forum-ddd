import type { Notification } from "../../enterprise/entities/notification.entity.js";

export interface NotificationRepository {
  create: (notification: Notification) => Promise<void>;
}
