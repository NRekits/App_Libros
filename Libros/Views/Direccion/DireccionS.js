/*El usuario puede ver los detalles de la direccion y tiene la opcion de modificar o eliminar */
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
import IP_DB from "../../ip_address";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



export default class DireccionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      direccion: {},
      cargar: false,
      dirId:"",
    };
  }
  //Montar
  componentDidMount() {
  
    console.log(this.props.route.params.dirs);
    this.setState({direccion: this.props.route.params.dirs, 
      cargar:true, id:this.props.route.params.usid,
      dirId : this.props.route.params.dirId});
  }

 showAlert = () => {
    Alert.alert(
      "Precaucion",
      "¿Estas seguro de eliminar esta direccion?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () =>{
            fetch(`http://${IP_DB}:3000/Usuario/EliminarDireccion/${this.state.id}/${this.state.dirId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                Toast.show({
                  text: "Direccion eliminada",
                  buttonText: "Okay",
                  type: "danger",
                })

                this.props.navigation.navigate("Perfil", {
                  id: this.state.id,
                });
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
            <Text style={styles.Text2}>Pais: {this.state.direccion.Pais}</Text>
            <Text style={styles.Text2}>Estado: {this.state.direccion.Estado}</Text>
            <Text style={styles.Text2}>Ciudad: {this.state.direccion.Ciudad}</Text>
            <Text style={styles.Text2}>Colonia: {this.state.direccion.Colonia}</Text>
            <Text style={styles.Text2}>Calle: {this.state.direccion.Calle}</Text>
            <Row>
              <Col>
                <Text style={styles.Text2}>Numero: {this.state.direccion.Numero_int}</Text>
              </Col>
              <Col>
                <Text style={styles.Text2}>CP: {this.state.direccion.Codigo_postal}</Text>
              </Col>
              </Row>
            <Row>
              <Col>
                <Button danger block rounded onPress={this.showAlert}>
                  <Text>Eliminar</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  info
                  block
                  rounded
                  onPress={() => {
                    this.props.navigation.navigate("ModificarDir", {
                      dirId: this.state.direccion._id, dirs:this.state.direccion, id:this.state.id
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
});
