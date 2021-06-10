/* El usuario aqui ve todas sus direcciones */
import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, SafeAreaView } from "react-native";
import {
  Container,
  Header,
  Body,
  Title,
  H3,
  List,
  ListItem,
  Left,
  Right,
  Button,
  Text
} from "native-base";
import IP_DB from "../../ip_address";
import Icon from "react-native-vector-icons/FontAwesome";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function DireccionesScreen({ route, navigation }) {
  const [direcciones, setDirecciones] = useState([]);
  const [idus, setIdus]=useState('');

  useEffect(() => {
    setIdus(route.params.id)
    fetch(`http://${IP_DB}:3000/Usuario/Ver/${route.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDirecciones(data.Direccion);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container style={styles.Container}>
      <Header transparent androidStatusBarColor="#C0FFC0" style={styles.Header}>
        <Left>
          <Button
            transparent
            style={styles.Button}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="chevron-left" size={30} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.Header}> DIRECCIONES </Title>
        </Body>
        <Right></Right>
      </Header>
      
      <Button
            transparent
            style={styles.Button}
            onPress={() => {
              navigation.navigate("ADireccion", { id:idus});
            }}
          >
          <Text styles={styles.Text3}>Añadir Dirección</Text>
          </Button>
      <H3 style={styles.H3}>Presiona cualquiera para ver mas detalles</H3>

      <SafeAreaView style={{ flex: 1 }}>
        <List
          dataArray={direcciones}
          keyExtractor={(item, index) => index.toString()}
          renderRow={(item) => (
            <ListItem
              button
              onPress={() => {
                navigation.navigate("DirDetalles", { usid:idus, dirId: item._id, dirs: direcciones.find((dir) => dir._id == item._id)});
              }}
            >
              <Text style={styles.Text2}>
                {item.Ciudad}: {item.Calle} #{item.Numero_int}
              </Text>
            </ListItem>
          )}
        />
      </SafeAreaView>
    </Container>
  );
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
  Button: {
    alignSelf: "flex-start",
    fontFamily: "Dosis",
    backgroundColor: "white",
    fontWeight: "400",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: windowHeight,
  },
  Header: {
    fontFamily: "Dosis",
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
    color: "#0D7C0D",
  },
  H3: {
    fontFamily: "Dosis",
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
  },
});
