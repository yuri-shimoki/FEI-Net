import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import firebase from '../config/config';

export default function Cadastro({ navigation })
{
  const [nomeDeUsuario, setNomeDeUsuario] = useState('');
  const [senha, setSenha] = useState('');

  async function cadastrarUsuario()
  {
    const usuario = firebase.database().ref(`/usuarios/${nomeDeUsuario.trim()}`);

    usuario.once('value')
      .then(snapshot => {
        if (snapshot.exists())
        {
          alert('Usuário já existe. Tente outro nome');
        }
        else
        {
          usuario.set({ senha: senha })
            .then(() => alert('Usuário cadastrado com sucesso!'))
            .catch(() => alert('Falha ao cadastrar o usuário. Tente novamente.'));
        }
      })
      .catch(() => alert('Não foi possível verificar o banco de dados. Tente novamente.'))
    ;
  }

  return (
    <View style={s.mainContainer}>
      <View style={s.loginCard}>
        <Text style={s.loginCardTitulo}>Cadastrar usuário</Text>
        <View style={s.textFieldRow}>
          <Text style={s.label}>Nome de usuário:</Text>
          <TextInput style={s.textField} value={nomeDeUsuario} onChangeText={setNomeDeUsuario} />
        </View>
        <View style={s.textFieldRow}>
          <Text style={s.label}>Senha:</Text>
          <TextInput style={s.textField} value={senha} onChangeText={setSenha} secureTextEntry={true} />
        </View>
        <View style={s.buttonRow}>
          <TouchableOpacity style={s.button} onPress={cadastrarUsuario}>
            <Text style={s.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.button} onPress={() => navigation.navigate('login')}>
            <Text style={s.buttonText}>Fazer login</Text>
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
  }
});