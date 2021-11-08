import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Modal } from 'react-native';
import { Card, ListItem, Button, Icon, CheckBox } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ModalItemDetailScreen from './screen/ModalItemDetailScreen';
import HomeScreen from './screen/HomeScreen';




function MenuScreen() {

  const food = [
    {key: '1', name: 'Hamachi (Yellowtail) Sashimi ', price: '1.50', description:'Yellowtail from Osaka' ,image: require("./photos/yellowtail.jpg")},
    {key: '2', name: 'Salmon Sashimi', price: '2.00', description:'Premium salmon from Atlanta', image: require("./photos/salmon.jpg")},
    {key: '3', name: 'Maguro (Tuna) Sashimi', price: '2.50', description:'Tuna from Pacific Ocean', image: require("./photos/tuna.jpg")},
    {key: '4', name: 'Kajiki (Swordfish Belly) Sashimi', price: '3.00', description:'Swordfish from Pacific Ocean', image: require("./photos/swordfish.jpg")},
    {key: '5', name: 'Ikura Salmon Roe', price: '3.50', description:'Salmon roe freshly harvested', image: require("./photos/roe.jpg")},
  ];

  const [cartItems, setCartItems] = useState([]);
  const [itemDetail, setItemDetail] = useState([]);
  

  /*
  const [foods, setTodos] = useState([
    {key: '1', name: 'Hamachi (Yellowtail) Sashimi ', price: '1.50', image: './photos/yellowtail.jpg'},
    {key: '2', name: 'Salmon Sashimi', price: '2.00', image: './photos/salmon.jpg'},
    {key: '3', name: 'Maguro (Tuna) Sashimi', price: '2.50', image: './photos/tuna.jpg'},
    {key: '4', name: 'Kajiki (Swordfish Belly) Sashimi', price: '3.00', image: './photos/swordfish.jpg'},
    {key: '5', name: 'Ikura Salmon Roe', price: '3.50', image: './photos/roe.jpg'},
  ]);
  */

  //name, price, side(white radish,), soup, wasabi, additional instructions
  //const [cartItems, setCartItems] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [myCartModalVisible, setMyCartModalVisible] = useState(false);


  const modalHandler = () => {
    setModalVisible(()=>setModalVisible(false));
  };

  const myCartModalHandler = () => {
    setMyCartModalVisible(()=>setMyCartModalVisible(false));
  };
  
  const onAddToCart = (item) => {
    const exist = cartItems.find((element) => element.key === item.key);
    if (exist) {
        setCartItems(
            cartItems.map((element) =>
                element.key === item.key ? { ...exist, qty: parseInt(exist.qty) + parseInt(item.qty) } : element
            )
        );
    }
    else {
        setCartItems([...cartItems, { ...item, qty: parseInt(item.qty)}]);
    }
  };

  const cartAddItemButtonHandler = (item) => {
    const exist = cartItems.find((element) => element.key === item.key);
    if (exist) {
        setCartItems(
            cartItems.map((element) =>
                element.key === item.key ? { ...exist, qty: parseInt(exist.qty) + 1} : element
            )
        );
    }
    else {
        setCartItems([...cartItems, { ...item, qty: parseInt(item.qty)}]);
    }
  };

  const cartMinusItemButtonHandler = (item) => {
    const exist = cartItems.find((element) => element.id === item.id);
    if (exist.qty > 1) {
        setCartItems
        (
            cartItems.map((element) =>
                element.id === item.id ? { ...exist, qty: parseInt(exist.qty) - 1 } : element
            )
        );}
        else {
            setCartItems(cartItems.filter((element) => element.id !== item.id));
        }
    };

  function ModalMyCartScreen({myCartModalVisible,myCartModalHandler,cartItems, cartMinusItemButtonHandler, cartAddItemButtonHandler}){

    return(
      <Modal
      animationType="slide"
      transparent={false}
      visible={myCartModalVisible} >
      <Text>My Cart</Text>
      <View>
      {
        cartItems.map((myItem)=>{
        //console.log("Item in Cart:"+JSON.stringify(myItem));
        /*Quantity:{myItem.qty}
        Price:{myItem.price}
        Type of Soup:{myItem.soup}
        Garnish:{myItem.cucumber}{myItem.shio}{myItem.radish}
        Customer Remark:{myItem.custRemarks}
        */
        return(
          <View>
          <Text key={myItem.key}>
          Food Item:{myItem.name} {'\n'}
          Quantity:{myItem.qty} {'\n'}
          Price:{myItem.price} {'\n'}
          Type of Soup:{myItem.soup} {'\n'}
          Garnish:{'\n'}
          {myItem.cucumber? myItem.cucumber+" ":""}{myItem.shiso ? myItem.shiso+" ":""}{myItem.radish ? myItem.radish :""} {'\n'}
          Customer Remark:{myItem.custRemarks} {'\n'}
          </Text>
          <Button onPress={()=>cartAddItemButtonHandler(myItem)} />
          <Text>{myItem.qty}</Text>
          <Button onPress={()=>cartMinusItemButtonHandler(myItem)} />
          </View>
          );
        })
      }
      </View>

      <Button icon={{name:"payment",size: 30, type:"material", color: "black"}} onPress={()=>myCartModalHandler()} title="Checkout"/>
    </Modal>
    );
    
  }
  
 
  
  return (
    <View>
          <ModalItemDetailScreen item={itemDetail} modalVisible={modalVisible} modalHandler={modalHandler} onAddToCart={onAddToCart}/>
          
          <Card>
            <Text>My Cart:</Text>
          {
            //useEffect(()=>{
              cartItems.map((myItem)=>{
                //console.log("Item in Cart:"+myItem.name);
                console.log("Item in Cart:"+JSON.stringify(myItem));
                return(<Text key={myItem.key}>{myItem.name}</Text>)
                
              })
            //})
          }
          <Button
            icon={{name:"shopping-basket",size: 30, type:"material", color: "black"}}
            buttonStyle={{flex:1, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
            title='View Cart'
            onPress={()=> setMyCartModalVisible(true)}
          />
          </Card>
                 
          
          <FlatList
            data = {food}
            renderItem = {({item}) => (
              <Card>
              <Card.Title>{item.name}</Card.Title>
              <Card.Image source={item.image}></Card.Image>
              <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                Price: ${item.price}
                </Text>
                <Button
                  icon={{name:"read-more",size: 30, type:"material", color: "black"}}
                  buttonStyle={{flex:1, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='See Item'
                  onPress={()=>{
                    setModalVisible(true);
                    setItemDetail(item);
                  }}
                  />


            </Card>
            )}
          />

          <ModalMyCartScreen myCartModalVisible={myCartModalVisible} myCartModalHandler={myCartModalHandler} cartItems={cartItems} cartMinusItemButtonHandler={cartMinusItemButtonHandler} cartAddItemButtonHandler={cartAddItemButtonHandler}/>
    </View>
  );
}




function ContactScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Contact Screen</Text>
    </View>
  );
}

/*
const Stack = createNativeStackNavigator();
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>



  <Button
    icon={<Icon name='code' color='#ffffff' />}
    buttonStyle={{flex:1, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='Add to Cart'
    onPress={()=> setModalVisible(true)}
  />
*/


const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
        <Tab.Screen name="Contact" component={ContactScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}




export default App;