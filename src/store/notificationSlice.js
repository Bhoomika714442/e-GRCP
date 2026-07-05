import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import notificationService from "../services/notificationService";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    return await notificationService.getNotifications();
  }
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id) => {
    return await notificationService.markAsRead(id);
  }
);

export const markAsUnread = createAsyncThunk(
  "notifications/markAsUnread",
  async (id) => {
    return await notificationService.markAsUnread(id);
  }
);

const initialState = {
  loading: false,
  error: null,
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchNotifications.fulfilled,
        (state, action) => {
          state.loading = false;
          state.notifications = action.payload;
        }
      )

      .addCase(
        fetchNotifications.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )

      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification =
          state.notifications.find(
            (item) => item.id === action.payload.id
          );

        if (notification) {
          notification.status = "Read";
        }
      })

      .addCase(markAsUnread.fulfilled, (state, action) => {
        const notification =
          state.notifications.find(
            (item) => item.id === action.payload.id
          );

        if (notification) {
          notification.status = "Unread";
        }
      });
  },
});

export default notificationSlice.reducer;