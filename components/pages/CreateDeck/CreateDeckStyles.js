import { StyleSheet } from "react-native";

import { GRAY, UDACITY_BLUE, WHITE } from "../../../utils/colors";

const CreateDeckStyles = StyleSheet.create({
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
  deckTitleInput: {
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
  },
  createDeckText: {
    textAlign: "center",
    color: WHITE,
    fontSize: 17,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  enterDeckTitleText: { color: "red", marginLeft: 30 }
});

export default CreateDeckStyles;
