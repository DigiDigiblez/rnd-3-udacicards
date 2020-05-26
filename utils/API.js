import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";

import { fetchData, STORAGE_KEY } from "./_DATA";
import { NOTIFICATION_KEY } from "./contants";

export const fetchDeckResults = () =>
  AsyncStorage.getItem(STORAGE_KEY).then(fetchData);

export const addCardToDeck = ({ entries, key }) =>
  AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [key]: entries
    })
  );

const formatEntry = (id, title) => ({
  [id]: {
    title,
    questions: []
  }
});

export const addDeckTitle = title => {
  const titleId = `${title}${new Date().getTime()}`;

  const deck = formatEntry(titleId, title);

  AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));

  return { titleId, deck };
};

export const deleteDeck = key =>
  AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });

export const createNotification = () => ({
  title: "UdaciCards - Quiz Time!",
  message: "You didn't quiz yourself today :(",
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: "high",
    sticky: false,
    vibrate: true
  }
});

export const clearLocalNotification = () => {
  console.log("clearLocalNotification");

  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};

export function scheduleNextDayNotification() {
  console.log("scheduleNextDayNotification");
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      // Notification not been set up
      if (data === null) {
        // Request permission from user to schedule notifications
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            // Cancel any previously scheduled notifications.
            Notifications.cancelAllScheduledNotificationsAsync();

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(8);
            tomorrow.setMinutes(0);

            console.log(`scheduleLocalNotification ${tomorrow}`);
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });

            // Ensure local notification key is setup in storage.
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
