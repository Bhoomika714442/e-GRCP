import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import approvalService from "../services/approvalService";

export const fetchApprovals = createAsyncThunk(
  "approval/fetchApprovals",
  async () => {
    return await approvalService.getAllApprovals();
  }
);

export const approveRequest = createAsyncThunk(
  "approval/approve",
  async (id) => {
    return await approvalService.approve(id);
  }
);

export const rejectRequest = createAsyncThunk(
  "approval/reject",
  async (id) => {
    return await approvalService.reject(id);
  }
);

export const sendBackRequest = createAsyncThunk(
  "approval/sendBack",
  async (id) => {
    return await approvalService.sendBack(id);
  }
);

export const delegateRequest = createAsyncThunk(
  "approval/delegate",
  async (id) => {
    return await approvalService.delegate(id);
  }
);

const approvalSlice = createSlice({
  name: "approval",

  initialState: {
    approvalList: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchApprovals.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchApprovals.fulfilled, (state, action) => {
        state.loading = false;
        state.approvalList = action.payload;
      })

      .addCase(fetchApprovals.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to load approvals";
      })

      .addCase(approveRequest.fulfilled, (state, action) => {
        state.approvalList = action.payload;
      })

      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.approvalList = action.payload;
      })

      .addCase(sendBackRequest.fulfilled, (state, action) => {
        state.approvalList = action.payload;
      })

      .addCase(delegateRequest.fulfilled, (state, action) => {
        state.approvalList = action.payload;
      });
  }
});

export default approvalSlice.reducer;