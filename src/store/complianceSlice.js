import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import complianceService from "../services/complianceService";

export const fetchCompliance = createAsyncThunk(
  "compliance/fetchCompliance",
  async (_, { rejectWithValue }) => {
    try {
      return await complianceService.getAllCompliance();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchComplianceById = createAsyncThunk(
  "compliance/fetchComplianceById",
  async (id, { rejectWithValue }) => {
    try {
      return await complianceService.getComplianceById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCompliance = createAsyncThunk(
  "compliance/createCompliance",
  async (record, { rejectWithValue }) => {
    try {
      return await complianceService.createCompliance(record);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCompliance = createAsyncThunk(
  "compliance/updateCompliance",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await complianceService.updateCompliance(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCompliance = createAsyncThunk(
  "compliance/deleteCompliance",
  async (id, { rejectWithValue }) => {
    try {
      await complianceService.deleteCompliance(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  complianceList: [],
  selectedCompliance: null,
  loading: false,
  error: null,
};

const complianceSlice = createSlice({
  name: "compliance",
  initialState,

  reducers: {
    clearSelectedCompliance: (state) => {
      state.selectedCompliance = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchCompliance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCompliance.fulfilled, (state, action) => {
        state.loading = false;
        state.complianceList = action.payload;
      })

      .addCase(fetchCompliance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch By Id
      .addCase(fetchComplianceById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchComplianceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCompliance = action.payload;
      })

      .addCase(fetchComplianceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createCompliance.fulfilled, (state, action) => {
        state.complianceList.push(action.payload);
      })

      .addCase(updateCompliance.fulfilled, (state, action) => {
        const index = state.complianceList.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.complianceList[index] = action.payload;
        }

        if (
          state.selectedCompliance &&
          state.selectedCompliance.id === action.payload.id
        ) {
          state.selectedCompliance = action.payload;
        }
      })

      // Delete
      .addCase(deleteCompliance.fulfilled, (state, action) => {
        state.complianceList = state.complianceList.filter(
          (item) => item.id !== action.payload
        );

        if (
          state.selectedCompliance &&
          state.selectedCompliance.id === action.payload
        ) {
          state.selectedCompliance = null;
        }
      });
  },
});

export const { clearSelectedCompliance } = complianceSlice.actions;

export default complianceSlice.reducer;