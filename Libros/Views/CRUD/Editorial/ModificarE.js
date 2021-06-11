/* El usuario aqui agrega una direccion */
import React, { useState } from "react";
import { Text, Dimensions, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Toast,
  Item,
  Input,
  Label,
  Button,
  Body,
  Title,
  H3,
  Row,
  Col,
  Left,
  Right,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from "../../../ip_address";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MEditorialScreen({ route, navigation }) {
  const editId = route.params.editId;
  var data = route.params.edit;

  const [nome, setNome] = useState(data.Nombre_encargado);
  const [apee, setApee] = useState(data.Ape_encargado);
  const [nombreE, setNombreE] = useState(data.Nombre_editorial);
  const [email, setEmail] = useState(data.Email);
  const [tel, setTel] = useState(data.Tel.toString());

  const Check = () => {
	const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var msg = "";
    var error = false;

    if (nome === "") {
      msg = "Nombre de encargado es un campo requerido";
      error = true;
    } else if (apee == "") {
      msg = "Apellido de encargado es un campo requerido";
      error = true;
    } else if (nombreE == "") {
      msg = "Nombre de editorial es un campo requerido";
      error = true;
    } else if (email == "") {
      msg = "Correo es un campo requerido";
      error = true;
    } else if (!emailRegex.test(email)){
		msg ="Ese no es un correo válido";
		error = true;
	} else if (tel.includes(".") || tel.includes("-") || tel.includes(",")) {
      msg = "No se permiten caracteres especiales en Telefono";
      error = true;
    } else if (tel.includes(" ")) {
      msg = "No se permiten espacios en Telefono";
      error = true;
    } else if (tel.length != 9) {
      msg = "El teléfono debe ser de 5 digitos";
      error = true;
    }

    if (error) {
      Toast.show({ text: msg, buttonText: "Okay", type: "warning" });
    } else {
      fetch(`http://${IP_DB}:3000/Editorial/Modificar/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomencargado: nome,
          apeencargado: apee,
          nomedit: nombreE,
          email: email.toLowerCase().trimEnd(),
          tel: tel,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          Toast.show({
            text: "Editorial modificada",
            buttonText: "Okay",
            type: "success",
          });

          navigation.navigate("HomeAdmi");
        })
        .catch((error) => console.error(error));
    }
  };

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
          <Title style={styles.Header}> EDITORIAL </Title>
        </Body>
        <Right></Right>
      </Header>

      <H3 style={{ alignSelf: "center", fontSize: 20, fontFamily: "Dosis" }}>
        Modificar editorial
      </H3>

      <Content style={styles.Content}>
        <Form>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Nombre encargado</Label>
            <Input
              style={styles.Input}
              onChangeText={(nome) => setNome(nome)}
              value={nome}
            />
          </Item>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Apellido encargado</Label>
            <Input
              style={styles.Input}
              onChangeText={(apee) => setApee(apee)}
              value={apee}
            />
          </Item>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Nombre editorial</Label>
            <Input
              style={styles.Input}
              onChangeText={(nombreE) => setNombreE(nombreE)}
              value={nombreE}
            />
          </Item>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Correo</Label>
            <Input
              style={styles.Input}
              onChangeText={(email) => setEmail(email)}
              value={email}
            />
          </Item>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Numero teléfonico</Label>
            <Input
              keyboardType="numeric"
              style={styles.Input}
              onChangeText={(tel) => setTel(tel)}
              value={tel}
            />
          </Item>

          <Button block rounded success style={styles.Button} onPress={Check}>
            <Text style={styles.Text2}>Modificar</Text>
          </Button>
        </Form>
      </Content>
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
    alignSelf: "center",
    fontSize: 20,
    marginLeft: 5,
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
    fontWeight: "600",
  },
});
