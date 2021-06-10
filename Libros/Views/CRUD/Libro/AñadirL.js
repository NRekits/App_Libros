import {
    Container, Left, Header, Form,
    Item, Input, Content, Picker,
    Button, Text, Toast, Body, Right,
    Title, H3, Textarea, Label
} from 'native-base';
import {
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import IP_DB from '../../../ip_address';


const windowHeight = Dimensions.get('window').height;

export default class AddLibro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            libro: {
                titulo: '',
                autor: '',
                idEditorial: '',
                precio: '',
                cantidad: '',
                fecha: new Date(),
                sinopsis: '',
                genero: '',
                formato: ''
            },
            imageFile: null,
            show: false
        }

    }

    uploadImage = async () => {
        if (this.imageFile != null) {
            const fileToUpload = this.imageFile;
            const data = new FormData();
            data.append('name', 'Image Upload');
            data.append('file_attachment', fileToUpload);
        }
    }

    selectFile = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = null;
        if (status === 'granted') {
            result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false, aspect: [4, 3],
                quality: 1
            });
            if (result !== null)
                this.setState({ imageFile: result.uri });
        }
    }

    Check = () => {
        let msg = "";
        let error = false;
        const { libro } = this.state;

        if (libro.titulo === "") {
            msg = "Titulo es un campo requerido";
            error = true;
        }
        else if (libro.autor === "") {
            msg = "Autor es un campo requerido";
            error = true;
        }
        else if (libro.fecha === undefined || libro.fecha === null) {
            msg = "Se debe asignar una fecha";
            error = true;
        }
        else if (libro.precio === "") {
            msg = "Precio es un campo requerido";
            error = true;
        }
        else if (libro.cantidad === "") {
            msg = "Cantidad es un campo requerido";
            error = true;
        }
        else if (libro.idEditorial === "") {
            msg = "Editorial es un campo requerido";
            error = true;
        }
        else if (libro.genero === "") {
            msg = "Genero es un campo requerido";
            error = true;
        }
        else if (libro.sinopsis === "") {
            msg = "Sinopsis es un campo requerido";
            error = true;
        }
        else if (libro.formato === "") {
            msg = "Formato es un campo requerido";
            error = true;
        }
        else if (libro.precio.toLowerCase().includes(/[^a-z]/g)) {
            msg = "No se permiten letras en el precio";
            error = true;
        }
        else if (libro.cantidad.toLowerCase().includes(/[^a-z]/g)) {
            msg = "No se permiten letras en el precio";
            error = true;
        }
        else if (this.state.imageFile === undefined || this.state.imageFile === null) {
            msg = "Carga una imagen para el libro";
            error = true;
        }

        if (error) {
            Toast.show({ text: msg, buttonText: "Entendido", type: "warning" });
        } else {
            this.saveBook();
        }
    }

    saveBook() {
        let { libro } = this.state;
        libro.cantidad = Number(libro.cantidad.toLowerCase().replace(" ", ""));
        libro.precio = Number(libro.precio.toLowerCase().replace(" ", ""));
        const uri = this.state.imageFile;
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();
        formData.append('photo', {
            uri,
            name: `${libro.titulo}.${fileType}`,
            type: `image/${fileType}`
        });

        // fetch('', {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then((res) => res.json())
        //     .then((res) => { console.log(res) })
        //     .catch(e => { console.log(e) })
        //     .finally(() => { });

        // send the libro
        fetch(`http://${IP_DB}:3000/Libro/Insertar`, {
            method: 'POST',
            body: JSON.stringify({
  
                titulo: libro.titulo,
                autor: libro.autor,
                editorial: libro.idEditorial,
                precio: libro.precio,
                cantidad: libro.cantidad,
                fecha: libro.fecha,
                sinopsis: libro.sinopsis,
                genero: libro.genero,
                // pendiente Imagen: { type:String },
                formato: libro.formato,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }) .then((res) => res.json())
        .then((data) => {
          Toast.show({ text: 'Libro añadido', buttonText: 'Okay',type: 'success'});

          /* navegacion pendiente
          this.props.navigation.navigate("Perfil", {
            id: route.params.id,
          });*/
        })
    }

    render() {
        let { libro } = this.state;
        return (
            <Container style={styles.Container}>
                <Header transparent
                    androidStatusBarColor="#C0FFC0"
                    style={styles.Header}
                >
                    <Left>
                        <Button transparent style={styles.Button}
                            onPress={() => {
                                this.props.navigation.navigate.goBack();
                            }}>
                            <Icon name="chevron-left" size={30} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.Header}>LIBROS</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <H3 style={{ alignSelf: 'center', fontSize: 20 }}>Añadir Libro</H3>
                <Content style={styles.Content}>
                    <Image source={{ uri: this.state.imageFile }} style={{ alignSelf: 'center', width: 200, height: 200, backgroundColor: "#666666" }} />
                    <Button style={{ ...styles.Button }} rounded success block onPress={() => { this.selectFile() }}>
                        <Text>Cargar archivo</Text>
                    </Button>
                    <Form>
                        <Item floatingLabel style={styles.Item}>
                            <Label style={styles.Label}>Titulo</Label>
                            <Input
                                placeholder="Titulo del libro"
                                value={libro.titulo}
                                onChangeText={(text) => {
                                    libro.titulo = text;
                                    this.setState({ libro: libro });
                                }}
                            />
                        </Item>
                        <Item floatingLabel style={styles.Item}>
                            <Label style={styles.Label}>Autor</Label>
                            <Input
                                placeholder="Autor del libro"
                                value={libro.autor}
                                onChangeText={(text) => {
                                    libro.autor = text;
                                    this.setState({ libro: libro });
                                }}
                            />
                        </Item>

                        <Item picker style={styles.Item}>
                            <Picker
                                mode="dropdown"
                                placeholder="Editorial"
                                selectedValue={libro.idEditorial}
                                style={{ width: undefined, height: 50 }}
                                onValueChange={(value) => {
                                    libro.idEditorial = value;
                                    this.setState({ libro: libro });
                                }}
                            >
                                <Picker.Item label="Yo" value="aqui va un id" />
                                <Picker.Item label="Yo" value="aqui va un id" />
                            </Picker>
                        </Item>

                        <Item floatingLabel style={styles.Item}>
                            <Label style={styles.Label}>Precio</Label>
                            <Input
                                keyboardType="numeric"
                                placeholder="Precio"
                                value={`${libro.precio}`}
                                onChangeText={(value) => {
                                    libro.precio = value;
                                    this.setState({ libro: libro });
                                }}
                                keyboardType="decimal-pad"
                            />
                        </Item>
                        <Item floatingLabel style={styles.Item}>
                            <Label style={styles.Label}>Cantidad</Label>
                            <Input
                                keyboardType="numeric"
                                placeholder="Cantidad"
                                value={`${libro.cantidad}`}
                                onChangeText={(value) => {
                                    libro.cantidad = value;
                                    this.setState({ libro: libro });
                                }}
                                keyboardType="number-pad"
                            />
                        </Item>
                        <Item>
                            <Textarea
                                style={{ width: '100%' }}
                                rowSpan={5}
                                bordered
                                placeholder="Sinopsis"
                                value={libro.sinopsis}
                                onChangeText={(text) => {
                                    libro.sinopsis = text;
                                    this.setState({libro: libro});
                                }}
                                />
                        </Item>

                        <Item picker style={styles.Item}>
                            <Picker
                                mode="dropdown"
                                placeholder="Genero"
                                selectedValue={libro.genero}
                                style={{ width: undefined, height: 50 }}
                                onValueChange={(value) => {
                                    libro.genero = value;
                                    this.setState({ libro: libro });
                                }}
                            >
                                <Picker.Item label="Yo" value="aqui va un id" />
                            </Picker>
                        </Item>

                        <Item picker style={styles.Item}>
                            <Picker
                                mode="dropdown"
                                placeholder="Formato"
                                selectedValue={libro.formato}
                                style={{ width: undefined, height: 50 }}
                                onValueChange={(value) => {
                                    libro.formato = value;
                                    this.setState({ libro: libro });
                                }}
                            >
                                <Picker.Item label="EPub" value="EPub" />
                                <Picker.Item label="Físico" value="Físico" />
                                <Picker.Item label="Ambos" value="Ambos" />
                            </Picker>
                        </Item>

                        <Button full block rounded success style={styles.Button} onPress={() => {
                            this.setState({ show: true });
                        }}>
                            <Text style={styles.Text2}>Seleccionar fecha: {libro.fecha.toDateString()}</Text>
                        </Button>
                        {this.state.show && (
                            <DateTimePicker
                                value={new Date(libro.fecha)}
                                mode={"date"}
                                onChange={(event, date) => {
                                    libro.fecha = date;
                                    this.setState({ libro: libro, show: false });
                                }}
                            />
                        )}
                        <Button full block rounded success style={styles.Button} onPress={() => {
                            this.Check();
                        }}>
                            <Text>Guardar</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
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
        alignSelf: "flex-start",
        fontFamily: "Dosis",
        fontWeight: "400",
        fontSize: 20,
        marginRight: 5,
    },
    Label: {
        fontWeight: "400",
        fontSize: 18,
        marginBottom: 10,
    },
    Button: {
        alignSelf: "center",
        marginTop: 40,
        borderColor: "#9BFFA3",
    },
    Item: {
        marginTop: 15,
        padding: 5,
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
        fontSize: 20,
        fontWeight: "600"
    },
});