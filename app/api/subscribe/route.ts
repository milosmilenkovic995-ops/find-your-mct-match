import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const privateKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    const listId = process.env.KLAVIYO_LIST_ID;

    if (!privateKey) {
      return NextResponse.json(
        { success: false, error: "Missing KLAVIYO_PRIVATE_API_KEY." },
        { status: 500 }
      );
    }

    if (!listId) {
      return NextResponse.json(
        { success: false, error: "Missing KLAVIYO_LIST_ID." },
        { status: 500 }
      );
    }

    // STEP 1: Create or update profile with first_name
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
      headers: {
        Authorization: `Klaviyo-API-Key ${privateKey}`,
        "Content-Type": "application/json",
        revision: "2024-10-15",
      },
      body: JSON.stringify(profilePayload),
    });

    const profileText = await profileRes.text();

    if (!profileRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Profile import failed.",
          details: profileText,
        },
        { status: profileRes.status }
      );
    }

    // STEP 2: Subscribe email to list
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
                },
              },
            ],
          },
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: listId,
            },
          },
        },
      },
    };

    const subscribeRes = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${privateKey}`,
          "Content-Type": "application/json",
          revision: "2024-10-15",
        },
        body: JSON.stringify(subscribePayload),
      }
    );

    const subscribeText = await subscribeRes.text();

    if (!subscribeRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Klaviyo subscribe failed.",
          details: subscribeText,
        },
        { status: subscribeRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile saved and subscribed successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Server error.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}