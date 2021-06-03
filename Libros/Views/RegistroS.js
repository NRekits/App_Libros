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

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
//En la línea  71 van a ir los errores con respecto a que las contraseñas no coincidan
//En la línea 61 van a ir los errores en caso de que la bd no logre almacenar el registro (el correo no es válido)
//El email ya esta registrado, hubo un problema con la codificación de la contraseña, no se pudo almacenar el registro
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      error: false
    };
  }

  Register = () => {
    if (this.state.password === this.state.confirmPassword) {
      fetch(`http://${IP_DB}:3000/user/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          })
        }).then((res) => res.json())
        .then(() => {
          this.setState({error: false})
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
          colors={["#00B0E8", "#BB8FCE"]}
          style={styles.background}
        />
        <Header transparent androidStatusBarColor="#00B0E8">
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
              bordered
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
    color: "white",
  },
  Text2: {
    marginTop: 5,
    fontWeight: "400",
    fontSize: 20,
    color: "white",
    marginLeft: 5,
    fontFamily: "Dosis",
  },
  Text3: {
    marginTop: 10,
    fontSize: 15,
    color: "#C4EFFF",
    marginLeft: 5,
    fontFamily: "Dosis",
  },
  Image: {
    alignSelf: "center",
    marginBottom: 10,
  },
  Input: {
    alignSelf: "flex-start",
    color: "white",
    fontFamily: "Dosis",
    fontWeight: "400",
    fontSize: 20,
    marginRight: 5,
  },
  Label: {
    color: "white",
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
    color: "white",
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
    color: "#C4EFFF",
    fontFamily: "Dosis",
    fontSize: 40,
    fontWeight: "600",
  },
});
export default RegisterScreen;