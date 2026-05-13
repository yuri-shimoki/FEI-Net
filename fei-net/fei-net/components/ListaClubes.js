import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import firebase from '../config/config';

export default function ListaClubes({ route, navigation })
{
  const { nomeDeUsuario } = route.params;

  const [listaClubes, setListaClubes] = useState([]);
  const [stringClube, setStringClube] = useState('');

  useEffect(() => {
    const ref = firebase.database().ref('/clubes');

    ref.on('value', snapshot => {
      const dados = snapshot.val();
      
      if (dados !== null) {
        const arrayDeClubes = Object.keys(dados).map(chave => ({
          id: chave,
          ...dados[chave]
        }));
        
        setListaClubes(arrayDeClubes.reverse());
      }
      else
      {
        setListaClubes([]);
      }
    });

    return () => ref.off('value');
  }, []);

  function CriarClube(nome)
  {
    if (nome.trim() === '')
      return;

    firebase.database().ref('/clubes').push({ nome: nome, membros: { [nomeDeUsuario]: true } });
  }

  return (
    <View style={s.container}>
      <View style={s.topContainer}>
        <TextInput style={s.textField} value={stringClube} onChangeText={setStringClube} placeholder="Nome do clube..." placeholderTextColor="#aaa"/>
        <View style={s.buttonRow}>
          <TouchableOpacity style={s.button} onPress={() => CriarClube(stringClube)}>
            <Text style={s.buttonText}>Criar clube</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={listaClubes}
        renderItem={({item}) => (<RenderizarClube item={item} nomeDeUsuario={nomeDeUsuario} navigation={navigation}/>)}
        keyExtractor={clube => clube.id}
        contentContainerStyle={s.clubList}
      />
    </View>
  );
}

function RenderizarClube({ item, nomeDeUsuario, navigation })
{
  const [estaNoClube, setEstaNoClube] = useState(undefined);

  function entrarNoClube(id)
  {
    firebase.database().ref(`/clubes/${id}/membros/${nomeDeUsuario}`).set(true);
  }

  function sairDoClube(id)
  {
    const ref = firebase.database().ref(`/clubes/${id}/membros/${nomeDeUsuario}`);
    
    ref.set(null)
      .then(() => {
        return ref.once('value');
      })
      .then(snapshot => {
          const dados = snapshot.val();

          if (!dados || Object.keys(dados).length === 0)
          {
            firebase.database().ref(`/clubes/${id}`).set(null);
          }
      });
  }

  useEffect(() => {
    const ref = firebase.database().ref(`/clubes/${item.id}/membros/${nomeDeUsuario}`);

    ref.on('value', snapshot => {
      const dados = snapshot.val();
      
      if (dados === true)
        setEstaNoClube(true);
      else
        setEstaNoClube(false);
    });

    return () => ref.off('value');
  }, [item.id, nomeDeUsuario]);

  function verClube(id) {
    navigation.navigate('paginaClube', { clubeId: id, nomeDeUsuario: nomeDeUsuario });
  }

  return (
    <View style={s.club}>
      <Text style={s.buttonText}>{item.nome}</Text>
      <View>
        { estaNoClube ? <View style={s.clubButtonRow}>
          <TouchableOpacity style={[s.button, { backgroundColor: 'red' }]} onPress={() => sairDoClube(item.id)}>
            <Text style={s.buttonText}>Sair</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.button} onPress={() => verClube(item.id)}>
            <Text style={s.buttonText}>Ver</Text>
          </TouchableOpacity>
        </View>
        :
        <TouchableOpacity style={s.button} onPress={() => entrarNoClube(item.id)}>
          <Text style={s.buttonText}>Entrar</Text>
        </TouchableOpacity>
        }
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: 'white',
  },
  textField: {
    paddingVertical: 12,
    paddingHorizontal: '5%',
  },
  buttonRow: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#d1d1d1',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
    justifyContent: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: '5%',
  },
  button: {
    backgroundColor: '#30ff68',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  clubList: {
    gap: 2,
    paddingVertical: 20,
  },
  club: {
    flex: 1,
    gap: 16,
    paddingHorizontal: '5%',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
    borderTopWidth: 2,
    borderTopColor: '#d1d1d1',
  },
  clubButtonRow: {
    flexDirection: 'row',
    gap: 10,
  },
});
