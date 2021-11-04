import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Forms from '../../components/Form';
import List from '../../components/List';

export default function Home() {

  const [formulario, setFormulario] = useState(false)

  const [form, setForm] = useState(false)
  const [list, setList] = useState(false)


  return (
    <View style={styles.container}>
        <View style={styles.titleArea}>
            <Text style={styles.titleText}>Seja bem vindo(a)</Text>
            <Text style={styles.titleText}>Essa é a base de desenvolvedores</Text>
            <Text style={styles.subtitle}>O que você deseja ?</Text>
        </View>

        <View style={styles.container2}>
          <View style={styles.Viewctn2}>
            <TouchableOpacity style={styles.buttonsHome} onPress={() => setList(!list)}>
              <Text style={styles.textButtons}>Listar Desenvolvedores</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonsHome} onPress={() => setForm(!form)}>
              <Text style={styles.textButtons}>Adicionar Novo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container3}>
          { 
            form ? <Forms/> : list ? <List/> : null 
             
          }
        </View>

        

        
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    alignItems: 'center',
  },
  Viewctn2: {
    flexDirection: 'row'
  },
  buttonsHome: {
    backgroundColor: '#6C2D93',
    marginHorizontal: '5%',
    padding: 10,
    borderRadius: 5
  },
  textButtons: {
    color: '#fff',
    fontWeight: 'bold'
  },
  container3: {
    flex: 3,
    
  },
  titleArea:{
    marginTop: '10%',
    alignItems: 'center',
    marginBottom: '5%',
    marginLeft: 10,
    marginRight: 10
},
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#6C2D93'
},
  subtitle: {
    marginTop: '1%',
    fontSize: 12
},
});
