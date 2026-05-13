import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import firebase from '../config/config';

export default function CriarPost({ usuario, clubeId })
{
  const [textoPost, setTextoPost] = useState('');

  function publicarPost()
  {
    if (textoPost.trim() === '')
      return;

    let refString = '/posts';

    if (clubeId !== '')
    {
      refString = `/clubes/${clubeId}/posts`;
    }

    firebase.database().ref(refString).push({
      autor: usuario,
      clube: clubeId,
      conteudo: textoPost,
      dataPublicacao: Date.now(),
    }).then(() => {
      setTextoPost('');
    })
    .catch((error) => {
      alert("Não foi possível publicar o post.");
    });
  }

  return (
    <View style={s.container}>
      <TextInput style={s.postTextArea}
                 value={textoPost}
                 onChangeText={setTextoPost}
                 placeholder="Faça um post..."
                 placeholderTextColor="#aaa"
                 multiline={true}
                 numberOfLines={5}
                 textAlignVertical="top" />
      <View style={s.buttonRow}>
        <TouchableOpacity style={s.button} onPress={publicarPost}>
          <Text style={s.buttonText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </View>);
}

const s = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
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
});