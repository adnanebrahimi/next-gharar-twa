import { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseCloudMessaging } from "../../util/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

export default function PushNotificationLayout({
  children,
}: {
  children: any;
}) {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    setTk();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setTk() {
      try {
        const tk = await firebaseCloudMessaging.init();
        if (tk !== undefined && tk !== null) {
          setToken(JSON.stringify(tk));
          console.log("token", token);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url: string) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      toast(
        <div
          onClick={() =>
            handleClickPushNotification(payload?.data?.url as string)
          }
        >
          <h5>{payload?.notification?.title}</h5>
          <h6>{payload?.notification?.body}</h6>
        </div>,
        {
          closeOnClick: false,
        }
      );
    });
  }

  return (
    <>
      <p style={{ overflowWrap: "break-word", textAlign: 'center', width: '100%' }}>{token}</p>
      <ToastContainer />
      {children}
    </>
  );
}
