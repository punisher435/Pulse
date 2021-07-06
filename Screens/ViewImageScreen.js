import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import colors from "../config/colors";
import IconButton from "../components/IconButton";

function ViewImageScreen(props) {
  const navigation = useNavigation();
  const {image} = props.route.params;
  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <IconButton name="close"  onPress={() => {navigation.navigate("Home")}}/>
      </View>
    
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{uri:image}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
   
    top: 20,
    left: 30,
 
  },
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
 
  image: {
    marginTop:30,
    margin:0,
    width: 400,
    height: 400,
  },
});

export default ViewImageScreen;
