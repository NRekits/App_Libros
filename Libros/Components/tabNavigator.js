import React from "react";

import { View, Picker, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Footer,
  FooterTab
} from "native-base"; //Estos son los elementos que habrá en la pantalla

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";

//pantallas

export default class TabNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id:''
    };
  }

  componentDidMount() {
    /*console.log(this.props.Id)
    this.setState({ id: this.props.Id });*/
  }

  goPerfil = () => {
    this.props.navigation.navigate("Perfil");
  }

  render() {
    return (
      <Container style={styles.Container}>

        <Footer>
          <FooterTab style={{ backgroundColor: "#FFF" }}>
            <Button style={styles.Button} onPress={()=>{
                  this.props.navigation.navigate("Perfil");
            }}>
              <Ionicons name="person" size={30} />
            </Button>
            <Button active style={styles.Button} onPress={this.goPerfil}>
              <Ionicons name="cart" size={30} />
            </Button>
            <Button style={styles.Button} onPress={this.goLista}>
              <Icon name="heart" size={30} />
            </Button>
            <Button style={styles.Button} onPress={this.goLista}>
              <Icon name="heart-o" size={30} />
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
    flexDirection: "column",
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
    fontFamily: "Dosis",
    backgroundColor: "white",
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
});
