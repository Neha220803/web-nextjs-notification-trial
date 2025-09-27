"use client";

import { Button } from "@/components/ui/button";
import useFcmToken from "@/hooks/useFcmToken";

export default function Home() {
  const { token, notificationPermissionStatus } = useFcmToken();

  const handleTestNotification = async () => {
    const response = await fetch("/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: "Test Notification",
        message: "This is a test notification",
        link: "/contact",
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <main className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Firebase Cloud Messaging Demo</h1>
      <div className="flex gap-2">
        Permission Status:
        {notificationPermissionStatus === "granted" ? (
          <p>Granted</p>
        ) : notificationPermissionStatus !== null ? (
          <p>Not Granted</p>
        ) : null}
      </div>

      <Button
        disabled={!token}
        className="mt-5"
        onClick={handleTestNotification}
      >
        Send Test Notification
      </Button>
    </main>
  );
}
