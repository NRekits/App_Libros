/* El usuario aqui ve todas sus direcciones */
import React from "react";
import { Text, Dimensions, StyleSheet, SafeAreaView } from "react-native";
import { Container, Header, Body, Title, H3, List, ListItem} from "native-base";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const direcciones = [
  {id:'abc', ciudad:'Aguascalientes', calle:'Calle 4', numero:123},
  {id:'def', ciudad:'Monteria', calle:'Calle 8', numero:456},
  {id:'ghi', ciudad:'Thornhill', calle:'Calle 12', numero:789},
]

export default function DireccionesScreen ({navigation}){
  return(
    <Container style={styles.Container}>
      <LinearGradient colors={["#FFFFFF", "#C0FFC0", "#FFFFFF"]} style={styles.background}/>
      <Header transparent androidStatusBarColor="#C0FFC0">
        <Body style={{alignItems:"center"}}>
          <Title style={styles.Header}>Aplicacion</Title>
        </Body>
      </Header>

      <H3 style={{alignSelf:"center"}}>Direcciones</H3>
      <Text style={styles.Text3}>Presiona cualquiera para ver mas detalles</Text>

      <SafeAreaView style={{flex:1}}>
        <List 
          dataArray={direcciones} 
          keyExtractor={(item,index)=>index.toString()}
          renderRow={(item)=>(
            <ListItem button onPress={()=>{
              navigation.navigate("DirDetalles",{dirId:item.id});
            }}> 
              <Text style={styles.Text2}>{item.ciudad}: {item.calle} #{item.numero}</Text>
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