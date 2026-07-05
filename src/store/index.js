import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";
import procurementReducer from "./procurementSlice";
import vendorReducer from "./vendorSlice";
import riskReducer from "./riskSlice";
import complianceReducer from "./complianceSlice";
import auditReducer from "./auditSlice";
import reportReducer from "./reportSlice";
import notificationReducer from "./notificationSlice";
import uiReducer from "./uiSlice";
import approvalReducer from "./approvalSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  procurement: procurementReducer,
  vendor: vendorReducer,
  risk: riskReducer,
  compliance: complianceReducer,
  audit: auditReducer,
  reports: reportReducer,
  notifications: notificationReducer,
  approval: approvalReducer,
  ui: uiReducer,
});

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: import.meta.env.DEV,
});

export default store;