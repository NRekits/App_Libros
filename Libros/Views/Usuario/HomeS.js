/*Se mostraran los libros más vendidos y las novedades */

import React from "react";
import { Text, Dimensions, Alert, Image, StyleSheet } from "react-native";
import { Container, Header, Content, Form, Item, Input,
  Label,
  Button,
  H1
} from "native-base";
import * as SecureStore from "expo-secure-store";
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
    }

    render(){
    return(
        <Container>

            <Text style={{marginTop:30}}>{this.state.id}</Text>
           
        </Container>
    );
 }
}