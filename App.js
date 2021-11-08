import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Modal } from 'react-native';
import { Card, ListItem, Button, Icon, CheckBox } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ModalItemDetailScreen from './screen/modalScreen/ModalItemDetailScreen';
import HomeScreen from './screen/HomeScreen';
import MenuScreen from './screen/MenuScreen';
import ContactScreen from './screen/ContactScreen';



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
        <Tab.Screen name="Home" component={HomeScreen} options={
          {tabBarIcon:()=>(
         <Icon
            name='home'
            type='material'
            />
        ),
          headerStyle: {
            backgroundColor: '#add8e6',
          }}
        } />
        <Tab.Screen name="Menu" component={MenuScreen} options={
          {tabBarIcon:()=>(
         <Icon
            name='restaurant-menu'
            type='material'
            />
        ),
        headerStyle: {
          backgroundColor: '#add8e6',
        }}
        } />
        <Tab.Screen name="Order History" component={ContactScreen} options={{tabBarIcon:()=>(
         <Icon
            name='receipt'
            type='material'
            />
        ),
        headerStyle: {
          backgroundColor: '#add8e6',
        }}
        } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}




export default App;