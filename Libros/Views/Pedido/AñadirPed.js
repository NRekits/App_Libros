/*cuando se confirme la compra del carrito, 
se debe venir a esta pantalla donde se listaran 
los detalles del envio para confirmar o cancelar*/
import React, { useState, useEffect } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  Alert,
  SafeAreaView,
  TextInput,
} from "react-native";
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
  Left,
  Right,
  Button,
  Spinner,
  List,
  ListItem,
  Picker,
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

export default class APedidoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      cargar: false,
      carrito: [],
      direcciones: [],
      direccion: {},
      Fecha: new Date(),
      dirSelect: "",
      pago: "tienda",
      monto: 0,
      notas: "",
    };
  }
  // Montar
  componentDidMount() {
    this.setState({
      id: this.props.route.params.id,
      carrito: this.props.route.params.car,
      monto: this.props.route.params.monto,
    });
    this.obtenerDatosPerfil();
  }
	 Check = () => {
		var msg = "";
		var error = false;

		if (this.state.dirSelect=== "" ) {
			msg = "Direccion es un campo requerido";
			error = true;
		}

		if (error) {
			Toast.show({ text: msg, buttonText: "Okay", type: "warning" });
		} else {

      this.agregarPedido()
    }

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
          direcciones: data.Direccion,
          cargar: true,
        });
      })
      .catch((error) => console.error(error));
  };

  agregarPedido = async () => {
    await this.setState({
      direccion: this.state.direcciones.find(
        (dir) => dir._id == this.state.dirSelect
      ),
    });

    fetch(
      `http://${IP_DB}:3000/Pedido/Insertar/${this.props.route.params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fechap: this.state.Fecha.toISOString(),
          fechal: this.state.Fecha.toISOString(),
          rastreo: Math.floor(Math.random() * 100000000) + 10000,
          estado: "Procesado",
          suc: this.state.pago,
          cod: Math.floor(Math.random() * 100000000) + 10000,
          carrito: this.state.carrito,
          destino: this.state.direccion,
          monto: this.state.monto,
          det: this.state.notas,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        this.props.navigation.navigate("Pedidos", { id: this.state.id });
      })
      .catch((error) => console.error(error));
  };

  render() {
    let dirItems = this.state.direcciones.map((direcciones, index) => {
      return (
        <Picker.Item
          key={index.toString()}
          label={`${direcciones.Ciudad}: ${direcciones.Calle} #${direcciones.Numero_int}`}
          value={direcciones._id}
        />
      );
    });

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
            {/* Para seleccionar direccion */}
            <Row style={{ height: 50, borderWidth: 4, margin: 5 }}>
              <Col style={{ width: 80 }}>
                <Text>Direccion de envio</Text>
              </Col>
              <Col>
                <Picker
                  note
                  mode="dropdown"
                  style={{ height: 60 }}
                  selectedValue={this.state.dirSelect}
                  onValueChange={(value) => this.setState({ dirSelect: value })}
                >
                  <Picker.Item label="Selecciona un destino" value="" />
                  {dirItems}
                </Picker>
              </Col>
            </Row>

            <Row style={{ height: 60, margin: 5, borderWidth: 4 }}>
              <Text style={styles.Text2}>
                Fecha: {this.state.Fecha.toDateString()}
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
            <Row style={{ margin: 5 }}>
              <TextInput
                multiline={true}
                style={{ borderColor: "black", borderWidth: 4, flex: 1 }}
                numberOfLines={4}
                onChangeText={(notas) => this.setState({ notas: notas })}
                placeholder={"Notas sobre envio"}
              />
            </Row>
            <Row style={{ height: 50, borderWidth: 4, margin: 5 }}>
              <Col style={{ width: 100 }}>
                <Text>Pago</Text>
              </Col>
              <Col>
                <Picker
                  note
                  mode="dropdown"
                  style={{ height: 60 }}
                  selectedValue={this.state.pago}
                  onValueChange={(value) => this.setState({ pago: value })}
                >
                  <Picker.Item label={"Pago en Tienda"} value={"tienda"} />
                  <Picker.Item label={"Pago en Oxxo"} value={"oxxo"} />
                </Picker>
              </Col>
            </Row>
            <Row>
              <Text style={styles.Text2}>Total: {this.state.monto}</Text>
            </Row>
            <Row>
              <Col></Col>
              <Col>
                <Button success block rounded onPress={this.Check}>
                  <Text>Aceptar</Text>
                </Button>
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
