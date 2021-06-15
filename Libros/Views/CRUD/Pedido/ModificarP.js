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
  Picker,
  Row,
  Col,
  Left,
  Right,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from "../../../ip_address";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MPedidosScreen({ route, navigation }) {
  const pedId = route.params.pedId;
  var data = route.params.ped;

  const [nome, setNome] = useState(data.No_rastreo);
  const [est, setEst] = useState(data.Estado);
  const [fechal, setFechal] = useState(data.Fecha_llegada);

  const Check = () => {
    var msg = "";
    var error = false;

    if (nome === "") {
      msg = "No. de rastreo es un campo requerido";
      error = true;
    } else if (est == "") {
      msg = "Estado es un campo requerido";
      error = true;
    } else if (fechal === undefined || fechal === null) {
      msg = "Fecha es un campo requerido";
      error = true;
    }

    if (error) {
      Toast.show({ text: msg, buttonText: "Okay", type: "warning" });
    } else {
      fetch(`http://${IP_DB}:3000/Pedido/Modificar/${pedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: est,
          rastreo: nome,
          fechal: fechal.toISOString(),
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
          <Title style={styles.Header}> Pedido </Title>
        </Body>
        <Right></Right>
      </Header>

      <H3 style={{ alignSelf: "center", fontSize: 20, fontFamily: "Dosis" }}>
        Modificar pedido
      </H3>

      <Content style={styles.Content}>
        <Form>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>No. rastreo</Label>
            <Input
              keyboardType="numeric"
              style={styles.Input}
              onChangeText={(nome) => setNome(nome)}
              value={nome}
            />
          </Item>
          
						<Item picker style={styles.Item}>
							<Picker
								mode="dropdown"
								selectedValue={est}
								style={{ width: undefined, height: 50 }}
								onValueChange={(value) => setEst(value)}
							>
								<Picker.Item label="Selecciona un Estado" value="" />
								<Picker.Item label="Procesado" value="Procesado" />
								<Picker.Item label="Enviado" value="Enviado" />
								<Picker.Item label="Cancelado" value="Cancelado" />
                <Picker.Item label="Devuelto" value="Devuelto" />
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
