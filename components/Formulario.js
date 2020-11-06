import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    const { ciudad, pais } = busqueda;

    const [animacionBoton] = useState(new Animated.Value(1));

    const consultarClima = () => {
        if (pais.trim() === '' || ciudad.trim() === '') {
            mostrarAlerta();
            return;
        }
        // Consultar la api
        guardarConsultar(true);
    };

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y país para la búsqueda',
            [{text: 'Entendido'}]
        );
    };

    const animacionEntrada = () => {
        Animated.spring(animacionBoton, {
            toValue: .9,
            useNativeDriver: true
        }).start();
    };

    const animacionSalida = () => {
        Animated.spring(animacionBoton, {
            toValue: 1,
            friction: 4,
            tension: 30,
            useNativeDriver: true
        }).start();
    };

    const estiloAnimacion = {
        transform: [{scale: animacionBoton}]
    };

    return (
        <>
            <View style={StyleSheet.formulario}>
                <View>
                    <TextInput
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
                        placeholder="Ciudad"
                        placeholderTextColor="#666"
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={pais}
                        onValueChange={pais => guardarBusqueda({...busqueda, pais})}
                        itemStyle={{ height: 120, backgroundColor: '#FFF' }}
                    >
                        <Picker.Item label="-- Seleccione un país --" value="" />
                        <Picker.Item label="Estados Unidos" value="US" />
                        <Picker.Item label="México" value="MX" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="Costa Rica" value="CR" />
                        <Picker.Item label="España" value="ES" />
                        <Picker.Item label="Perú" value="PE" />
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    delayPressIn
                    onPressIn={() => animacionEntrada()}
                    onPressOut={() => animacionSalida()}
                    onPress={() => consultarClima()}
                >
                    <Animated.View
                        style={[styles.btnBuscar, estiloAnimacion]}
                    >
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#fff',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
});
 
export default Formulario;