var sessionCookie = JSON.parse(localStorage.getItem("session"));

export function loginUser(userName, userInfo) {
  if (sessionCookie === null) {
    localStorage.setItem("session", {});
    sessionCookie = {};
  }

  sessionCookie = userInfo;
  localStorage.setItem("session", JSON.stringify(sessionCookie));
}

export function getUserInfo(keyName) {
  return sessionCookie[keyName];
}

export function saveUserInfo(keyName, value) {
  sessionCookie[keyName] = value;
  localStorage.setItem("session", JSON.stringify(sessionCookie));
}

export function isLoggedIn(userName) {
  if (sessionCookie.userName !== userName) return false;

  return true;
}

export function logout(userName) {
  localStorage.removeItem("session");
  sessionCookie = null;
}

export function anyValidSession() {
  return sessionCookie !== null;
}

export function getUserName() {
  return sessionCookie.userName;
}

export function getUserRole() {
  return sessionCookie.userType;
}
