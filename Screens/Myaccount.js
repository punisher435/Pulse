import React,{useState} from "react";
import { StyleSheet,View,Image } from "react-native";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton,FormPicker as Picker } from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import ActivityIndicator from "../components/Loading";
import AppModal from '../components/AppModal'
import {updateprofile} from '../api/profile';
import { UPDATE_USER } from "../redux/actiontypes/authactiontypes";



const validationSchema = Yup.object().shape({
  
  name: Yup.string().required(),
  image: Yup.array().max(1, "Please select only one image."),

});



function Myaccount({user,token,dispatch}) {
  const navigation = useNavigation();

  const [loading,setloading] =useState(false);
  const [modalVisible,setModalVisible] =useState(false);
  const [text,settext] =useState('');

  const submitform = async ({name,image}) => {
    setloading(true);
    
    let formData=new FormData();
    formData.append('name',name);
    if(image[0])
    {formData.append('image',{
      name: "image" + 0+'.jpeg',
      type: "image/jpeg",
      uri: image[0],
    });}
    
    try {
       
        const res = await updateprofile(token,formData);
      console.log('success')
      console.log(res.data);
      dispatch({
        type: UPDATE_USER,
        payload:{user:res.data,token:token},
    });
      
      setloading(false);
      
     
     
    } catch (error) {
      setloading(false);
      settext(error.response.data.msg);
      setModalVisible(true);
    }
   
  }
  


if(user)

{
  console.log(user);
  return (
    <>
    <ActivityIndicator visible={loading} />
    <AppModal modalVisible={modalVisible} setModalVisible={setModalVisible} text={text}/>
    <Screen style={styles.container}>
    <View style={styles.imgcontainer}><Image style={styles.image} source={ user.img ? {uri:user.img} : require('../assets/user.png')} />
    </View>
      <Form
        initialValues={{ name:user.name,image:[] }}
        onSubmit={submitform}
        validationSchema={validationSchema}
      >

<FormImagePicker name="image" />
      
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          keyboardType="default"
          name="name"
          placeholder="Name"
          
        />
       
        <SubmitButton title="Submit" />
      </Form>
    </Screen>
    </>
  );}
  else{
    return <View></View>
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
   
  },
  image:{
    width:150,
    height:150,
    borderRadius:50,
   
},
imgcontainer: {
   
   
    alignItems:'center',
  },
});


const mapStateToProps = state => ({
    token: state.authreducers.token,
    user: state.authreducers.user,
})

export default connect(mapStateToProps, )(Myaccount);
