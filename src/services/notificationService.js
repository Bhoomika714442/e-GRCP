import notificationData from "../mocks/notifications.json";

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const notificationService = {
  async getNotifications() {
    await delay(500);
    return notificationData.notifications;
  },

  async getNotificationById(id) {
    await delay(300);

    return notificationData.notifications.find(
      (notification) => notification.id === Number(id)
    );
  },

  async markAsRead(id) {
    await delay(300);

    return {
      id,
      status: "Read",
    };
  },

  async markAsUnread(id) {
    await delay(300);

    return {
      id,
      status: "Unread",
    };
  },
};

export default notificationService;