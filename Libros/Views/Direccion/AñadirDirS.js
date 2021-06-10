/* El usuario aqui agrega una direccion */
import React, { useState } from "react";
import { Text, Dimensions, StyleSheet } from "react-native";
import { Container, Header, Content, Form, Toast,
        Item, Input,Label,Button, Body, Title, H3, Row, Col, Left,Right} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import IP_DB from "../../ip_address";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ADireccionScreen ({route,navigation}){
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [colonia, setColonia] = useState("");
  const [calle, setCalle] = useState("");
  const [numeroInt, setNumeroInt] = useState("");
  const [cp, setCP] = useState("");

  const Check = ()=>{ 
    var msg = "";
    var error = false;

    if(pais === ""){
      msg="Pais es un campo requerido"; 
      error = true;
    } 
    else if(estado == ""){
      msg="Estado es un campo requerido"; 
      error = true;
    } 
    else if(ciudad == ""){
      msg="Ciudad es un campo requerido"; 
      error = true;
    }
    else if(colonia == ""){
      msg="Colonia es un campo requerido"; 
      error = true;
    } 
    else if(calle == ""){
      msg="Calle es un campo requerido"; 
      error = true;
    }
    else if(numeroInt == ""){
      msg="Numero es un campo requerido"; 
      error = true;
    }
    else if(cp == ""){
      msg="Codigo postal es un campo requerido"; 
      error = true;
    }
    else if(numeroInt.includes('.') || numeroInt.includes('-') || numeroInt.includes(',')){
      msg="No se permiten caracteres especiales en Numero"; 
      error = true;
    }
    else if(cp.includes('.') || cp.includes('-') || cp.includes(',')){
      msg="No se permiten caracteres especiales en Codigo Postal"; 
      error = true;
    }
    else if(numeroInt.includes(' ')){
      msg="No se permiten espacios en Numero"; 
      error = true;
    }
    else if(cp.includes(' ')){
      msg="No se permiten espacios en Codigo Postal"; 
      error = true;
    }
    else if(cp.length !=5){
      msg="Codigo Postal debe ser de 5 digitos"; 
      error = true;
    }

    if(error){
      Toast.show({ text: msg, buttonText: 'Okay',type: 'warning'});
    }
    else{
      fetch(`http://${IP_DB}:3000/Usuario/InsertarDireccion/${route.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },  
         body: JSON.stringify({
          pais: pais,
          estado: estado,
          ciudad: ciudad,
          colonia: colonia,
          calle: calle,
          num:numeroInt,
          cod:cp,
       
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          Toast.show({ text: 'Dirección añadida', buttonText: 'Okay',type: 'success'});

          navigation.navigate("Perfil", {
            id: route.params.id,
          });
        })
        .catch((error) => console.error(error));
    
    }
  }

  return(
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
      
      <H3 style={{alignSelf:"center", fontSize:20}}>Añadir dirección</H3>

      <Content style={styles.Content}>
        <Form>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Pais</Label> 
            <Input style={styles.Input}
              onChangeText={(pais)=>setPais(pais)}
            />
          </Item>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Estado</Label> 
            <Input style={styles.Input}
              onChangeText={(estado)=>setEstado(estado)}
            />
          </Item>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Ciudad</Label> 
            <Input style={styles.Input}
              onChangeText={(ciudad)=>setCiudad(ciudad)}
            />
          </Item>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Colonia</Label> 
            <Input style={styles.Input}
              onChangeText={(colonia)=>setColonia(colonia)}
            />
          </Item>
          <Item floatingLabel style={styles.Item}>
            <Label style={styles.Label}>Calle</Label> 
            <Input style={styles.Input}
              onChangeText={(calle)=>setCalle(calle)}
            />
          </Item>
          <Row>
            <Col>
              <Item floatingLabel style={styles.Item}>
                <Label style={styles.Label}>Numero</Label> 
                <Input keyboardType="numeric" style={styles.Input}
                  onChangeText={(num)=>setNumeroInt(num)}
                />
              </Item>
            </Col>
            <Col>
              <Item floatingLabel style={styles.Item}>
                <Label style={styles.Label}>Codigo Postal</Label> 
                <Input keyboardType="numeric" style={styles.Input}
                  onChangeText={(cp)=>setCP(cp)}
                />
              </Item>
            </Col>
          </Row>
          <Button block rounded success
            style={styles.Button} onPress={Check}
          >
            <Text style={styles.Text2}>Registrar</Text>
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