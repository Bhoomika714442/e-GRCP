import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from "vitest";
import authService from "../../services/authService";
import usersData from "../../mocks/users.json";

const USERS_KEY = "egrcp_users";
const SESSION_KEY = "egrcp_session";

describe("authService", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    localStorage.clear();

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(usersData.users)
    );

    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => "mock-token"),
    });
  });

  afterEach(async () => {
    await vi.runOnlyPendingTimersAsync();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe("login", () => {
    it("logs in successfully", async () => {
      const promise = authService.login({
        email: "admin@egrcp.com",
        password: "Admin@123",
      });

      await vi.advanceTimersByTimeAsync(700);

      const session = await promise;

      expect(session.token).toBe("mock-token");
      expect(session.user.email).toBe(
        "admin@egrcp.com"
      );

      expect(
        JSON.parse(
          localStorage.getItem(SESSION_KEY)
        )
      ).toEqual(session);
    });

    it("throws for invalid credentials", async () => {
      const promise = expect(
        authService.login({
          email: "wrong@test.com",
          password: "wrong",
        })
      ).rejects.toThrow(
        "Invalid email or password."
      );

      await vi.advanceTimersByTimeAsync(700);

      await promise;
    });
  });

  describe("logout", () => {
    it("removes session", async () => {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          token: "abc",
          user: usersData.users[0],
        })
      );

      const promise = authService.logout();

      await vi.advanceTimersByTimeAsync(200);

      expect(await promise).toBe(true);

      expect(
        localStorage.getItem(SESSION_KEY)
      ).toBeNull();
    });
  });

  describe("getCurrentSession", () => {
    it("returns existing session", () => {
      const session = {
        token: "token",
        user: usersData.users[0],
      };

      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session)
      );

      expect(
        authService.getCurrentSession()
      ).toEqual(session);
    });

    it("returns null when session does not exist", () => {
      expect(
        authService.getCurrentSession()
      ).toBeNull();
    });
  });

  describe("updatePassword", () => {
    it("updates password and session", async () => {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          token: "token",
          user: usersData.users[0],
        })
      );

      const promise =
        authService.updatePassword({
          email: "admin@egrcp.com",
          currentPassword: "Admin@123",
          newPassword: "NewPassword@123",
        });

      await vi.advanceTimersByTimeAsync(500);

      expect(await promise).toBe(true);

      const users = JSON.parse(
        localStorage.getItem(USERS_KEY)
      );

      expect(users[0].password).toBe(
        "NewPassword@123"
      );

      const session = JSON.parse(
        localStorage.getItem(SESSION_KEY)
      );

      expect(session.user.password).toBe(
        "NewPassword@123"
      );
    });

    it("updates password when no session exists", async () => {
      const promise =
        authService.updatePassword({
          email: "admin@egrcp.com",
          currentPassword: "Admin@123",
          newPassword: "Password123",
        });

      await vi.advanceTimersByTimeAsync(500);

      expect(await promise).toBe(true);

      expect(
        localStorage.getItem(SESSION_KEY)
      ).toBeNull();
    });

    it("throws when user does not exist", async () => {
      const promise = expect(
        authService.updatePassword({
          email: "unknown@test.com",
          currentPassword: "123",
          newPassword: "456",
        })
      ).rejects.toThrow("User not found.");

      await vi.advanceTimersByTimeAsync(500);

      await promise;
    });

    it("throws when current password is incorrect", async () => {
      const promise = expect(
        authService.updatePassword({
          email: "admin@egrcp.com",
          currentPassword: "WrongPassword",
          newPassword: "NewPassword",
        })
      ).rejects.toThrow(
        "Current password is incorrect."
      );

      await vi.advanceTimersByTimeAsync(500);

      await promise;
    });
  });

  describe("updateProfile", () => {
    it("updates profile and session", async () => {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          token: "token",
          user: usersData.users[0],
        })
      );

      const promise =
        authService.updateProfile({
          id: 1,
          name: "Updated Admin",
          phone: "+91 9999999999",
        });

      await vi.advanceTimersByTimeAsync(400);

      const user = await promise;

      expect(user.name).toBe(
        "Updated Admin"
      );
      expect(user.phone).toBe(
        "+91 9999999999"
      );

      const session = JSON.parse(
        localStorage.getItem(SESSION_KEY)
      );

      expect(session.user.name).toBe(
        "Updated Admin"
      );
    });

    it("updates profile when no session exists", async () => {
      const promise =
        authService.updateProfile({
          id: 1,
          department: "Security",
        });

      await vi.advanceTimersByTimeAsync(400);

      const user = await promise;

      expect(user.department).toBe(
        "Security"
      );

      expect(
        localStorage.getItem(SESSION_KEY)
      ).toBeNull();
    });

    it("throws when user is not found", async () => {
      const promise = expect(
        authService.updateProfile({
          id: 999,
          name: "Unknown",
        })
      ).rejects.toThrow("User not found.");

      await vi.advanceTimersByTimeAsync(400);

      await promise;
    });
  });
});