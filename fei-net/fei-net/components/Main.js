import { StyleSheet, Image, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import firebase from '../config/config';

import Home from './Home';
import Clubes from './Clubes';
import Amigos from './Amigos';
import Perfil from './Perfil';

const Tab = createBottomTabNavigator();

export default function Main({ route, navigation })
{
  return (
    <Tab.Navigator screenOptions={{ headerShadowVisible: false, tabBarStyle: { borderTopWidth: 2, borderTopColor: '#d1d1d1' }, headerStyle: {
      borderBottomWidth: 2,
      borderBottomColor: '#d1d1d1',
    }, headerTitle: () => (
      <Image style={s.logo} source={require('../assets/FeiNetLogo.png')} />)
    }}>
      <Tab.Screen name='home' component={Home} initialParams={{ nomeDeUsuario: route.params.nomeDeUsuario }} />
      <Tab.Screen name='clubes' component={Clubes} initialParams={{ nomeDeUsuario: route.params.nomeDeUsuario }}/>
      <Tab.Screen name='amigos' component={Amigos} initialParams={{ nomeDeUsuario: route.params.nomeDeUsuario }}/>
      <Tab.Screen name='perfil' component={Perfil} initialParams={{ nomeDeUsuario: route.params.nomeDeUsuario, stackNavigation: navigation }}/>
    </Tab.Navigator>
  );
}

const s = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});