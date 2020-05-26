import { StyleSheet } from "react-native";

import {
  CORRECT_GREEN,
  GRAY,
  INCORRECT_RED,
  UDACITY_BLUE,
  WHITE
} from "../../../utils/colors";

const PlayQuizStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: "center"
  },
  heading: {
    fontWeight: "700",
    alignSelf: "center",
    margin: 20,
    fontSize: 35
  },
  noFlashcardsText: { fontWeight: "100", fontSize: 22, textAlign: "center" },
  correctCountText: { fontWeight: "100", fontSize: 25 },
  totalCountText: { fontWeight: "100", fontSize: 22 },
  confirmAnswerView: {
    borderTopColor: GRAY,
    borderTopWidth: 1,
    marginTop: 50,
    paddingTop: 20
  },
  correctText: {
    backgroundColor: CORRECT_GREEN,
    margin: 10
  },
  incorrectText: { backgroundColor: INCORRECT_RED, margin: 10 },
  playAgainText: {
    marginTop: 10,
    borderColor: UDACITY_BLUE,
    borderWidth: 1,
    width: "90%"
  },
  backToDeckText: {
    marginTop: 20,
    borderColor: "darkgray",
    borderWidth: 1,
    width: "90%"
  }
});

export default PlayQuizStyles;
