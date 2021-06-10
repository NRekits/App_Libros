import {
    Container, Left, Header, Form,
    Item, Input, Icon, Content, Picker,
    Button, Text, Toast
} from 'native-base';
import {
    Platform,
    StyleSheet,
    Image,
    View
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';

export default class AddLibro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            libro: {
                titulo: '',
                autor: '',
                idEditorial: undefined,
                precio: '',
                cantidad: '',
                fecha: new Date(),
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
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1
            });
            if (result !== null)
                this.setState({ imageFile: result.uri });
        }
    }

    saveBook(){
        const {libro} = this.state;
        const uri = this.state.imageFile;
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();
        formData.append('photo', {
            uri,
            name: `${libro.titulo}.${fileType}`,
            type: `image/${fileType}`
        });
        fetch('', {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => res.json())
        .then((res) => {console.log(res)})
        .catch(e => {console.log(e)})
        .finally(() => {});
        fetch('', {
            method: 'POST',
            body: JSON.stringify({
                libro: libro
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    render() {
        let { libro } = this.state;
        return (
            <Container>
                <Header transparent
                    androidStatusBarColor="#C0FFC0"
                    style={styles.Header}
                >
                    <Left>
                        <Icon name="home" style={{ color: "white" }}></Icon>
                    </Left>
                </Header>
                <Content>
                    {this.state.imageFile && (
                        <Image source={{ uri: this.state.imageFile }} style={{width: 200, height: 200}} />
                    )}
                    <Button block onPress={() => { this.selectFile() }}>
                        <Text>Cargar archivo</Text>
                    </Button>
                    <Form>
                        <Item regular>
                            <Input
                                placeholder="Titulo del libro"
                                value={libro.titulo}
                                onChangeText={(text) => {
                                    libro.titulo = text;
                                    this.setState({ libro: libro });
                                }}
                            />
                        </Item>
                        <Item regular>
                            <Input
                                placeholder="Autor del libro"
                                value={libro.autor}
                                onChangeText={(text) => {
                                    libro.autor = text;
                                    this.setState({ libro: libro });
                                }}
                            />
                        </Item>
                        <Item picker>
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
                            </Picker>
                        </Item>

                        <Item stackedLabel>
                            <Input
                                placeholder="Precio"
                                value={`${libro.precio}`}
                                onChangeText={(value) => {
                                    libro.precio = value;
                                    this.setState({ libro: libro });
                                }}
                                keyboardType="decimal-pad"
                            />
                        </Item>
                        <Item stackedLabel>
                            <Input
                                placeholder="Cantidad"
                                value={`${libro.cantidad}`}
                                onChangeText={(value) => {
                                    libro.cantidad = value;
                                    this.setState({ libro: libro });
                                }}
                                keyboardType="number-pad"
                            />
                        </Item>
                        <Button full block onPress={() => {
                            this.setState({ show: true });
                        }}>
                            <Text>Seleccionar fecha: {libro.fecha.toDateString()}</Text>
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
                        <Button full bolck onPress={() => {
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
        flexDirection: 'column',
        alignItems: "stretch",
        justifyContent: "center",
        fontFamily: "Dosis",
        color: "white",
    },
    Text2: {
        fontWeight: "300",
        fontSize: 15,
        color: "white",
        fontFamily: "Dosis",
    },
    Text3: {
        marginTop: 10,
        fontSize: 15,
        color: "#C4EFFF",
        marginLeft: 5,
        fontFamily: "Dosis",
    },
    Button: {
        alignSelf: "center",
        backgroundColor: '#BB8FCE',
        fontFamily: 'Dosis',
        fontWeight: "400",
    },
    Item: {
        padding: 5,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 100,
    },
    Header: {
        color: "#C4EFFF",
        fontFamily: "Dosis",
        fontSize: 40,
        fontWeight: "600",
        alignSelf: "center",
    },
});