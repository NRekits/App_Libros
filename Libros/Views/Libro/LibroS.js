/*Aqui se ven la info de un libro seleccionado, da opcion para meter al carrito (cuantos ejemplares) o a la lista de deseos */
import React, { useState, useEffect } from "react";
import { Dimensions, Alert, Image, StyleSheet } from "react-native";
import {
	Container, Header, Content, Form, Item, Input,
	Label,
	Button,
	H1,
	Left,
	Body,
	Right,
	Title,
	Textarea,
	Radio,
	Toast,
	Text
} from "native-base";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import IP_DB from '../../ip_address';
import { isLoading } from "expo-font";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class LibroDetailsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			libro: {
				id: '',
				titulo: '',
				autor: '',
				sinopsis: '',
				genero: '',
				idEditorial: '',
				editorial: '',
				precio: '',
				cantidad: '',
				imagen: '',
				vendidos: '',
				fecha: new Date(),
				formato: ''
			},
			selectedFormat: ''
		}
	}

	async fetchLibro() {
		const { libro } = Object.assign({}, this.state);
		await fetch(`http://${IP_DB}:3000/Libro/Ver/${libro.id}`)
			.then(res => res.json())
			.then(res => res.data)
			.then((res) => {
				const newLibro = {
					id: res._id,
					titulo: res.Titulo,
					autor: res.Autor,
					sinopsis: res.Sinopsis,
					genero: res.Genero,
					idEditorial: res.Id_editorial,
					editorial: res.NombreEditorial,
					precio: res.Precio,
					cantidad: res.Cantidad_dis,
					imagen: res.Imagen,
					vendidos: res.Vendidos,
					fecha: new Date(res.Fecha_adquision),
					formato: res.Formato
				}
				this.setState({ libro: newLibro });
			})
	}

	async componentDidMount() {
		let { libro } = Object.assign({}, this.state);
		libro.id = this.props.route.params.id;
		console.log(this.props.route.params.userId);
		await this.setState({ libro: libro, userId: this.props.route.params.userId });
		await this.fetchLibro();
	}

	Check() {
		let msg = "";
		let error = false;
		console.log('entro');
		if (this.state.selectedFormat === "") {
			msg = "Debes seleccionar un formato primero";
			error = true;
		}
		if (error) {
			Toast.show({ text: msg, buttonText: 'Okay', type: "warning" });
		}
		else {
			console.log(this.state.selectedFormat);
			this.agregarAlCarro();
		}
	}

	agregarDeseados() {
		fetch(`http://${IP_DB}:3000/Usuario/InsertarDeseo/${this.state.userId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idLib: this.state.libro.id
			})
		})
			.then((res) => res.json())
			.then((res) => {
				Toast.show({ text: "El producto se ha agregado a su lista de deseados", type: 'success', buttonText: 'Okay' })
			})
			.finally(() => {
				this.props.navigation.navigate('WishL', { id: this.state.userId });
			})
			.catch(error => {
				Toast.show({ text: 'Hubo un error agregando el producto a su lista de desados', type: 'danger' })
			})
	}

	agregarAlCarro() {

		fetch(`http://${IP_DB}:3000/Usuario/InsertarCarrito/${this.state.userId}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idLib: this.state.libro.id,
					cant: 1,
					format: this.state.selectedFormat
				})
			})
			.then((res) => res.json())
			.then((data) => {
				Toast.show({ text: 'Producto agregado al carrito', buttonText: 'Entendido', type: "success" });
			})
			.finally(() => {
				this.props.navigation.navigate('Home', { id: this.state.userId });
			})
			.catch((error) => {
				Toast.show({ text: "Hubo un error agregando su producto al carrito", type: 'danger' });
			});
	}

	render() {
		const { libro } = this.state;
		return (
			<Container>
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
								this.props.navigation.goBack();
							}}
						>
							<Icon size={30} name="chevron-left" />
						</Button>
					</Left>
					<Body>
						<Title style={styles.Header}>{libro.titulo}</Title>
					</Body>
					<Right />
				</Header>
				<Content style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 30 }}>
					<Image style={{ alignSelf: 'center', width: 200, height: 300 }} source={{ uri: `http://${IP_DB}:3000/Libro/Imagen/${libro.imagen}` }} />
					<Button transparent block style={styles.Button}
						onPress={() => {
							this.agregarDeseados();
						}}
					>
						<Icon name="heart" size={30} />
					</Button>

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Titulo</Label>
						<Input disabled style={styles.Input} value={libro.titulo} />
					</Item>

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Autor</Label>
						<Input disabled style={styles.Input} value={libro.autor} />
					</Item>

					<Item style={styles.Item} disabled>
						<Textarea disabled style={styles.Input} rowSpan={5} value={libro.sinopsis} />
					</Item>

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Genero</Label>
						<Input disabled style={styles.Input} value={libro.genero} />
					</Item>

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Editorial</Label>
						<Input disabled style={styles.Input} value={libro.editorial} />
					</Item>

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Precio</Label>
						<Input disabled style={styles.Input} value={`$${libro.precio}`} />
					</Item>

					{
						libro.cantidad > 0 && (

							<Item style={styles.Item} floatingLabel disabled>
								<Label style={styles.Label}>Disponibles</Label>
								<Input disabled style={styles.Input} value={`${libro.cantidad}`} />
							</Item>

						)
					}
					{ libro.cantidad <= 0 &&
						(
							<Item style={styles.Item} floatingLabel disabled>
								<Label style={styles.Label}>Disponibles</Label>
								<Input disabled style={{ color: 'red', ...styles.Input }} value={"Agotado"} />
							</Item>
						)
					}


					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Disponible desde:</Label>
						<Input disabled style={styles.Input} value={libro.fecha.toDateString()} />
					</Item>
					{
						libro.formato === 'Ambos' && (

							<Content>
								<Item
									onPress={async () => { await this.setState({ selectedFormat: "Físico" }) }}
								>
									<Text>Físico</Text>
									<Right>
										<Radio selected={this.state.selectedFormat === "Físico"}
											onPress={async () => { await this.setState({ selectedFormat: "Físico" }) }}
										/>
									</Right>
								</Item>

								<Item
									onPress={async () => { await this.setState({ selectedFormat: "EPub" }) }}
								>
									<Text>EPub</Text>
									<Right>
										<Radio selected={this.state.selectedFormat === "EPub"}
											onPress={async () => { await this.setState({ selectedFormat: "EPub" }) }}
										/>
									</Right>
								</Item>
							</Content>
						)
					}
					{
						libro.formato === "Físico" && (
							<Content>
								<Item
									onPress={async () => { await this.setState({ selectedFormat: "Físico" }) }}
								>
									<Text>Físico</Text>
									<Right>
										<Radio selected={this.state.selectedFormat === 'Físico'}
											onPress={async () => { await this.setState({ selectedFormat: "Físico" }) }}
										/>
									</Right>
								</Item>
							</Content>
						)
					}
					{
						libro.formato === 'EPub' && (
							<Content>
								<Item
									onPress={async () => { await this.setState({ selectedFormat: "EPub" }) }}
								>
									<Text>EPub</Text>
									<Right>
										<Radio selected={this.state.selectedFormat === 'EPub'}
											onPress={async () => { await this.setState({ selectedFormat: "EPub" }) }}
										/>
									</Right>
								</Item>
							</Content>
						)
					}

					<Button disabled={libro.cantidad <= 0} rounded success block style={styles.Button} onPress={() => {
						this.Check();
					}}>
						<Text>Añadir al carro</Text>
					</Button>

				</Content>
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
		padding: 20,
		fontFamily: "Dosis",
	},
	Input: {
		alignSelf: "flex-start",
		fontFamily: "Dosis",
		fontWeight: "400",
		fontSize: 20,
		marginRight: 5,
	},
	Label: {
		fontWeight: "400",
		fontSize: 18,
		fontFamily: "Dosis",
		marginBottom: 10,
		color: "#0D7C0D",
	},
	Button: {
		alignSelf: "center",
		marginTop: 40,
		borderColor: "#9BFFA3",
	},
	Item: {
		marginTop: 15,
		padding: 5,
	},
	background: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: windowHeight,
	},
	Text2: {
		marginTop: 5,
		fontWeight: "400",
		alignSelf: 'center',
		marginLeft: 5,
		fontFamily: "Dosis",
	},
	Header: {
		color: "#0D7C0D",
		fontFamily: "Dosis",
		fontSize: 20,
		fontWeight: "600"
	},
});