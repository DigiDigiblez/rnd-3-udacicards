import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";

import { UDACITY_BLUE, WHITE } from "../../../utils/colors";
import DeckStyles from "./DeckStyles";

const Deck = ({ deck, onPress }) => {
  const { title, questions } = deck;
  const count = questions.length;

  return (
    <View style={DeckStyles.card}>
      <TouchableHighlight onPress={onPress}>
        <LinearGradient
          colors={["#24a0ed", UDACITY_BLUE]}
          style={DeckStyles.linearGradient}
        >
          <Text style={DeckStyles.titleText}>{title}</Text>

          <Text style={DeckStyles.countText}>
            {count} {count === 0 || count > 1 ? "flashcards" : "flashcard"}
          </Text>
          <Ionicons name="md-albums" size={30} color={WHITE} />
        </LinearGradient>
      </TouchableHighlight>
    </View>
  );
};

export default Deck;
