import { NextResponse } from "next/server";

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;
const KLAVIYO_REVISION = "2026-01-15";

function jsonHeaders() {
  return {
    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
    accept: "application/json",
    "content-type": "application/json",
    revision: KLAVIYO_REVISION,
  };
}

export async function POST(req: Request) {
  try {
    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing KLAVIYO_PRIVATE_API_KEY or KLAVIYO_LIST_ID in environment variables.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const email = String(body?.email || "").trim();
    const firstName = String(body?.firstName || "").trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email is required." },
        { status: 400 }
      );
    }

    const profilePayload = {
      data: {
        type: "profile",
        attributes: {
          email,
          ...(firstName ? { first_name: firstName } : {}),
        },
      },
    };

    const profileRes = await fetch("https://a.klaviyo.com/api/profile-import/", {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify(profilePayload),
      cache: "no-store",
    });

    const profileText = await profileRes.text();
    let profileData: any = null;

    try {
      profileData = profileText ? JSON.parse(profileText) : null;
    } catch {
      profileData = profileText;
    }

    if (!profileRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Klaviyo profile create/update failed.",
          details: profileData,
        },
        { status: profileRes.status }
      );
    }

    const subscribePayload = {
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email,
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: "SUBSCRIBED",
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: KLAVIYO_LIST_ID,
            },
          },
        },
      },
    };

    const subscribeRes = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify(subscribePayload),
        cache: "no-store",
      }
    );

    const subscribeText = await subscribeRes.text();
    let subscribeData: any = null;

    try {
      subscribeData = subscribeText ? JSON.parse(subscribeText) : null;
    } catch {
      subscribeData = subscribeText;
    }

    if (!subscribeRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Klaviyo subscribe request failed.",
          details: subscribeData,
        },
        { status: subscribeRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile sent to Klaviyo successfully.",
      profile: profileData,
      subscribe: subscribeData,
    });
  } catch (error) {
    console.error("Subscribe route error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unexpected server error.",
      },
      { status: 500 }
    );
  }
}
