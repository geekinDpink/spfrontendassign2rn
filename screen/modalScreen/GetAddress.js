import React, {useState} from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Card, ListItem, Button, CheckBox } from 'react-native-elements'



const ContactScreen = () => {

  const [myAddress, setAddress] = useState([]);
  const [myPostalCode, setPostalCode] = useState([]);


  async function getAddress(postalCode) {

    var genURL = "https://developers.onemap.sg/commonapi/search?searchVal=" + postalCode + "&returnGeom=N&getAddrDetails=Y&pageNum=1";
    var response = await fetch(genURL);
    var data = await response.json();
    var address = data.results[0].ADDRESS;
  
    setAddress(address);
  
    /* From oneMap Development guide
    $.ajax({
    url: genURL,
    success: function(result){
        //Set result to a variable for writing
        var TrueResult = JSON.stringify(result.ADDRESS);
        }});
  
        return (TrueResult);
    }
    */
    console.log(myAddress);
    return address;
  }

  return (
    <View>
      <Text>Postal Code:{myPostalCode}</Text>
      <TextInput
      onChangeText={text => setPostalCode(text)}
      value={myPostalCode.toString()}
      keyboardType ="number-pad"/>
      <Button onPress={()=>getAddress(myPostalCode)}></Button>
      <Text>Address:{myAddress}</Text>
    </View>



    
  );
};


export default ContactScreen;