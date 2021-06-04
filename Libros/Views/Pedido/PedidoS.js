/*Detalles del pedido, dando la opcion de cancelar*/
/*No se puede modificar un pedido como tal, solo es para cancelar*/
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
export default function PedidoScreen (){}