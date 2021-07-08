import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import Welcome from './Screens/Welcome';
import RegisterScreen from './Screens/Register';
import LoginScreen from './Screens/Login';
import VerifyScreen from './Screens/Verify';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const WelcomeStack = createStackNavigator();



function WelcomeStackTabs() {
    return (
        <NavigationContainer style={styles.screen}>
          
        <WelcomeStack.Navigator initialRouteName="Welcome" screenOptions={{
          headerShown:false,
        }}>
           <WelcomeStack.Screen name="Welcome" component={Welcome} />
           <WelcomeStack.Screen name="Register" component={RegisterScreen} />
           <WelcomeStack.Screen name="Login" component={LoginScreen} />
           <WelcomeStack.Screen name="Verify" component={VerifyScreen} />
        </WelcomeStack.Navigator>
      
        </NavigationContainer>
    )
  }



export default WelcomeStackTabs

const styles = StyleSheet.create({
  screen:{
    flex:1,
  backgroundColor:Colors.white,
 

},
})
