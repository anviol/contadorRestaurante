import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import axios from 'axios';

export default function App() {

  const [ ocupacao, setOcupacao] = useState(0);

  function handleEntrada() {
    axios.post('http://www.fump.ufmg.br:3000/restaurantes/entrada/3')
    .then(() => {
      Alert.alert('Alerta', 'Entrada enviada.');
      axios.get('http://www.fump.ufmg.br:3000/restaurantes/ocupacao/3')
        .then((res) => {setOcupacao(res.data.Ocupacao)})
    })
  };

  function handleSaida() {
    axios.post('http://www.fump.ufmg.br:3000/restaurantes/saida/3')
    .then(() =>{
      Alert.alert('Alerta', 'Saída enviada.');
      axios.get('http://www.fump.ufmg.br:3000/restaurantes/ocupacao/3')
        .then((res) => {setOcupacao(res.data.Ocupacao)})
    })
  };

  function handleAtualiza() {
    axios.get('http://www.fump.ufmg.br:3000/restaurantes/ocupacao/3')
    .then((res) => {setOcupacao(res.data.Ocupacao)})
    .then(() => Alert.alert('Alerta', 'Atualizado.'))
  };

  return (
    <View style={styles.container}>
      <RectButton onPress={handleEntrada} style={styles.button}>
        <Text>Entrada</Text>
      </RectButton>
      <RectButton onPress={handleSaida} style={styles.button}>
        <Text>Saída</Text>
      </RectButton>
      <RectButton onPress={handleAtualiza} style={styles.button}>
        <Text>Atualizar</Text>
      </RectButton>
  <Text>Ocupação Total: {ocupacao}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 120,
    height: 80,
    marginVertical: 40,
    backgroundColor: '#04d361',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
