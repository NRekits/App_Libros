import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
	Container,
	Header,
	Left,
	Body,
	Right,
	ScrollableTab,
	Button,
	Title,
	Tabs,
	Tab,
	Text,
	List,
	TabHeading
} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from '../../ip_address';
import { useEffect } from 'react/cjs/react.development';
import LibroItem from './LibroItem';

const windowHeight = Dimensions.get('window').height;

const renderTabBar = (props) => {
	props.tabStyle = Object.create(props.tabStyle);
	return <ScrollableTab {...props} />
}

function LibrosGenero({ genero, navigate }) {
	const [data, setData] = useState([]);
	const [fetchingData, setFetchingData] = useState(true);
	useEffect(() => {
		async function fetchData() {

			if (fetchingData) {
				await fetch(`http://${IP_DB}:3000/Libro/VerGenero/${genero}`)
					.then((res) => res.json())
					.then(res => res.data)
					.then((res) => {
						setData([...res]);
					}).finally(() => { });
				await setFetchingData(false);
			}
		}
		fetchData();
		return () => {

		};
	}, []);

	return (
		<List
			dataArray={data}
			keyExtractor={item => item._id}
			renderRow={(item) => {
				return (
					<LibroItem
						id={item._id}
						image={item.Imagen}
						titulo={item.Titulo}
						autor={item.Autor}
						precio={item.Precio}
						navigate={navigate}
					/>
				);
			}}
		/>
	);
}

export default class LibroGenero extends React.Component {
	constructor(props) {
		super(props);
		this.goToLibro = this.goToLibro.bind(this);
		this.state = {
			userId: "",
		};
	}
	goToLibro(id) {
		this.props.navigation.navigate('LibroS', { id: id, userId: this.state.userId });
	}
	async componentDidMount() {
		await this.setState({ userId: this.props.route.params.userId })
	}
	render() {
		return (
			<Container style={styles.Container}>
				<Header
					transparent
					androidStatusBarColor="#C0FFC0"
					style={styles.Header}
					hasTabs
				>
					<Left>
						<Button
							transparent
							style={styles.ButtonHeader}
							onPress={() => {
								this.props.navigation.goBack();
							}}
						>
							<Icon name="chevron-left" size={20} />
						</Button>
					</Left>
					<Body>
						<Title style={styles.Header}>GENEROS</Title>
					</Body>
					<Right />
				</Header>

				<Tabs tabBarUnderlineStyle={{ backgroundColor: '#0D7C0D' }} initialPage={0} renderTabBar={renderTabBar}>
					<Tab
						heading={
							<TabHeading style={styles.WhiteBg}>
								<Text style={styles.Header}>Aventura</Text>
							</TabHeading>
						}
					>
						<LibrosGenero navigate={this.goToLibro} genero="Aventura" />
					</Tab>
					<Tab
						heading={
							<TabHeading style={styles.WhiteBg}>
								<Text style={styles.Header}>Ciencia Ficción</Text>
							</TabHeading>
						}
					>
						<LibrosGenero navigate={this.goToLibro} genero="Ciencia Ficción" />
					</Tab>
					<Tab
						heading={
							<TabHeading style={styles.WhiteBg}>
								<Text style={styles.Header}>Terror</Text>
							</TabHeading>
						}
					>
						<LibrosGenero navigate={this.goToLibro} genero="Terror" />
					</Tab>
					<Tab
						heading={
							<TabHeading style={styles.WhiteBg}>
								<Text style={styles.Header}>Romance</Text>
							</TabHeading>
						}
					>
						<LibrosGenero navigate={this.goToLibro} genero="Romance" />
					</Tab>
					<Tab
						heading={
							<TabHeading style={styles.WhiteBg}>
								<Text style={styles.Header}>Humor</Text>
							</TabHeading>
						}
					>
						<LibrosGenero navigate={this.goToLibro} genero="Humor" />
					</Tab>
					<Tab
						heading={
							<TabHeading style={styles.WhiteBg}>
								<Text style={styles.Header}>Poesía</Text>
							</TabHeading>
						}

					>
						<LibrosGenero navigate={this.goToLibro} genero="Poesía" />
					</Tab>
					<Tab

						heading={
							<TabHeading style={styles.WhiteBg}>
								<Text style={styles.Header}>Clásicos</Text>
							</TabHeading>
						}
					>
						<LibrosGenero navigate={this.goToLibro} genero="Clásico" />
					</Tab>
				</Tabs>
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
		marginBottom: 10,
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
	Header: {
		color: "#0D7C0D",
		fontFamily: "Dosis",
		fontSize: 20,
		fontWeight: "600"
	},
	ButtonHeader: {
		alignSelf: "center",
		borderColor: "#9BFFA3",
	},
	Underline: {
		backgroundColor: '#0D7C0D'
	},
	WhiteBg: {
		backgroundColor: 'white'
	}
});