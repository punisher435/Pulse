import React,{useState} from "react";
import { StyleSheet,View } from "react-native";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton,FormPicker as Picker } from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import ActivityIndicator from "../components/Loading";
import AppModal from '../components/AppModal'
import { addcontact } from "../api/chats";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import Colors from "../config/colors";
import AppText from "../components/Text";


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

function AddContact({isAuthenticated,token}) {
  const navigation = useNavigation();

  const [loading,setloading] =useState(false);
  const [modalVisible,setModalVisible] =useState(false);
  const [text,settext] =useState('');

  const onAccount = () => {
    navigation.navigate("My account");
  }

  const submitform = async ({phone,country_code}) => {
    setloading(true);
    console.log(phone);
    console.log(country_code.value);
    
    try {
      const res = await addcontact({
        phone,country_code:country_code.value,token:token,
      })
      console.log('success')
      console.log(res.data);
      
      setloading(false);
      settext('Added');
      setModalVisible(true);
     
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
    <View style={styles.buttoncontainer}>
      
      <View style={styles.icon1}><IconButton name="account" onPress={onAccount} backgroundColor={Colors.theme}/></View>
      
    </View>
    <Screen style={styles.container}>
      <View style={styles.textcontainer}><AppText style={styles.text}>Add Contact</AppText></View>
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
       
        <SubmitButton title="Add" />
      </Form>
    </Screen>
    </>
  );
}


const styles = StyleSheet.create({
  buttoncontainer:{
    flexDirection:'row',
    padding:10,
    paddingLeft:40
  },
  container: {
    padding: 10,
    flex:1,
    justifyContent:'flex-start'
  },
  icon1:{
    paddingLeft:0,
    paddingRight:10,
  },
  icon2:{
    paddingLeft:10,
    paddingRight:0,
  },
  text:{
    fontWeight:'bold',
   
  },
  textcontainer:{
    alignItems:'center',
    paddingBottom:15,
  }

});


const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
    token:state.authreducers.token,
})

export default connect(mapStateToProps,)(AddContact);
