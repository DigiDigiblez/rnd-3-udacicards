import React, { Component } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import { addEntry } from "../../../actions";
import { addDeckTitle } from "../../../utils/API";
import { UDACITY_BLUE } from "../../../utils/colors";
import CreateDeckStyles from "./CreateDeckStyles";

class CreateDeck extends Component {
  state = {
    title: "",
    hasError: false
  };

  addDeck = () => {
    const title = this.state.title.trim();

    this.setState({ hasError: title.length === 0 });

    if (title.length > 0) {
      this.setState({ title: "" });

      const { titleId, deck } = addDeckTitle(title);

      this.props.dispatch(addEntry(deck));

      this.props.navigation.navigate("ViewDeck", {
        deckId: titleId,
        deck: deck[titleId]
      });
    }
  };

  render() {
    return (
      <View style={CreateDeckStyles.container}>
        <Text style={CreateDeckStyles.title}>Create a new deck</Text>

        {this.state.hasError && (
          <Text style={CreateDeckStyles.enterDeckTitleText}>
            Please enter the deck title
          </Text>
        )}

        <TextInput
          style={CreateDeckStyles.deckTitleInput}
          placeholder="Deck title"
          selectionColor={UDACITY_BLUE}
          onChange={({ nativeEvent }) =>
            this.setState({ title: nativeEvent.text })
          }
          value={this.state.title}
        />

        <TouchableOpacity
          style={CreateDeckStyles.addDeck}
          onPress={this.addDeck}
        >
          <Text style={CreateDeckStyles.createDeckText}>Create deck</Text>
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

export default connect(mapStateToProps)(CreateDeck);
