import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import localforage from "localforage";

const firebaseCloudMessaging = {
  init: async () => {
    // Initialize the Firebase app with the credentials
    const firebaseConfig = {
      apiKey: "AIzaSyAFF8pqwL1ZGq8eCSaJvhFRjPbns7N6vIE",
      authDomain: "next-gharar-twa.firebaseapp.com",
      projectId: "next-gharar-twa",
      storageBucket: "next-gharar-twa.appspot.com",
      messagingSenderId: "149265143905",
      appId: "1:149265143905:web:e8481d129512417dd6f220",
      measurementId: "G-L5H8TE9QV1",
    };

    try {
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      // Initialize Firebase Cloud Messaging and get a reference to the service
      const messaging = getMessaging(app);
      const tokenInLocalForage = await localforage.getItem("fcm_token");

      // Return the token if it is alredy in our local storage
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage;
      }

      // Request the push notification permission from browser
      const status = await Notification.requestPermission();
      if (status && status === "granted") {
        // Get new token from Firebase
        const fcm_token = await getToken(messaging, {
          vapidKey:
            "BJmQrN69b5bruZkyOKQiSgKWXvp5evL9z50fKGcCNWmvZaF1Dm7lktWU5ADKH-oVNDXjjDM2bTrZFMFAoMNZGVM",
        });

        // Set token in our local storage
        if (fcm_token) {
          localforage.setItem("fcm_token", fcm_token);
          return fcm_token;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export { firebaseCloudMessaging };
