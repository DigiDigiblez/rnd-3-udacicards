import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Navigator from "./components/molecules/Navigator/Navigator";
import CreateFlashcard from "./components/pages/CreateFlashcard/CreateFlashcard";
import PlayQuiz from "./components/pages/PlayQuiz/PlayQuiz";
import ViewDeck from "./components/pages/ViewDeck/ViewDeck";
import reducer from "./reducers";
import { colorPrimary, white } from "./utils/colors";

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
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <MyStatusBar backgroundColor={colorPrimary} />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colorPrimary
            },
            headerTintColor: white
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="UdaciCards" component={Navigator} />
          <Stack.Screen
            name="ViewDeck"
            component={ViewDeck}
            options={{ title: "View deck" }}
          />
          <Stack.Screen
            name="CreateFlashcard"
            component={CreateFlashcard}
            options={{ title: "Create flashcard" }}
          />
          <Stack.Screen
            name="PlayQuiz"
            component={PlayQuiz}
            options={{ title: "Play quiz" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
