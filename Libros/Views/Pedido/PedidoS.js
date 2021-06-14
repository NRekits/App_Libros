/*Detalles del pedido, dando la opcion de cancelar*/
/*No se puede modificar un pedido como tal, solo es para cancelar*/
import React from "react";
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class PedidoScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      pedido: {},
      cargar: false,
      pedId: "",
      carrit: []
    };
  }
  // Montar
  componentDidMount(){
    this.setState({
      cargar:true,
      pedido: this.props.route.params.pedd,
      id:this.props.route.params.id,
      pedId:this.props.route.params.pedId,
      carrito:[
        {libro:"libro 1", cantidad:5},
        {libro:"libro 2", cantidad:2},
        {libro:"libro 3", cantidad:3},
        {libro:"libro 4", cantidad:6}
      ],
    });
  }

  render(){
    if(this.state.cargar == false){
      return(
        <Container>
          <Spinner color="green" />
        </Container>
      );  
    } else {
      return(
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
              <Text style={styles.Text2}>No. de Rastreo: {this.state.pedido.No_rastreo}</Text>
            </Row>

            <Row style={{height:80, borderWidth:4, margin:5}}>
              <Col>
                <Text style={styles.Text3}>Fecha de Pedido: {this.state.pedido.Fecha_pedido}</Text>
              </Col>
              <Col>
                <Text style={styles.Text3}>Fecha de Llegada: {this.state.pedido.Fecha_pedido}</Text>
              </Col>
            </Row>

            <Row style={{height:200, borderWidth:4, margin:5}}>
              <Text>Pedido</Text>
              <List
                dataArray={this.state.carrito}
                keyExtractor={(item, index) => index.toString()}
                renderRow={(item) => (
                  <ListItem>
                    <Text style={styles.Text2}>
                      {item.libro}{'\t'} Cantidad:{item.cantidad}
                    </Text>
                  </ListItem>
                )}
              />
            </Row>

            <Row style={styles.Row1}>
              <Text style={styles.Text2}>Monto total: ${this.state.pedido.Monto}</Text>
            </Row>

            <Row style={styles.Row1}>
              <Text style={styles.Text2}>Estado: {this.state.pedido.Estado}</Text>
            </Row>

            <Row style={{margin:5}}>
              <Col>
                <Button primary block rounded><Text>Regresar</Text></Button>
              </Col>
              <Col>
                  {this.state.pedido.Estado!='Cancelado' ? 
                    <Button danger block rounded><Text>Cancelar</Text></Button>
                   :<Button danger block rounded disabled><Text>Cancelar</Text></Button>
                  }
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
  Row1:{
    height:60,
    margin:5,
    borderWidth:4
  }
});