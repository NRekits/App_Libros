/*mostrar los libros que el usuario ha agregado a su carrito*/
/*dar la opcion de aumentar el numero por ejemplar pedido*/
/*al presionar cualquiera de los productos en el carrito debe de llevar a los detalles del producto*/
import React, { Component, useState, useEffect } from "react";
import ReactDom from "react-dom";
import {
  Text,
  Dimensions,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Form,
  Item,
  Input,
  Label,
  Button,
  H1,
  View,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Card,
  CardItem,
  Title,
  Thumbnail,
  Toast,
} from "native-base";
import IP_DB from "../../ip_address";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";


const io = require('socket.io-client'); 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const LibroItem = ({ id, cant, car, user, format, props }) => {
	const [libro, setLibro] = useState({});
  const [cantidad, setCantidad] = useState(cant);
	const [fetchData, setFetchData] = useState(true);
	useEffect(() => {
		async function fetchLibro() {
			if (fetchData) {
				await fetch(`http://${IP_DB}:3000/Libro/Ver/${id}`)
					.then((res) => res.json())
					.then((res) => res.data)
					.then((res) => {
						setLibro(Object.assign({}, res));
						console.log(res);
					});
				await setFetchData(false);
			}
		}
		fetchLibro();
		return (() => {
		});
	}, [])
	return (
		<ListItem thumbnail>
				<Thumbnail square source={{ uri: `http://${IP_DB}:3000/Libro/Imagen/${libro.Imagen}` }} />
			<Body>
        <View style={styles.Flex1}>
          <Text style={styles.Text2}>
            {libro.Titulo} {}
          </Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', width: 225}}>            
            <Text style={styles.Text3}>$ 
              {libro.Precio}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: ''}}>
              <Button style={styles.Button1}
                onPress={async () => {
                  if (cantidad > 1) {
                    await setCantidad({ cantidad: cantidad-1});
                    return await fetch(`http://${IP_DB}:3000/Usuario/ModificarCarrito/${user}/${car}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        cant: cantidad,
                        libro: id,
                        format: format
                      })
                    })
                      .then((res) => {
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }else{
                    Toast.show({text: 'De preferencia elimine el producto', type:'warning'});
                  }
                }}>
                <Icon name="minus" size={20} color={'white'} />
              </Button>
              <Text  style={styles.Text1}>{cantidad}</Text>
              <Button style={styles.Button1}
                onPress={async () => {

                  if (cantidad < libro.cant) {
                    await setCantidad({ cantidad: cantidad+1});
                    return await fetch(`http://${IP_DB}:3000/Usuario/ModificarCarrito/${user}/${car}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        cant: cantidad,
                        libro: id,
                        format: format
                      })
                    })
                      .then((res) => {
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }
                  else{
    
                    Toast.show({text: 'Yo no hay más disponibilidad del producto', type:'warning'});
                  }
                }}>
                <Icon name="plus" size={20} color={'white'} />
              </Button>
              <Button transparent style={{ marginLeft: 10, marginRight: 10 }}
						onPress={async () => {
							fetch(`http://${IP_DB}:3000/Usuario/EliminarCarrito/${user}/${car}`)
							.then((res) => {
							})
							.catch((erro) => {
								console.error(erro);
							});
              props.navigation.navigate('Home')
						}} 
					>
						<Icon size={30} color={'black'} name="trash" />
					</Button>
            </View>
            
          </View>
        </View>
			</Body>
		</ListItem>
	);
}

class CarritoScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      id_us: "",
      productos: [], 
      total: 0
    }
    this._Mounted = false;
  }



  //Montar
  componentDidMount() {
    if (!this._Mounted) {
			this.setState({ id_us: this.props.route.params.id });
			this.getCarritoContent();
      
			const socket = io.connect(`http://${IP_DB}:3001`);
			socket.emit('create', `shop:${this.state.id_us}`);
			socket.on('joined', res => {
				console.log("Se ha ingresado");
			});
			socket.on(`update:shop:${this.state.id_us}`, data => {
				this.setState({ productos: [...data.productos] });
			})
			this._Mounted = true;
		}
  }

  getCarritoContent = async() => {
    fetch(`http://${IP_DB}:3000/Usuario/Ver/${this.props.route.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        productos: data.Carrito        
      })
      this.getTotal() 
    })   
    .catch((error) => console.log(error));    
  }

  getTotal = async () =>{
    let tot = 0;
    for (let i = 0; i < this.state.productos.length; i++) {
      tot = tot + + this.state.productos[i].Subtotal;
      this.setState({
        total: tot
      }) 
      console.log(tot);
    }
  }

  goDirecciones = () =>{
    this.props.navigation.navigate("Direcciones",{id: this.state.id_us});
  }
  goHome = () =>{
    this.props.navigation.navigate("Home",{id: this.state.id_us});
  }
  //WishList
  goWishL = () => {
    this.props.navigation.navigate("Deseos", {id: this.state.id_us});
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
              <List id='list'           //Lista de los libros agregados al array products (donde deben vasearse los datos de la BD)
                dataArray={this.state.productos}
                keyExtractor={(item) => item._id}
                renderRow={(item) => (
                  <LibroItem id={item.Libro}
                  car={item._id}
                  user={this.state.id_us}
                  cant={item.Cantidad}
                  format={item.Formato}
                  props={this.props}/>
                  
                )}    
              />
            </SafeAreaView>
          </Card>          
        </Content>
        <Footer>
          <FooterTab style={{ backgroundColor: "#FFF" }}>
            <Button style={styles.Button} onPress={()=>{
                  this.props.navigation.navigate("Perfil",{id:this.state.id_us});
            }}>
              <Icon name="user-circle-o" size={30} />
            </Button>
            <Button  style={styles.Button} onPress={ ()=>{
              this.props.navigation.navigate("Carrito",{id:this.state.id})}
              }>
              <Ionicons name="cart" size={30} />
            </Button>
            <Button active style={styles.Button} onPress={this.goHome}>
              <Icon name="home" size={30} />
            </Button>
            <Button  style={styles.Button} onPress={this.goPerfil}>
              <Icon name="list-ul" size={30} />
            </Button>
            <Button style={styles.Button} onPress={this.goWishL}>
              <Icon name="heart" size={30} />
            </Button>

          </FooterTab>
        </Footer>        
        <Text style={styles.Text4}>Total: {this.state.total}</Text>
        <Button rounded success style={styles.ButtonF}>
          <Text style={{
            color: '#fff',}}>
              Comprar
          </Text>
        </Button>
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: 'flex-start',
    fontFamily: "Dosis",
    color: "white",
  },
  Text1: {
    width: 25,
    padding: 10,
    fontSize: 15,
    color: "black",
    fontFamily: "Dosis",
  },

  Text2: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    fontSize: 18,
    color: "black",
    fontFamily: "Dosis",
  },
  Text3: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    fontSize: 20,
    color: "black",
    fontFamily: "Dosis",
  },

  Button1: {
    padding: 10,
    backgroundColor: "#BB8FCE",
    fontFamily: "Dosis",
    fontWeight: "100",
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
  Image: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 60,
    height: 60,
  },
  Flex1: {
    display: "flex",
    flexDirection: "column",
  },
  ButtonF: {
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  Header: {
    fontFamily: "Dosis",
    color: "black",
    fontSize: 30,
    marginTop: 10,
    padding: 10,
    fontWeight: "600",
    alignSelf: "center",
  },
  ButtonHeader: {
    alignSelf: "center",
  },
  Header: {
    fontFamily: "Dosis",
    color: "black",
    fontSize: 40,
    fontWeight: "600",
    alignSelf: "center",
  },
  Image: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 60, 
    height: 60
  },
  Flex1: {
    display: 'flex',
    flexDirection: 'column'
  }, 
  ButtonF: {
    position: 'absolute',
    bottom: 65,
    alignSelf: 'center',
    padding: 50,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5
  }, 
  Text4: {position: 'absolute',
  bottom: 110, 
  alignSelf: "center",
  fontFamily: 'Dosis',
  fontSize: 24
  }
});

export default CarritoScreen;
