import type { NotificationRepository } from "@/domain/notification/application/repositories/notification.repository.js";
import type { Notification } from "@/domain/notification/enterprise/entities/notification.entity.js";

export class InMemoryNotificationRepository implements NotificationRepository {
  items: Notification[] = [];

  async create(notification: Notification) {
    this.items.push(notification);
  }
}
