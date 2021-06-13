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



export default class EditorialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorial: {},
      cargar: false,
      editId:"",
    };
  }
  //Montar
  componentDidMount() {
  
    this.setState({editorial: this.props.route.params.edit, 
      cargar:true, editId : this.props.route.params.editId});
  }

 showAlert = () => {
    Alert.alert(
      "Precaucion",
      "¿Estas seguro de eliminar esta editorial?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () =>{
            fetch(`http://${IP_DB}:3000/Editorial/Eliminar/${this.state.editId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                Toast.show({
                  text: "Editorial eliminada",
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
            <Text style={styles.Text2}>Nombre encargado: {this.state.editorial.Nombre_encargado}</Text>
            <Text style={styles.Text2}>Apellido encargado: {this.state.editorial.Ape_encargado}</Text>
            <Text style={styles.Text2}>Nombre editorial: {this.state.editorial.Nombre_editorial}</Text>
            <Text style={styles.Text2}>Email: {this.state.editorial.Email}</Text>
            <Text style={styles.Text2}>Telefono: {this.state.editorial.Tel}</Text>
            
            <Row>
              <Col>
                <Button style={styles.ButtonB} danger block rounded onPress={this.showAlert}>
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
                    this.props.navigation.navigate("ModEditorial", {
                      editId: this.state.editId, edit: this.state.editorial
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
