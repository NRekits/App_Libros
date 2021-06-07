/*El usuario puede ver los detalles de la direccion y tiene la opcion de modificar o eliminar */
import React, { useEffect } from "react";
import { Text, Dimensions, StyleSheet, Alert } from "react-native";
import { Container, Header, Body, Content, Title, H3, Toast, Row, Col, Button} from "native-base";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const direcciones = [
  {id:'abc', pais:'Mexico', estado:'Aguascalientes',ciudad:'Ags', colonia:'Col 1', calle:'Calle 4', numero:123, cp:1234567},
  {id:'def', pais:'Colombia', estado:'Cordoba',ciudad:'Monteria', colonia:'Col 2', calle:'Calle 8', numero:456, cp:7891234},
  {id:'ghi', pais:'Canada', estado:'Toronto',ciudad:'Thornhill', colonia:'Col 3', calle:'Calle 12', numero:789, cp:4567891},
]

const showAlert = ()=>{
  Alert.alert('Precaucion', '¿Estas seguro de eliminar esta direccion?',
    [
      {
        text:'Cancelar',
        style: "cancel"
      },
      {
        text:'Confirmar',
        onPress:()=>Toast.show({ text: 'Direccion eliminada', buttonText: 'Okay',type: 'danger'}),
        style:"default"
      },
    ],
    {
      cancelable: true
    }
  );
};

export default function DireccionScreen ({route,navigation}){
  const dirId = route.params.dirId
  var direccion = direcciones.find(dir => dir.id == dirId);

  return(
    <Container style={styles.Container}>
      <LinearGradient colors={["#FFFFFF", "#C0FFC0", "#FFFFFF"]} style={styles.background}/>
      <Header transparent androidStatusBarColor="#C0FFC0">
        <Body style={{alignItems:"center"}}>
          <Title style={styles.Header}>Aplicacion</Title>
        </Body>
      </Header>
      <H3 style={{alignSelf:"center"}}>Detalles</H3>

      <Content>
        <Text style={styles.Text2}>Pais: {direccion.pais}</Text>
        <Text style={styles.Text2}>Estado: {direccion.estado}</Text>
        <Text style={styles.Text2}>Ciudad: {direccion.ciudad}</Text>
        <Text style={styles.Text2}>Colonia: {direccion.colonia}</Text>
        <Text style={styles.Text2}>Calle: {direccion.calle}</Text>
        <Row>
          <Col><Text style={styles.Text2}>Numero: {direccion.numero}</Text></Col>
          <Col><Text style={styles.Text2}>CP: {direccion.cp}</Text></Col>
        </Row>
        <Row>
          <Col>
            <Button danger block rounded onPress={showAlert}>
              <Text>Eliminar</Text>
            </Button>
          </Col>
          <Col>
            <Button info block rounded onPress={()=>{
              navigation.navigate("ModificarDir",{dirId:direccion.id});
            }}>
              <Text>Modificar</Text>
            </Button>
          </Col>
        </Row>
      </Content>
    </Container>
  )
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
    alignSelf:'center',
    fontFamily: "Dosis",
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
    fontSize: 40,
    fontWeight: "600"
  },
});