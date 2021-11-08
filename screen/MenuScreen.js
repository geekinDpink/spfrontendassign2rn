import React,{useState} from 'react';
import { View, Text, StyleSheet, FlatList, Modal } from 'react-native';
import { Card, ListItem, Button, Icon, CheckBox } from 'react-native-elements'
import ModalItemDetailScreen from './modalScreen/ModalItemDetailScreen';
import ModalMyCartScreen from './modalScreen/ModalMyCartScreen';


export default function MenuScreen() {

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

      /*
      function ModalMyCartScreen({myCartModalVisible,myCartModalHandler,cartItems, cartMinusItemButtonHandler, cartAddItemButtonHandler}){

        return(
          <Modal
          animationType="slide"
          transparent={false}
          visible={myCartModalVisible}>
          <Text>My Cart</Text>
          <View>
          {
            cartItems.map((myItem)=>{
            //console.log("Item in Cart:"+JSON.stringify(myItem));
           
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
        
      }*/
    
      return (
        <View style={styles.container}>
          <ModalItemDetailScreen item={itemDetail} modalVisible={modalVisible} modalHandler={modalHandler} onAddToCart={onAddToCart}/>
              
          <View style={styles.headerContainer}>
            <Card containerStyle={{backgroundColor:'#fff8dc'}}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:2}}>
                  <Card.Title style={{textAlign:"left"}}>My Cart:</Card.Title>
                  {
                    //useEffect(()=>{
                    cartItems.map((myItem)=>{
                    //console.log("Item in Cart:"+myItem.name);
                    console.log("Item in Cart:"+JSON.stringify(myItem));
                    return(<Text style={{fontSize:12}} key={myItem.key}>{myItem.name}x{myItem.qty}</Text>)  
                    })
                    //})
                  }
                </View>
                <View style={{flex:1}}>
                  <Button
                      icon={{name:"shopping-basket",size: 20, type:"material", color: "black"}}
                      buttonStyle={{height:40, backgroundColor:'#2e8b57'}}
                      title='Check-out'
                      onPress={()=> setMyCartModalVisible(true)}
                  />
                </View>
              </View>
            </Card>
          </View>
              
              <View style={styles.listContainer}>
              <FlatList
                data = {food}
                renderItem = {({item}) => (
                  <Card containerStyle={{flex:1}} key={item.key}>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Image source={item.image} containerStyle={{height:160}}></Card.Image>
                  <Card.Divider/>
                    <View style={{flexDirection: 'row', marginBottom: 5, flex:1}}>
                      <View style={{flex:1}}>
                      <Text>{item.description}</Text>
                      <Text>${item.price}</Text>
                      </View>
                    <View style={{flex:1}}>
                      <Button
                        icon={{name:"read-more",size: 20, type:"material", color: "black"}}
                        buttonStyle={{height:35, width:180}}
                        title='See Item'
                        onPress={()=>{
                          setModalVisible(true);
                          setItemDetail(item);
                        }}
                        />
                    </View>
                    </View>
                </Card>
                )}
              />
              </View>
              <ModalMyCartScreen myCartModalVisible={myCartModalVisible} myCartModalHandler={myCartModalHandler} cartItems={cartItems} cartMinusItemButtonHandler={cartMinusItemButtonHandler} cartAddItemButtonHandler={cartAddItemButtonHandler}/>
        </View>
      );
    }

    const styles = StyleSheet.create({
      container:{
        flex:1,
        flexDirection: "column"
      },
      headerContainer:{
        flex:1
      },
      listContainer:{
        flex:5
      },

    });