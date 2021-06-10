import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { Root, Text, Spinner, Container
 } from 'native-base';
//Pantallas
//Usuario
import LoginScreen from "./Views/LoginS";
import RegisterScreen from "./Views/RegistroS";
import PerfilScreen from "./Views/Usuario/PerfilS";
import HomeScreen from "./Views/Usuario/HomeS";
import CarritoScreen from "./Views/Usuario/CarritoS";

//Direccion
import ADireccionScreen from "./Views/Direccion/AñadirDirS";
import DireccionesScreen from './Views/Direccion/DireccionesS' 
import DirDetalles from "./Views/Direccion/DireccionS";
import ModificarDir from "./Views/Direccion/ModificarDirS";



const Stack = createStackNavigator();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Loggin: '',
      setLogged: '',
      isLoading: true
    };
  }


  async componentDidMount() {
    await Font.loadAsync({
      "Roboto": require('native-base/Fonts/Roboto.ttf'),
      "Roboto_medium": require('native-base/Fonts/Roboto_medium.ttf'),
      "Dosis": require('./assets/dosis.ttf'),

    }).finally(() => { this.setState({ isLoading: false }) });
  }

  render() {

    if (this.state.isLoading) {
      return(
        <Container>
        <Spinner color="green" />
      </Container>
      );
    }else{
      return (
        <Root>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerShown: false
            }}
              initialRouteName='Login'>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registro" component={RegisterScreen} />
              <Stack.Screen name='Perfil' component={PerfilScreen} />
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='ADireccion' component={ADireccionScreen} />
              <Stack.Screen name='Direcciones' component={DireccionesScreen} />
              <Stack.Screen name='DirDetalles' component={DirDetalles} />
              <Stack.Screen name='ModificarDir' component={ModificarDir} />
              <Stack.Screen name='Carrito' component={CarritoScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Root>
      );
    }
  }
}

export default App;
