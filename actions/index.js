export const ADD_DECK = "ADD_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const RECEIVE_DECK_ENTRIES = "RECEIVE_DECK_ENTRIES";
export const ADD_CARD = "ADD_CARD";

export const receiveDeckEntries = entries => ({
  type: RECEIVE_DECK_ENTRIES,
  entries
});

export const addEntry = entry => ({
  type: ADD_DECK,
  entry
});

export const deleteDeckEntry = deckId => ({
  type: DELETE_DECK,
  deckId
});

export const addCardEntry = entry => ({
  type: ADD_CARD,
  entry
});
