import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import riskService from "../services/riskService";

export const fetchRisks = createAsyncThunk(
  "risk/fetchRisks",
  async (_, { rejectWithValue }) => {
    try {
      return await riskService.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRiskById = createAsyncThunk(
  "risk/fetchRiskById",
  async (id, { rejectWithValue }) => {
    try {
      return await riskService.getById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRisk = createAsyncThunk(
  "risk/createRisk",
  async (risk, { rejectWithValue }) => {
    try {
      return await riskService.create(risk);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRisk = createAsyncThunk(
  "risk/updateRisk",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await riskService.update(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRisk = createAsyncThunk(
  "risk/deleteRisk",
  async (id, { rejectWithValue }) => {
    try {
      await riskService.remove(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRiskStatus = createAsyncThunk(
  "risk/updateRiskStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await riskService.updateStatus(
        id,
        status
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  riskList: [],
  selectedRisk: null,
  loading: false,
  error: null,
};

const riskSlice = createSlice({
  name: "risk",

  initialState,

  reducers: {
    clearSelectedRisk(state) {
      state.selectedRisk = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchRisks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRisks.fulfilled, (state, action) => {
        state.loading = false;
        state.riskList = action.payload;
      })

      .addCase(fetchRisks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRiskById.fulfilled, (state, action) => {
        state.selectedRisk = action.payload;
      })

      .addCase(createRisk.fulfilled, (state, action) => {
        state.riskList.unshift(action.payload);
      })

      .addCase(updateRisk.fulfilled, (state, action) => {
        const index = state.riskList.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.riskList[index] = action.payload;
        }

        if (
          state.selectedRisk &&
          state.selectedRisk.id === action.payload.id
        ) {
          state.selectedRisk = action.payload;
        }
      })

      .addCase(deleteRisk.fulfilled, (state, action) => {
        state.riskList = state.riskList.filter(
          (item) => item.id !== action.payload
        );

        if (
          state.selectedRisk &&
          state.selectedRisk.id === action.payload
        ) {
          state.selectedRisk = null;
        }
      })

      .addCase(updateRiskStatus.fulfilled, (state, action) => {
        const index = state.riskList.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.riskList[index] = action.payload;
        }

        if (
          state.selectedRisk &&
          state.selectedRisk.id === action.payload.id
        ) {
          state.selectedRisk = action.payload;
        }
      });
  },
});

export const { clearSelectedRisk } =
  riskSlice.actions;

export default riskSlice.reducer;