import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import firebase from '../config/config';

import CriarPost from './CriarPost';
import FeedDePosts from './FeedDePosts';

export default function Home({ route })
{
  return (
    <View style={s.container}>
      <FeedDePosts clubeId="" header={<CriarPost usuario={route.params.nomeDeUsuario} clubeId=""/>}/>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 26,
    flex: 1,
  },
});