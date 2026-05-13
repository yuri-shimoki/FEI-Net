import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import firebase from '../config/config';

export default function ListaAmigos({ route, navigation })
{
  const { nomeDeUsuario } = route.params;

  const [listaAmigos, setListaAmigos] = useState([]);

  useEffect(() => {
    const ref = firebase.database().ref(`/usuarios`);

    ref.on('value', snapshot => {
      if (snapshot.exists()) {
        let arrayDeAmigos = [];
        
        snapshot.forEach(filho => {
          arrayDeAmigos.push({ nome: filho.key, ...filho.val() })
        });

        arrayDeAmigos = arrayDeAmigos.filter(amigo => amigo.nome !== nomeDeUsuario);
        
        setListaAmigos(arrayDeAmigos.reverse());
      }
      else
      {
        setListaAmigos([]);
      }
    });

    return () => ref.off('value');
  }, [nomeDeUsuario]);

  return (
    <View style={s.container}>
      <FlatList
        data={listaAmigos}
        renderItem={({item}) => (<RenderizarAmigo item={item} nomeDeUsuario={nomeDeUsuario} navigation={navigation}/>)
        }
        keyExtractor={amigo => amigo.nome}
        contentContainerStyle={s.amigoList}
        ListHeaderComponent={(
          <View style={s.tituloContainer}>
            <Text style={s.amigoTitulo}>Amigos</Text>
          </View>)}
      />
    </View>
  );
}

function RenderizarAmigo({ item, nomeDeUsuario, navigation })
{
  const [temAmizade, setTemAmizade] = useState(undefined);

  function adicionarAmigo(nomeAmigo)
  {
    firebase.database().ref(`/usuarios/${nomeDeUsuario}/amigos/${nomeAmigo}`).set(true);
  }

  function removerAmigo(nomeAmigo)
  {
    firebase.database().ref(`/usuarios/${nomeDeUsuario}/amigos/${nomeAmigo}`).remove();

    let conversaId = [nomeDeUsuario, nomeAmigo].sort().join('_')

    firebase.database().ref(`/conversas/${conversaId}`).remove();
  }

  useEffect(() => {
    const ref = firebase.database().ref(`/usuarios/${nomeDeUsuario}/amigos/${item.nome}`);

    ref.on('value', snapshot => {
      const dados = snapshot.val();
      
      if (dados === true)
        setTemAmizade(true);
      else
        setTemAmizade(false);
    });

    return () => ref.off('value');
  }, [item.nome, nomeDeUsuario]);

  function verConversa(nome) {
    navigation.navigate('conversaAmigo', { nomeAmigo: nome, nomeDeUsuario: nomeDeUsuario });
  }

  return (
    <View style={s.amigo}>
      <Text style={s.buttonText}>{item.nome}</Text>
      <View style={s.amigoButtonRow}>
        { temAmizade ? <View style={s.amigoButtonGroup}>
          <TouchableOpacity style={[s.button, { backgroundColor: 'red' }]} onPress={() => removerAmigo(item.nome)}>
            <Text style={s.buttonText}>Remover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.button} onPress={() => verConversa(item.nome)}>
            <Text style={s.buttonText}>Conversar</Text>
          </TouchableOpacity>
        </View>
        :
        <TouchableOpacity style={s.button} onPress={() => adicionarAmigo(item.nome)}>
          <Text style={s.buttonText}>Adicionar</Text>
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
  button: {
    backgroundColor: '#30ff68',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  amigoList: {
    gap: 2,
    paddingBottom: 20,
  },
  amigo: {
    flex: 1,
    gap: 10,
    paddingHorizontal: '5%',
    paddingVertical: 8,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
    borderTopWidth: 2,
    borderTopColor: '#d1d1d1',
  },
  amigoButtonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  amigoButtonRow: {
    alignSelf: 'flex-end',
  },
  amigoTitulo: {
    fontSize: 26,
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: '5%',
  }
});
