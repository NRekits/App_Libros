/*Detalles del pedido, dando la opcion de cancelar*/
/*No se puede modificar un pedido como tal, solo es para cancelar*/
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
  Grid,
  Row,
  Col,
  List,
  ListItem,
  Left,
  Right,
  Button,
  Spinner,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from "../../ip_address";

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

export default class PedidoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pedido: {},
      cargar: false,
      pedId: "",
      carrito: [],
      est:''
    };
  }
  // Montar
  componentDidMount() {
    
  this.setState({
      cargar: true,
      pedido: this.props.route.params.pedd,
      id: this.props.route.params.id,
      pedId: this.props.route.params.pedId,
      carrito: this.props.route.params.pedd.Lista_lib,
    });
  }

  cancelarPedido= (est) => {
 
    fetch(
      `http://${IP_DB}:3000/Pedido/Estado/${this.props.route.params.id}/${this.state.pedId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          est:est
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Toast.show({
          text: "Pedido cancelado",
          buttonText: "Okay",
          type: "danger",
        });
        this.props.navigation.navigate("Home", { id: this.state.id });
      })
      .catch((error) => console.error(error));
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

          <Grid>
            <Row style={styles.Row1}>
              <Text style={styles.Text2}>
                No. de Rastreo: {this.state.pedido.No_rastreo}
              </Text>
            </Row>
            <Row style={{ height: 70, borderWidth: 4, margin: 5 }}>
              <Text style={styles.Text3}>
                Fecha de Llegada: {this.state.pedido.Fecha_pedido}
              </Text>
            </Row>

            <Row style={{ height: 200, borderWidth: 4, margin: 5 }}>
              <Text>Pedido</Text>
              <List
                dataArray={this.state.carrito}
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

            <Row style={styles.Row1}>
              <Text style={styles.Text2}>
                Monto total: ${this.state.pedido.Monto}
              </Text>
            </Row>

            <Row style={styles.Row1}>
              <Text style={styles.Text2}>
                Estado: {this.state.pedido.Estado}
              </Text>
            </Row>

            <Row style={{ margin: 5 }}>
              <Col>
                <Button primary block rounded>
                  <Text>Ver ticket</Text>
                </Button>
              </Col>
              <Col>
                {this.state.pedido.Estado != "Cancelado" &&
                this.state.pedido.Estado != "Devuelto" &&
                this.state.pedido.Estado != "Enviado" ? (
                  <Button danger block rounded   onPress={()=>{
                    this.setState({est:'Cancelado'})
                    this.cancelarPedido()}}>
                    <Text>Cancelar</Text>
                  </Button>
                ) : (
                  <Button danger block rounded disabled>
                    <Text>Cancelar</Text>
                  </Button>
                )}
              </Col>
            </Row>
            <Row style={{ margin: 5 }}>
              <Col>
                {this.state.pedido.Estado != "Cancelado" &&
                this.state.pedido.Estado != "Devuelto" &&
                this.state.pedido.Estado != "Procesado" ? (
                  <Button
                    warning
                    block
                    rounded
                    onPress={()=>{
                      this.setState({est:'Devuelto'})
                      this.cancelarPedido()}}
                  >
                    <Text>Devolver</Text>
                  </Button>
                ) : (
                  <Text></Text>
                )}
              </Col>
            </Row>
          </Grid>
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
    color: "black",
    fontSize: 18,
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
  Row1: {
    height: 60,
    margin: 5,
    borderWidth: 4,
  },
});
