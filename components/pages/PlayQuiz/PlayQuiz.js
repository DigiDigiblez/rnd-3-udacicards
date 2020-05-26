import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import {
  UDACITY_BLUE,
  GRAY,
  WHITE,
  CORRECT_GREEN,
  INCORRECT_RED
} from "../../../utils/colors";
import Question from "../../atoms/Question/Question";
import Button from "../../atoms/Button/Button";

class PlayQuiz extends Component {
  state = {
    qIndex: 0,
    correct: 0,
    incorrect: 0
  };

  onClickedAnswered = answer => {
    const { qIndex, correct, incorrect } = this.state;

    this.setState({
      qIndex: qIndex + 1,
      correct: answer ? correct + 1 : correct,
      incorrect: answer ? incorrect : incorrect + 1
    });
  };

  navigateTo = name => {
    if (name === "ViewDeck") {
      this.setState({
        qIndex: 0,
        correct: 0,
        incorrect: 0
      });
    } else {
      const { navigation } = this.props;
      const { deckId } = this.props.route.params;

      navigation.goBack();
      navigation.navigate(name, { deckId });
    }
  };

  render() {
    const { state } = this.props;

    const { deckId } = this.props.route.params;

    const { questions } = state[deckId];

    if (questions.length == 0) {
      return (
        <View style={[styles.container, { alignItems: "center" }]}>
          <Text
            style={{ fontWeight: "100", fontSize: 22, textAlign: "center" }}
          >
            Oh no...this deck has 0 flashcards. Create one to build a quiz.
          </Text>

          <Button
            style={{
              marginTop: 30,
              backgroundColor: UDACITY_BLUE
            }}
            innerColor={WHITE}
            text="Create new flashcard"
            onPress={() => this.navigateTo("CreateFlashcard")}
          />
        </View>
      );
    }

    if (this.state.qIndex > questions.length - 1) {
      return (
        <View style={[styles.container, { alignItems: "center" }]}>
          <Text style={styles.heading}>
            You scored{" "}
            {((this.state.correct / questions.length) * 100).toFixed(2)}%
          </Text>
          <Text>
            <Text style={styles.heading}>{this.state.correct}</Text>
            <Text
              style={{
                fontWeight: "100",
                fontSize: 22
              }}
            >
              {" "}
              out of {questions.length}
            </Text>
          </Text>
          <View
            style={{
              borderTopColor: GRAY,
              borderTopWidth: 1,
              marginTop: 50,
              paddingTop: 20
            }}
          >
            <Text style={[styles.heading, { color: "darkgray" }]}>
              ✅ answers : {this.state.correct}
            </Text>
            <Text style={[styles.heading, { color: "darkgray" }]}>
              ❌ answers : {this.state.incorrect}
            </Text>
          </View>

          <Button
            style={{
              marginTop: 10,
              borderColor: UDACITY_BLUE,
              borderWidth: 1,
              width: "90%"
            }}
            innerColor={UDACITY_BLUE}
            text="Play the quiz again?"
            onPress={() => this.navigateTo("ViewDeck")}
          />

          <Button
            style={{
              marginTop: 20,
              borderColor: "darkgray",
              borderWidth: 1,
              width: "90%"
            }}
            innerColor="darkgray"
            text="Back to deck"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          <Text style={{ fontWeight: "100", fontSize: 25 }}>Question</Text>{" "}
          {this.state.qIndex + 1}
          <Text style={{ fontWeight: "100", fontSize: 22 }}>
            of {questions.length}
          </Text>
        </Text>

        <Question questionData={questions[this.state.qIndex]} />

        <View
          style={{
            borderTopColor: GRAY,
            borderTopWidth: 1,
            marginTop: 50,
            paddingTop: 20
          }}
        >
          <Button
            style={{
              backgroundColor: CORRECT_GREEN,
              margin: 10
            }}
            innerColor={WHITE}
            text="Correct!"
            onPress={() => this.onClickedAnswered(true)}
          />

          <Button
            style={{ backgroundColor: INCORRECT_RED, margin: 10 }}
            innerColor={WHITE}
            text="Incorrect..."
            onPress={() => this.onClickedAnswered(false)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: "center"
  },
  heading: {
    fontWeight: "700",
    alignSelf: "center",
    margin: 20,
    fontSize: 35
  }
});

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(PlayQuiz);
