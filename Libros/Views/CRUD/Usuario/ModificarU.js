import React, { useState } from "react";
import { Text, Dimensions, StyleSheet } from "react-native";
import { Container, Header, Content, Form, Toast, Item, Input,
  Label, Button, Body, Title, H3, Picker, Left, Right,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from "../../../ip_address";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MUsuarioScreen({ route, navigation }) {
  const userId = route.params.userId;
  var data = route.params.user;

  const [nombre, setNombre] = useState(data.Nombre);
  const [apellido, setApellido] = useState(data.Apellido);
  const [contra, setContra] = useState(data.Contrasena);
  const [email, setEmail] = useState(data.Email);
  const [admi, setAdmi] = useState(data.Admi);

  const Check = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var msg = "";
    var error = false;

    if (nombre === "") {
      msg = "Nombre es un campo requerido";
      error = true;
    } else if (apellido == "") {
      msg = "Apellido es un campo requerido";
      error = true;
    } else if (contra == "") {
      msg = "Contraseña es un campo requerido";
      error = true;
    } else if (email == "") {
      msg = "Correo es un campo requerido";
      error = true;
    } else if (!emailRegex.test(email)) {
      msg = "No es un correo válido";
      error = true;
    }

    if (error) {
      Toast.show({ text: msg, buttonText: "Okay", type: "warning" });
    } else {
      fetch(`http://${IP_DB}:3000/Usuario/Modificar/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: nombre,
          Apellido: apellido,
          email: email.toLowerCase().trimEnd(),
          contra: contra,
          admi: admi,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(admi)
          Toast.show({
            text: "Usuario modificado",
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
          <Title style={styles.Header}> USUARIO </Title>
        </Body>
        <Right></Right>
      </Header>

      <H3 style={{ alignSelf: "center", fontSize: 20, fontFamily: "Dosis" }}>
        Modificar usuario
      </H3>

      <Content style={styles.Content}>
        <Form>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Nombre</Label>
            <Input
              style={styles.Input}
              onChangeText={(nombre) => setNombre(nombre)}
              value={nombre}
            />
          </Item>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Apellido</Label>
            <Input
              style={styles.Input}
              onChangeText={(apellido) => setApellido(apellido)}
              value={apellido}
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
            <Label style={styles.Label}>Contraseña</Label>
            <Input
              style={styles.Input}
              secureTextEntry={true}
              onChangeText={(contra) => setContra(contra)}
              value={contra}
            />
          </Item>

          <Item picker style={styles.Item}>
            <Picker
              mode="dropdown"
              selectedValue={admi}
              style={{ width: undefined, height: 50 }}
              onValueChange={(admi) => setAdmi(admi)}
            >
              <Picker.Item label="Selecciona un tipo" value={false} />
              <Picker.Item label="Administrador" value={true} />
              <Picker.Item label="Regular" value={false} />
            </Picker>
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
