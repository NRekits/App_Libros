import React, { useState } from "react";
import {
  Dimensions,
  StatusBar,
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
} from "react-native";
import { Toast } from "native-base";
import IP_DB from "./../ip_address";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      Admi: false,
      error: "",
    };
  }

  render() {
    return (
      <View style={styles.Container}>
        <StatusBar translucent backgroundColor="transparent" />
        <LinearGradient
          colors={["#C0FFC0", "#1ABC9C"]}
          style={styles.background}
        />

        <Image source={require("../assets/libro1.png")} style={styles.Image} />
        <Text style={styles.H1}>Bienvenido</Text>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
           

            fetch(`http://${IP_DB}:3000/Usuario/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: values.email.toLowerCase().trimEnd(), // mandamos el email
                contra: values.password, // y la contraseña
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.error == null) {
                  console.log(data.id);
                  this.setState({ id: data.id });
                  console.log(data.admi);
                  this.setState({ Admi: data.admi });
                  console.log(data.token);
                  SecureStore.setItemAsync("token", data.token);
                  if (this.state.Admi == false) {
                    this.props.navigation.navigate("Home", { id: this.state.id });
                  } else if (Admi == true) {
                    //ir a crud
                  }
                } else if (data.error != null) {
                  console.log(data.error);
                  this.setState({ error: data.error });
                  if (this.state.error == "Usuario no encontrado") {
                    Toast.show({
                      text: "El email no esta registrado",
                      buttonText: "Okay",
                      type: "warning",
                    });
                  } else if (this.state.error == "contraseña no válida") {
                    Toast.show({
                      text: "Contraseña equivocada",
                      buttonText: "Okay",
                      type: "warning",
                    });
                  } else {
                    Toast.show({
                      text: "Error en Login",
                      buttonText: "Entendido",
                      type: "danger",
                    });
                  }
                }
              });
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .required("Requerida")
              .min(2, "Minimo 2 caracteres"),
            email: Yup.string().required("Requerido").email("Email Invalido"),
          })}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            values,
            touched,
            isValid,
          }) => (
            <View>
              <TextInput
                style={styles.Input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorInput}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.Input}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                placeholder="Contraseña"
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorInput}>{errors.password}</Text>
              )}

              <Button
                title="Login"
                color="#50B550"
                style={styles.Button}
                onPress={handleSubmit}
                disable={!isValid}
              />
            </View>
          )}
        </Formik>
        <Text style={styles.Text2}>
          ¿No tienes cuenta?
          <Text
            style={styles.Text3}
            onPress={() => {
              this.props.navigation.navigate("Registro");
            }}
          >
            {" "}
            Registrate
          </Text>
        </Text>
      </View>
    );
  }
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
    fontFamily: "Dosis",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    alignSelf: "flex-start",
    fontWeight: "400",
    width: 300,
    fontSize: 20,
    margin: 10,
  },
  Text2: {
    fontFamily: "Dosis",
    width: 300,
    fontSize: 20,
    marginTop: 10,
  },
  Text3: {
    fontFamily: "Dosis",
    color: "#C0FFC0",
  },
  Item: {
    padding: 5,
    marginTop: 30,
  },
  H1: {
    alignSelf: "center",
    fontFamily: "Dosis",
    fontWeight: "400",
    fontSize: 30,
    marginTop: 20,
  },
  errorInput: {
    color: "red",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 5,
  },
  Image: {
    alignSelf: "center",
    marginBottom: 5,
    height: 200,
    width: 200,
  },
  Button: {
    alignSelf: "center",
    marginTop: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: windowHeight,
  },
});
