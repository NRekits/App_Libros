import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Title,
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right,
  Toast,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import IP_DB from "./../ip_address";
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      apellido:"",
      password: "",
      confirmPassword: "",
      error: false
    };
  }

  Register = () => {
    if (this.state.password === this.state.confirmPassword) {
      fetch(`http://${IP_DB}:3000/Usuario/Registro`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Nombre: this.state.name,
            Apellido: this.state.apellido,
            email: this.state.email,
            contra: this.state.password
          })
        }).then((res) => res.json())
        .then(() => {
          this.setState({error: false})
          Toast.show({
            text: 'Usuario Registrado',
            buttonText: 'Entendido',
            type:'danger'
          })
        }).catch((e) => {

          this.setState({error: true}) // Dentro de esta función de manejan los errores
          //Aquí van los errores que tengan que ver con algún problema de la base de datos no pueda almacenar el registro
          //Porfa, no borrar el this.setState({error: true})

        })
        .finally(() => {
          if(!this.state.error){
            this.props.navigation.navigate('Login');
          }
        });

    }else{
      //En esta parte van los errores donde las contraseñas no coincidan
      Toast.show({
        text: 'Las contraseñas no coinciden',
        buttonText: 'Entendido',
        type:'danger'
      })
    }

  }

  render() {
    return (
      <Container style={styles.Container}>
        <LinearGradient
          colors={["#C0FFC0", "#1ABC9C"]}
          style={styles.background}
        />
        <Header transparent androidStatusBarColor="#C0FFC0">
          <Left />
          <Body>
            <Title style={styles.Header}>Registro</Title>
          </Body>
          <Right />
        </Header>

        <Content style={styles.Content}>
          <Form>
            <Item floatingLabel style={styles.Item}>
              <Label style={styles.Label}>Nombre</Label>
              <Input
                value={this.state.name}
                onChangeText={(text) => {
                  this.setState({ name: text })
                }}
                style={styles.Input} />
            </Item>
            <Item floatingLabel style={styles.Item}>
              <Label style={styles.Label}>Apellido</Label>
              <Input
                value={this.state.apellido}
                onChangeText={(text) => {
                  this.setState({ apellido: text })
                }}
                style={styles.Input} />
            </Item>
            <Item floatingLabel style={styles.Item}>
              <Label style={styles.Label}>Correo electrónico</Label>
              <Input
                value={this.state.email}
                onChangeText={(text) => {
                  this.setState({ email: text })
                }}
                style={styles.Input} />
            </Item>
            <Item floatingLabel style={styles.Item}>
              <Label style={styles.Label}>Contraseña</Label>
              <Input
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text })
                }}
                style={styles.Input} />
            </Item>
            <Item floatingLabel style={styles.Item}>
              <Label style={styles.Label}>Confirmar contraseña</Label>
              <Input
                value={this.state.confirmPassword}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text })
                }}
                style={styles.Input} />
            </Item>
            <Button block
              rounded
              success
              style={styles.Button}
              onPress={this.Register}
            >
              <Text style={styles.Text2}>Continuar</Text>
            </Button>
          </Form>
        </Content>
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
    padding: 20,
    fontFamily: "Dosis",
  },
  Text2: {
    marginTop: 5,
    fontWeight: "400",
    fontSize: 20,
    marginLeft: 5,
    fontFamily: "Dosis",
  },
  Text3: {
    marginTop: 10,
    fontSize: 15,
    color: "#0D7C0D",
    marginLeft: 5,
    fontFamily: "Dosis",
  },
  Image: {
    alignSelf: "center",
    marginBottom: 10,
  },
  Input: {
    alignSelf: "flex-start",
    fontFamily: "Dosis",
    fontWeight: "400",
    fontSize: 20,
    marginRight: 5,
  },
  Label: {
  
    fontFamily: "Dosis",
    fontWeight: "400",
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
  },
  Button: {
    alignSelf: "center",
    marginTop: 20,
    borderColor: '#9BFFA3'
  },
  Item: {
    marginTop: 30,
    padding: 5,
  },
  H1: {
    alignSelf: "center",
    fontFamily: "Dosis",
    fontWeight: "400",
    fontSize: 30,
    marginTop: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: windowHeight,
  },
  Header: {
    color:'#0D7C0D',
    fontFamily: "Dosis",
    fontSize: 40,
    fontWeight: "600",
  },
});
export default RegisterScreen;