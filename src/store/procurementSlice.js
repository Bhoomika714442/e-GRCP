import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import procurementService from "../services/procurementService";

export const fetchRequests = createAsyncThunk(
  "procurement/fetchRequests",
  async (_, thunkAPI) => {
    try {
      return await procurementService.getAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createRequest = createAsyncThunk(
  "procurement/createRequest",
  async (request, thunkAPI) => {
    try {
      return await procurementService.create(request);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editRequest = createAsyncThunk(
  "procurement/editRequest",
  async ({ id, data }, thunkAPI) => {
    try {
      return await procurementService.update(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeRequest = createAsyncThunk(
  "procurement/removeRequest",
  async (id, thunkAPI) => {
    try {
      await procurementService.remove(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const approveRequest = createAsyncThunk(
  "procurement/approveRequest",
  async ({ id, approver }, thunkAPI) => {
    try {
      return await procurementService.approve(id, approver);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const rejectRequest = createAsyncThunk(
  "procurement/rejectRequest",
  async ({ id, remarks }, thunkAPI) => {
    try {
      return await procurementService.reject(id, remarks);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  requests: [],
  selectedRequest: null,

  loading: false,
  error: null,
};

const procurementSlice = createSlice({
  name: "procurement",

  initialState,

  reducers: {
    selectRequest(state, action) {
      state.selectedRequest =
        state.requests.find(
          (item) => item.id === action.payload
        ) || null;
    },

    clearSelectedRequest(state) {
      state.selectedRequest = null;
    },

    updateRequestStatus(state, action) {
      const request = state.requests.find(
        (item) => item.id === action.payload.id
      );

      if (request) {
        request.status = action.payload.status;
      }
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })

      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createRequest.fulfilled, (state, action) => {
        state.requests.unshift(action.payload);
      })

      .addCase(editRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(
          (r) => r.id === action.payload.id
        );

        if (index !== -1) {
          state.requests[index] = action.payload;
        }

        if (
          state.selectedRequest?.id === action.payload.id
        ) {
          state.selectedRequest = action.payload;
        }
      })

      .addCase(removeRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter(
          (r) => r.id !== action.payload
        );

        if (
          state.selectedRequest?.id === action.payload
        ) {
          state.selectedRequest = null;
        }
      })

      .addCase(approveRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(
          (r) => r.id === action.payload.id
        );

        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })

      .addCase(rejectRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(
          (r) => r.id === action.payload.id
        );

        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      });
  },
});

export const {
  selectRequest,
  clearSelectedRequest,
  updateRequestStatus,
} = procurementSlice.actions;

export default procurementSlice.reducer;