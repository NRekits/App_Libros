/*cuando se confirme la compra del carrito, 
se debe venir a esta pantalla donde se listaran 
los detalles del envio para confirmar o cancelar*/
import React from "react";
import { Text, Dimensions, StyleSheet, Alert, SafeAreaView, TextInput } from "react-native";
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
  Picker
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from "../../ip_address";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default class APedidoScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id:"",
      cargar: false,
      carrito: [],
      direcciones: [],
      dirSelect: 'id1',
      pago: 'tienda',
      notas: ''
    }
  }
  // Montar
  componentDidMount(){
    this.setState({
      // id:this.props.route.params.id,
      cargar:true,
      carrito:[
        {libro:"libro 1", cantidad:5},
        {libro:"libro 2", cantidad:2},
        {libro:"libro 3", cantidad:3},
        {libro:"libro 4", cantidad:6}
      ],
      direcciones:[
        {_id:"id1",Ciudad:"Vancouver",Calle:"Calle1",Numero_int:123},
        {_id:"id2",Ciudad:"Alaska",Calle:"Calle2",Numero_int:456},
        {_id:"id3",Ciudad:"Bosnia",Calle:"Calle3",Numero_int:789}
      ]
    });
  }
  


  render(){
    let dirItems = this.state.direcciones.map((direcciones,index) =>{
      return(
        <Picker.Item key={index.toString()} label={`${direcciones.Ciudad}: ${direcciones.Calle} #${direcciones.Numero_int}`} value={direcciones._id}/>
      );
    })

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
            {/* Para seleccionar direccion */}
            <Row style={{height:50, borderWidth:4, margin:5}}>
              <Col style={{width:80}}>
                <Text>Direccion de envio</Text>
              </Col>
              <Col>
                <Picker
                  note
                  mode="dropdown"
                  style={{height: 60}}
                  selectedValue={this.state.dirSelect}
                  onValueChange={(value)=> this.setState({dirSelect:value})}
                >
                  {dirItems}
                </Picker>
              </Col>
            </Row>

            <Row style={{height:60,margin:5, borderWidth:4}}>
              <Text style={styles.Text2}>Fecha: 2021-06-13</Text>
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
            <Row style={{margin:5}}>
              <TextInput
                multiline={true}
                style={{borderColor:'black', borderWidth:4, flex:1}}
                numberOfLines={4}
                onChangeText={(notas) => this.setState({notas})}
                placeholder={'Notas sobre envio'}
              />
            </Row>
            <Row style={{height:50, borderWidth:4, margin:5}}>
              <Col style={{width:100}}>
                <Text>Pago</Text>
              </Col>
              <Col>
                <Picker
                  note
                  mode="dropdown"
                  style={{height: 60}}
                  selectedValue={this.state.pago}
                  onValueChange={(value)=> this.setState({pago:value})}
                >
                  <Picker.Item label={"Pago en Tienda"} value={"tienda"}/>
                  <Picker.Item label={"Pago en Oxxo"} value={"oxxo"}/>
                </Picker>
              </Col>
            </Row>
            <Row>
              <Text style={styles.Text2}>Total: $5000</Text>
            </Row>
            <Row>
              <Col>
                <Button light block rounded><Text>Regresar</Text></Button>
              </Col>
              <Col>
                <Button success block rounded><Text>Aceptar</Text></Button>
              </Col>
            </Row>
          </Grid>
        </Container>
      )
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