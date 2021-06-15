/*mostrar los libros que el usuario ha agregado a su carrito*/
/*dar la opcion de aumentar el numero por ejemplar pedido*/
/*al presionar cualquiera de los productos en el carrito debe de llevar a los detalles del producto*/
import React, { Component, useState, useEffect } from "react";
import ReactDom from "react-dom";
import {
	Text, Dimensions, Alert,
	Image, StyleSheet, SafeAreaView,
} from "react-native";
import {
	Container, Header, Content, Footer, FooterTab,
	Form, Item, Input, Label, Button, H1, View, List,
	ListItem, Left, Right, Body, Card, CardItem,
	Title, Thumbnail, Toast,
} from "native-base";
import IP_DB from "../../ip_address";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";

const io = require("socket.io-client");

const LibroItem = ({ id, cant, car, user, monto }) => {
	const [libro, setLibro] = useState({});
	const [cantidad, setCantidad] = useState(cant);
	const [fetchData, setFetchData] = useState(true);
	useEffect(() => {
		async function fetchLibro() {
			await fetch(`http://${IP_DB}:3000/Libro/Ver/${id}`)
				.then((res) => res.json())
				.then((res) => res.data)
				.then((res) => {
					if (fetchData) {
						setLibro(Object.assign({}, res));
					}
				});
		}
		fetchLibro();
		return () => {
			setFetchData(false);
		};
	}, [libro, cantidad]);

	return (
		<ListItem thumbnail>
			<Left>
				<Thumbnail
					square
					source={{ uri: `http://${IP_DB}:3000/Libro/Imagen/${libro.Imagen}` }}
				/>
			</Left>
			<Body style={{ paddingLeft: 0, paddingStart: 0 }}>
				<Text>{libro.Titulo}</Text>
				<Text>${monto}</Text>
			</Body>
			<Right>
				<Item>
					<Button
						transparent
						onPress={async () => {
							if (cantidad > 1) {
								const cant = cantidad - 1;
								await setCantidad(cantidad - 1);
								return await fetch(
									`http://${IP_DB}:3000/Usuario/ModificarCarrito/${user}/${car}`,
									{
										method: "PUT",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											cant: cant,
											idLib: libro._id,
											monto: (cant * libro.Precio)
										}),
									}
								)
									.then((res) => { })
									.catch((error) => {
										console.error(error);
									});
							} else if (cantidad <= 1) {
								return await fetch(
									`http://${IP_DB}:3000/Usuario/EliminarCarrito/${user}/${car}`
								)
									.then((res) => { })
									.catch((erro) => {
										console.error(erro);
									});
							}
						}}
					>
						<Icon name="minus" size={20} color={"red"} />
					</Button>
					<Text style={styles.Text1}>{cantidad}</Text>
					<Button
						transparent
						onPress={async () => {
							if (cantidad < Number(libro.Cantidad_dis)) {
								const cant = cantidad + 1;
								await setCantidad(cantidad + 1);
								await fetch(
									`http://${IP_DB}:3000/Usuario/ModificarCarrito/${user}/${car}`,
									{
										method: "PUT",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											cant: cant,
											idLib: id,
                      // enviar tambien el formato del libro format:libro.Formato,
											monto: (cant * libro.Precio)
										}),
									}
								)
									.then((res) => { })
									.catch((error) => {
										console.error(error);
									});
							} else {
								console.log(Number(libro.Cantidad_dis));
								Toast.show({
									text: "El ejemplar no se encuentra disponible",
									type: "warning",
								});
							}
						}}
					>
						<Icon name="plus" size={20} color={"green"} />
					</Button>

					<Button
						transparent
						style={{ marginLeft: 30 }}
						onPress={async () => {
							return await fetch(
								`http://${IP_DB}:3000/Usuario/EliminarCarrito/${user}/${car}`
							)
								.then((res) => { })
								.catch((erro) => {
									console.error(erro);
								});
						}}
					>
						<Icon size={20} color={"red"} name="remove" />
					</Button>
				</Item>
			</Right>
		</ListItem>
	);
};

class CarritoScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id_us: "",
			productos: [],
			total: 0,
		};
		this._Mounted = true;
	}

	//Montar
	async componentDidMount() {
		if (this._Mounted) {
			await this.setState({ id_us: this.props.route.params.id });
		}
		await this.getCarritoContent();
		const socket = io.connect(`http://${IP_DB}:3001`);
		socket.emit("create", `shop:${this.state.id_us}`);
		socket.on("joined", (res) => {
			console.log("Se ha ingresado");
		});
		socket.on(`update:shop:${this.state.id_us}`, async (data) => {
			if (this._Mounted) {
				let total = 0;
				data.productos.forEach((value) => {
					total += value.Submonto
				})
				await this.setState({ productos: [...data.productos], total: total });
			}
		});
	}

	componentWillUnmount() {
		this._Mounted = false;
	}

	getCarritoContent = async () => {
		await fetch(
			`http://${IP_DB}:3000/Usuario/Ver/${this.props.route.params.id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => res.json())
			.then(async (data) => {
				if (this._Mounted) {
					let total = 0;
					data.Carrito.forEach((value) => {
						total += value.Submonto;
					})
					await this.setState({
						productos: [...data.Carrito],
						total: total,
					});
				}
			})
			.catch((error) => console.log(error));
	};

	goDirecciones = () => {
		this.props.navigation.navigate("Direcciones", { id: this.state.id_us });
	};
	goHome = () => {
		this.props.navigation.navigate("Home", { id: this.state.id_us });
	};
	goGeneros = () => {
		this.props.navigation.navigate("Generos", { userId: this.state.id_us });
	};
	//WishList
	goWishL = () => {
		this.props.navigation.navigate("Deseos", { id: this.state.id_us });
	};

	render() {
		return (
			<Container>
				<Header
					transparent
					androidStatusBarColor="#C0FFC0"
					style={styles.Header}
				>
					<Left>
						<Ionicons name="cart" size={30} />
					</Left>
					<Body>
						<Title style={styles.Header}> CARRITO </Title>
					</Body>
					<Right></Right>
				</Header>

				<List
					dataArray={this.state.productos}
					keyExtractor={(item) => item._id}
					renderRow={(item) => (
						<LibroItem
							id={item.Libro}
							car={item._id}
							user={this.state.id_us}
							cant={item.Cantidad}
							monto={item.Submonto}
							formato={item.Formato}
						/>
					)}
				/>
				<View>
					<Button
						rounded
						success
						style={styles.Button1}
						onPress={() => {
							if (this.state.productos.length > 0) {
                console.log(this.state.productos)
								this.props.navigation.navigate("APedido", {
									id: this.state.id_us, car: this.state.productos,
									monto: this.state.total
								});
							}else{
								Toast.show({text: "No hay libros en el carrito", buttonText: "Okay", type:"warning"});
							}


						}}
					>
						<Text
							style={{ fontFamily: 'Dosis', fontSize: 20, color: 'white' }}
						>
							Comprar
              </Text>
					</Button>
				</View>

				<Footer>
					<FooterTab style={{ backgroundColor: "#FFF" }}>
						<Button
							style={styles.Button}
							onPress={() => {
								this.props.navigation.navigate("Perfil", {
									id: this.state.id_us,
								});
							}}
						>
							<Icon name="user-circle-o" size={30} />
						</Button>
						<Button
							style={styles.Button}
							onPress={() => {
								this.props.navigation.navigate("Carrito", {
									id: this.state.id_us,
								});
							}}
						>
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
		justifyContent: "flex-start",
		fontFamily: "Dosis",
		color: "white",
	},
	Text1: {
		width: '25%',
		fontSize: 15,
		color: "black",
		fontFamily: "Dosis",
		paddingHorizontal: 10,
		textAlign: 'center'
	},

	Text2: {
		display: "flex",
		flexDirection: "column",
		alignSelf: "flex-start",
		fontSize: 18,
		color: "black",
		fontFamily: "Dosis",
	},
	Text3: {
		display: "flex",
		flexDirection: "column",
		alignSelf: "flex-start",
		justifyContent: "flex-end",
		fontSize: 20,
		color: "black",
		fontFamily: "Dosis",
	},

	Button1: {
		padding: 10,
		fontFamily: "Dosis",
		alignSelf: 'center',
		padding: 30,
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
});

export default CarritoScreen;
