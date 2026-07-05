import { useDispatch, useSelector } from "react-redux";

import {
  loginUser,
  logoutUser,
} from "../store/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const auth = useSelector(
    (state) => state.auth
  );

  const login = (credentials) =>
    dispatch(loginUser(credentials));

  const logout = () =>
    dispatch(logoutUser());

  return {
    ...auth,
    login,
    logout,
  };
};

export default useAuth;