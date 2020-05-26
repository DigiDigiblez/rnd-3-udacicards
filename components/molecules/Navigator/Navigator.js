import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { GRAY, UDACITY_BLUE } from "../../../utils/colors";
import CreateDeck from "../../pages/CreateDeck/CreateDeck";
import DeckList from "../DeckList/DeckList";

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "md-add-circle";

          if (route.name === "All decks") {
            iconName = "md-albums";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: UDACITY_BLUE,
        inactiveTintColor: GRAY
      }}
      initialRouteName="DeckList"
    >
      <Tab.Screen name="All decks" component={DeckList} />
      <Tab.Screen name="Create new deck" component={CreateDeck} />
    </Tab.Navigator>
  );
};

export default Navigator;
