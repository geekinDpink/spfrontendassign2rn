import React,{useState} from 'react';
import { SafeAreaView,View, Text, SectionList, StyleSheet, FlatList, Modal,ImageBackground, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon, CheckBox } from 'react-native-elements';

export default function HomeScreen() {

  const highlights = [
    {key: '1', promo:'Ala Carte Special', description:'15% off total bill!', image:require("./photos/carou1.jpg")},
    {key: '2', promo:'Salmon Sashimi', description:'2-for-1', image:require("./photos/carou2.jpg")},
    {key: '3', promo:'New Item', description:'Appanyaki ', image:require("./photos/carou3.jpg")},
    {key: '4', promo:'Happy Hours!', description:'15% off sake', image:require("./photos/front.jpg")}
  ];


    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <ImageBackground source={require("./photos/banner.jpg")} resizeMode="cover" style={styles.image}>
          <Text style={styles.text}>Welcome to Bakudo Sushi House</Text>
        </ImageBackground>        
        </View>

        <View style={{flex:0.40}}>
          <Text style={{fontSize: 25,  fontWeight: 'bold', paddingLeft:10, marginTop:10}}>Special Promotions</Text>
          <FlatList 
          horizontal
          showsHorizontalScrollIndicator = {false}
          data={highlights}
          renderItem={({item}) => {return(
              <Card containerStyle={{marginTop:0, marginHorizontal:8}}>
                <Text>{item.promo.toString()}</Text>
                <Card.Image containerStyle={{width:100, height:50}} source={item.image}></Card.Image>
                <Text>{item.description}</Text>
              </Card>
            )}}
          />
        </View>


        <ScrollView style={{flex:0.40, paddingHorizontal: 5}}>
        <Text style={{fontSize: 25,  fontWeight: 'bold', paddingLeft:16, marginTop:25}}>Newsfeed</Text>
          <Card>
            <Card.Image source={require("./photos/aboutus.jpg")} />
            <Text>It all started with Chef Glenn San under apprenticeship of his sushi master, 
              Master Chef Nakata, in Tokyo, rising to ....Click to view more</Text>
          </Card>
          <Card>
            <Card.Image source={require("./photos/seafoodMarket.jpg")} />
            <Text>Hear Chef Glenn San share on where he procure his ingredient.
              From wild seafood from Tokyo seafood market to vegetables and wasabi 
              from fertilised by mineral rich Mount Fuji volcanic ashes ....Click to view more</Text>
          </Card>
          <Card>
            <Card.Image source={require("./photos/chef.jpg")} />
            <Text>It all started with Chef Glenn San under apprenticeship of his sushi master, 
              Master Chef Nakata, in Tokyo, rising to ....Click to view more</Text>
          </Card>

        </ScrollView>

      </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 0.20,
      paddingHorizontal: 10
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "yellow",
      fontSize: 42,
      lineHeight: 40,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    }
  });