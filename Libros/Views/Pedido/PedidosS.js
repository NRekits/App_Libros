/* Mostrar los pedidos, separados por estados*/
/*no pagados/cancelados
procesados
enviados
devoluciones
*/
import React, { useEffect, useState } from "react";
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
  Text,
  Tab,
  Tabs,
  ScrollableTab
} from "native-base";
import IP_DB from "../../ip_address";
import Icon from "react-native-vector-icons/FontAwesome";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PedidosScreen ({route, navigation}) {
  const [pedidos, setPedidos] = useState([]);
  const [enviados, setEnviados] = useState([]);
  const [procesados, setProcesados] = useState([]);
  const [cancelados, setCancelados] = useState([]);
  const [devoluciones, setDevoluciones] = useState([]);
  const [idUs, setIdUs] = useState('');
  const [fetching, setFetching] = useState(true);

  // datos de prueba
  const prueba = [
    {_id:1, No_rastreo:123, Fecha_pedido:"2021-06-01", Monto:100, Estado:"Procesado"},
    {_id:2, No_rastreo:456, Fecha_pedido:"2021-06-03", Monto:200, Estado:"Procesado"},
    {_id:3, No_rastreo:789, Fecha_pedido:"2021-06-05", Monto:300, Estado:"Enviado"},
    {_id:4, No_rastreo:147, Fecha_pedido:"2021-06-07", Monto:400, Estado:"Enviado"},
    {_id:5, No_rastreo:258, Fecha_pedido:"2021-06-09", Monto:400, Estado:"Cancelado"},
    {_id:6, No_rastreo:369, Fecha_pedido:"2021-06-11", Monto:300, Estado:"Cancelado"},
    {_id:7, No_rastreo:159, Fecha_pedido:"2021-06-13", Monto:200, Estado:"Devolucion"},
    {_id:8, No_rastreo:357, Fecha_pedido:"2021-06-15", Monto:100, Estado:"Devolucion"},
  ]

  // Funcion de renderizado de Pestañas. "Arregla" un bug de NativeBase
  // Creo no se pueden poner estilos sin provocar el error otra vez.
  const renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle);
    return <ScrollableTab/>
  }

  useEffect(() => {
	async function fetchPedidos(){
		if(fetching){
			await fetch();
			await setFetching(false);
		}
		fetchPedidos();

		return (() => {
		});
	}
    setIdUs(route.params.id);
    // Carga de datos.
    setPedidos(prueba);
    // Lo deje para hacer varias llamadas, algo como getPedidos/enviados, getPedidos/cancelados
    // React tiene problemas manejando objetos Date, asi que seria conveniente traerlos ya como string
    setProcesados([prueba[0],prueba[1]]);
    setEnviados([prueba[2],prueba[3]]);
    setCancelados([prueba[4],prueba[5]]);
    setDevoluciones([prueba[6],prueba[7]]);
  },[]);

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
          <Title style={styles.Header}> PEDIDOS </Title>
        </Body>
        <Right></Right>
      </Header>

      <Tabs renderTabBar={renderTabBar}>
        <Tab heading="Todos">
          <SafeAreaView style={{ flex: 1 }}>
            <List
              dataArray={pedidos}
              keyExtractor={(item, index) => index.toString()}
              renderRow={(item) => (
                <ListItem
                  button
                  onPress={() => {
                    navigation.navigate("PedDetalles", { usid:idUs, pedId: item._id, pedd: pedidos.find((ped) => ped._id == item._id)});
                  }}
                >
                  <Text style={styles.Text2}>
                    No:{item.No_rastreo}{'\n'} Fecha:{item.Fecha_pedido}{'\t\t\t'}${item.Monto}
                  </Text>
                </ListItem>
              )}
            />
          </SafeAreaView>
        </Tab>
        <Tab heading="Procesados" tabStyle={{color:'red'}}>
          <SafeAreaView style={{ flex: 1 }}>
            <List
              dataArray={procesados}
              keyExtractor={(item, index) => index.toString()}
              renderRow={(item) => (
                <ListItem
                  button
                  onPress={() => {
                    navigation.navigate("PedDetalles", { usid:idUs, pedId: item._id, pedd: procesados.find((ped) => ped._id == item._id)});
                  }}
                >
                  <Text style={styles.Text2}>
                  No:{item.No_rastreo}{'\n'} Fecha:{item.Fecha_pedido}{'\t\t\t'}${item.Monto}
                  </Text>
                </ListItem>
              )}
            />
          </SafeAreaView>
        </Tab>
        <Tab heading="Enviados">
          <SafeAreaView style={{ flex: 1 }}>
            <List
              dataArray={enviados}
              keyExtractor={(item, index) => index.toString()}
              renderRow={(item) => (
                <ListItem
                  button
                  onPress={() => {
                    navigation.navigate("PedDetalles", { usid:idUs, pedId: item._id, pedd: enviados.find((ped) => ped._id == item._id)});
                  }}
                >
                  <Text style={styles.Text2}>
                  No:{item.No_rastreo}{'\n'} Fecha:{item.Fecha_pedido}{'\t\t\t'}${item.Monto}
                  </Text>
                </ListItem>
              )}
            />
          </SafeAreaView>
        </Tab>
        <Tab heading="Cancelados">
          <SafeAreaView style={{ flex: 1 }}>
            <List
              dataArray={cancelados}
              keyExtractor={(item, index) => index.toString()}
              renderRow={(item) => (
                <ListItem
                  button
                  onPress={() => {
                    navigation.navigate("PedDetalles", { usid:idUs, pedId: item._id, pedd: cancelados.find((ped) => ped._id == item._id)});
                  }}
                >
                  <Text style={styles.Text2}>
                  No:{item.No_rastreo}{'\n'} Fecha:{item.Fecha_pedido}{'\t\t\t'}${item.Monto}
                  </Text>
                </ListItem>
              )}
            />
          </SafeAreaView>
        </Tab>
        <Tab heading="Devoluciones">
          <SafeAreaView style={{ flex: 1 }}>
            <List
              dataArray={devoluciones}
              keyExtractor={(item, index) => index.toString()}
              renderRow={(item) => (
                <ListItem
                  button
                  onPress={() => {
                    navigation.navigate("PedDetalles", { usid:idUs, pedId: item._id, pedd: devoluciones.find((ped) => ped._id == item._id)});
                  }}
                >
                  <Text style={styles.Text2}>
                  No:{item.No_rastreo}{'\n'} Fecha:{item.Fecha_pedido}{'\t\t\t'}${item.Monto}
                  </Text>
                </ListItem>
              )}
            />
          </SafeAreaView>
        </Tab>
      </Tabs>
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