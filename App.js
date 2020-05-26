import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Navigator from "./components/molecules/Navigator/Navigator";
import CreateFlashcard from "./components/pages/CreateFlashcard/CreateFlashcard";
import PlayQuiz from "./components/pages/PlayQuiz/PlayQuiz";
import ViewDeck from "./components/pages/ViewDeck/ViewDeck";
import reducer from "./reducers";
import { UDACITY_BLUE, WHITE } from "./utils/colors";
import { SCREEN } from "./utils/contants";
import { scheduleNextDayNotification } from "./utils/API";

const Stack = createStackNavigator();

function MyStatusBar({ backgroundColor, props }) {
  return (
    <View>
      <View style={{ backgroundColor, height: 10 }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    </View>
  );
}

export default function App() {
  useEffect(() => {
    scheduleNextDayNotification();
  }, []);

  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <MyStatusBar backgroundColor={UDACITY_BLUE} />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: UDACITY_BLUE
            },
            headerTintColor: WHITE
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name={SCREEN.NAVIGATOR.NAME} component={Navigator} />
          <Stack.Screen
            name={SCREEN.VIEW_DECK.NAME}
            component={ViewDeck}
            options={{ title: SCREEN.VIEW_DECK.TITLE }}
          />
          <Stack.Screen
            name={SCREEN.CREATE_FLASHCARD.NAME}
            component={CreateFlashcard}
            options={{ title: SCREEN.CREATE_FLASHCARD.TITLE }}
          />
          <Stack.Screen
            name={SCREEN.PLAY_QUIZ.NAME}
            component={PlayQuiz}
            options={{ title: SCREEN.PLAY_QUIZ.TITLE }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
