import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useLocation } from "react-router-dom";

const routeNames = {
  dashboard: "Dashboard",
  procurement: "Procurement",
  vendors: "Vendor Management",
  risk: "Risk Center",
  compliance: "Compliance",
  audit: "Audit",
  reports: "Reports",
  settings: "Settings",
  profile: "Profile",
};

const BreadcrumbsNav = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ mb: 3 }}
    >
      <Link
        to="/dashboard"
        style={{
          textDecoration: "none",
          color: "#1976d2",
        }}
      >
        Dashboard
      </Link>

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;

        const to = "/" + pathnames.slice(0, index + 1).join("/");

        const label = routeNames[value] || value.charAt(0).toUpperCase() + value.slice(1);

        return last ? (
          <Typography
            key={to}
            color="text.primary"
            fontWeight={600}
          >
            {label}
          </Typography>
        ) : (
          <Link
            key={to}
            to={to}
            style={{
              textDecoration: "none",
              color: "#1976d2",
            }}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;