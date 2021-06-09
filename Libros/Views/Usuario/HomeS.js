/*Se mostraran los libros más vendidos y las novedades */

import React from "react";
import {  Dimensions, Alert, Image, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  Item,
  Toast,
  Footer,
  FooterTab,
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from "../../ip_address";

import { LinearGradient } from 'expo-linear-gradient';






const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class HomeScreen extends React.Component{
    //Constructor
    constructor(props) {
        super(props);
        this.state = {
          id: "",
        };
        
      }
    //Montar
 componentDidMount() {
        this.setState({ id: this.props.route.params.id})
        console.log(this.state.id)
    }

    render(){
    return(
        <Container>
      
          <Header
            transparent
            androidStatusBarColor="#C0FFC0"
            style={styles.Header}
          >
            <Left>
            <Button transparent style={styles.Button} onPress={this.goLista}>
              <Icon name="search" size={30} />
            </Button>
            </Left>
            <Body>
              <Title style={styles.Header}> HOME </Title>
            </Body>
            <Right
            //Poner ruta a log-out
            >
              
            </Right>
          </Header>
          <Content/>
          <Footer>
          <FooterTab style={{ backgroundColor: "#FFF" }}>
            <Button style={styles.Button} onPress={()=>{
                  this.props.navigation.navigate("Perfil",{id:this.state.id});
            }}>
              <Icon name="user-circle-o" size={30} />
            </Button>
            <Button  style={styles.Button} onPress={ ()=>{
              this.props.navigation.navigate("Carrito",{id:this.state.id})}
              }>
              <Ionicons name="cart" size={30} />
            </Button>
            <Button active style={styles.Button} onPress={this.goPerfil}>
              <Icon name="home" size={30} />
            </Button>
            <Button  style={styles.Button} onPress={this.goPerfil}>
              <Icon name="list-ul" size={30} />
            </Button>
            <Button style={styles.Button} onPress={this.goLista}>
              <Icon name="heart" size={30} />
            </Button>

          </FooterTab>
        </Footer>
         
        </Container>
    );
 }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "stretch",
    justifyContent: "center",
    fontFamily: "Dosis",
    color: "white",
  },
  Text2: {
    fontWeight: "300",
    fontSize: 15,
    color: "white",
    fontFamily: "Dosis",
  },
  Text3: {
    marginTop: 10,
    fontSize: 15,
    color: "#C4EFFF",
    marginLeft: 5,
    fontFamily: "Dosis",
  },
  Button: {
    alignSelf: "center",
    backgroundColor: '#BB8FCE',
    fontFamily: 'Dosis',
    fontWeight: "400",
  },
  Item: {
    padding: 5,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  Button: {
    alignSelf: "center",
    fontFamily: "Dosis",
    backgroundColor: "white",
    fontWeight: "400",
  },
  Header: {
    fontFamily: "Dosis",
    color:'black',
    fontSize: 40,
    fontWeight: "600",
    alignSelf: "center",
  },
});
