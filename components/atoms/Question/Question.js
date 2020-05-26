import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CardFlip from "react-native-card-flip";

import { UDACITY_BLUE } from "../../../utils/colors";
import Button from "../Button/Button";
import QuestionStyles from "./QuestionStyles";

class Question extends Component {
  state = {
    frontSideUp: true
  };

  constructor(props) {
    super(props);

    this.cardFlipRef = React.createRef();
    props.cardRef(this.cardFlipRef);
  }

  handleCardFlip() {
    this.cardFlipRef.current.flip();
    this.props.cardFlipped();
  }

  render() {
    const { questionData } = this.props;

    const { question, answer } = questionData;

    return (
      <View style={QuestionStyles.container}>
        <CardFlip style={QuestionStyles.cardContainer} ref={this.cardFlipRef}>
          <TouchableOpacity
            activeOpacity={1}
            style={QuestionStyles.card}
            isShowing={this.state.frontSideUp}
            onPress={() => this.handleCardFlip()}
          >
            <Text style={QuestionStyles.label}>{question}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[QuestionStyles.card, QuestionStyles.answer]}
            isShowing={!this.state.frontSideUp}
            onPress={() => this.handleCardFlip()}
          >
            <Text style={QuestionStyles.label}>{answer}</Text>
          </TouchableOpacity>
        </CardFlip>

        <Text style={QuestionStyles.flipTipText}>
          Tap the flashcard to flip it!
        </Text>

        <Button
          style={{
            marginTop: 10,
            borderColor: UDACITY_BLUE,
            borderWidth: 1,
            width: "90%"
          }}
          innerColor={UDACITY_BLUE}
          text="Show answer"
          onPress={() => this.handleCardFlip()}
        />
      </View>
    );
  }
}

export default Question;
