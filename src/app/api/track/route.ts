// /app/api/track/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const payload = {
    client_id: body.client_id,
    events: [
      {
        name: "custom_user_tracking",
        params: {
          path: body.path,
          timestamp: body.timestamp,
          screen_width: body.screen.width,
          screen_height: body.screen.height,
          language: body.language,
          platform: body.platform,
          user_agent: body.userAgent,
          referrer: body.referrer,
          duration: body.duration,
          network_type: body.network_type,
          device_model: body.device_model,
          location_lat: body.location?.lat || null,
          location_lng: body.location?.lng || null,
          ip_city: body.ip_city || null,
          ip_country: body.ip_country || null,
          ip_org: body.ip_org || null,
        },
      },
    ],
  };

  await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=G-QDN392RS4B&api_secret=qwjkDLHBRHm1NiPhfP0kkg`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

  return NextResponse.json({ status: "ok" });
}
