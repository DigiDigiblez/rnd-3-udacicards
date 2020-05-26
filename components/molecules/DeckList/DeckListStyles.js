import { StyleSheet } from "react-native";

import { WHITE } from "../../../utils/colors";

const DeckListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    padding: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noDecksText: { fontSize: 20 }
});

export default DeckListStyles;
