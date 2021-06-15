import React, { useEffect, useState } from "react";
import { Text, Dimensions, StyleSheet, Alert } from "react-native";
import {
  Container,
  Header,
  Body,
  Content,
  Title,
  H3,
  Toast,
  Row,
  Col,
  Left,
  Right,
  Button,
  Spinner,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from "../../../ip_address";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



export default class VPedidoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: {},
      cargar: false,
      pedId:"",
    };
  }
  //Montar
  componentDidMount() {
  
    this.setState({pedido: this.props.route.params.ped, 
      cargar:true, pedId : this.props.route.params.pedId});

  }

 showAlert = () => {
    Alert.alert(
      "Precaucion",
      "¿Estas seguro de eliminar este libro?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () =>{
            fetch(`http://${IP_DB}:3000/Libro/Eliminar/${this.state.libId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                Toast.show({
                  text: "Libro eliminado",
                  buttonText: "Okay",
                  type: "danger",
                })

               this.props.navigation.navigate("HomeAdmi");
              })
              .catch((error) => console.error(error));
          
          },
          style: "default",
        },
      ],
      {
        cancelable: true,
      }
    );
  };


  render() {
    if (this.state.cargar == false) {
      return (
        <Container>
          <Spinner color="green" />
        </Container>
      );
    } else {
      return (
        <Container style={styles.Container}>
          <Header transparent androidStatusBarColor="#C0FFC0">
            <Left>
              <Button
                transparent
                style={styles.Button}
                onPress={() => {
                 this.props.navigation.goBack();
                }}
              >
                <Icon name="chevron-left" size={30} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.Header}> DETALLES </Title>
            </Body>
            <Right></Right>
          </Header>

          <Content>
            <Text style={styles.Text2}>Titulo: {this.state.Libro.Titulo}</Text>
            <Text style={styles.Text2}>Autor: {this.state.Libro.Autor}</Text>
            <Text style={styles.Text2}>Nombre editorial: {this.state.Libro.NombreEditorial}</Text>
            <Text style={styles.Text2}>Cantidad disponible: {this.state.Libro.Cantidad_dis}</Text>
            <Text style={styles.Text2}>Precio: {this.state.Libro.Precio}</Text>
            <Text style={styles.Text2}>Fecha Adquisión: {this.state.Libro.Fecha_adquision}</Text>
            <Text style={styles.Text2}>Sinopsis: {this.state.Libro.Sinopsis}</Text>
            <Text style={styles.Text2}>Género: {this.state.Libro.Genero}</Text>
            <Text style={styles.Text2}>Formato: {this.state.Libro.Formato}</Text>
            <Text style={styles.Text2}>Vendidos: {this.state.Libro.Vendidos}</Text>
            
            <Row>
              <Col>
                <Button danger block rounded onPress={this.showAlert} style={styles.ButtonB}>
                  <Text>Eliminar</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  info
                  block
                  rounded
                  style={styles.ButtonB}

                  onPress={() => {
                    this.props.navigation.navigate("ModLibro", {
                      libId: this.state.libId, lib: this.state.Libro
                    });
                  }}
                >
                  <Text>Modificar</Text>
                </Button>
              </Col>
            </Row>
          </Content>
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
    color: "black",
    alignSelf: "center",
    fontFamily: "Dosis",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: windowHeight,
  },
  Header: {
    color: "#0D7C0D",
    fontFamily: "Dosis",
    fontSize: 25,
    fontWeight: "600",
  },
  ButtonB:{
    margin:10
  }
});
