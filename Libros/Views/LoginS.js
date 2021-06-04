import React from "react";
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

import { LinearGradient } from "expo-linear-gradient";
import { Formik, Field } from "formik";
import * as Yup from "yup";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreen({navigation}) {
const Registro = () =>{
    navigation.navigate("Registro");
}
  return (
    <View style={styles.Container}>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={["#C0FFC0", "#1ABC9C"]}
        style={styles.background}/>  
    
      <Image source={require("../assets/libro1.png")} style={styles.Image} />
   <Text style={styles.H1}>Bienvenido</Text>
 
       <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .required("Requerida")
              .min(4, "Minimo 4 caracteres"),
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
                  placeholder='Email'
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorInput}>{errors.email}</Text>
                )}
             
                <TextInput
                   style={styles.Input}
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  placeholder='Contraseña'
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorInput}>{errors.password}</Text>
                )}
            

              <Button
                title='Login'
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
            onPress={Registro}>
            {" "}
            Registrate
          </Text>
        </Text>
        </View>
  

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
    fontFamily: "Dosis",
    borderBottomColor:'white',
    borderBottomWidth :1,
    alignSelf: "flex-start",
    fontWeight: "400",
    width:300,
    fontSize: 20,
    margin:10,
  
  },
  Text2: {
    fontFamily: "Dosis",
    width:300,
    fontSize: 20,
    marginTop:10
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
    fontWeight: "400",
    fontSize: 30,
    marginTop: 20,
  },
  errorInput: {
    color: "red",
    textAlign: "center",
    marginTop: 4,
    marginBottom:5,
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
