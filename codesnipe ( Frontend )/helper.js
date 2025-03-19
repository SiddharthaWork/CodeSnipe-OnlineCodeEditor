export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const userLoggedIn = () => {
  const user = localStorage.getItem("userId");
  if (user) {
    return true;
  }
  else {
    return false;
  }
}