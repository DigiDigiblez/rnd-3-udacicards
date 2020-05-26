import React, { Component } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { connect } from "react-redux";

import { receiveDeckEntries } from "../../../actions";
import { fetchDeckResults } from "../../../utils/API";
import Deck from "../../atoms/Deck/Deck";
import DeckListStyles from "./DeckListStyles";

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    fetchDeckResults().then(data => {
      dispatch(receiveDeckEntries(data));
    });
  }

  openDeck = (id, deck) => {
    this.props.navigation.navigate("ViewDeck", {
      deckId: id,
      deck
    });
  };

  render() {
    const { decks, data } = this.props;
    return decks.length > 0 ? (
      <View style={DeckListStyles.container}>
        <SafeAreaView>
          <FlatList
            data={decks}
            renderItem={({ item }) => {
              const deck = data[item];
              return (
                <Deck deck={deck} onPress={() => this.openDeck(item, deck)} />
              );
            }}
            keyExtractor={item => item}
          />
        </SafeAreaView>
      </View>
    ) : (
      <View style={DeckListStyles.textContainer}>
        <Text style={DeckListStyles.noDecksText}>
          No decks have been created
        </Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state,
    decks: Object.keys(state).reverse()
  };
}

export default connect(mapStateToProps)(DeckList);
