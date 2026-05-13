import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import firebase from '../config/config';

import FeedDePosts from './FeedDePosts';
import CriarPost from './CriarPost';

export default function PaginaClube({ route })
{
  const { clubeId, nomeDeUsuario } = route.params;

  const [nome, setNome] = useState('');

  useEffect(() => {
    firebase.database().ref(`/clubes/${clubeId}/nome`).once('value').then(
      snapshot => {
        setNome(snapshot.val());
      }
    );
  }, [clubeId])

  return (
    <View style={s.container}>
      <Text style={s.titulo}>{nome}</Text>
      <FeedDePosts clubeId={clubeId} usuario={nomeDeUsuario}
        header={<CriarPost usuario={nomeDeUsuario} clubeId={clubeId} />}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 26,
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
    paddingVertical: 10,
    paddingHorizontal: '5%',
  },
});