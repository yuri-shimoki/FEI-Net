import { createStackNavigator } from '@react-navigation/stack';

import ListaClubes from './ListaClubes';
import PaginaClube from './PaginaClube';

const Stack = createStackNavigator();

export default function Clubes({ route }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="listaClubes" component={ListaClubes} initialParams={{ nomeDeUsuario: route.params.nomeDeUsuario }}/>
      <Stack.Screen name="paginaClube" component={PaginaClube}/>
    </Stack.Navigator>
  );
}