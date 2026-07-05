import { describe, it, expect, beforeEach, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";

import notificationReducer, {
  fetchNotifications,
  markAsRead,
  markAsUnread,
} from "../../store/notificationSlice";

import notificationService from "../../services/notificationService";

vi.mock("../../services/notificationService", () => ({
  default: {
    getNotifications: vi.fn(),
    markAsRead: vi.fn(),
    markAsUnread: vi.fn(),
  },
}));

describe("notificationSlice", () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();

    store = configureStore({
      reducer: {
        notifications: notificationReducer,
      },
    });
  });

  it("returns initial state", () => {
    expect(
      notificationReducer(undefined, {
        type: "@@INIT",
      })
    ).toEqual({
      loading: false,
      error: null,
      notifications: [],
    });
  });

  it("fetchNotifications pending", () => {
    const state = notificationReducer(
      undefined,
      fetchNotifications.pending("", undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("fetchNotifications fulfilled", async () => {
    const payload = [
      {
        id: 1,
        message: "New Request",
        status: "Unread",
      },
      {
        id: 2,
        message: "Vendor Approved",
        status: "Unread",
      },
    ];

    notificationService.getNotifications.mockResolvedValue(
      payload
    );

    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;

    expect(state.loading).toBe(false);
    expect(state.notifications).toEqual(payload);
    expect(state.error).toBeNull();
  });

  it("fetchNotifications rejected", async () => {
    notificationService.getNotifications.mockRejectedValue(
      new Error("Network Error")
    );

    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Network Error");
  });

  it("markAsRead updates notification status", async () => {
    store = configureStore({
      reducer: {
        notifications: notificationReducer,
      },
      preloadedState: {
        notifications: {
          loading: false,
          error: null,
          notifications: [
            {
              id: 1,
              status: "Unread",
            },
            {
              id: 2,
              status: "Unread",
            },
          ],
        },
      },
    });

    notificationService.markAsRead.mockResolvedValue({
      id: 1,
    });

    await store.dispatch(markAsRead(1));

    expect(
      store.getState().notifications.notifications[0].status
    ).toBe("Read");
  });

  it("markAsUnread updates notification status", async () => {
    store = configureStore({
      reducer: {
        notifications: notificationReducer,
      },
      preloadedState: {
        notifications: {
          loading: false,
          error: null,
          notifications: [
            {
              id: 1,
              status: "Read",
            },
            {
              id: 2,
              status: "Read",
            },
          ],
        },
      },
    });

    notificationService.markAsUnread.mockResolvedValue({
      id: 2,
    });

    await store.dispatch(markAsUnread(2));

    expect(
      store.getState().notifications.notifications[1].status
    ).toBe("Unread");
  });

  it("markAsRead does nothing when id not found", () => {
    const state = notificationReducer(
      {
        loading: false,
        error: null,
        notifications: [
          {
            id: 1,
            status: "Unread",
          },
        ],
      },
      markAsRead.fulfilled(
        {
          id: 99,
        },
        "",
        99
      )
    );

    expect(state.notifications[0].status).toBe(
      "Unread"
    );
  });

  it("markAsUnread does nothing when id not found", () => {
    const state = notificationReducer(
      {
        loading: false,
        error: null,
        notifications: [
          {
            id: 1,
            status: "Read",
          },
        ],
      },
      markAsUnread.fulfilled(
        {
          id: 99,
        },
        "",
        99
      )
    );

    expect(state.notifications[0].status).toBe(
      "Read"
    );
  });

  it("updates multiple notifications correctly", () => {
    let state = {
      loading: false,
      error: null,
      notifications: [
        {
          id: 1,
          status: "Unread",
        },
        {
          id: 2,
          status: "Unread",
        },
      ],
    };

    state = notificationReducer(
      state,
      markAsRead.fulfilled(
        {
          id: 1,
        },
        "",
        1
      )
    );

    state = notificationReducer(
      state,
      markAsRead.fulfilled(
        {
          id: 2,
        },
        "",
        2
      )
    );

    expect(state.notifications[0].status).toBe(
      "Read"
    );

    expect(state.notifications[1].status).toBe(
      "Read"
    );
  });
});