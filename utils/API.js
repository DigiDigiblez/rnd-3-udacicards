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
      if (data === null) {
        Notifications.cancelAllScheduledNotificationsAsync().catch(err =>
          console.log(err)
        );

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(18);
        tomorrow.setMinutes(0);

        Notifications.scheduleLocalNotificationAsync({
          title: "Udacity Flashcards",
          message: "You didn't quiz yourself today :(",
          date: tomorrow,
          repeat: "day"
        }).catch(err => console.log(err));

        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      }
    });

export const clearLocalNotification = async () =>
  AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    await scheduleNextDayNotification()
  );
