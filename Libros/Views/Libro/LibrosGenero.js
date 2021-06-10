import React from 'react';
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
  Text
} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";

const windowHeight = Dimensions.get('window').height;

export default class LibroGenero extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
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
						style={styles.Button}
						onPress={() => {
							this.props.navigation.navigate.goBack();
						}}
					>
						<Icon name="chevron-left" size={30}/>
					</Button>
				</Left>
				<Body>
					<Title style={styles.Header}>GENEROS</Title>
				</Body>
				<Right />
			</Header>

			<Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab tabStyle={{backgroundColor: "#FFF"}} heading="Aventura">
          <Container>
            <Text>Aventura</Text>
          </Container>
        </Tab>
        <Tab heading="Ciencia ficción">
          <Container>
            <Text>Ciencia ficción</Text>
          </Container>
        </Tab>
        <Tab heading="Terror">
          <Container>
            <Text>Terror</Text>
          </Container>
        </Tab>
        <Tab heading="Romance">
          <Container>
            <Text>Romance</Text>
          </Container>
        </Tab>
        <Tab heading="Humor">
          <Container>
            <Text>Humor</Text>
          </Container>
        </Tab>
        <Tab heading="Poesía">
          <Container>
            <Text>Poesía</Text>
          </Container>
        </Tab>
        <Tab heading="Clásicos">
          <Container>
            <Text>Clásicos</Text>
          </Container>
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
});