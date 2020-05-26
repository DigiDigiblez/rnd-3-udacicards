import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";

import { addCardEntry } from "../../../actions";
import { addCardToDeck } from "../../../utils/API";
import { UDACITY_BLUE, GRAY, WHITE } from "../../../utils/colors";

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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create a new flashcard</Text>

        {this.state.hasError[0] && (
          <Text style={{ color: "red", marginLeft: 30 }}>
            Please enter your flashcard question
          </Text>
        )}

        <TextInput
          style={styles.textinput}
          placeholder="Enter flashcard question"
          selectionColor={UDACITY_BLUE}
          value={this.state.question}
          onChange={({ nativeEvent }) =>
            this.setState({ question: nativeEvent.text })
          }
        />

        {this.state.hasError[1] && (
          <Text style={{ color: "red", marginLeft: 30 }}>
            Please enter your flashcard answer
          </Text>
        )}

        <TextInput
          style={styles.textinput}
          placeholder="Enter flashcard answer"
          selectionColor={UDACITY_BLUE}
          value={this.state.answer}
          onChange={({ nativeEvent }) =>
            this.setState({ answer: nativeEvent.text })
          }
        />

        <TouchableOpacity style={styles.addDeck} onPress={this.addCard}>
          <Text
            style={{
              textAlign: "center",
              color: WHITE,
              fontSize: 17,
              fontWeight: "700",
              textTransform: "uppercase"
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    padding: 7,
    paddingTop: "40%"
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    color: UDACITY_BLUE,
    fontWeight: "700",
    marginBottom: 20
  },
  textinput: {
    borderColor: GRAY,
    borderWidth: 1,
    borderRadius: 4,
    margin: 20,
    paddingLeft: 15,
    fontSize: 17
  },
  addDeck: {
    marginLeft: 20,
    marginRight: 20,
    padding: 17,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: UDACITY_BLUE
  }
});

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(CreateFlashcard);
