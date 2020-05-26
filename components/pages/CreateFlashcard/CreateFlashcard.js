import React, { Component } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import { addCardEntry } from "../../../actions";
import { addCardToDeck } from "../../../utils/API";
import { UDACITY_BLUE } from "../../../utils/colors";
import CreateFlashcardStyles from "./CreateFlashcardStyles";

class CreateFlashcard extends Component {
  state = {
    question: "",
    answer: "",
    hasError: [false, false]
  };

  addCard = () => {
    const question = this.state.question.trim();
    const answer = this.state.answer.trim();

    this.setState({
      hasError: [question.length === 0, answer.length === 0]
    });

    if (question.length > 0 && answer.length > 0) {
      const { state, route, dispatch } = this.props;

      const { deckId } = route.params;

      const { questions } = state[deckId];

      questions.push({ question, answer });

      const entry = {
        key: deckId,
        entries: {
          ...state[deckId],
          questions
        }
      };

      addCardToDeck(entry);

      dispatch(addCardEntry({ key: deckId, questions }));

      this.setState({
        question: "",
        answer: ""
      });

      this.props.navigation.goBack();
    }
  };

  handleChange = (value, label) => {
    this.setState({
      [label]: value
    });
  };

  render() {
    return (
      <View style={CreateFlashcardStyles.container}>
        <Text style={CreateFlashcardStyles.title}>Create a new flashcard</Text>

        {this.state.hasError[0] && (
          <Text style={CreateFlashcardStyles.enterFlashcardQuestion}>
            Please enter your flashcard question
          </Text>
        )}

        <TextInput
          style={CreateFlashcardStyles.textinput}
          placeholder="Enter flashcard question"
          selectionColor={UDACITY_BLUE}
          value={this.state.question}
          onChange={({ nativeEvent }) =>
            this.handleChange(nativeEvent.text, "question")
          }
        />

        {this.state.hasError[1] && (
          <Text style={CreateFlashcardStyles.enterFlashcardAnswer}>
            Please enter your flashcard answer
          </Text>
        )}

        <TextInput
          style={CreateFlashcardStyles.textinput}
          placeholder="Enter flashcard answer"
          selectionColor={UDACITY_BLUE}
          value={this.state.answer}
          onChange={({ nativeEvent }) =>
            this.handleChange(nativeEvent.text, "answer")
          }
        />

        <TouchableOpacity
          style={CreateFlashcardStyles.addDeck}
          onPress={this.addCard}
        >
          <Text style={CreateFlashcardStyles.createFlashcard}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(CreateFlashcard);
