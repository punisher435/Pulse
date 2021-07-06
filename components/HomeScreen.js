import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View,Image,Text } from "react-native";
import Colors from "../config/colors";

import AppText from "./Text";


function HomeScreen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      
      <View style={[styles.view, style]}>
      <Image style={styles.image} source={require('../assets/pulse.png')} />
      <AppText style={styles.text}>Pulse</AppText>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image:{
    width:50,
    height:50,
   
    

  },
  screen: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor:Colors.theme,
    flex: 0.12,
  },
  text:{
    color:Colors.white,
    paddingLeft:10,
    fontSize:17,
    lineHeight:30,
    fontWeight:'bold',
  },
  view: {
    paddingLeft:20,
    alignItems:'center',
    flexDirection:'row',
    flex: 1,
  },
});

export default HomeScreen;
