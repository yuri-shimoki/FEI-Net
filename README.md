# FEI Net

## Objetivo do Projeto

A FEI Net é uma rede social que busca integrar os estudantes uns aos outros e às atividades universitárias. Idealmente, ela facilitaria a interação entre alunos e entre alunos e projetos da FEI:
- Alunos poderiam visualizar diretamente os posts de projetos como BAJA ou RoboFEI, além de poderem solicitar a entrada nesses projetos.
- Alunos poderiam formar grupos de estudos pequenos entre amigos, ou grandes entre classes, ciclos e cursos.
- A própria FEI poderia publicar anúncios de eventos ou avisos diretamente no aplicativo para todos os estudantes verem.

Essa seria a ideia, mas devido a limitações de tempo e escopo, este projeto está limitado aos recursos mais essenciais, como posts, clubes e amizades.

## Requisitos

O projeto precisa:

- Possuir pelo menos 1 imagem.
- Utilizar um atuador e sensor.
- Ter 6 telas distintas que não sejam de login nem cadastro e possibilitar a navegação entre elas.
- Utilizar armazenamento em banco de dados.
- Permitir operações de CRUD nos dados persistentes.

## Funcionalidades

Na FEI Net, o usuário é capaz de:
- Criar e entrar em uma conta: O usuário pode criar uma conta especificando um nome de usuário único e uma senha. Após a criação da conta, o usuário pode acessar o aplicativo ao fazer login utilizando tal conta.
- Criar e deletar posts pessoais: O usuário pode criar um post que estará visível para todos os usuários da plataforma. O post contém apenas uma mensagem de texto não vazia, e é exibido como um cartão contendo essa mensagem, o nome do autor, e a data de publicação. O usuário também é capaz de deletar apenas seus posts.
  - Inicialmente o plano era filtrar os posts para apenas amigos e clubes do qual o usuário faz parte, mas, por falta de tempo, esta ideia foi descartada.
- Entrar ou sair de clubes: O usuário pode entrar ou sair de clubes já existentes. O usuário só é capaz de visualizar os posts de um clube se ele estiver participando desse clube. Um clube é automaticamente deletado se ele estiver vazio (não possuir membros).
  - Inicialmente, isto afetaria os posts visíveis na página inicial, mas, com o descarte da ideia de filtragem, esta função apenas impede o usuário de acessar imediatamente a página de posts de um clube.
- Criar e deletar posts em clubes: O usuário pode criar e deletar posts em um clube da mesma forma que cria e deleta posts globais para outros usuários.
- Adicionar ou remover amigos: O usuário pode adicionar como amigo outros usuários cadastrados na plataforma, ou desfazer a amizade com usuários que já são amigos (remover amigos). O usuário só é capaz de visualizar a conversa entre ele e um outro usuário se ele for amigo dele.
  - Inicialmente, isto afetaria os posts visíveis na página inicial, mas, com o descarte da ideia de filtragem, esta função apenas impede o usuário de acessar imediatamente a página de conversa do amigo.
- Enviar mensagens para os amigos: O usuário é capaz de enviar mensagens privadas para um amigo. As mensagens só podem conter texto.
- Sair da conta (logout): O usuário pode sair da conta, sendo forçado a voltar para a tela de login.

O vibrador foi utilizado como atuador deste projeto. Ele é ativado rapidamente 2 vezes seguidas toda vez que um novo post é publicado. Não consegui encontrar uma funcionalidade razoável para um sensor além da câmera, que decidi não implementar para poder utilizar o tempo do projeto desenvolvendo funcionalidades mais simples, entretanto essenciais.

Além disso, todos os dados persistentes deste projeto são salvos em um banco de dados externo (Firebase).

## Tecnologias

Este projeto utiliza JavaScript, React, React Native, Firebase Realtime Database. Além disso, ele foi desenvolvido na plataforma Snack.

## Interface

O aplicativo possui 8 telas. A navegação é feita através de um StackNavigator e um BottomTabNavigator.

- Login: onde o usuário entra no aplicativo através de suas credenciais ou vai para a tela de cadastro utilizando o StackNavigator.
- Cadastro: onde o usuário cria uma conta ou volta para a tela de login utilizando o StackNavigator.

As abas abaixo são telas de um BottomTabNavigator, exceto pela tela de feed do clube e a conversa de amigo, que são implementadas através de um StackNavigator.
- Home: onde os posts do usuário e de outras pessoas podem ser visualizados.
- Clubes: onde é possível ver uma lista de clubes existentes e entrar em, sair de ou criar um.
  - Feed do clube: onde é possível visualizar todos os posts do clube.
- Amigos: onde é possível ver uma lista de todos os outros usuários cadastrados na plataforma e adicioná-los ou removê-los.
  - Conversa de amigo: onde é possível visualizar as mensagens entre você e um de seus amigos.
- Perfil: onde é possível ver os dados da sua conta (nome e senha) e sair de sua conta, voltando para a tela de login.

A imagem requisitada deste projeto é a logo da FEI Net, que está presente na aba superior da tela uma vez que o usuário esteja logado.

## Execução

No terminal, entre na pasta [fei-net/fei-net](fei-net/fei-net), e digite:

```npm install```

Após a instalação, execute:

```npx expo start```

Um código QR irá aparecer no terminal. Escaneie-o utilizando seu celular e abra-o utilizando o aplicativo Expo Go.
