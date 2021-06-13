import React from "react";
import { Text, Dimensions, StyleSheet, Alert } from "react-native";
import { Container, Header, Body, Content, Title, Toast,
  Row, Col, Left, Right, Button, Spinner,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from "../../../ip_address";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class UsuarioScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: {},
      cargar: false,
      userId: "",
    };
  }
  //Montar
  componentDidMount() {
    this.setState({
      usuario: this.props.route.params.users,
      cargar: true,
      userId: this.props.route.params.userId,
    });
  }

  showAlert = () => {
    Alert.alert(
      "Precaucion",
      "¿Estas seguro de eliminar esta usuario?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            fetch(
              `http://${IP_DB}:3000/Usuario/Eliminar/${this.state.userId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                Toast.show({
                  text: "Usuario eliminado",
                  buttonText: "Okay",
                  type: "danger",
                });

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
            <Text style={styles.Text2}>
              Nombre: {this.state.usuario.Nombre}
            </Text>
            <Text style={styles.Text2}>
              Apellido: {this.state.usuario.Apellido}
            </Text>
            <Text style={styles.Text2}>Email: {this.state.usuario.Email}</Text>
            {this.state.usuario.Admi == true ? (
              <Text style={styles.Text2}>Tipo de usuario: Administrador</Text>
            ) : (
              <Text style={styles.Text2}>Tipo de usuario: Regular</Text>
            )
           
            }

            <Row>
              <Col>
                <Button style={styles.ButtonB} danger block rounded onPress={this.showAlert}>
                  <Text>Eliminar</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  style={styles.ButtonB}
                  info
                  block
                  rounded
                  onPress={() => {
                    this.props.navigation.navigate("ModUsuario", {
                      userId: this.state.userId,
                      user: this.state.usuario,
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
