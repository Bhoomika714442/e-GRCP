import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Box, Typography } from "@mui/material";

import { fetchReports } from "../../store/reportSlice";

import ReportsKPICards from "./ReportsKPICards";
import ReportsFilters from "./ReportsFilters";
import ReportsTable from "./ReportsTable";
import SavedReports from "./SavedReports";

const ReportsDashboard = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [format, setFormat] = useState("");

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Reporting Center
      </Typography>

      <ReportsKPICards />

      <Box mt={3}>
        <ReportsFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          format={format}
          setFormat={setFormat}
        />
      </Box>

      <Box mt={3}>
        <ReportsTable
          search={search}
          category={category}
          format={format}
        />
      </Box>

      <Box mt={3}>
        <SavedReports />
      </Box>
    </Box>
  );
};

export default ReportsDashboard;