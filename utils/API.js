import { AsyncStorage } from "react-native";

import { fetchData, STORAGE_KEY } from "./_DATA";

const PushNotification = require("react-native-push-notification");

export function fetchDeckResults() {
  return AsyncStorage.getItem(STORAGE_KEY).then(fetchData);
}

export function addCardToDeck({ entries, key }) {
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [key]: entries
    })
  );
}

function formatEntry(id, title) {
  return {
    [id]: {
      title,
      questions: []
    }
  };
}

export function addDeckTitle(title) {
  const titleId = `${title}${new Date().getTime()}`;

  const deck = formatEntry(titleId, title);

  AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));

  return { titleId, deck };
}

export function deleteDeck(key) {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
}

const NOTIFICATION_KEY = "udacicard-notification";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(scheduleNotification()); // schedule notification for the next day
}

export function scheduleNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        PushNotification.cancelAllLocalNotifications();

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(18);
        tomorrow.setMinutes(0);

        PushNotification.localNotificationSchedule({
          title: "Udacity Flashcards",
          message: "You haven't taken any quiz today",
          date: tomorrow,
          repeat: "day"
        });

        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      }
    });
}
