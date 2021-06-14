import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { Root, Text, Spinner, Container } from "native-base";
//Pantallas
//Usuario
import LoginScreen from "./Views/LoginS";
import RegisterScreen from "./Views/RegistroS";
import PerfilScreen from "./Views/Usuario/PerfilS";
import HomeScreen from "./Views/Usuario/HomeS";
import CarritoScreen from "./Views/Usuario/CarritoS";
import DeseosScreen from "./Views/Usuario/DeseosS";

//Libro
import LibroGenero from "./Views/Libro/LibrosGenero";
import BusquedaScreen from "./Views/Libro/BusquedaS";
import LibroDetailsScreen from "./Views/Libro/LibroS";

//Pedidos
import APedidoScreen from "./Views/Pedido/AñadirPed";
import PedidosScreen from "./Views/Pedido/PedidosS";
import PedidoScreen from "./Views/Pedido/PedidoS";

//Direccion
import ADireccionScreen from "./Views/Direccion/AñadirDirS";
import DireccionesScreen from "./Views/Direccion/DireccionesS";
import DirDetalles from "./Views/Direccion/DireccionS";
import ModificarDir from "./Views/Direccion/ModificarDirS";

//CRUD Home
import HomeAdmiScreen from "./Views/CRUD/Home_admi";

//Libro CRUD
import AddLibro from "./Views/CRUD/Libro/AñadirL";
import ModLibro from "./Views/CRUD/Libro/Modificar";
import LLibrosScreen from "./Views/CRUD/Libro/ListaL";
import LibroScreen from "./Views/CRUD/Libro/VerL";

//Editorial CRUD
import AEditorialScreen from "./Views/CRUD/Editorial/AñadirE";
import LEditorialScreen from "./Views/CRUD/Editorial/ListaE";
import EditorialScreen from "./Views/CRUD/Editorial/VerE";
import MEditorialScreen from "./Views/CRUD/Editorial/ModificarE";

//Usuario CRUD
import AUsuarioScreen from "./Views/CRUD/Usuario/AñadirU";
import LUsuarioScreen from "./Views/CRUD/Usuario/ListaU";
import UsuarioScreen from "./Views/CRUD/Usuario/VerU";
import MUsuarioScreen from "./Views/CRUD/Usuario/ModificarU";

//Pedidos CRUD
import MPedidosScreen from "./Views/CRUD/Pedido/ModificarP";
import LPedidosScreen from "./Views/CRUD/Pedido/ListaP";
import VPedidoScreen from "./Views/CRUD/Pedido/VerP";

const Stack = createStackNavigator();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Loggin: "",
      setLogged: "",
      isLoading: true,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Dosis: require("./assets/dosis.ttf"),
    }).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Spinner color="green" />
        </Container>
      );
    } else {
      return (
        <Root>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Login"
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registro" component={RegisterScreen} />
              <Stack.Screen name="Perfil" component={PerfilScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Carrito" component={CarritoScreen} />
              <Stack.Screen name="Deseos" component={DeseosScreen}/>
              <Stack.Screen name="ADireccion" component={ADireccionScreen} />
              <Stack.Screen name="Direcciones" component={DireccionesScreen} />
              <Stack.Screen name="DirDetalles" component={DirDetalles} />
              <Stack.Screen name="ModificarDir" component={ModificarDir} />
              <Stack.Screen name="Generos" component={LibroGenero} />
              <Stack.Screen name="Buscar" component={BusquedaScreen} />
              <Stack.Screen name="LibroS" component={LibroDetailsScreen} />

              {/*Crud*/}
              <Stack.Screen name="HomeAdmi" component={HomeAdmiScreen} />
              {/*Libro*/}
              <Stack.Screen name="AddLibro" component={AddLibro} />
              <Stack.Screen name="ModLibro" component={ModLibro} />
              <Stack.Screen name="ListLibro" component={LLibrosScreen} />
              <Stack.Screen name="VerLibro" component={LibroScreen} />
              {/*Editorial*/}
              <Stack.Screen name="AddEditorial" component={AEditorialScreen} />
              <Stack.Screen name="ModEditorial" component={MEditorialScreen} />
              <Stack.Screen name="ListEditorial" component={LEditorialScreen} />
              <Stack.Screen name="VerEditorial" component={EditorialScreen} />
              {/*Usuario*/}
              <Stack.Screen name="AddUsuario" component={AUsuarioScreen} />
              <Stack.Screen name="ModUsuario" component={MUsuarioScreen} />
              <Stack.Screen name="ListUsuario" component={LUsuarioScreen} />
              <Stack.Screen name="VerUsuario" component={UsuarioScreen} />
              {/*Pedidos*/}
              <Stack.Screen name="ModPedido" component={MPedidosScreen} />
              <Stack.Screen name="ListPedido" component={LPedidosScreen} />
              <Stack.Screen name="VerPedido" component={VPedidoScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Root>
      );
    }
  }
}

export default App;
