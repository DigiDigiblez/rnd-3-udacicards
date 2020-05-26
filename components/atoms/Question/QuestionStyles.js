import { Dimensions, StyleSheet } from "react-native";

import { UDACITY_BLUE } from "../../../utils/colors";

const QuestionStyles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  cardContainer: {
    width: Math.round(Dimensions.get("window").width) - 70,
    minHeight: 200,
    alignContent: "center"
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    padding: 20,
    backgroundColor: UDACITY_BLUE,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    justifyContent: "center"
  },
  answer: {
    backgroundColor: "#18b300"
  },
  label: {
    textAlign: "center",
    fontSize: 22,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  flipTipText: { color: "lightgray", margin: 10 }
});

export default QuestionStyles;
