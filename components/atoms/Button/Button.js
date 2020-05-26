import React from "react";
import { Text, TouchableOpacity } from "react-native";

import ButtonStyles from "./ButtonStyles";

function Button({ onPress, text, innerColor, style, transform }) {
  return (
    <TouchableOpacity onPress={onPress} style={[ButtonStyles.button, style]}>
      <Text
        style={[
          ButtonStyles.buttonText,
          { color: innerColor, textTransform: transform && "uppercase" }
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
