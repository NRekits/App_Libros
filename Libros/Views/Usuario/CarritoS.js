/*mostrar los libros que el usuario ha agregado a su carrito*/
/*dar la opcion de aumentar el numero por ejemplar pedido*/
/*al presionar cualquiera de los productos en el carrito debe de llevar a los detalles del producto*/
import React from "react";
import { Text, Dimensions, Alert, Image, StyleSheet } from "react-native";
import { Container, Header, Content, Form, Item, Input,
  Label,
  Button,
  H1
} from "native-base";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const productos = [{
  id: Number,
  title: String, 
  price: Number,
  cant: Number
  }
];

export default class CarritoScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      id_us: "",
      productos: []
    }
  }

  //Montar
  componentDidMount() {
    this.setState({ id_us: this.props.route.params.id });
    this.getCarritoContent();
  }

  getCarritoContent = () => {
    fetch(`http://${IP_DB}:3000/Usuario/varCar_Wish/${this.state.id_us}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.json())
    .then((data) => {
      productos = data
      console.log(productos);  
    })   
    .catch((error) => console.log(error));
  }

  render_item = ({item}) => (
    <Card>
      <CardItem>
        <Text>{item.title}</Text>
      </CardItem>
    </Card>);

  render(){
    return(
      <Container>
        <Header
        transparent
        androidStatusBarColor="#C0FFC0"
        style={styles.Header}>
          <Left></Left>
          <Body>
            <Title style={styles.Header}> CARRITO </Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Card>
            <SafeAreaView style={{ flex: 1 }}>
              <List           //Lista de los libros agregados al array products (donde deben vasearse los datos de la BD)
                dataArray={productos}
                renderRow={(item) => (
                  <ListItem                  
                    button
                  >
                    <Image source={require('../../assets/libro.png')} style={styles.Image}/>
                    <View style={styles.Flex1}>
                      <Text style={styles.Text2}>
                        {item.title}
                      </Text>
                      <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', width: 200}}>

                        <Text style={styles.Text3}>$ 
                          {item.price}
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: ''}}>
                          <Button style={styles.Button}
                            onPress={() => { //reducir cantidad de libros en el carrito
                              for (let i = 0; i < productos.length; i++) {
                                if (productos[i].id == item.id) {
                                  item.cant = productos[i].cant - 1;
                                  console.log(i+' '+item.cant);
                                  //pendiente actualiza campo cantidad con setState....
                                  if (productos[i].cant == 0) {
                                    //Hacer algo aqui....

                                  }
                                }                                
                              }
                            }}>
                              <Text>-</Text>
                          </Button>
                          <Text id={item.id} style={styles.Text1}>{item.cant}</Text>
                          <Button style={styles.Button}
                            onPress={() => { //aumentar cantidad de libros en el carrito
                              for (let i = 0; i < productos.length; i++) {
                                if (productos[i].id == item.id) {
                                  item.cant = productos[i].cant + 1;
                                  console.log(i+' '+item.cant);  
                                  document.getElementById(item.id).innerHTML = item.cant;                         
                                }                                
                              }
                            }}>
                              <Text>+</Text>
                          </Button>
                        </View>
                        
                      </View>
                    </View>
                    
                    
                  </ListItem>
                )}    
              />
            </SafeAreaView>
          </Card>
        </Content>
      </Container>
    );
  }
}
