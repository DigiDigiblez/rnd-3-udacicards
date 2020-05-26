import { StyleSheet } from "react-native";

import { GRAY, UDACITY_BLUE, WHITE } from "../../../utils/colors";

const ViewDeckStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    padding: 7,
    paddingTop: "40%"
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 35,
    color: UDACITY_BLUE,
    fontWeight: "700",
    marginBottom: 20
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    padding: 17,
    borderRadius: 4,
    justifyContent: "center",
    marginBottom: 20
  },
  createFlashcardBtn: {
    marginTop: 30,
    backgroundColor: UDACITY_BLUE
  },
  playQuizBtn: {
    marginTop: 10,
    borderColor: UDACITY_BLUE,
    borderWidth: 1
  },
  deleteDeckView: {
    borderTopColor: GRAY,
    borderTopWidth: 1,
    marginTop: 20,
    paddingTop: 20
  },
  deleteDeckBtn: {
    marginTop: 20,
    borderColor: "red",
    borderWidth: 1
  }
});

export default ViewDeckStyles;
