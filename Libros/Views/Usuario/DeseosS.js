/*mostrar los libros que el usuario ha agregado a su lista de deseos*/
/*al presionar cualquiera de los deseos debe de llevar a los detalles del producto*/
import React, { Component, useState, useEffect } from "react";
import { Text, Dimensions, Alert, Image, StyleSheet, SafeAreaView } from "react-native";
import {
	Container, View, Header, Footer, FooterTab, Content, Form, Item, Input,
	Label,
	Button,
	H1,
	List,
	ListItem,
	Left,
	Body,
	Right,
	Title, Card, CardItem,
	Thumbnail,
  Toast
} from "native-base";

import IP_DB from "../../ip_address";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";

import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';

// const productos = [{
//   id: Number,
//   title: String, 
//   price: Number
//   }
// ];

const LibroItem = ({ id, id_u, id_d, props }) => {
	const [libro, setLibro] = useState({});
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
		<ListItem>
			<Left>
				<Thumbnail square source={{ uri: `http://${IP_DB}:3000/Libro/Imagen/${libro.Imagen}` }} />
			</Left>
			<Body>
				<Text>
					{libro.Titulo}
				</Text>
				<Text note>{libro.Autor}</Text>
			</Body>
      <Right>
        <Button style={styles.Button} onPress={() => {
          console.log('entro aqui');
          fetch(`http://${IP_DB}:3000/Usuario/EliminarDeseo/${id_u}/${id_d}`)
          Toast.show({ text: "Producto eliminado de la WishList", buttonText: 'Okay', type: "warning" });
          props.navigation.navigate('Home')
          }}>
          <Icon name="trash" size={30} />
        </Button>
      </Right>
		</ListItem>
	);
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class DeseosScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id_us: "",
			productos: [],
			deseos: []
		}
	}

	//Montar
	async componentDidMount() {
		await this.setState({ id_us: this.props.route.params.id });
		//this.setState({id_us: ObjectId("60c520c7bc582f49023b7bad")})
		await this.getWListContent();
	}

	async getWListContent() {
		await fetch(`http://${IP_DB}:3000/Usuario/Ver/${this.props.route.params.id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => res.json())
			.then(async (data) => {
				await this.setState({
					deseos: [...data.Deseos]
				})
				console.log(this.state.deseos);
			})
			.catch((error) => console.log(error));
	}

	async getWLibro() {
		fetch(`http://${IP_DB}:3000/Libro/Ver/${this.state.deseos.Libro}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => res.json())
			.then((dat) => {
				this.setState({
					productos: dat
				})
				console.log(dat + " line 85");
			})
			.catch((error) => console.log(error));
	}
  

	goDirecciones = () => {
		this.props.navigation.navigate("Direcciones", { id: this.state.id_us });
	}

	goHome = () => {
		this.props.navigation.navigate("Home", { id: this.state.id_us });
	}

	//WishList
	goWishL = () => {
		this.props.navigation.navigate("Deseos", { id: this.state.id_us });
	}

  //Ir a lista de generos
  goGeneros = () => {
    this.props.navigation.navigate("Generos", {userId: this.state.id_us});
  }
  
	render() {
		return (
			<Container>
				<Header
					transparent
					androidStatusBarColor="#C0FFC0"
					style={styles.Header}>
					<Left></Left>
					<Body>
						<Title style={styles.Header}> WIHSLIST </Title>
					</Body>
					<Right>
            
          </Right>
				</Header>
				<List           //Lista de los libros agregados al array state.products (donde deben vasearse los datos de la BD)
					dataArray={this.state.deseos}
					keyExtractor={(item) => item._id}
					renderRow={(item) => (
						<LibroItem id={item.Libro} id_u={this.state.id_us} id_d={item._id} props={this.props}/>
					)}
				/>
				<Footer>
					<FooterTab style={{ backgroundColor: "#FFF" }}>
						<Button style={styles.Button} onPress={() => {
							this.props.navigation.navigate("Perfil", { id: this.state.id_us });
						}}>
							<Icon name="user-circle-o" size={30} />
						</Button>
						<Button style={styles.Button} onPress={() => {
							this.props.navigation.navigate("Carrito", { id: this.state.id_us })
						}
						}>
							<Ionicons name="cart" size={30} />
						</Button>
						<Button active style={styles.Button} onPress={this.goHome}>
							<Icon name="home" size={30} />
						</Button>
						<Button style={styles.Button} onPress={this.goGeneros}>
							<Icon name="list-ul" size={30} />
						</Button>
						<Button style={styles.Button} onPress={this.goWishL}>
							<Icon name="heart" size={30} />
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
	}
});


export default DeseosScreen;