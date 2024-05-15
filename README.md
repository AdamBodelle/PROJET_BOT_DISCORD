Pour utiliser ce bot il vous faut discord.js, pour l'installer utiliser la commande:
npm install discord.js

La base de donnée est en mysql, si vous n'avez pas mysql utilisez la commande suivante:
npm intsall mysql

Le code pour la création des tables se trouve dans le fichier "Table - projetBotDiscord.txt".

Vous devrez aussi modifier le fichier "config.json" en remplaçant les valeurs indiquées.

Une fois toutes ces étapes réalisées, vous pouvez lancer le bot avec la commande:
node ./main.js

Voici les commandes du bot:

/key -> Répond 'Hey' avec un petit émoji sympa
/who_am_i -> Donne le nom de l'utilisateur, son id, son avatar et l'id du server
/show-message -> Donne les X derniers messages envoyés par un utilisateurs, prend en paramètre le nombre de messages voulu (max 5) et le nom de l'utilisateur
/show-message-channel -> Donne les X derniers messages envoyés dans un salon, prend en paramètre le nombre de messages voulu (max 5) et l'id du salon
/talk-too-much -> Donne le nom de l'utilisateur qui a envoyé le plus de messages et le nombre de messages qu'il a envoyé, prend en paramètre l'id du channel
/random-message -> Donne un message aléatoire d'un utilisateur, prend en paramètre l'id de l'utilisateur
/how-much-messages -> Donne le nombre de messages envoyés par chaque utilisateurs dans un salon, prend en paramètre l'id du salon
