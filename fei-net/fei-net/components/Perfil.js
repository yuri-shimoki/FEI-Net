import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import firebase from '../config/config';

export default function Perfil({ route })
{
  const { nomeDeUsuario, stackNavigation } = route.params;

  const [listaPosts, setListaPosts] = useState([]);

  useEffect(() => {
    const postsRef = firebase.database().ref('/posts');

    postsRef.orderByChild('autor').equalTo(nomeDeUsuario).on('value', snapshot => {
      const dados = snapshot.val();
    
      if (dados) {
        const postsDoAutor = Object.keys(dados).map(chave => ({
          id: chave,
          ...dados[chave]
        }));
        setListaPosts(postsDoAutor.reverse());
      } else
        setListaPosts([]);
    });
  }, [nomeDeUsuario]);

  function voltarAoLogin(stackNavigation)
  {
    stackNavigation.goBack();
  }

  function renderizarPost({ item })
  {
    return (
      <View style={s.postCard}>
        <View style={s.postAuthorDateRow}>
          <Text style={s.authorText}>{item.autor}</Text>
          <Text style={s.dateText}>{new Date(item.dataPublicacao).toLocaleDateString()}</Text>
        </View>
        <Text>{item.conteudo}</Text>
      </View>
    );
  }

  return (<FlatList 
        data={listaPosts}
        renderItem={renderizarPost}
        keyExtractor={post => post.id}
        ListHeaderComponent={(
          <View>
            <Text style={s.secao}>Dados da conta</Text>
            <View style={s.topContainer}>
              <View style={s.nameRow}>
                <Text style={s.boldText}>Nome de usuário:</Text>
                <Text>{nomeDeUsuario}</Text>
              </View>
              <TouchableOpacity style={[s.button, { backgroundColor: 'red' }]} onPress={() => voltarAoLogin(stackNavigation)}>
                <Text style={s.buttonText}>Sair da conta</Text>
              </TouchableOpacity>
            </View>
            <Text style={[s.secao, { borderTopColor: '#d1d1d1', borderTopWidth: 2 }]}>Seus posts</Text>
          </View>
        )}
        contentContainerStyle={s.postList}
        />
  );
}

const s = StyleSheet.create({
  nameRow: {
    flexDirection: 'row',
    gap: 5,
  },
  topContainer: {
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
    gap: 26,
  },
  boldText: {
    fontWeight: 'bold',
  },
  secao: {
    backgroundColor: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: '5%',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
  },
  postCard: {
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: '5%',
    gap: 20,
    borderTopWidth: 2,
    borderTopColor: '#d1d1d1',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
    borderLeftWidth: 2,
    borderLeftColor: '#d1d1d1',
    borderRightWidth: 2,
    borderRightColor: '#d1d1d1',
    borderRadius: 5,
    marginHorizontal: '2.5%',
  },
  postAuthorDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
  },
  authorText: {
    fontWeight: 'bold',
  },
  dateText: {
    color: '#aaa',
  },
  postList: {
    gap: 32,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#30ff68',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});