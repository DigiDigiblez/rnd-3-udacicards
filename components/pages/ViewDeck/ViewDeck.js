import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import { deleteDeckEntry } from "../../../actions";
import { clearLocalNotification, deleteDeck } from "../../../utils/API";
import { colorPrimary, gray, white } from "../../../utils/colors";
import Button from "../../atoms/Button/Button";

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
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <Text style={[styles.title, { color: gray, fontSize: 20 }]}>
          {count} {count === 0 || count > 1 ? "flashcards" : "flashcard"}
        </Text>

        <Button
          style={{
            marginTop: 30,
            backgroundColor: colorPrimary
          }}
          innerColor={white}
          text="Create new flashcard"
          onPress={() => navigation.navigate("CreateFlashcard", { deckId })}
        />

        <Button
          style={{
            marginTop: 10,
            borderColor: colorPrimary,
            borderWidth: 1
          }}
          innerColor={colorPrimary}
          text="Play quiz"
          onPress={() => {
            // cancel today's notification
            clearLocalNotification().then(() => null);

            navigation.navigate("PlayQuiz", { deckId });
          }}
        />

        <View
          style={{
            borderTopColor: gray,
            borderTopWidth: 1,
            marginTop: 20,
            paddingTop: 20
          }}
        >
          <Button
            style={{
              marginTop: 20,
              borderColor: "red",
              borderWidth: 1
            }}
            innerColor="red"
            text="Delete this deck"
            onPress={() => this.deleteThisDeck(deckId)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 7,
    paddingTop: "40%"
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 35,
    color: colorPrimary,
    fontWeight: "700",
    marginBottom: 20
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    padding: 17,
    borderRadius: 4,
    justifyContent: "center",
    marginBottom: 20
  }
});

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(ViewDeck);
