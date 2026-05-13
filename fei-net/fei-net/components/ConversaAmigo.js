import { StyleSheet, View, Vibration, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import firebase from '../config/config';

export default function ConversaAmigo({ route })
{
  const { nomeAmigo, nomeDeUsuario } = route.params;

  return (
    <View style={s.container}>
      <EnviarMensagem usuario={nomeDeUsuario} nomeAmigo={nomeAmigo} />
      <HistoricoConversas nomeUsuario={nomeDeUsuario} nomeAmigo={nomeAmigo}/>
      <Text style={s.titulo}>{nomeAmigo}</Text>
    </View>
  );
}

function HistoricoConversas({ nomeUsuario, nomeAmigo })
{
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let conversaId = [nomeUsuario, nomeAmigo].sort().join('_')

    let refString = `/conversas/${conversaId}`;

    const postsRef = firebase.database().ref(refString);

    postsRef.on('value', snapshot => {
      const dados = snapshot.val();
      
      if (dados !== null) {
        const arrayDePosts = Object.keys(dados).map(chave => ({
          id: chave,
          ...dados[chave]
        }));
        
        setPosts(arrayDePosts.reverse()); // .reverse()?

        const padrao = [0, 100, 100, 100];

        Vibration.vibrate(padrao);
      }
    });

    return () => postsRef.off('value');
  }, [nomeAmigo, nomeUsuario]);

  function renderizarPost({ item })
  {
    let messageStyle = {};
    let authorTextStyle = undefined;

    if (item.autor === nomeUsuario)
    {
      messageStyle = s.postMine;
    }
    else if (item.autor === nomeAmigo)
    {
      messageStyle = s.postTheirs;
      authorTextStyle = { alignSelf: 'flex-start' };
    }

    return (
      <View style={[s.postCard, messageStyle]}>
        { authorTextStyle === undefined ? null : <Text style={[s.authorText, authorTextStyle]}>{item.autor}</Text> }
        <Text>{item.conteudo}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderizarPost}
      keyExtractor={post => post.id}
      contentContainerStyle={s.postList}
      inverted
      />
  );
}

function EnviarMensagem({ usuario, nomeAmigo })
{
  const [textoPost, setTextoPost] = useState('');

  function publicarPost()
  {
    if (textoPost.trim() === '')
      return;

    let conversaId = [usuario, nomeAmigo].sort().join('_');

    let refConversa = `/conversas/${conversaId}`;

    let dadosPost = {
      autor: usuario,
      conteudo: textoPost,
      dataPublicacao: Date.now(),
    };

    firebase.database().ref(refConversa).push(dadosPost).then(() => {
      setTextoPost('');
    })
    .catch((error) => {
      alert("Não foi possível enviar a mensagem.");
    });
  }

  return (
    <View style={s.containerMensagem}>
      <TextInput style={s.postTextArea}
                 value={textoPost}
                 onChangeText={setTextoPost}
                 placeholder="Envie uma mensagem..."
                 placeholderTextColor="#aaa"
                 multiline={true}
                 numberOfLines={3}
                 textAlignVertical="top" />
      <View style={s.buttonRow}>
        <TouchableOpacity style={s.button} onPress={publicarPost}>
          <Text style={s.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>);
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  containerMensagem: {
    backgroundColor: 'white',
    borderTopWidth: 2,
    borderTopColor: '#d1d1d1',
  },
  postCard: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 5,
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
    maxWidth: '80%',
  },
  authorText: {
    fontWeight: 'bold',
  },
  postList: {
    gap: 10,
    paddingVertical: 10,
  },
  postMine: {
    backgroundColor: '#e5f9e6',
    alignSelf: 'flex-end',
  },
  postTheirs: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  postTextArea: {
    paddingVertical: 12,
    paddingHorizontal: '5%',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
    backgroundColor: 'white',
    fontSize: 16,
    minHeight: 110, 
    textAlignVertical: 'top', 
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: '5%',
  },
  titulo: {
    fontSize: 26,
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
    paddingVertical: 10,
    paddingHorizontal: '5%',
  }
});