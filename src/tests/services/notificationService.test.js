import notificationService from "../../services/notificationService";

describe("notificationService", () => {
  test("should fetch all notifications", async () => {
    const notifications =
      await notificationService.getNotifications();

    expect(Array.isArray(notifications)).toBe(true);
    expect(notifications.length).toBeGreaterThan(0);
  });

  test("should fetch notification by id", async () => {
    const notifications =
      await notificationService.getNotifications();

    const notification =
      await notificationService.getNotificationById(
        notifications[0].id
      );

    expect(notification.id).toBe(
      notifications[0].id
    );
  });

  test("should mark notification as read", async () => {
    const notifications =
      await notificationService.getNotifications();

    const result =
      await notificationService.markAsRead(
        notifications[0].id
      );

    expect(result.id).toBe(
      notifications[0].id
    );
    expect(result.status).toBe("Read");
  });

  test("should mark notification as unread", async () => {
    const notifications =
      await notificationService.getNotifications();

    const result =
      await notificationService.markAsUnread(
        notifications[0].id
      );

    expect(result.id).toBe(
      notifications[0].id
    );
    expect(result.status).toBe("Unread");
  });

  test("should return undefined for invalid id", async () => {
    const notification =
      await notificationService.getNotificationById(
        999999
      );

    expect(notification).toBeUndefined();
  });
});