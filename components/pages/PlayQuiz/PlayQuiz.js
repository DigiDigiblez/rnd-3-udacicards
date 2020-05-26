import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { GRAY, UDACITY_BLUE, WHITE } from "../../../utils/colors";
import Question from "../../atoms/Question/Question";
import Button from "../../atoms/Button/Button";
import {
  clearLocalNotification,
  scheduleNextDayNotification
} from "../../../utils/API";
import PlayQuizStyles from "./PlayQuizStyles";

class PlayQuiz extends Component {
  state = {
    qIndex: 0,
    correct: 0,
    incorrect: 0,
    cardRef: null,
    cardFlipped: false
  };

  setCardRef = cardRef => {
    this.setState({
      cardRef
    });
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

  checkIfFlipped = () => {
    if (this.state.cardFlipped) {
      this.state.cardRef.current.flip();

      this.setState({
        cardFlipped: !this.state.cardFlipped
      });
    }
  };

  handleCorrectAnswer = () => {
    this.checkIfFlipped();

    this.onClickedAnswered(true);
  };

  handleIncorrectAnswer = () => {
    this.checkIfFlipped();

    this.onClickedAnswered(false);
  };

  handleCardFlipped = () => {
    this.setState({
      cardFlipped: !this.state.cardFlipped
    });
  };

  render() {
    const { state } = this.props;

    const { deckId } = this.props.route.params;

    const { questions } = state[deckId];

    if (questions.length === 0) {
      return (
        <View style={[PlayQuizStyles.container, { alignItems: "center" }]}>
          <Text style={PlayQuizStyles.noFlashcardsText}>
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
      // Cancel current notifications as user finished quiz and setup a new one for tomorrow
      clearLocalNotification().then(scheduleNextDayNotification());

      return (
        <View style={[PlayQuizStyles.container, { alignItems: "center" }]}>
          <Text style={PlayQuizStyles.heading}>
            You scored{" "}
            {((this.state.correct / questions.length) * 100).toFixed(2)}%
          </Text>
          <Text>
            <Text style={PlayQuizStyles.heading}>{this.state.correct}</Text>
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
            <Text style={[PlayQuizStyles.heading, { color: "darkgray" }]}>
              ✅ answers : {this.state.correct}
            </Text>
            <Text style={[PlayQuizStyles.heading, { color: "darkgray" }]}>
              ❌ answers : {this.state.incorrect}
            </Text>
          </View>

          <Button
            style={PlayQuizStyles.playAgainText}
            innerColor={UDACITY_BLUE}
            text="Play the quiz again?"
            onPress={() => this.navigateTo("ViewDeck")}
          />

          <Button
            style={PlayQuizStyles.backToDeckText}
            innerColor="darkgray"
            text="Back to deck"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      );
    }

    return (
      <View style={PlayQuizStyles.container}>
        <Text style={PlayQuizStyles.heading}>
          <Text style={PlayQuizStyles.correctCountText}>Question</Text>{" "}
          {this.state.qIndex + 1}
          <Text style={PlayQuizStyles.totalCountText}>
            of {questions.length}
          </Text>
        </Text>

        <Question
          questionData={questions[this.state.qIndex]}
          cardRef={ref => this.setCardRef(ref)}
          cardFlipped={this.handleCardFlipped}
        />

        <View style={PlayQuizStyles.confirmAnswerView}>
          <Button
            style={PlayQuizStyles.correctText}
            innerColor={WHITE}
            text="Correct!"
            onPress={this.handleCorrectAnswer}
          />

          <Button
            style={PlayQuizStyles.incorrectText}
            innerColor={WHITE}
            text="Incorrect..."
            onPress={this.handleIncorrectAnswer}
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

export default connect(mapStateToProps)(PlayQuiz);
