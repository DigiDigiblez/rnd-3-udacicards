import { StyleSheet } from "react-native";

import { WHITE } from "../../../utils/colors";

const DeckStyles = StyleSheet.create({
  card: {
    borderColor: WHITE,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    shadowColor: "0 4px 8px 0 rgba(0,0,0,0.2)",
    minHeight: 100,
    flex: 1
  },
  titleText: {
    fontSize: 24,
    color: WHITE,
    fontWeight: "700",
    marginBottom: 10
  },
  countText: { color: WHITE, fontSize: 16 },
  linearGradient: {
    padding: 15,
    justifyContent: "center",
    borderRadius: 7,
    height: "100%"
  }
});

export default DeckStyles;
