/*mostrar los libros que el usuario ha agregado a su carrito*/
/*dar la opcion de aumentar el numero por ejemplar pedido*/
/*al presionar cualquiera de los productos en el carrito debe de llevar a los detalles del producto*/
import React, { Component, useState } from "react";
import { Text, Dimensions, Alert, Image, StyleSheet, SafeAreaView } from "react-native";
import { Container, Header, Content, Form, Item, Input,
  Label,
  Button,
  H1,
  View,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Card,
  CardItem,
  Title,
} from "native-base";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const productos = [{
  title: 'El viaje al centro de la tierra', 
  price: 299.00,
  cant: 1
  },
  {
    title: 'The Lord of the Rings', 
    price: 499.00,
    cant: 1
  },
  {
    title: 'The Hobbit', 
    price: 459.43,
    cant: 2
  }
];

class CarritoScreen extends Component{


  render_item = ({item}) => (
    <Card>
      <CardItem>
        <Text>{item.title}</Text>
      </CardItem>
    </Card>);

  render(){
    return(
      <Container>
        <Header
        transparent
        androidStatusBarColor="#C0FFC0"
        style={styles.Header}>
          <Left></Left>
          <Body>
            <Title style={styles.Header}> CARRITO </Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Card>
            <SafeAreaView style={{ flex: 1 }}>
              <List
                dataArray={productos}
                renderRow={(item) => (
                  <ListItem
                    button
                  >
                    <Image source={require('../../assets/libro.png')} style={styles.Image}/>
                    <Text style={styles.Text2}>
                      {item.title}
                    </Text>
                    <Text style={styles.Text3}>
                      {item.price}
                    </Text>
                    <View>
                      <Button>-</Button>
                      <Input/>
                      <Button>+</Button>
                    </View>
                  </ListItem>
                )}    
              />
            </SafeAreaView>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: 'flex-start',
    fontFamily: "Dosis",
    color: "white",
  },

  Text2: {
    alignSelf: 'flex-start',
    fontSize: 18,
    color: "black",
    fontFamily: "Dosis",
  },
  Text3: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
    fontSize: 20,
    color: "black",
    fontFamily: "Dosis",
  },

  Button: {
    alignSelf: "center",
    backgroundColor: "#BB8FCE",
    fontFamily: "Dosis",
    fontWeight: "400",
  },
  
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  Button: {
    alignSelf: "flex-end",
    fontFamily: "Dosis",
    backgroundColor: "white",
    fontWeight: "400",
  },
  Header: {
    fontFamily: "Dosis",
    color: "black",
    fontSize: 40,
    fontWeight: "600",
    alignSelf: "center",
  },
  Image: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 60, 
    height: 60
  }
});

export default CarritoScreen;