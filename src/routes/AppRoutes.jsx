import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import PageLoader from "../components/PageLoader";

import ApprovalWorkbench from "../features/approval/ApprovalWorkbench";

const Login = lazy(() => import("../features/auth/Login"));
const ForgotPassword = lazy(() =>
  import("../features/auth/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("../features/auth/ResetPassword")
);

const Dashboard = lazy(() =>
  import("../features/dashboard/Dashboard")
);

const ProcurementList = lazy(() =>
  import("../features/procurement/ProcurementList")
);

const ProcurementDetails = lazy(() =>
  import("../features/procurement/ProcurementDetails")
);

const ProcurementForm = lazy(() =>
  import("../features/procurement/ProcurementForm")
);

const VendorList = lazy(() =>
  import("../features/vendors/VendorList")
);

const VendorDetails = lazy(() =>
  import("../features/vendors/VendorDetails")
);

const VendorForm = lazy(() =>
  import("../features/vendors/VendorForm")
);

const RiskList = lazy(() =>
  import("../features/risk/RiskList")
);

const RiskDetails = lazy(() =>
  import("../features/risk/RiskDetails")
);

const ComplianceDashboard = lazy(() =>
  import("../features/compliance/ComplianceDashboard")
);

const ComplianceList = lazy(() =>
  import("../features/compliance/ComplianceList")
);

const ComplianceDetails = lazy(() =>
  import("../features/compliance/ComplianceDetails")
);

const AuditDashboard = lazy(() =>
  import("../features/audit/AuditDashboard")
);

const AuditDetails = lazy(() =>
  import("../features/audit/AuditDetails")
);

const ReportsDashboard = lazy(() =>
  import("../features/reports/ReportsDashboard")
);

const SettingsDashboard = lazy(() =>
  import("../features/settings/SettingsDashboard")
);

const Profile = lazy(() =>
  import("../features/profile/Profile")
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
          element={
            <RoleBasedRoute>
              <MainLayout />
            </RoleBasedRoute>
          }
        ></Route>
          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/procurement"
            element={<ProcurementList />}
          />

          <Route
            path="/procurement/new"
            element={<ProcurementForm />}
          />

          <Route
            path="/procurement/:id"
            element={<ProcurementDetails />}
          />

          <Route
            path="/vendors"
            element={<VendorList />}
          />

          <Route
            path="/vendors/new"
            element={<VendorForm />}
          />

          <Route
            path="/vendors/:id"
            element={<VendorDetails />}
          />

          <Route
            path="/risk"
            element={<RiskList />}
          />

          <Route
            path="/risk/:id"
            element={<RiskDetails />}
          />

          <Route
            path="/compliance"
            element={<ComplianceDashboard />}
          />

          <Route
            path="/compliance/list"
            element={<ComplianceList />}
          />

          <Route
            path="/compliance/:id"
            element={<ComplianceDetails />}
          />

          <Route
            path="/audit"
            element={<AuditDashboard />}
          />

          <Route
            path="/audit/:id"
            element={<AuditDetails />}
          />

          <Route
            path="/approval"
            element={<ApprovalWorkbench />}
        />

          <Route
            path="/reports"
            element={<ReportsDashboard />}
          />

          <Route
            path="/settings"
            element={<SettingsDashboard />}
          />
        </Route>

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;