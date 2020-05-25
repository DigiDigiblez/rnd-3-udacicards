import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";

import AddCard from "./components/AddCard";
import BottomNavigation from "./components/BottomNavigation";
import DeckView from "./components/DeckView";
import TakeQuiz from "./components/TakeQuiz";
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
          <Stack.Screen name="UdaciCards" component={BottomNavigation} />
          <Stack.Screen
            name="DeckView"
            component={DeckView}
            options={{ title: "Deck View" }}
          />
          <Stack.Screen
            name="AddCard"
            component={AddCard}
            options={{ title: "Add Flashcard" }}
          />
          <Stack.Screen
            name="TakeQuiz"
            component={TakeQuiz}
            options={{ title: "Take Quiz" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
