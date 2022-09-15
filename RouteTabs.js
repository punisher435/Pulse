import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';

import HomeScreen from './components/HomeScreen';
import Colors from './config/colors';
import Screen from './Screens/Home';
import AddContact from './Screens/AddContact';
import WelcomeStackTabs from './WelcomeStackTabs';
import Calls from './Screens/Calls';
import Myaccount from './Screens/Myaccount';
import ChatScreen from './Screens/ChatScreen';
import ViewImageScreen from './Screens/ViewImageScreen';
import Createcall from './Screens/createcall';


const Stack = createStackNavigator();
const StackDashboard = createStackNavigator();
const StackCall = createStackNavigator();


const Tab = createMaterialTopTabNavigator();


function StackTabs() {
  return (
      
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown:false,
        
      }} headerMode="none"

      options={{
        headerMode:"none",
      }}
     
      
      >
        <Stack.Screen name="Home" component={Screen} />
        
        <Stack.Screen name="Chat Screen" component={ChatScreen} />
        <Stack.Screen name="Full Image" component={ViewImageScreen} />
        
      </Stack.Navigator>
  )
}

function CallStack() {
  return (
      
      <StackCall.Navigator initialRouteName="Make Call" screenOptions={{
        headerShown:false,
        
      }} headerMode="none"

      options={{
        headerMode:"none",
      }}
     
      
      >
        <StackCall.Screen name="Make Call" component={Createcall} />
        
        <StackCall.Screen name="Call" component={Calls} />
    
      </StackCall.Navigator>
  )
}


function StackTabsDashboard() {
  return (
      
      <StackDashboard.Navigator initialRouteName="Add Contact" screenOptions={{
        headerShown:false,
        
      }} headerMode="none"

      options={{
        headerMode:"none",
      }}
     
      
      >
        <StackDashboard.Screen  name="Add Contact"  component={AddContact} />
        <StackDashboard.Screen name="My account" component={Myaccount} />
        
        
      </StackDashboard.Navigator>
  )
}




function MainTabs() {

  
  return (
    <>
     <HomeScreen>
    
     </HomeScreen>
    <Tab.Navigator keyboardDismissMode  swipeEnabled swipeVelocityImpact={0.2}
   
  
   
    tabBarOptions={{
          activeTintColor: Colors.white,
        
          inactiveTintColor: Colors.white,
          activeBackgroundColor: '#000000',
       inactiveBackgroundColor: '#b55031',
           style: {
                 backgroundColor: Colors.theme,
                 color:Colors.white,
                
           },
           indicatorStyle: {
            backgroundColor: Colors.white,
        },
    
         
         
        }}
       
       
     initialRouteName="Chats"   
>
      <Tab.Screen  name="Calls"  component={CallStack} />
      <Tab.Screen name="Chats" component={StackTabs}/>
      <Tab.Screen  name="Dashboard"  component={StackTabsDashboard} />
     
      
      
    </Tab.Navigator>
    </>
  );
}




function RouteTabs({isAuthenticated}) {

  React.useEffect(() => {
  
  },[])
 


    
    if(isAuthenticated)
    {
      return (
        <NavigationContainer >
          <MainTabs />
        </NavigationContainer>
      )
    }
    else{
      return (
       <View>
         <WelcomeStackTabs />
         
       </View>
          
       
      )
    }
   
}




const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
 
});

export default connect(mapStateToProps)(RouteTabs);




