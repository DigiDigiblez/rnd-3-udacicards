import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { deleteDeckEntry } from "../../../actions";
import { deleteDeck } from "../../../utils/API";
import { GRAY, UDACITY_BLUE, WHITE } from "../../../utils/colors";
import Button from "../../atoms/Button/Button";
import ViewDeckStyles from "./ViewDeckStyles";

class ViewDeck extends Component {
  deleteThisDeck = deckId => {
    this.props.navigation.goBack();

    deleteDeck(deckId);

    this.props.dispatch(deleteDeckEntry(deckId));
  };

  render() {
    const { deckId } = this.props.route.params;

    const { navigation, state } = this.props;

    if (state[deckId] === undefined) {
      // Return view without deleted deck
      return <View />;
    }

    const { title, questions } = state[deckId];

    const count = questions === undefined ? 0 : questions.length;

    return (
      <View style={ViewDeckStyles.container}>
        <Text style={ViewDeckStyles.title}>{title}</Text>

        <Text style={[ViewDeckStyles.title, { color: GRAY, fontSize: 20 }]}>
          {count} {count === 0 || count > 1 ? "flashcards" : "flashcard"}
        </Text>

        <Button
          style={ViewDeckStyles.createFlashcardBtn}
          innerColor={WHITE}
          text="Create new flashcard"
          onPress={() => navigation.navigate("CreateFlashcard", { deckId })}
        />

        <Button
          style={ViewDeckStyles.playQuizBtn}
          innerColor={UDACITY_BLUE}
          text="Play quiz"
          onPress={() => {
            navigation.navigate("PlayQuiz", { deckId });
          }}
        />

        <View style={ViewDeckStyles.deleteDeckView}>
          <Button
            style={ViewDeckStyles.deleteDeckBtn}
            innerColor="red"
            text="Delete this deck"
            onPress={() => this.deleteThisDeck(deckId)}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(ViewDeck);
