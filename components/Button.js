import React from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native'


import Colors from '../config/colors';

export default function Button({ title, onPress, color = "theme" }) {
    return (
        <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
button:{
    backgroundColor: Colors.theme,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
},
text: {
    color: Colors.white,
    fontSize: 15,
    textTransform: "uppercase",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
   
  
  },
})

