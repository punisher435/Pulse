import React,{useState,useEffect} from "react";
import { StyleSheet,Text } from "react-native";
import * as Yup from "yup";
import { connect } from 'react-redux';

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import ActivityIndicator from "../components/Loading";

import { signup,login } from '../redux/actions/authactions';
import AppModal from '../components/AppModal'
import Colors from "../config/colors";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../redux/actiontypes/authactiontypes';

const validationSchema = Yup.object().shape({
  
  
});





function VerifyScreen(props) {
 

  const [loading,setloading] =useState(false);
  const [modalVisible,setModalVisible] =useState(false);
  const [text,settext] =useState('');
  const [retry,setretry]=useState(5);

  const [data,setdata]=useState();

  useEffect(() => {
    setdata(props.route.params);
    
  },[props])


  const submitform = async ({otp}) => {
    setloading(true);
   

    console.log(data);

    if(data.signup)
    {
      await signup({
        phone:data.data.phone,hash:data.data.hash,otp:otp,country_code:data.data.country_code,
        retry:data.data.retry,
      }).then((res) => {
        console.log('success')
        console.log(res.data);
        props.success(res);
      }).catch((error) => {
        console.log(error);
        settext(error.response.data.msg);
      setModalVisible(true);
        setloading(false);
        
      })
    
    }

    if(data.login)
    {
      await login({
        phone:data.data.phone,hash:data.data.hash,otp:otp,country_code:data.data.country_code,
        retry:data.data.retry,
      }).then((res) => {
        console.log('success')
        console.log(res.data);
        props.loginsuccess(res);
      }).catch((error) => {
        console.log(error);
        settext(error.response.data.msg);
        setretry(retry-1);
      setModalVisible(true);
        setloading(false);
        
      })
    
    }
    
    
    
   
  }

  return (
    <>
    <ActivityIndicator visible={loading} />
    <AppModal modalVisible={modalVisible} setModalVisible={setModalVisible} text={text}/>
    <Screen style={styles.container}>

      {
       retry<5 && data.login ?  <Text style={styles.retry}>
        {retry} retries left!
      </Text> : null
      }
     
      <Form
        initialValues={{ otp:"" }}
        onSubmit={submitform}
        validationSchema={validationSchema}
      >

    
      
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="numeric"
          keyboardType="numeric"
          name="otp"
          placeholder="OTP"
          
        />
       
        <SubmitButton title="Verify" />
      </Form>
    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex:1,
    justifyContent:'center'
  },
  retry:{
    color:Colors.error,
    width:'100%',
    textAlign:'center'
    
  }
});



const mapDispatchToProps = (dispatch) => {
  return {
   
    success: (res) => dispatch({  type: SIGNUP_SUCCESS,
      payload: res.data }),
    fail: () => dispatch({ type: SIGNUP_FAIL }),

    loginsuccess: (res) => dispatch({  type: LOGIN_SUCCESS,
      payload: res.data }),
    loginfail: () => dispatch({ type: LOGIN_FAIL })
    
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyScreen);
