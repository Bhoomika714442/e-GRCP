import usersData from "../mocks/users.json";

const USERS_KEY = "egrcp_users";
const SESSION_KEY = "egrcp_session";

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const initializeUsers = () => {
  const users = localStorage.getItem(USERS_KEY);

  if (!users) {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(usersData.users)
    );
  }
};

initializeUsers();

const authService = {
  async login(credentials) {
    await delay(700);

    const users = JSON.parse(
      localStorage.getItem(USERS_KEY)
    );

    const user = users.find(
      (u) =>
        u.email === credentials.email &&
        u.password === credentials.password
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const session = {
      token: crypto.randomUUID(),
      user,
    };

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session)
    );

    return session;
  },

  async logout() {
    await delay(200);

    localStorage.removeItem(SESSION_KEY);

    return true;
  },

  getCurrentSession() {
    return JSON.parse(
      localStorage.getItem(SESSION_KEY)
    );
  },

  async updatePassword({
    email,
    currentPassword,
    newPassword,
  }) {
    await delay(500);

    const users = JSON.parse(
      localStorage.getItem(USERS_KEY)
    );

    const index = users.findIndex(
      (u) => u.email === email
    );

    if (index === -1)
      throw new Error("User not found.");

    if (
      users[index].password !== currentPassword
    ) {
      throw new Error(
        "Current password is incorrect."
      );
    }

    users[index].password = newPassword;

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    );

    const session = JSON.parse(
      localStorage.getItem(SESSION_KEY)
    );

    if (session) {
      session.user = users[index];

      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session)
      );
    }

    return true;
  },

  async updateProfile(profile) {
    await delay(400);

    const users = JSON.parse(
      localStorage.getItem(USERS_KEY)
    );

    const index = users.findIndex(
      (u) => u.id === profile.id
    );

    if (index === -1)
      throw new Error("User not found.");

    users[index] = {
      ...users[index],
      ...profile,
    };

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    );

    const session = JSON.parse(
      localStorage.getItem(SESSION_KEY)
    );

    if (session) {
      session.user = users[index];

      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session)
      );
    }

    return users[index];
  },
};

export default authService;