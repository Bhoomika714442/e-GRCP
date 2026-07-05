import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auditService from "../services/auditService";

export const fetchAudits = createAsyncThunk(
  "audit/fetchAudits",
  async (_, thunkAPI) => {
    try {
      return await auditService.getAudits();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchAuditById = createAsyncThunk(
  "audit/fetchAuditById",
  async (id, thunkAPI) => {
    try {
      return await auditService.getAuditById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAuditHistory = createAsyncThunk(
  "audit/fetchAuditHistory",
  async (_, thunkAPI) => {
    try {
      return await auditService.getAuditHistory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAuditReports = createAsyncThunk(
  "audit/fetchAuditReports",
  async (_, thunkAPI) => {
    try {
      return await auditService.getAuditReports();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserActivities = createAsyncThunk(
  "audit/fetchUserActivities",
  async (_, thunkAPI) => {
    try {
      return await auditService.getUserActivities();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSystemLogs = createAsyncThunk(
  "audit/fetchSystemLogs",
  async (_, thunkAPI) => {
    try {
      return await auditService.getSystemLogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  audits: [],
  selectedAudit: null,

  auditHistory: [],
  auditReports: [],
  userActivities: [],
  systemLogs: [],

  loading: false,
  error: null,
};

const auditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchAudits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAudits.fulfilled, (state, action) => {
        state.loading = false;
        state.audits = action.payload;
      })
      .addCase(fetchAudits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAuditById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuditById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAudit = action.payload;
      })
      .addCase(fetchAuditById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAuditHistory.fulfilled, (state, action) => {
        state.auditHistory = action.payload;
      })

      .addCase(fetchAuditReports.fulfilled, (state, action) => {
        state.auditReports = action.payload;
      })

      .addCase(fetchUserActivities.fulfilled, (state, action) => {
        state.userActivities = action.payload;
      })

      .addCase(fetchSystemLogs.fulfilled, (state, action) => {
        state.systemLogs = action.payload;
      });
  },
});

export default auditSlice.reducer;