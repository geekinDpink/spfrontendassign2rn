import React,{useState} from 'react';
import { View, Text, StyleSheet, TextInput, Modal, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon, CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalMyCartScreen({myCartModalVisible,myCartModalHandler,cartItems, cartMinusItemButtonHandler, cartAddItemButtonHandler}){

  var totalprice = 0;
  const [myAddress, setAddress] = useState([]);
  const [myPostalCode, setPostalCode] = useState([]);

  async function getAddress(postalCode) {

    var genURL = "https://developers.onemap.sg/commonapi/search?searchVal=" + postalCode + "&returnGeom=N&getAddrDetails=Y&pageNum=1";
    var response = await fetch(genURL);
    var data = await response.json();
    var address = data.results[0].ADDRESS;
  
    setAddress(address);  
    return address;
  }

  const storeData = (cartItems) => {
    var x = 0;
    try {
      cartItems.map((myItem)=>{
        const jsonValue = JSON.stringify(myItem);
        console.log(x+"JSon value is:"+jsonValue);
        if(x <1)
        {
          x = 1;
          AsyncStorage.setItem('myOrderData', jsonValue);
          console.log("save to database");
        }
        else{
          AsyncStorage.mergeItem('myOrderData', jsonValue);
          console.log("merge to database");

        }
      });
    } catch (e) {
      console.log("error saving to database");

    }
  }



    return(
      <Modal
      animationType="slide"
      transparent={false}
      visible={myCartModalVisible}>

      <Text style={styles.title}>My Cart</Text>

      <Card containerStyle={{backgroundColor:'#fff8dc'}}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
              <Text style={{fontSize:15, marginBottom:3, fontWeight:'bold'}}>
                Your Postal Code
              </Text>
              <TextInput
                onChangeText={text => setPostalCode(text)}
                style={{
                fontSize:15,
                textAlign:'center',
                marginTop:0,
                width:100,
                height:40,
                borderBottomColor: '#000000',
                borderBottomWidth: 1}}
                value={myPostalCode.toString()}
                keyboardType ="number-pad"/>
            </View>
            <View style={{flex:1.5}}>
            <Button title="Find Address" onPress={()=>getAddress(myPostalCode)}></Button>
            <Text>Address:{myAddress}</Text>
            </View>

          </View>





      </Card>

      <ScrollView>
      {
        cartItems.map((myItem)=>{
        //console.log("Item in Cart:"+JSON.stringify(myItem));
        totalprice = (parseFloat(totalprice)+parseFloat(myItem.price*myItem.qty)).toString();
        return(

          <View key={myItem.key}>
          <Card>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:2}}>
                  <Text style={{fontWeight:"bold", fontSize:15}}>{myItem.name}</Text>
                  <Text>{myItem.soup}{myItem.cucumber ? ", "+myItem.cucumber+" ":""}{myItem.cucumber && myItem.shiso ? ",": ""}{!myItem.cucumber && myItem.shiso ? ",": ""}
                  {myItem.shiso ? myItem.shiso+" ":""}{myItem.shiso && myItem.radish ? ",": ""}{!myItem.shiso && myItem.cucumber && myItem.radish ? ",": ""}
                  {myItem.radish ? myItem.radish :""}</Text>
              </View>
              <View style={{flex:1}}>
              <Text style={{textAlign:"right"}}>${myItem.price}</Text>
              </View>
            </View>
            <Card.Divider />
            <Text>
            Remark:{myItem.custRemarks} {'\n'}
            </Text>
            <View style={{justifyContent:'center', flexDirection:'row'}}>
              <Button buttonStyle={{backgroundColor:'transparent'}} icon={{name:"remove-circle",size: 20, type:"material", color: "black"}} containerStyle={{width:45, height:40}} onPress={()=>cartMinusItemButtonHandler(myItem)} />              
              <Text style={{textAlignVertical:'center'}}>Quantity:{myItem.qty}</Text>
              <Button buttonStyle={{backgroundColor:'transparent'}} icon={{name:"add-circle",size: 20, type:"material", color: "black"}} containerStyle={{width:45, height:40}} onPress={()=>cartAddItemButtonHandler(myItem)} />
            </View>
          </Card>
          </View>
          );
        })
      }
      </ScrollView>
      <Button buttonStyle={{backgroundColor:'#2e8b57'}} icon={{name:"payment",size: 30, type:"material", color: "black"}} title={"Proceed to Payment of $"+totalprice} 
      onPress={()=>{
        storeData(cartItems);
        myCartModalHandler();}
        }/>
    </Modal>
    );
}

const styles = StyleSheet.create({
  title:{
    fontSize:25,
    fontWeight:'bold',
    fontStyle:'italic',
    marginLeft:20
  }
});