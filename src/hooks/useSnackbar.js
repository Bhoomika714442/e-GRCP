import { useContext } from "react";
import { SnackbarContext } from "../components/SnackbarProvider";

const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export default useSnackbar;