import React,{useState} from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton,FormPicker as Picker } from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import ActivityIndicator from "../components/Loading";

import { sendotp } from '../redux/actions/authactions';
import AppModal from '../components/AppModal'


const validationSchema = Yup.object().shape({
  
  phone: Yup.string().required().min(10).max(10).label("Phone"),
  country_code: Yup.object().required().nullable().label("Country code"),
});

const codes = [
  {
    backgroundColor: "#fc5c65",
    icon: "phone",
    label: "India +91",
    value: "+91",
  },
  
];

function RegisterScreen({sendotp}) {
  const navigation = useNavigation();

  const [loading,setloading] =useState(false);
  const [modalVisible,setModalVisible] =useState(false);
  const [text,settext] =useState('');

  const submitform = async ({phone,country_code}) => {
    setloading(true);
    console.log(phone);
    console.log(country_code.value);
    
    try {
      const res = await sendotp({
        phone,country_code:country_code.value,
      })
      console.log('success')
      console.log(res.data);
      
     
      navigation.navigate('Verify',{
        signup:true,
        data:res.data,
        login:false,
      });
    } catch (error) {
      setloading(false);
      settext(error.response.data.msg);
      setModalVisible(true);
    }
   
  }
  



  return (
    <>
    <ActivityIndicator visible={loading} />
    <AppModal modalVisible={modalVisible} setModalVisible={setModalVisible} text={text}/>
    <Screen style={styles.container}>
      
      <Form
        initialValues={{ phone:"",country_code:{
          backgroundColor: "#fc5c65",
          icon: "floor-lamp",
          label: "India +91",
          value: "+91",
        }, }}
        onSubmit={submitform}
        validationSchema={validationSchema}
      >

      <Picker
          items={codes}
          name="country_code"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Country code"
          width="50%"
        />
      
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          keyboardType="numeric"
          name="phone"
          placeholder="Phone"
          
        />
       
        <SubmitButton title="Register" />
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
});


const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
})

export default connect(mapStateToProps, { sendotp })(RegisterScreen);
