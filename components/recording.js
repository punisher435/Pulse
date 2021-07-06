import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import IconButton from "./IconButton";

function Recording({ visible = false,onClick }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/recording.json")}
      />
      <View style={styles.Icon}><IconButton name="stop" onPress={onClick} /></View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    opacity: 0.8,
    width: "100%",
    alignItems:'center',
    padding:150,
    zIndex: 1,
  },
  Icon:{
      
      alignItems:'center',
      justifyContent:'center',
  },
});

export default Recording;
