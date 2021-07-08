import React from 'react'
import { StyleSheet,  View ,TouchableOpacity} from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 


import Colors from '../config/colors';

export default function IconButton({
    name,
    size = 40,
    backgroundColor = "#000",
    iconColor = "#fff",
    onPress,
    materialicons=false,
  }) {
    return (
        <TouchableOpacity
        
      onPress={onPress}
    >
      <View
     style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {
        materialicons ? <MaterialIcons name={name} color={iconColor} size={size * 0.5} />
         :  <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
      }
     
    </View>
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

