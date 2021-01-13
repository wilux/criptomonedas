import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptomoneda,
  guardarMoneda,
  guardarCripromoneda,
  guardarConsultarAPI,
}) => {
  const [criptomonedas, guardarCripromonedas] = useState([]);

  useEffect(() => {
    const consultaAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      guardarCripromonedas(resultado.data.Data);
    };
    consultaAPI();
  }, []);

  //Almacena las selecciones del usuario
  const obtenerMoneda = (moneda) => {
    guardarMoneda(moneda);
  };

  //Obtener CriptoMoneda
  const obtenerCriptomoneda = (cripto) => {
    guardarCripromoneda(cripto);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    // Se pasa validacion
    guardarConsultarAPI(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error...', 'Ambos campos son obligatorios', [{text: 'OK'}]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={(moneda) => obtenerMoneda(moneda)}>
        <Picker.Item label="-Seleccione-" value="" />
        <Picker.Item label="Dolar EEUU" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Sterlina" value="GBP" />
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={(cripto) => obtenerCriptomoneda(cripto)}>
        <Picker.Item label="-Seleccione-" value="" />
        {criptomonedas.map((cripto) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.txtCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5e49e2',
    padding: 10,
    marginTop: 20,
  },
  txtCotizar: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
export default Formulario;
