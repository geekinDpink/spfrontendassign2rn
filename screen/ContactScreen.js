
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TextInput, Modal, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon, CheckBox } from 'react-native-elements'


export default function ContactScreen() {
 
  const [name, setName] = useState();
  const [qty, setQty] = useState();
  const [price, setPrice] = useState();


  const setNameHandler = (val) => {
    setName(val);
}

  const setQtyHandler = (val) => {
    setQty(val);
  }

  const setPriceHandler = (val) => {
    setPrice(val);
}

  useEffect(() => {
    getData();
    }, []);
  /*
const getData = () => {
  try {
    var value = JSON.parse(AsyncStorage.getItem('my_order'));
    console.log(value);
    return(value);

    }
  catch(e) {
    console.log("error reading database")
  }
}
*/
const getData = () => {
  try {
      AsyncStorage.getItem('myOrderData')
          .then(value => {
              if (value != null) {
                  let item = JSON.parse(value);
                  console.log("Value is"+value.name+"Parse value is"+item.name);
                  setNameHandler(item.name);
                  setQtyHandler(item.qty);
                  setPriceHandler(item.price);
                  console.log("state value is:"+name);
              }
          })
  } catch (error) {
      console.log(error);
  }
}



  return (
    <View>
        <Card containerStyle={{marginBottom:15}}>
          <Card.Title>Last Order Item from Database</Card.Title>
          <Text>Item:{name}</Text>
          <Text>Quantity:{qty}</Text>
          <Text>Price:{price}</Text>
        </Card>
        <Button title="Get Last Order" onPress={()=> 
          {
            getData();
          }}/>

    </View>
  );
};

