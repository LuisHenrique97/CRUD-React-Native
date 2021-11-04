import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import api from "../../services/api";


export default function List(){

    const [dev, setDev] = useState([{}])
     
    useEffect(() => {
        api.get('/developers').then((response) => {
          setDev(response.data)
          console.log("Requisição Concluida")
        })
      }, [])

    // Get All
    const handleGet = () => {
        api.get('/developers').then((response) => {
          setDev(response)
          console.log(response.data)
        })
    }
    

    // Delete Register - OK
    const handleDelete = (id) => { 
        api.delete(`developers/${id}`,{
           
        })
        .then(({ data }) => console.log(data))
        console.log(id)
    }

    return(
        <View style={styles.container}>
            <FlatList 
                data={dev}
                renderItem={
                    ({item}) =>
                    <View style={styles.viewAll}>
                        <View style={styles.viewText}>
                            <Text style={styles.textSub}>Nome</Text>
                            <Text style={styles.text}>{item.nome}</Text>

                            <Text style={styles.textSub}>Sexo</Text>
                            <Text style={styles.text}>{item.sexo}</Text>

                            <Text style={styles.textSub}>Idade</Text>
                            <Text style={styles.text}>{item.idade} anos</Text>

                            <Text style={styles.textSub}>Data de Nascimento</Text>
                            <Text style={styles.text}>{item.dataNasc}</Text>

                            <Text style={styles.textSub}>Hobby</Text>
                            <Text style={styles.text}>{item.hobby}</Text>
                        </View>

                        <View style={styles.viewIcons}>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Ionicons name="trash-outline" size={20} style={styles.icons}/>
                            </TouchableOpacity>
                            
                            <TouchableOpacity>
                                <Ionicons name="create-outline" size={20} style={styles.icons}/>
                            </TouchableOpacity>
                            
                        </View>

                    </View>
                    
                }
                keyExtractor={(item,index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'center'
    },
    viewAll: {
        flexDirection: 'row',
    },
    viewText: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginLeft: '5%',
        marginTop: 10,
        padding: 5,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        width: '80%',
        justifyContent: 'center',
        borderBottomColor: '#6C2D93',
        borderBottomWidth: 1,
        
    },
    text: {
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    textSub: {
        fontSize: 10,
        marginBottom: -4
    },
    viewIcons: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderBottomColor: '#6C2D93',
        borderBottomWidth: 1,
    },
    icons: {
        paddingTop: 10,
        paddingBottom:10
    }
})