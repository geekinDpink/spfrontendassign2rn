import React,{useEffect, useState} from 'react';
import { TextInput, View, Text, Modal,StyleSheet } from 'react-native';
import { Button, CheckBox, Image, Icon } from 'react-native-elements'
import { Formik } from 'formik';


export default function ModalItemDetailScreen({item, modalVisible, modalHandler,onAddToCart}) {

    const [soupChecked, toggleSoupChecked] = useState(false);
    const [radishChecked, toggleRadishChecked] = useState(false);
    const [cucumberChecked, toggleCucumberChecked] = useState(false);
    const [shisoChecked, toggleShisoChecked] = useState(false);
    const [quantity, changeQty] = useState(1);




    //photo folder is one folder above
    const imageurl ="."&&item.image;

  
    return (
    <Modal
      style={styles.modalContent}
      animationType="slide"
      transparent={false}
      visible={modalVisible}
    >
    <View style={{flex: 1}}>
        <Text style={styles.header}>{item.name}</Text>
        <View style={styles.imageContainer}>
        <Image source={imageurl} style={{ width: 300, height: 200}}/>
        </View>

        <View style={styles.detailsContainer}>
        <Text style={{fontSize:15}}>{item.description}</Text>
        <Text style={{fontSize:15, fontWeight:'bold', alignItems:'stretch'}}>${item.price}</Text>
       

        <Formik
        initialValues={{ key:item.key, name:item.name, soup:'', radish:'', cucumber:'', shiso:'', custRemarks: '', price:item.price ,qty:'1'}}
        onSubmit={values => console.log(values)}
    >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>

            <Text style={styles.subHeader}>Soup</Text>
            <View style={{flexDirection:'row'}}>  
            <CheckBox
            title='Miso Soup'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            containerStyle={{width:170}}
            checked={!soupChecked ? true : false}
            onPress={() => {!soupChecked ? toggleSoupChecked(true) : toggleSoupChecked(false)}} />
    
            <CheckBox
            title='Truffles Crab Soup'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            containerStyle={{width:170}}
            checked={soupChecked}
            value={soupChecked==true ? values.soup="Truffle crab soup" : values.soup="Miso soup"}
            onPress={() => {!soupChecked ? toggleSoupChecked(true) : toggleSoupChecked(false)}} />
            </View>

            <Text style={styles.subHeader}>Ornamental Garnish</Text>
            <View style={{rlex:'1', flexDirection:'row'}}>
            <CheckBox
            title='Raddish'
            checked={radishChecked}
            containerStyle={{width:100}}
            value={radishChecked==true ? values.radish="Raddish" : values.radish=""}
            onPress={() => {!radishChecked ? toggleRadishChecked(true) : toggleRadishChecked(false)}} />

            <CheckBox
            title='Cucumber'
            checked={cucumberChecked}
            containerStyle={{width:120}}
            value={cucumberChecked==true ? values.cucumber="Cucumber" : values.cucumber=""}
            onPress={() => {!cucumberChecked ? toggleCucumberChecked(true) : toggleCucumberChecked(false)}} />

            <CheckBox
            title='Shiso/Mint'
            checked={shisoChecked}
            containerStyle={{width:120}}
            value={shisoChecked==true ? values.shiso="Shiso Leaf" : values.shiso=""}
            onPress={() => {!shisoChecked ? toggleShisoChecked(true) : toggleShisoChecked(false)}} />
            </View>


            <Text style={styles.subHeader}>Additional Request/Remarks from Customer</Text>
            <TextInput
            onChangeText={handleChange('custRemarks')}
            onBlur={handleBlur('custRemarks')}
            value={values.custRemarks}
            style={{borderColor:'#000', borderWidth:1}}
            />


            <View style={{flexDirection:'row', justifyContent:'center', marginTop:15}}>  
            <Button title="+"
              containerStyle={{width:40,}}
              onPress={() => {
              changeQty((parseInt(quantity)+1).toString());
            }}/>
            <TextInput
                onChangeText={handleChange('qty')}
                onBlur={handleBlur('qty')}
                value={values.qty = quantity.toString()}/>
            <Button title="-"
              containerStyle={{width:40}}
              onPress={() => {
                changeQty((parseInt(quantity)-1).toString());
            }}/>
            </View>
            <Button onPress={() => {
                handleSubmit();
                onAddToCart(values);
                modalHandler();
            }} 
            title="Add to Cart"
            icon={{name:"add-shopping-cart",size: 30, type:"material", color: "black"}}
            />
        </View>
        )}
        </Formik>

        </View>

  

      </View>
    </Modal>
    );
  }

const styles = StyleSheet.create({
  modalContent:{
    flex:1
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize:25,
    fontWeight:'bold'
  },
  imageContainer: {
    flex: 0.30,
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.7,
    backgroundColor: '#F1F1F1',
    marginHorizontal: 8,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 20,
    paddingTop: 20,
    fontSize:15
  },
  subHeader:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:10
  }

});

const COLORS = {
  white: '#fff',
  dark: '#000',
  red: '#F52A2A',
  light: '#F1F1F1',
  green: '#00B761',
};

/*
        <Button
            onPress={() => modalHandler()}
            title="Back"
        />

        <Text>Soup Check:{soupChecked.toString()}</Text>
*/