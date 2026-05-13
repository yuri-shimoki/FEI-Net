import { createStackNavigator } from '@react-navigation/stack';

import ListaAmigos from './ListaAmigos';
import ConversaAmigo from './ConversaAmigo';

const Stack = createStackNavigator();

export default function Amigos({ route }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="listaClubes" component={ListaAmigos} initialParams={{ nomeDeUsuario: route.params.nomeDeUsuario }}/>
      <Stack.Screen name="conversaAmigo" component={ConversaAmigo} />
    </Stack.Navigator>
  );
}