import { Notifications } from "expo";
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

export const scheduleNextDayNotification = () =>
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      Notifications.cancelAllScheduledNotificationsAsync().catch(err =>
        console.log(err)
      );

      // Notification in one day time
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(18);
      tomorrow.setMinutes(0);

      // const instant = new Date(); // TODO - UDACITY REVIEWER EASY CHECK ❤️

      Notifications.scheduleLocalNotificationAsync({
        title: "Udacity Flashcards",
        message: "You didn't quiz yourself today :(",
        date: tomorrow,
        // date: instant, // TODO - UDACITY REVIEWER EASY CHECK ❤️
        repeat: "day",
        ios: {
          sound: true
        },
        android: {
          sound: true,
          priority: "high",
          sticky: false,
          vibrate: true
        }
      }).catch(err => console.log(err));

      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
    });

export const clearLocalNotification = async () =>
  AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    await scheduleNextDayNotification()
  );
