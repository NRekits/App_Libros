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
  Icon,
  Text,
  Item,
  Toast,
  Footer,
  FooterTab,
} from "native-base";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';
import TabNav from '../../Components/tabNavigator'




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
              <Icon name="home" style={{ color: "white" }} />
            </Left>
            <Body>
              <Title style={styles.Header}> HOME </Title>
            </Body>
            <Right
            //Poner ruta a log-out
            >
              
            </Right>
          </Header>
          <TabNav/>
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
  Header: {
    color: "#C4EFFF",
    fontFamily: "Dosis",
    fontSize: 40,
    fontWeight: "600",
    alignSelf: "center",
  },
});
