import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";

import { addEntry } from "../../../actions";
import { addDeckTitle } from "../../../utils/API";
import { UDACITY_BLUE, GRAY, WHITE } from "../../../utils/colors";

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
      <View style={styles.container}>
        <Text style={styles.title}>Create a new deck</Text>

        {this.state.hasError && (
          <Text style={{ color: "red", marginLeft: 30 }}>
            Please enter the deck title
          </Text>
        )}

        <TextInput
          style={styles.textinput}
          placeholder="Deck title"
          selectionColor={UDACITY_BLUE}
          onChange={({ nativeEvent }) =>
            this.setState({ title: nativeEvent.text })
          }
          value={this.state.title}
        />

        <TouchableOpacity style={styles.addDeck} onPress={this.addDeck}>
          <Text
            style={{
              textAlign: "center",
              color: WHITE,
              fontSize: 17,
              fontWeight: "700",
              textTransform: "uppercase"
            }}
          >
            Create deck
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

export default connect(mapStateToProps)(CreateDeck);
