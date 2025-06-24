export const getUserId = () => {
  if (!localStorage.getItem("zain_user_id")) {
    localStorage.setItem("zain_user_id", "zain-" + crypto.randomUUID());
  }
  return localStorage.getItem("zain_user_id");
};
