export const getUserInfo = async () => {
  const res = await fetch("https://ipinfo.io/json?token=2da25173b2cdc7");
  const ipData = await res.json();
  return {
    ip: ipData.ip,
    city: ipData.city,
    country: ipData.country,
    region: ipData.region,
    network: ipData.org,
    device: navigator.userAgent.includes("Mobi") ? "Mobile" : "Desktop",
    os: navigator.platform,
    browser: navigator.userAgent,
  };
};
