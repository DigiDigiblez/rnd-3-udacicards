import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function Button({ onPress, text, innerColor, style, transform }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text
        style={{
          textAlign: "center",
          color: innerColor,
          fontSize: 17,
          fontWeight: "700",
          textTransform: transform && "uppercase"
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    color: "#dac",
    marginLeft: 20,
    marginRight: 20,
    padding: 17,
    borderRadius: 4,
    justifyContent: "center",
    marginBottom: 20
  }
});

export default Button;
