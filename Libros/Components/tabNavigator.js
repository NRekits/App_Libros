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
  FooterTab,
  Icon,
  Input,
  Item,
  Label,
  Text,
  Title,
  Left,
  Right,
  Body,
} from "native-base"; //Estos son los elementos que habrá en la pantalla

import Ionicons from "react-native-vector-icons/Ionicons";
//Fuente
import * as Font from "expo-font";
//pantallas
import PerfilScreen from "../Views/Usuario/PerfilS";

const Tab = createBottomTabNavigator();

class TabNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    }).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
      <Container>
    
        <Footer>
          <FooterTab>
            <Button style={styles.Button} onPress={this.goEstado}>
            <Ionicons name='person'/>
            </Button>
            <Button active style={styles.Button} onPress={this.goPerfil}>
              <Icon name="person" />
            </Button>
            <Button style={styles.Button} onPress={this.goLista}>
              <Icon name="flame" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default TabNav;
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
  Header: {
    color: "#C4EFFF",
    fontFamily: "Dosis",
    fontSize: 40,
    fontWeight: "600",
    alignSelf: "center",
  },
});
