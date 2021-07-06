import React from 'react'
import { StyleSheet, Text, View,SafeAreaView,Image } from 'react-native'
import {StatusBar} from 'react-native';

import {Name} from '../constants';
import Button from '../components/Button';
import Colors from '../config/colors';
import Screen from "../components/Screen";
import AppText from '../components/Text';

const Welcome = ({navigation}) => {

    const pressRegister = () => {
        navigation.navigate('Register');
    }
    const pressLogin = () => {
        navigation.navigate('Login');
    }

    return (
        
        <Screen >
        <View style={styles.container}>
        <View style={styles.imageview}>
        <Image style={styles.image} source={require('../assets/pulse.png')} />
        <AppText style={styles.text}>{Name}</AppText>
        </View>
        <View style={styles.buttoncontainer}>
        <View style={styles.buttonview}>
            <Button title='Register' onPress={pressRegister}/>
        </View>
        <View style={styles.buttonview}>
            <Button title='Login' onPress={pressLogin}/>
        </View>
        </View>

        </View>
        </Screen>
      
      
    )
}

export default Welcome

const styles = StyleSheet.create({
    buttoncontainer:{
        flex:1,
        justifyContent:'flex-end',
       paddingBottom:40,
    },
    buttonview:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        
    },
    container:{
        flex:1,
        backgroundColor:Colors.white,
    },
    imageview:{
        paddingTop:100,
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        width:100,
        height:100,
        
    },
    
    text: {
        paddingTop:10,
        color: Colors.dark,
        fontSize: 20,
        textTransform: "uppercase",
        fontWeight:'bold',
      
      },
  })
