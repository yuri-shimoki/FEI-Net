import { StyleSheet, FlatList, TouchableOpacity, View, Vibration, Text } from 'react-native';
import { useState, useEffect } from 'react';
import firebase from '../config/config';

export default function FeedDePosts({ clubeId, header, usuario })
{
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let refString = '/posts';

    if (clubeId !== '')
    {
      refString = `/clubes/${clubeId}/posts`;
    }

    const postsRef = firebase.database().ref(refString);

    postsRef.on('value', snapshot => {
      if (snapshot.exists()) {
        const arrayDePosts = [];
        
        snapshot.forEach(filho => {
          arrayDePosts.push({ id: filho.key, ...filho.val() })
        });
        
        setPosts(arrayDePosts.reverse());

        const padrao = [0, 100, 100, 100];

        Vibration.vibrate(padrao);
      }
    });

    return () => postsRef.off('value');
  }, [clubeId]);

  function renderizarPost(item, usuario)
  {
    function deletarPost()
    {
      firebase.database().ref(`/posts/${item.id}`).remove();
    }

    return (
      <View style={s.postCard}>
        <View style={s.postAuthorDateRow}>
          <Text style={s.authorText}>{item.autor}</Text>
          <View style={s.sideRow}>
            <Text style={s.dateText}>{new Date(item.dataPublicacao).toLocaleDateString()}</Text>
            {
              item.autor === usuario ?
              <TouchableOpacity onPress={deletarPost}>
                <Text style={s.buttonText}>✖</Text>
              </TouchableOpacity>
              : null
            }
          </View>
        </View>
        <Text>{item.conteudo}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => renderizarPost(item, usuario)}
      keyExtractor={post => post.id}
      ListHeaderComponent={header}
      contentContainerStyle={s.postList}
      />
  );
}

const s = StyleSheet.create({
  postCard: {
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: '5%',
    gap: 20,
    borderTopWidth: 2,
    borderTopColor: '#d1d1d1',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
    borderLeftWidth: 2,
    borderLeftColor: '#d1d1d1',
    borderRightWidth: 2,
    borderRightColor: '#d1d1d1',
    borderRadius: 5,
    marginHorizontal: '2.5%',
  },
  postAuthorDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
  },
  authorText: {
    fontWeight: 'bold',
  },
  dateText: {
    color: '#aaa',
  },
  postList: {
    gap: 32,
    paddingBottom: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#aaa',
  },
  sideRow: {
    flexDirection: 'row',
    gap: 10,
  },
});