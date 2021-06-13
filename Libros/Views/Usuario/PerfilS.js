/*Mostrar datos de usuario*/
/*Dar la opcion de ver sus direcciones redirigue a direcciones*/
import React from "react";
import { Dimensions, Alert, Image, StyleSheet } from "react-native";
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
  Card,
  CardItem,
  Spinner,
  Item,
  Toast,
  H1,
  Footer,
  FooterTab,
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from "../../ip_address";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class PerfilScreen extends React.Component {
  //Constructor
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nombre: "",
      apellido: "",
      email: "",
      deseos: [],
      carrito: [],
      direccion: [],
      cargar: false,
    };
  }
  //Montar
  componentDidMount() {
    this.setState({ id: this.props.route.params.id });
    this.obtenerDatosPerfil();
  }
  obtenerDatosPerfil = () => {
    fetch(`http://${IP_DB}:3000/Usuario/Ver/${this.props.route.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          nombre: data.Nombre,
          apellido: data.Apellido,
          email: data.Email,
          deseos: data.Deseos,
          carrito: data.Carrito,
          direccion: data.Direccion,
          cargar: true,
        });
      })
      .catch((error) => console.error(error));
  };

  goDirecciones = () =>{
    this.props.navigation.navigate("Direcciones",{id: this.state.id});
  }
  goHome = () =>{
    this.props.navigation.navigate("Home",{id: this.state.id});
  }

  //WishList
  goWishL = () => {
    this.props.navigation.navigate("Deseos", {id: this.state.id});
  }

  render() {
    if (this.state.cargar == false) {
      return (
        <Container>
          <Spinner color="green" />
        </Container>
      );
    } else {
      return (
        <Container>
          <Header
            transparent
            androidStatusBarColor="#C0FFC0"
            style={styles.Header}
          >
            <Left>
              
            </Left>
            <Body>
              <Title style={styles.Header}> PERFIL </Title>
            </Body>
            <Right
           
            ></Right>
          </Header>
          <Content>
            <Card>
              <CardItem>
                <Text> Nombre</Text>
                <Right>
                  <Text>{this.state.nombre}</Text>
                </Right>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Text> Apellido </Text>
                <Right>
                  <Text>{this.state.apellido}</Text>
                </Right>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Text> Correo </Text>
                <Right>
                  <Text>{this.state.email}</Text>
                </Right>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Text> Ver direcciones</Text>
                <Right>
                  <Button
                    transparent
                    style={styles.Button}
                    onPress={this.goDirecciones}
                  >
                    <Icon name="angle-right" size={30} />
                  </Button>
                </Right>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Text> Ver Pedidos</Text>
                <Right>
                  <Button
                    transparent
                    style={styles.Button}
                    onPress={this.goLista}
                  >
                    <Icon name="angle-right" size={30} />
                  </Button>
                </Right>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Text> Salir</Text>
                <Right>
                  <Button
                    transparent
                    style={styles.Button}
                    onPress={() => {
                   
                      SecureStore.deleteItemAsync('token').then(() => { this.setState({ error: false }) })
                        .catch((error) => {
                          console.error(error); 
                          this.setState({ error: true });
                        }).finally(() => {
                          if(!this.state.error)
                            this.props.navigation.navigate('Login');
                        });
                    }}
                  >
                    <Icon name="sign-out" size={30} />
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </Content>
          <Footer>
            <FooterTab style={{ backgroundColor: "#FFF" }}>
              <Button
                style={styles.Button}
                onPress={() => {
                  this.props.navigation.navigate("Perfil", {
                    id: this.state.id,
                  });
                }}
              >
                <Icon name="user-circle-o" size={30} />
              </Button>
              <Button
                style={styles.Button}
                onPress={() => {
                  this.props.navigation.navigate("Carrito", {
                    id: this.state.id,
                  });
                }}
              >
                <Ionicons name="cart" size={30} />
              </Button>
              <Button active style={styles.Button} onPress={this.goHome}>
                <Icon name="home" size={30} />
              </Button>
              <Button style={styles.Button} onPress={this.goGeneros}>
                <Icon name="list-ul" size={30} />
              </Button>
              <Button style={styles.Button} onPress={this.goWishL}>
                <Icon name="heart" size={30} />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
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
});
