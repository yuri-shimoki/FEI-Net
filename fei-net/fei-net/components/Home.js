import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import firebase from '../config/config';

import CriarPost from './CriarPost';
import FeedDePosts from './FeedDePosts';

export default function Home({ route })
{
  const { nomeDeUsuario } = route.params;

  return (
    <View style={s.container}>
      <FeedDePosts clubeId="" usuario={nomeDeUsuario} header={<CriarPost usuario={nomeDeUsuario} clubeId=""/>}/>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 26,
    flex: 1,
  },
});