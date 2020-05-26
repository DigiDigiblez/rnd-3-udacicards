import React, { Component } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import { receiveDeckEntries } from "../../../actions";
import {
  fetchDeckResults,
  scheduleNextDayNotification
} from "../../../utils/API";
import Deck from "../../atoms/Deck/Deck";
import { WHITE } from "../../../utils/colors";

class DeckList extends Component {
  componentDidMount() {
    scheduleNextDayNotification();

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
      <View style={styles.container}>
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
      <View style={styles.textContainer}>
        <Text style={{ fontSize: 20 }}>No decks have been created</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    padding: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStateToProps(state) {
  return {
    data: state,
    decks: Object.keys(state).reverse()
  };
}

export default connect(mapStateToProps)(DeckList);
