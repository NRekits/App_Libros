import React from "react";
import { Dimensions, Alert, Image, View, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Footer,
  FooterTab,
  Text,
} from "native-base";

import { LineChart, BarChart } from "react-native-chart-kit";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import IP_DB from "../../ip_address";
const io = require("socket.io-client");

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  propsForVerticalLabels: {
    fontSize: 10,
    height: 200,
    width: 50,
  },
};
export default class HomeAdmiScreen extends React.Component {
  //Constructor
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      libros: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
      },
      ventas: {
        labels: [],
        datasets: [{ data: [] }],
      },
    };
    this._IsMounted = true;
  }
  fetchLibrosVendidos = async () => {
    await fetch(`http://${IP_DB}:3000/Libro/VerMasVendidos`)
      .then((res) => res.json())
      .then((res) => res.lib)
      .then((data) => {
        data.splice(5);
        let titulos = [];
        let ventas = [];
        data.forEach((value) => {
          titulos.push(value.Titulo);
          ventas.push(value.Vendidos);
        });
        if (this._IsMounted) {
          this.setState({
            libros: {
              labels: [...titulos],
              datasets: [
                {
                  data: [...ventas],
                },
              ],
            },
          });
        }
      });
  };
  //Montar
  componentDidMount() {
    console.log(this.state.id);
    const socket = io.connect(`http://${IP_DB}:3001`);
    socket.emit("create", "admin");
    socket.on("admin:update:most", (data) => {
      const vendidos = [...data.vendidos];
      let titulos = [];
      let ventas = [];
      vendidos.forEach((value) => {
        titulos.push(value.Titulo);
        ventas.push(value.Vendidos);
      });
      if (this._IsMounted) {
        this.setState({
          libros: {
            labels: [...titulos],
            datasets: [
              {
                data: [...ventas],
              },
            ],
          },
        });
      }
    });
    this.fetchLibrosVendidos();
  }

  render() {
    return (
      <Container>
        <Header
          transparent
          androidStatusBarColor="#C0FFC0"
          style={styles.Header}
        >
          <Left></Left>
          <Body>
            <Title style={styles.Header}> HOME </Title>
          </Body>
          <Right>
            <Button
              transparent
              style={styles.Button}
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            >
              <Icon name="sign-in-alt" size={30} />
            </Button>
          </Right>
        </Header>
        <Content>
          <Text style={styles.Text3}>Ventas por libro</Text>

          <LineChart
            withVerticalLabels={true}
            verticalLabelRotation={70}
            data={this.state.libros}
            width={screenWidth}
            height={500}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </Content>
        <Footer>
          <FooterTab style={{ backgroundColor: "#FFF" }}>
            <Button
              style={styles.Button}
              onPress={() => {
                this.props.navigation.navigate("ListUsuario");
              }}
            >
              <Icon name="user" size={30} />
            </Button>
            <Button
              style={styles.Button}
              onPress={() => {
                this.props.navigation.navigate("ListPedido");
              }}
            >
              <Icon name="boxes" size={30} />
            </Button>
            <Button
              style={styles.Button}
              onPress={() => {
                this.props.navigation.navigate("ListEditorial");
              }}
            >
              <Icon name="user-tie" size={30} />
            </Button>
            <Button
              style={styles.Button}
              onPress={() => {
                this.props.navigation.navigate("ListLibro");
              }}
            >
              <Icon name="book" size={30} />
            </Button>
          </FooterTab>
        </Footer>
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
    fontSize: 30,
    color: "#08130D",
    marginLeft: 5,
    fontFamily: "Dosis",
  },
  Button: {
    alignSelf: "center",
    backgroundColor: "#BB8FCE",
    fontFamily: "Dosis",
    fontWeight: "400",
  },
  Item: {
    padding: 5,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  Button: {
    alignSelf: "center",
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
