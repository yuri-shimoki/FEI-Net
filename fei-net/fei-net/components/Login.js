import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import firebase from '../config/config';

export default function Login({ navigation })
{
  const [nomeDeUsuario, setNomeDeUsuario] = useState('');
  const [senha, setSenha] = useState('');

  async function fazerLogin()
  {
    firebase.database().ref(`/usuarios/${nomeDeUsuario.trim()}`).once('value')
      .then(snapshot => {
        if (snapshot.exists() && snapshot.val().senha === senha)
        {
          navigation.navigate('main', { nomeDeUsuario: nomeDeUsuario });
        }
        else
        {
          alert('Usuário não existe. Cadastre-se primeiro.');
        }
      })
      .catch(() => alert('Não foi possível verificar o banco de dados. Tente novamente.'))
    ;
  }

  return (
    <View style={s.mainContainer}>
      <Text style={s.boasVindas}>Bem-vindo à FEI Net</Text>
      <View style={s.loginCard}>
        <Text style={s.loginCardTitulo}>Fazer login</Text>
        <View style={s.textFieldRow}>
          <Text style={s.label}>Nome de usuário:</Text>
          <TextInput style={s.textField} value={nomeDeUsuario} onChangeText={setNomeDeUsuario} />
        </View>
        <View style={s.textFieldRow}>
          <Text style={s.label}>Senha:</Text>
          <TextInput style={s.textField} value={senha} onChangeText={setSenha} secureTextEntry={true} />
        </View>
        <View style={s.buttonRow}>
          <TouchableOpacity style={s.button} onPress={fazerLogin}>
            <Text style={s.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.button} onPress={() => navigation.navigate('cadastro')}>
            <Text style={s.buttonText}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    paddingHorizontal: '3%',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  loginCard: {
    paddingVertical: 24,
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#d1d1d1',
    borderStyle: 'solid',
    borderRadius: 10,
    gap: 16,
  },
  loginCardTitulo: {
    fontWeight: 'bold',
    fontSize: 26,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  textFieldRow: {
    gap: 8,
  },
  buttonRow: {
    marginTop: 10,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
  },
  textField: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#d1d1d1',
    borderRadius: 7,
    padding: 4,
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
  boasVindas: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: '5%', 
    left: 2,
  }
});