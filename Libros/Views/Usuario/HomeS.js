import React from "react";
import {
  Dimensions,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
} from "react-native";
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
  Item,
  Toast,
  List,
  ListItem,
  Spinner,
  H3,
  Card,
  CardItem,
  Thumbnail,
  Footer,
  FooterTab,
} from "native-base";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from "../../ip_address";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

ListaTop=(props)=>{
  const renderItem = ({ item }) => {
    let { Titulo, Autor } = item;
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri: `http://${IP_DB}:3000/Libro/Imagen/${item.Imagen}`,
              }}
            />
            <Body>
              <Text>{Titulo}</Text>
              <Text note>{Autor}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  };
  return(
    <SafeAreaView style={styles.View}>
    <H3 style={styles.Text2}>Más vendidos</H3>
    <FlatList
      data={props.top}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
    />
  </SafeAreaView>
  );
}

export default class HomeScreen extends React.Component {
  //Constructor
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      novedades: [],
      top: [],
      cargar: false,
      slider1ActiveSlide: 1,
    };

    this.goGeneros = this.goGeneros.bind(this);
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Card style={{ elevation: 3 }} key={index}>
          <CardItem cardBody>
            <Image
              style={{ height: 300, width: 100, flex: 1 }}
              source={{
                uri: `http://${IP_DB}:3000/Libro/Imagen/${item.Imagen}`,
              }}
            />
          </CardItem>
        </Card>
      </View>
    );
  };

  //Montar
  goLista() {
    this.props.navigation.navigate("Buscar", {userId: this.state.id});
  }
  //Ir a lista de generos
  goGeneros() {
    this.props.navigation.navigate("Generos", {userId: this.state.id});
  }

  async componentDidMount() {
    await this.getNovedades();
    await this.getTop();
    this.setState({ id: this.props.route.params.id, cargar: true });
  }

  async getNovedades() {
    fetch(`http://${IP_DB}:3000/Libro/Novedades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ novedades: data.lib });
      })
      .catch((error) => console.error(error));
  }

  async getTop() {
    fetch(`http://${IP_DB}:3000/Libro/VerMasVendidos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ top: data.lib });
      })
      .catch((error) => console.error(error));
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
        <Container style={styles.Container}>
          <Header
            transparent
            androidStatusBarColor="#C0FFC0"
            style={styles.Header}
          >
            <Left>
              <Button
                transparent
                style={styles.Button}
                onPress={() => {
                  this.goLista();
                }}
              >
                <Icon name="search" size={30} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.Header}> HOME </Title>
            </Body>
            <Right></Right>
          </Header>
          <Content style={styles.View}>
            <H3 style={styles.Text2}>Novedades</H3>
            <Carousel
              ref={(c) => {
                this._carousel = c;
              }}
              layout="default"
              data={this.state.novedades}
              renderItem={this._renderItem}
              sliderWidth={windowWidth}
              itemWidth={300}
            />
           
          </Content>
          <ListaTop top={this.state.top}/>
         
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
              <Button
                active
                style={styles.Button}
                onPress={() => {
                  this.props.navigation.navigate("Home", { id: this.state.id });
                }}
              >
                <Icon name="home" size={30} />
              </Button>
              <Button style={styles.Button} onPress={this.goGeneros}>
                <Icon name="list-ul" size={30} />
              </Button>
              <Button
                style={styles.Button}
                onPress={() => {
                  this.props.navigation.navigate("WishList", {
                    id: this.state.id,
                  });
                }}
              >
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
  View: {
    flex: 1,
    flexDirection: "column",
    height: 600,
  },
  Text2: {
    fontWeight: "300",
    alignSelf: "center",
    color: "#52C08B",
    padding: 10,
    fontSize: 30,
    margin: 5,
    fontFamily: "Dosis",
    borderBottomWidth: 1,
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
  scrollview: {
    flex: 1,
  },
});
