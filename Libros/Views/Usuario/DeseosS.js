/*mostrar los libros que el usuario ha agregado a su lista de deseos*/
/*al presionar cualquiera de los deseos debe de llevar a los detalles del producto*/
import React from "react";
import { Text, Dimensions, Alert, Image, StyleSheet } from "react-native";
import { Container, Header, Content, Form, Item, Input,
  Label,
  Button,
  H1
} from "native-base";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function DeseosScreen (){}