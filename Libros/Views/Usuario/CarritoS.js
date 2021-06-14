/*mostrar los libros que el usuario ha agregado a su carrito*/
/*dar la opcion de aumentar el numero por ejemplar pedido*/
/*al presionar cualquiera de los productos en el carrito debe de llevar a los detalles del producto*/
import React, { Component, useState, useEffect } from "react";
import ReactDom from 'react-dom';
import { Text, Dimensions, Alert, Image, StyleSheet, SafeAreaView } from "react-native";
import {
	Container, Header, Content, Footer, FooterTab, Form, Item, Input,
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
	Toast
} from "native-base";
import IP_DB from "../../ip_address";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';

const io = require('socket.io-client');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const productos = [{
//   id: Number,
//   title: String, 
//   price: Number,
//   cant: Number
//   }
// ];

const LibroItem = ({ id, cant, car, user }) => {
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
			<Left>
				<Thumbnail square source={{ uri: `http://${IP_DB}:3000/Libro/Imagen/${libro.Imagen}` }} />
			</Left>
			<Body style={{ paddingLeft: 0, paddingStart: 0 }}>
				<Text>
					{libro.Titulo}
				</Text>
				<Text>
					${libro.Precio}
				</Text>
			</Body>
			<Right>
				<Item>
					<Button transparent
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
										libro: id
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
						<Icon name="minus" size={20} color={'red'} />
					</Button>
					<Text style={styles.Text1}>{cantidad}</Text>
					<Button transparent
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
										libro: id
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
						<Icon name="plus" size={20} color={'green'} />
					</Button>

					<Button transparent style={{ marginLeft: 30 }}
						onPress={async () => {
							return await fetch(`http://${IP_DB}:3000/Usuario/EliminarCarrito/${user}/${car}`)
							.then((res) => {
							})
							.catch((erro) => {
								console.error(erro);
							});
						}} 
					>
						<Icon size={20} color={'red'} name="remove" />
					</Button>
				</Item>
			</Right>
		</ListItem>
	);
}

class CarritoScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id_us: "",
			productos: []
		}
		this._Mounted = false;
	}

	//Montar
	async componentDidMount() {
		if (!this._Mounted) {
			await this.setState({ id_us: this.props.route.params.id });
			await this.getCarritoContent();
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

	getCarritoContent = async () => {
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
					productos: [...data.Carrito]
				})
				console.log(data.Carrito);
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

	render() {
		return (
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

				<List
					dataArray={this.state.productos}
					keyExtractor={item => item._id}
					renderRow={(item) => (
						<LibroItem
							id={item.Libro}
							car={item._id}
							user={this.state.id_us}
							cant={item.Cantidad} />
					)}
				/>
				<Footer>
					<FooterTab style={{ backgroundColor: "#FFF" }}>
						<Button block rounded success style={styles.ButtonF}>
							<Text style={{
								color: '#fff',
							}}>
								Comprar
							</Text>
						</Button>
					</FooterTab>
				</Footer>
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
	},
	ButtonF: {
		alignSelf: 'center',
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.5
	}
});

export default CarritoScreen;
