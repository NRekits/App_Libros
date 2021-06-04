/*Aqui se ven la info de un libro seleccionado, da opcion para meter al carrito (cuantos ejemplares) o a la lista de deseos */
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
export default function LibroScreen (){}