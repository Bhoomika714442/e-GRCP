import { describe, it, expect, beforeEach, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";

import authReducer, {
  loginUser,
  logoutUser,
  restoreSession,
  updateProfile,
  changePassword,
  clearError,
  clearPasswordStatus,
} from "../../store/authSlice";

import authService from "../../services/authService";

vi.mock("../../services/authService", () => ({
  default: {
    login: vi.fn(),
    logout: vi.fn(),
    getCurrentSession: vi.fn(),
    updateProfile: vi.fn(),
    updatePassword: vi.fn(),
  },
}));

describe("authSlice", () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();

    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  it("returns initial state", () => {
    expect(
      authReducer(undefined, {
        type: "@@INIT",
      })
    ).toEqual({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      passwordUpdated: false,
    });
  });

  it("clearError reducer", () => {
    const state = authReducer(
      {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: "Login Failed",
        passwordUpdated: false,
      },
      clearError()
    );

    expect(state.error).toBeNull();
  });

  it("clearPasswordStatus reducer", () => {
    const state = authReducer(
      {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        passwordUpdated: true,
      },
      clearPasswordStatus()
    );

    expect(state.passwordUpdated).toBe(false);
  });

  it("login success", async () => {
    const payload = {
      user: {
        id: 1,
        name: "Admin",
      },
      token: "token123",
    };

    authService.login.mockResolvedValue(payload);

    await store.dispatch(
      loginUser({
        email: "admin@test.com",
        password: "123",
      })
    );

    const state = store.getState().auth;

    expect(state.user).toEqual(payload.user);
    expect(state.token).toBe(payload.token);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it("login failure", async () => {
    authService.login.mockRejectedValue(
      new Error("Invalid Credentials")
    );

    await store.dispatch(
      loginUser({
        email: "",
        password: "",
      })
    );

    const state = store.getState().auth;

    expect(state.error).toBe("Invalid Credentials");
    expect(state.isLoading).toBe(false);
  });

  it("logout success", async () => {
    authService.logout.mockResolvedValue(true);

    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: {
            id: 1,
          },
          token: "abc",
          isAuthenticated: true,
          isLoading: false,
          error: null,
          passwordUpdated: false,
        },
      },
    });

    await store.dispatch(logoutUser());

    const state = store.getState().auth;

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("restore session success", async () => {
    const session = {
      user: {
        id: 5,
      },
      token: "xyz",
    };

    authService.getCurrentSession.mockResolvedValue(
      session
    );

    await store.dispatch(
      restoreSession()
    );

    const state = store.getState().auth;

    expect(state.user).toEqual(session.user);
    expect(state.token).toBe("xyz");
    expect(state.isAuthenticated).toBe(true);
  });

  it("restore session returns null", async () => {
    authService.getCurrentSession.mockResolvedValue(
      null
    );

    await store.dispatch(
      restoreSession()
    );

    const state = store.getState().auth;

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("update profile success", async () => {
    const profile = {
      id: 1,
      name: "Updated User",
    };

    authService.updateProfile.mockResolvedValue(
      profile
    );

    await store.dispatch(
      updateProfile(profile)
    );

    expect(
      store.getState().auth.user
    ).toEqual(profile);
  });

  it("update profile failure", async () => {
    authService.updateProfile.mockRejectedValue(
      new Error("Profile Error")
    );

    await store.dispatch(
      updateProfile({})
    );

    expect(
      store.getState().auth.error
    ).toBe("Profile Error");
  });

  it("change password success", async () => {
    authService.updatePassword.mockResolvedValue(
      true
    );

    await store.dispatch(
      changePassword({
        oldPassword: "old",
        newPassword: "new",
      })
    );

    expect(
      store.getState().auth.passwordUpdated
    ).toBe(true);
  });

  it("change password failure", async () => {
    authService.updatePassword.mockRejectedValue(
      new Error("Password Error")
    );

    await store.dispatch(
      changePassword({})
    );

    const state = store.getState().auth;

    expect(state.passwordUpdated).toBe(false);
    expect(state.error).toBe("Password Error");
  });

  it("login pending action", () => {
    const state = authReducer(
      undefined,
      loginUser.pending("", {})
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("change password pending action", () => {
    const state = authReducer(
      undefined,
      changePassword.pending("", {})
    );

    expect(state.passwordUpdated).toBe(false);
    expect(state.error).toBeNull();
  });
});