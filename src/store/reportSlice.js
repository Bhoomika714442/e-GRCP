import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import reportService from "../services/reportService";

export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async () => {
    return await reportService.getReports();
  }
);

export const exportCSV = createAsyncThunk(
  "reports/exportCSV",
  async () => {
    return await reportService.exportCSV();
  }
);

export const exportExcel = createAsyncThunk(
  "reports/exportExcel",
  async () => {
    return await reportService.exportExcel();
  }
);

export const saveReport = createAsyncThunk(
  "reports/saveReport",
  async (report) => {
    return await reportService.saveReport(report);
  }
);

const initialState = {
  reports: [],
  savedReports: [],
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: "reports",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })

      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(saveReport.fulfilled, (state, action) => {
        state.savedReports.push(action.payload);
      })

      .addCase(exportCSV.fulfilled, () => {
        console.log("CSV Export Completed");
      })

      .addCase(exportExcel.fulfilled, () => {
        console.log("Excel Export Completed");
      });
  },
});

export default reportSlice.reducer;