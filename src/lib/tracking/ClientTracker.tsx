"use client";
import { useEffect } from "react";

export default function ClientTracker() {
  useEffect(() => {
    const start = Date.now();
    const client_id = localStorage.getItem("client_id") || crypto.randomUUID();
    localStorage.setItem("client_id", client_id);

    const sendTracking = async () => {
      let locationData = null;
      try {
        locationData = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              resolve({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              });
            },
            (err) => resolve(null),
            { timeout: 2000 }
          );
        });
      } catch (e) {}

      const connection = (navigator as Navigator & { connection?: any }).connection || {};
      const netType = connection.effectiveType || "unknown";

      const userAgent = navigator.userAgent;
      let deviceModel = "Unknown";
      const modelMatch = userAgent.match(/\(([^)]+)\)/);
      if (modelMatch && modelMatch[1]) {
        deviceModel = modelMatch[1];
      }

      // Optionally fetch IP info using external IP API (only if allowed)
      let ipData: {
  city?: string;
  country_name?: string;
  org?: string;
} = {};

      try {
        const res = await fetch("https://ipapi.co/json/");
        ipData = await res.json();
      } catch (err) {}

      const payload = {
        client_id,
        timestamp: new Date().toISOString(),
        path: window.location.pathname,
        referrer: document.referrer,
        userAgent,
        screen: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        language: navigator.language,
        platform: navigator.platform,
        duration: Math.round((Date.now() - start) / 1000),
        network_type: netType,
        device_model: deviceModel,
        location: locationData,
        ip_city: ipData.city,
        ip_country: ipData.country_name,
        ip_org: ipData.org,
      };

      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    };

    window.addEventListener("beforeunload", sendTracking);
    return () => window.removeEventListener("beforeunload", sendTracking);
  }, []);

  return null;
}
