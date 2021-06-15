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
  List,
  ListItem,
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

const LibroItem = ({ id, Cantidad, Formato, id_u, id_d, props }) => {
  const [libro, setLibro] = useState({});
  const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    async function fetchLibro() {
      await fetch(`http://${IP_DB}:3000/Libro/Ver/${id}`)
        .then((res) => res.json())
        .then((res) => res.data)
        .then((res) => {
          if (fetchData) setLibro(Object.assign({}, res));
        });
    }

    fetchLibro();
    return () => {
      setFetchData(false);
    };
  }, []);
  return (
    <ListItem>
      <Text style={styles.Text2}>
        {libro.Titulo}
        {"\n"} Cantidad: {Cantidad}
        {"\t"} Formato: {Formato}
      </Text>
    </ListItem>
  );
};
export default class VPedidoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: {},
      cargar: false,
      pedId: "",
    };
  }
  //Montar
  componentDidMount() {
    this.setState({
      pedido: this.props.route.params.ped,
      cargar: true,
      pedId: this.props.route.params.pedId,
    });
  }

  showAlert = () => {
    Alert.alert(
      "Precaucion",
      "¿Estas seguro de eliminar este pedido?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            fetch(`http://${IP_DB}:3000/Pedido/Eliminar/${this.state.pedId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                Toast.show({
                  text: "Pedido eliminado",
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
          <Text style={styles.Text3}>Pedido</Text>
          <Row style={{ height: 200, borderWidth: 2, borderColor:"#C0FFC0", margin: 5 }}>
              <List
                dataArray={this.state.pedido.Lista_lib}
                keyExtractor={(item, index) => index.toString()}
                renderRow={(item) => (
                  <LibroItem
                    id={item.Libro}
                    id_u={this.state.id}
                    id_d={item._id}
                    Cantidad={item.Cantidad}
                    Formato={item.Formato}
                    props={this.props}
                  />
                )}
              />
            </Row>
          <Content>
            <Text style={styles.Text2}>
              Id Usuario: {this.state.pedido.Id_usuario}
            </Text>
            <Text style={styles.Text2}>
              Fecha pedido: {this.state.pedido.Fecha_pedido}
            </Text>
            <Text style={styles.Text2}>
              Fecha llegada: {this.state.pedido.Fecha_llegada}
            </Text>
            <Text style={styles.Text2}>
              No. Rastreo: {this.state.pedido.No_rastreo}
            </Text>
            <Text style={styles.Text2}>Estado: {this.state.pedido.Estado}</Text>
            <Text style={styles.Text2}>
              Sucursal: {this.state.pedido.Sucursal}
            </Text>
            <Text style={styles.Text2}>Código: {this.state.pedido.Codigo}</Text>
            <Text style={styles.Text2}>Monto: {this.state.pedido.Monto}</Text>
            {this.state.pedido.Detalle_entrega == null ?  <Text style={styles.Text2}>
              Detalle entrega: {this.state.pedido.Detalle_entrega}
            </Text>: <Text></Text>}
          
            <Text style={styles.Text3}>Destino</Text>
            <Text style={styles.Text2}>
              Pais: {this.state.pedido.Destino.Pais}
            </Text>
            <Text style={styles.Text2}>
              Estado: {this.state.pedido.Destino.Estado}
            </Text>
            <Text style={styles.Text2}>
              Ciudad: {this.state.pedido.Destino.Ciudad}
            </Text>
            <Text style={styles.Text2}>
              Colonia: {this.state.pedido.Destino.Colonia}
            </Text>
            <Text style={styles.Text2}>
              Calle: {this.state.pedido.Destino.Calle}
            </Text>
            <Row>
              <Col>
                <Text style={styles.Text2}>
                  Numero: {this.state.pedido.Destino.Numero_int}
                </Text>
              </Col>
              <Col>
                <Text style={styles.Text2}>
                  CP: {this.state.pedido.Destino.Codigo_postal}
                </Text>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  danger
                  block
                  rounded
                  onPress={this.showAlert}
                  style={styles.ButtonB}
                >
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
                      libId: this.state.libId,
                      lib: this.state.Libro,
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
    fontSize: 25,
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
  ButtonB: {
    margin: 10,
  },
});
