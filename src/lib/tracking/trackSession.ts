export const trackSession = () => {
  const start = Date.now();
  window.addEventListener("beforeunload", () => {
    const timeSpent = ((Date.now() - start) / 1000).toFixed(1);
    localStorage.setItem("zain_last_session", timeSpent + " sec");
    // send this to Google Sheets API or server
  });
};
