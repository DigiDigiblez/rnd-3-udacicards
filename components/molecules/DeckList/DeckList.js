import React, { Component } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import { receiveDeckEntries } from "../../../actions";
import { fetchDeckResults, scheduleNotification } from "../../../utils/API";
import Deck from "../../atoms/Deck/Deck";
import { white } from "../../../utils/colors";

class DeckList extends Component {
  componentDidMount() {
    scheduleNotification();

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
    return (
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 10
  }
});

function mapStateToProps(state) {
  return {
    data: state,
    decks: Object.keys(state).reverse()
  };
}

export default connect(mapStateToProps)(DeckList);
