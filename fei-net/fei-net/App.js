import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Main from './components/Main';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="cadastro" component={Cadastro}/>
        <Stack.Screen name="main" component={Main}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
