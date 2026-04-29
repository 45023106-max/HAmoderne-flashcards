import { useState, useEffect, useCallback, useRef } from "react";

/* ─────────────────────────────────────────────
   DONNÉES — TOUTES LES ŒUVRES + CONCEPTS
   (code original + œuvres manquantes + quiz)
───────────────────────────────────────────── */

const CARDS = [
  // ── Icônes / Introduction ──
  {
    id:"a001", type:"artwork", movement:"Renaissance florentine", period:"XVe-XVIe", theme:"Peinture",
    artist:"Léonard de Vinci", title:"La Joconde (Mona Lisa)", date:"1503–1519",
    location:"Musée du Louvre, Paris", medium:"Huile sur panneau de bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/402px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    characteristics:["Pose de ¾ (nouveauté majeure)","Sourire (rupture des règles de civilité : sourire féminin = indécent)","Sfumato : contours estompés et atmosphère vibrante","Fond paysager atmosphérique","Célèbre dès le XVe, reprise par Duchamp et al."],
    context:"Œuvre emblématique de la Renaissance. Icône mondiale de la peinture. Commande de Francesco del Giocondo.",
    themes:["Portrait féminin","Sfumato","Humanisme","Idéal de beauté renaissant"],
    distinctions:"Pose de ¾ révolutionnaire. Sfumato : superposition de couches translucides créant un effet de brume unique.",
    quizWrongs:["Botticelli","Raphaël","Michel-Ange"],
  },
  {
    id:"a002", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Peinture",
    artist:"Botticelli", title:"La Naissance de Vénus", date:"1485",
    location:"Galerie des Offices, Florence", medium:"Tempera sur toile",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1024px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    characteristics:["Modèle : Simoneta Vespucci","S'inspire de la Vénus pudique antique","Idéal de beauté néoplatonicien","Iconographie antique réinventée","Style graphique et lignes fluides"],
    context:"Commandée par les Médicis. Sujet profane mythologique, destiné à une résidence privée.",
    themes:["Mythologie","Néoplatonisme","Idéal féminin","Art profane"],
    distinctions:"Iconographie reprise jusqu'aujourd'hui. Sujet profane mythologique rare pour l'époque. Pas de perspective linéaire.",
    quizWrongs:["Léonard de Vinci","Mantegna","Ghirlandaio"],
  },
  {
    id:"a003", type:"artwork", movement:"Ars nova (Renaissance nordique)", period:"Quattrocento", theme:"Peinture",
    artist:"Robert Campin", title:"Triptyque de l'Annonciation de Mérode", date:"1425–1432",
    location:"The Cloisters, New York", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Workshop_of_the_Master_of_Fl%C3%A9malle_-_Annunciation_Triptych_%28Merode_Altarpiece%29_-_Google_Art_Project.jpg/1280px-Workshop_of_the_Master_of_Fl%C3%A9malle_-_Annunciation_Triptych_%28Merode_Altarpiece%29_-_Google_Art_Project.jpg",
    characteristics:["Style médiéval/gothique : drapés aigus","Perspective empirique (maladroite)","Symbolisme flamand : chandelle éteinte, souricière (diable)","Environnement flamand contemporain ≠ Palestine du Ier s.","Innovation renaissante : perspective linéaire dans le décor"],
    context:"Premier peintre à rompre avec l'élégance gothique pour capter les formes du réel. Tableau de dévotion privé.",
    themes:["Annonciation","Symbolisme flamand","Coexistence gothique/Renaissance","Tableau de dévotion"],
    distinctions:"Cohabitation du style gothique et des innovations renaissantes. Panneau droit : saint Joseph travaillant le bois.",
    quizWrongs:["Van Eyck","Rogier van der Weyden","Hans Memling"],
  },
  {
    id:"a004", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Donatello", title:"David (bronze)", date:"1444–1446",
    location:"Musée national du Bargello, Florence", medium:"Bronze",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Donatello_-_David_-_Florentine_-_Bargello.jpg/450px-Donatello_-_David_-_Florentine_-_Bargello.jpg",
    characteristics:["Première statue en ronde-bosse de la Renaissance","Premier grand bronze (1m60) depuis l'Antiquité","Nu monumental exposé en lieu public","Idéal de beauté masculine androgyne","Contrapposto prononcé","Casque, longs cheveux, pied sur la tête de Goliath"],
    context:"Commandé par Cosme l'Ancien. Symbole de Florence : liberté, savoir-faire, innovation.",
    themes:["Nu masculin","Symbole civique","Androgynie","Antiquité redécouverte"],
    distinctions:"1er nu monumental de la Renaissance. Rapport masculin/féminin, viril/gracieux. ≠ David de marbre (1412) qui est vêtu.",
    quizWrongs:["Verrocchio","Nanni di Banco","Ghiberti"],
  },
  // ── Concours 1401 / Baptistère ──
  {
    id:"a005", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Lorenzo Ghiberti", title:"Panneau du Sacrifice d'Isaac (concours de 1401)", date:"1401",
    location:"Musée national du Bargello, Florence", medium:"Bronze doré",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Ghiberti%2C_sacrificio_di_isacco%2C_1401.jpg/450px-Ghiberti%2C_sacrificio_di_isacco%2C_1401.jpg",
    characteristics:["Scène fondue en une seule pièce (≠ Brunelleschi)","Composition traditionnelle et lisible","Premier torse nu érotique dans un décor religieux","Rinceau inspiré de l'Ara Pacis","Meilleure maîtrise du raccourci","Transition entre gothique et antique"],
    context:"Concours organisé par la corporation Calimala pour la porte Nord du baptistère. 7 candidats. Ghiberti retenu contre Brunelleschi.",
    themes:["Concours public","Bronze","Transition gothique-Renaissance","Iconographie biblique"],
    distinctions:"Vs Brunelleschi : Ghiberti fond en une pièce (moins coûteux), composition plus lisible. Brunelleschi cite le tireur d'épine mais ne peut pas fondre en une pièce.",
    quizWrongs:["Brunelleschi","Donatello","Nanni di Banco"],
  },
  {
    id:"a006", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Lorenzo Ghiberti", title:"Porte Est du baptistère de Florence (Porte du Paradis)", date:"1425–1452",
    location:"Baptistère de San Giovanni, Florence", medium:"Bronze doré",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Ghiberti_Lorenzo-east_doors.jpg/450px-Ghiberti_Lorenzo-east_doors.jpg",
    characteristics:["Vasari : 'La plus belle œuvre jamais réalisée'","Michel-Ange : 'Porte du Paradis'","Œuvre doublement signée : signature gravée + médaillon autoportrait","10 panneaux de scènes bibliques en bas-relief","Bronze doré en 1425"],
    context:"Suite des portes Nord (1404–1424). Chef-d'œuvre absolu de Ghiberti.",
    themes:["Sculpture monumentale","Bronze","Signature de l'artiste","Chef-d'œuvre renaissant"],
    distinctions:"Autoportrait inclus dans un médaillon = affirmation du statut d'artiste. Double signature inédite.",
    quizWrongs:["Donatello","Andrea Pisano","Brunelleschi"],
  },
  // ── Orsanmichele ──
  {
    id:"a007", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Nanni di Banco", title:"Quatre Saints couronnés", date:"1408–1415",
    location:"Orsanmichele, Florence", medium:"Marbre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Nanni_di_Banco_-_Quattro_Santi_Coronati_-_Orsanmichele_Firenze.jpg/450px-Nanni_di_Banco_-_Quattro_Santi_Coronati_-_Orsanmichele_Firenze.jpg",
    characteristics:["Premières statues en ronde-bosse et en pied de la Renaissance","Socle circulaire (groupe discutant) ≠ statues plaquées","Déhanchement antique (contrapposto)","Pas d'attributs de sculpteurs : ressemblent à des orateurs","Hybridation tradition chrétienne et modèle antique"],
    context:"Commande de la corporation des tailleurs de pierre. Orsanmichele : ancienne halle reconvertie en église.",
    themes:["Ronde-bosse","Contrapposto","Vertus civiques","Martyre chrétien"],
    distinctions:"Groupe en conversation → socle circulaire. Naturalisme et dialogue avec l'espace urbain.",
    quizWrongs:["Donatello","Ghiberti","Verrocchio"],
  },
  {
    id:"a008", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Ghiberti", title:"Saint Jean Baptiste", date:"1412",
    location:"Orsanmichele, Florence", medium:"Bronze",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ghiberti_St_John_the_Baptist_Orsanmichele_n1.jpg/450px-Ghiberti_St_John_the_Baptist_Orsanmichele_n1.jpg",
    characteristics:["Technique avancée de fonte et ciselure","Première grande statue en bronze de la Renaissance moderne","Empreinte gothique mais prémices de l'idéalisation du corps","Visage idéalisé"],
    context:"Commandée par la corporation de l'Arte di Calimala (la plus riche).",
    themes:["Bronze","Patronat corporatif","Tradition gothique et innovation"],
    distinctions:"Première grande statue en bronze moderne. Encore gothique mais visage idéalisé = amorce renaissante.",
    quizWrongs:["Donatello","Nanni di Banco","Verrocchio"],
  },
  {
    id:"a009", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Donatello", title:"Saint Georges", date:"1415",
    location:"Orsanmichele / Musée du Bargello, Florence", medium:"Marbre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Donatello_-_St_George_-_Bargello_Florence.jpg/400px-Donatello_-_St_George_-_Bargello_Florence.jpg",
    characteristics:["Commandé par la corporation des armuriers","Statue statique mais expressivité et mouvement remarquables","Naturalisme : anatomie et drapé soignés","Prédelle : Saint Georges délivrant la Princesse avec stiacciato et perspective linéaire"],
    context:"Modèle civique florentin : courage, éloquence, piété.",
    themes:["Héroïsme civique","Martyre","Stiacciato (prédelle)","Vertus antiques"],
    distinctions:"Prédelle = première utilisation précoce de la perspective linéaire en sculpture. Stiacciato inventé ici.",
    quizWrongs:["Ghiberti","Nanni di Banco","Verrocchio"],
  },
  // ── Donatello – expressivité et techniques ──
  {
    id:"a010", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Donatello", title:"Prophète Habacuc (Lo Zuccone)", date:"1427–1435",
    location:"Campanile de Giotto, Florence", medium:"Marbre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Donatello_Habakkuk_01.jpg/400px-Donatello_Habakkuk_01.jpg",
    characteristics:["Austérité et gravité romaine","Psychologie de la figure : regard vide et triste, lèvres entrouvertes","Mimétisme expressif","Tenue avec fibules antiques"],
    context:"6 statues pour le campanile de Giotto (84 m de haut). Nécessité d'expressivité lisible depuis le bas.",
    themes:["Expressivité","Portrait psychologique","Antiquité","Prophète biblique"],
    distinctions:"Surnommé 'Lo Zuccone' (la citrouille). Psychologie unique dans la sculpture du XVe.",
    quizWrongs:["Luca della Robbia","Nanni di Banco","Ghiberti"],
  },
  {
    id:"a011", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Donatello", title:"Marie Madeleine", date:"1453–1455",
    location:"Musée de l'Œuvre du Duomo, Florence", medium:"Bois polychrome",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Donatello_-_Mary_Magdalene_%28c._1455%29.jpg/400px-Donatello_-_Mary_Magdalene_%28c._1455%29.jpg",
    characteristics:["Expression mystique de la foi et de la pénitence","Polychromie","Non finito volontaire : expressivité consciente","Anatomie et visage décharné","Usée par le jeûne, cheveux poisseux mêlés à une peau de bête"],
    context:"Marie Madeleine = pécheresse repentante. Précède Michel-Ange dans l'usage du non finito.",
    themes:["Pénitence","Expressivité","Non finito","Foi mystique"],
    distinctions:"Non finito ≠ œuvre inachevée : technique délibérée. Suscite la pitié du spectateur.",
    quizWrongs:["Luca della Robbia","Niccolò dell'Arca","Jacopo della Quercia"],
  },
  {
    id:"a012", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Donatello", title:"Judith et Holopherne", date:"1460",
    location:"Palazzo Vecchio, Florence", medium:"Bronze, 2 m",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Donatello_Judith_and_Holofernes.jpg/400px-Donatello_Judith_and_Holofernes.jpg",
    characteristics:["Premier groupe en bronze en ronde-bosse","Pendant féminin de David = figure de victoire du peuple sur la tyrannie","Placée sur la Piazza della Signoria","Inscription : 'La liberté triomphe sur la tyrannie'"],
    context:"Commandé par Cosme l'Ancien. Symbolique politique forte à Florence.",
    themes:["Liberté civique","Bronze","Héroïsme féminin","Symbolique politique"],
    distinctions:"Premier groupe en bronze en ronde-bosse. Pendant féminin de David.",
    quizWrongs:["Verrocchio","Nanni di Banco","Ghiberti"],
  },
  {
    id:"a013", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Donatello", title:"Vierge à l'enfant de madame Pazzi (stiacciato)", date:"1422",
    location:"Staatliche Museen, Berlin", medium:"Marbre, stiacciato",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Donatello_-_Madonna_Pazzi_-_Bode-Museum.jpg/400px-Donatello_-_Madonna_Pazzi_-_Bode-Museum.jpg",
    characteristics:["Virtuosité technique : < 1 cm de profondeur","Souplesse des mains de la Vierge","Effet de tridimensionnalité : la Vierge semble sortir de l'encadrement","Renouvellement iconographique : pas d'auréole"],
    context:"Vers 1410, Donatello invente le stiacciato = bas-relief pictural.",
    themes:["Stiacciato","Relief méplat","Tendresse","Innovation technique"],
    distinctions:"Moins d'1 cm de profondeur pour un effet tridimensionnel. Absence d'auréole = humanisation.",
    quizWrongs:["Luca della Robbia","Ghiberti","Nanni di Banco"],
  },
  {
    id:"a014", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Donatello", title:"Le Festin d'Hérode (fonts baptismaux)", date:"1427",
    location:"Baptistère San Giovanni, Sienne", medium:"Bronze, relief méplat",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Donatello_-_Feast_of_Herod_-_Baptismal_Font%2C_Siena.jpg/450px-Donatello_-_Feast_of_Herod_-_Baptismal_Font%2C_Siena.jpg",
    characteristics:["Relief méplat en bronze à la cire perdue","3 plans créant une illusion de profondeur","Plan 1 : Salomé qui danse + tête","Plan 2 : Musiciens","Plan 3 : bourreaux de saint Jean-Baptiste"],
    context:"Fonts baptismaux de Sienne. Technique complexe de cire perdue.",
    themes:["Stiacciato","Perspective","Narration","Bronze"],
    distinctions:"3 plans narratifs distincts dans un seul relief. Maîtrise spatiale exceptionnelle.",
    quizWrongs:["Ghiberti","Luca della Robbia","Jacopo della Quercia"],
  },
  // ── Cantorie et tombeaux ──
  {
    id:"a015", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Luca della Robbia", title:"Cantoria", date:"1431",
    location:"Musée de l'Œuvre du Duomo, Florence", medium:"Marbre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Luca_della_Robbia%2C_cantoria%2C_1431-38%2C_03.jpg/600px-Luca_della_Robbia%2C_cantoria%2C_1431-38%2C_03.jpg",
    characteristics:["Figures cloisonnées et statiques","Art apaisé, doux, harmonieux et symétrique (≠ Donatello)","Parallélépipède soutenu de 5 consoles"],
    context:"Commandée pour la cathédrale Santa Maria del Fiore. En pendant avec la Cantoria de Donatello.",
    themes:["Musique","Chanteurs","Sobriété classique"],
    distinctions:"Vs Cantoria Donatello : figures statiques ≠ putti dansants agités.",
    quizWrongs:["Donatello","Ghiberti","Nanni di Banco"],
  },
  {
    id:"a016", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Donatello", title:"Cantoria", date:"1433",
    location:"Musée de l'Œuvre du Duomo, Florence", medium:"Marbre et mosaïque",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Donatello_-_Cantoria_-_Museo_dell%27Opera_del_Duomo%2C_Florence.jpg/600px-Donatello_-_Cantoria_-_Museo_dell%27Opera_del_Duomo%2C_Florence.jpg",
    characteristics:["Inspiré de sarcophages dionysiaques","Expression du mouvement des putti dansants","Fond en mosaïque dorée","Frise continue sans séparations"],
    context:"Pendant de la Cantoria della Robbia.",
    themes:["Putti","Mouvement","Modèle antique dionysiaque"],
    distinctions:"Putti en mouvement frénétique ≠ figures sages della Robbia.",
    quizWrongs:["Luca della Robbia","Ghiberti","Verrocchio"],
  },
  {
    id:"a017", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento", theme:"Sculpture",
    artist:"J. Quercia", title:"Tombeau d'Ilaria del Carreto", date:"1406",
    location:"Cathédrale San Martino, Lucques", medium:"Marbre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Jacopo_della_Quercia%2C_tomb_of_Ilaria_del_Carreto%2C_1406%2C_Lucca.jpg/600px-Jacopo_della_Quercia%2C_tomb_of_Ilaria_del_Carreto%2C_1406%2C_Lucca.jpg",
    characteristics:["Gisant : représentation du défunt de façon intègre = immortalisation","Frise de putti sur le sarcophage (motif réapparu en 1406)","Chien à ses pieds = fidélité","Traitement doux et idéalisé"],
    context:"Un des premiers emplois du motif du putto en relief depuis l'Antiquité.",
    themes:["Gisant","Putti","Mort et mémoire","Idéalisation"],
    distinctions:"Gisant ≠ Transi. Réintroduit le motif du putto pour la première fois à la Renaissance.",
    quizWrongs:["Donatello","Ghiberti","Niccolò dell'Arca"],
  },
  {
    id:"a018", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento", theme:"Sculpture",
    artist:"Niccolò dell'Arca", title:"Déploration du Christ mort", date:"1484",
    location:"Santa Maria della Vita, Bologne", medium:"Terre cuite polychrome",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Niccol%C3%B2_dell%27Arca_-_Compianto_sul_Cristo_morto.jpg/640px-Niccol%C3%B2_dell%27Arca_-_Compianto_sul_Cristo_morto.jpg",
    characteristics:["Groupe de 8 personnages à l'échelle réelle","Terre cuite populaire ≠ bronze/marbre","Très immersif : ronde-bosse à hauteur d'homme","Expressivité dramatique intense"],
    context:"Production populaire destinée à émouvoir les fidèles. Influence sur Mantegna (Lamentation).",
    themes:["Dévotion populaire","Expressivité","Mort du Christ","Terre cuite"],
    distinctions:"Terre cuite ≠ matériaux nobles. Immersion et proximité avec le fidèle.",
    quizWrongs:["Donatello","Quercia","Verrocchio"],
  },
  // ── Terracotta invetriata ──
  {
    id:"a019", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Luca della Robbia", title:"Tondi de la chapelle Pazzi", date:"1440",
    location:"Chapelle Pazzi, Santa Croce, Florence", medium:"Terracotta invetriata",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Pazzi_Chapel_interior%2C_Florence.jpg/640px-Pazzi_Chapel_interior%2C_Florence.jpg",
    characteristics:["Tondi bicolores (blanc et bleu)","Bleu ≈ ciel traversant la voûte","Résistance aux intempéries grâce à la vitrification","Peu coûteux, reproductible, léger"],
    context:"Brunelleschi demande à della Robbia de réaliser les tondi pour la chapelle Pazzi.",
    themes:["Terracotta invetriata","Architecture et sculpture intégrées","Couleur"],
    distinctions:"Terracotta invetriata = relief de la sculpture + couleur de la peinture + intégration architecturale.",
    quizWrongs:["Donatello","Andrea della Robbia","Ghiberti"],
  },
  {
    id:"a020", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Andrea della Robbia", title:"Saint Georges et le dragon", date:"1490",
    location:"Orsanmichele, Florence", medium:"Terracotta invetriata polychrome",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Andrea_della_Robbia_-_Saint_George_and_the_Dragon.jpg/450px-Andrea_della_Robbia_-_Saint_George_and_the_Dragon.jpg",
    characteristics:["Développement polychrome (jaune, vert turquoise, marron, noir)","Synthèse des arts dans le contexte du Paragone","Neveu de Luca della Robbia"],
    context:"Paragone = débat intellectuel sur les mérites comparés des arts.",
    themes:["Paragone","Synthèse des arts","Terracotta","Polychromie"],
    distinctions:"Vs Luca : palette polychrome étendue. Héritier et innovateur de la technique familiale.",
    quizWrongs:["Luca della Robbia","Donatello","Ghiberti"],
  },
  // ── Architecture Brunelleschi ──
  {
    id:"a021", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Architecture",
    artist:"Brunelleschi", title:"Coupole de Santa Maria del Fiore (Duomo)", date:"1420–1436",
    location:"Florence", medium:"Maçonnerie, double coque",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Brunelleschi_Dome.jpg/640px-Brunelleschi_Dome.jpg",
    characteristics:["Plus grande coupole d'Europe","Diamètre 55 m, hauteur 116 m","Système à double coque","Auto-portante sans cintrage","Inspiration du Panthéon de Rome"],
    context:"1418 : appel d'offre. 1420 : début des travaux. Exploit technique sans précédent.",
    themes:["Prouesse technique","Héritage antique","Florence","Génie ingénieurie"],
    distinctions:"Auto-portante sans échafaudage central. Double coque inédite. Symbole de Florence.",
    quizWrongs:["Alberti","Michelozzo","Bramante"],
  },
  {
    id:"a022", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Architecture",
    artist:"Brunelleschi", title:"Hôpital des Innocents (façade)", date:"1419–1426",
    location:"Florence", medium:"Pierre et plâtre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Ospedale_degli_Innocenti%2C_Firenze.jpg/640px-Ospedale_degli_Innocenti%2C_Firenze.jpg",
    characteristics:["Premier édifice caractéristique de la Renaissance","Loggia à colonnes lisses corinthiennes","Arcs en plein cintre","Ordonnance régulière et modules carrés","Sobriété décorative : mur blanc + pietra serena"],
    context:"Orphelinat. Premier bâtiment pensé selon les principes renaissants.",
    themes:["Architecture civile","Rationalité","Modularité","Proportions"],
    distinctions:"Premier bâtiment renaissant. Colonnes supportent directement les arcs ≠ entablement antique strict.",
    quizWrongs:["Alberti","Michelozzo","Bramante"],
  },
  {
    id:"a023", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Architecture",
    artist:"Brunelleschi", title:"Basilique San Lorenzo", date:"1421",
    location:"Florence", medium:"Pierre, pietra serena",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/San_Lorenzo_Firenze_Interior.jpg/640px-San_Lorenzo_Firenze_Interior.jpg",
    characteristics:["Commandée par les Médicis (nécropole familiale)","Plan longitudinal","Colonnade continue sous arcs cintrés","Plafond à caissons (basilique romaine)","Pietra serena souligne la rigueur géométrique"],
    context:"Sacristie Vieille par Brunelleschi, Sacristie Neuve par Michel-Ange. Façade jamais terminée.",
    themes:["Architecture religieuse","Médicis","Nécropole","Rationalité géométrique"],
    distinctions:"Plafond à caissons inspiré de la basilique de Constantin. Sacristie Vieille = première utilisation du plan centré.",
    quizWrongs:["Alberti","Michelozzo","Bramante"],
  },
  {
    id:"a024", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Architecture",
    artist:"Brunelleschi et disciples", title:"Chapelle Pazzi", date:"1441–1478",
    location:"Santa Croce, Florence", medium:"Pierre et marbre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cappella_de%27_Pazzi%2C_interno.JPG/640px-Cappella_de%27_Pazzi%2C_interno.JPG",
    characteristics:["Plan centré","Coupole sur le portique","Tondi de Donatello","Modules répétés et symétriques","Sobriété bichrome"],
    context:"Commandée par la famille Pazzi. Chapelle privée.",
    themes:["Plan centré","Modularité","Architecture privée"],
    distinctions:"Plan centré adapté à une chapelle. Coupole principale + demi-sphères latérales.",
    quizWrongs:["Alberti","Michelozzo","Bramante"],
  },
  // ── Architecture civile ──
  {
    id:"a025", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Architecture",
    artist:"Michelozzo", title:"Palais Médicis-Riccardi", date:"1444–1459",
    location:"Florence", medium:"Pierre de taille",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Medici_riccardi_ext1.jpg/640px-Medici_riccardi_ext1.jpg",
    characteristics:["Façade à 3 niveaux avec bossages différenciés","Niveau 1 : bossage rustique","Niveau 2 : bossage raffiné (piano nobile)","Niveau 3 : blocs lisses","Grande corniche antique","Cour intérieure harmonieuse"],
    context:"Premier grand palais renaissant de Florence. Déclenche une vague de modernisation.",
    themes:["Architecture civile","Médicis","Palais florentin","Hiérarchie des niveaux"],
    distinctions:"Façade hiérarchisée par les bossages = lecture sociale immédiate.",
    quizWrongs:["Alberti","Brunelleschi","Bramante"],
  },
  {
    id:"a026", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Architecture",
    artist:"Alberti / Rossellino", title:"Palazzo Rucellai", date:"1446–1466",
    location:"Florence", medium:"Pierre de taille",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Palazzo_rucellai.jpg/640px-Palazzo_rucellai.jpg",
    characteristics:["Premier bâtiment renaissant avec superposition des ordres (≈ Colisée)","Appareils uniformes sur les 3 niveaux","Pilastres et bossage lisse","Façade unifie plusieurs maisons"],
    context:"Alliance entre familles Rucellai et Médicis. Formule diffusée à Rome, Pienza, Venise.",
    themes:["Superposition des ordres","Architecture civile","Humanisme","Alberti"],
    distinctions:"1er bâtiment renaissant avec vraie superposition des ordres. Régularité ≠ hiérarchie des bossages Médicis.",
    quizWrongs:["Michelozzo","Brunelleschi","Bramante"],
  },
  // ── Peinture florentine ──
  {
    id:"a027", type:"artwork", movement:"Gothique international", period:"Quattrocento", theme:"Peinture",
    artist:"Lorenzo Monaco", title:"Le Couronnement de la Vierge", date:"1414",
    location:"Galerie des Offices, Florence", medium:"Tempera sur bois, fond doré",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lorenzo_Monaco_-_Coronation_of_the_Virgin_-_Uffizi.jpg/450px-Lorenzo_Monaco_-_Coronation_of_the_Virgin_-_Uffizi.jpg",
    characteristics:["Tableau à trois arcs, cimaise et prédelle","Richesse des matériaux : or, outremer","Figures gracieuses au style gothique","Fond doré = Paradis","Composition lisible mais peu de profondeur"],
    context:"Représentant du gothique international à Florence. Contemporain de Masaccio.",
    themes:["Gothique international","Fond doré","Couronnement de la Vierge"],
    distinctions:"Sensation d'espace ≠ construction d'espace. Coexistence stylistique avec Masaccio.",
    quizWrongs:["Gentile da Fabriano","Fra Angelico","Ghirlandaio"],
  },
  {
    id:"a028", type:"artwork", movement:"Gothique international", period:"Quattrocento", theme:"Peinture",
    artist:"Gentile da Fabriano", title:"L'Adoration des Mages", date:"1423",
    location:"Galerie des Offices, Florence", medium:"Tempera et or sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Gentile_da_Fabriano_023.jpg/640px-Gentile_da_Fabriano_023.jpg",
    characteristics:["3 arcs en plein cintre, 3 gâbles et 1 prédelle","Motifs chatoyants (≈ brocard, tapisserie)","3 arcs = 3 étapes du récit","Effet décoratif éclipse la profondeur"],
    context:"Contemporain et rival de Masaccio. Les deux sont novateurs mais dans des directions opposées.",
    themes:["Gothique international","Richesse décorative","Narration","Récit en images"],
    distinctions:"Vs Masaccio : richesse décorative vs construction rationnelle de l'espace.",
    quizWrongs:["Lorenzo Monaco","Fra Angelico","Botticelli"],
  },
  {
    id:"a029", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Peinture",
    artist:"Masaccio", title:"Adam et Ève chassés du Paradis", date:"1422",
    location:"Chapelle Brancacci, Florence", medium:"Fresque",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Masaccio%2C_Expulsion_of_Adam_and_Eve_from_Eden%2C_1425%2C_Brancacci_chapel.jpg/400px-Masaccio%2C_Expulsion_of_Adam_and_Eve_from_Eden%2C_1425%2C_Brancacci_chapel.jpg",
    characteristics:["Nu naturaliste révolutionnaire","Expressivité dramatique intense (cris, larmes)","Modelé en volume grâce au clair-obscur","Ombres portées = profondeur","En pendant avec Tentation d'Adam et Ève de Masolino"],
    context:"Fresques de la chapelle Brancacci (1424–1428).",
    themes:["Nu naturaliste","Expressivité","Péché originel","Fresque"],
    distinctions:"Vs Masolino (Tentation) : modelé marqué, expressions intenses ≠ style gothique plat.",
    quizWrongs:["Masolino","Ghirlandaio","Fra Angelico"],
  },
  {
    id:"a030", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Peinture",
    artist:"Masaccio", title:"Le Paiement du tribut", date:"1425",
    location:"Chapelle Brancacci, Florence", medium:"Fresque",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Masaccio%2C_tribute_money%2C_Brancacci_chapel.jpg/640px-Masaccio%2C_tribute_money%2C_Brancacci_chapel.jpg",
    characteristics:["Narration continue (3 scènes dans une)","Composition isocéphalique","Clair-obscur naturaliste","Drapés à l'antique ≈ sculptures de Donatello","Composition en profondeur : bâtiment crée ligne de fuite"],
    context:"Fresques de la chapelle Brancacci. Révolution picturale.",
    themes:["Narration continue","Perspective linéaire","Naturalisme","Humanisme"],
    distinctions:"Narration triple dans une seule image. Individualisation physionomique des apôtres.",
    quizWrongs:["Masolino","Fra Angelico","Ghirlandaio"],
  },
  {
    id:"a031", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Peinture",
    artist:"Masaccio", title:"La Trinité", date:"1425–1428",
    location:"Santa Maria Novella, Florence", medium:"Fresque",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Masaccio%2C_La_Trinit%C3%A0%2C_1428.jpg/450px-Masaccio%2C_La_Trinit%C3%A0%2C_1428.jpg",
    characteristics:["Voûte en berceau = trompe-l'œil (chapelle fictive)","Architecture bichrome à l'antique = hommage à Brunelleschi","Composition pyramidale","Memento mori en bas","Figure admonitrice : Marie","Trône de gloire"],
    context:"Premier emploi de la perspective linéaire dans une fresque murale.",
    themes:["Perspective linéaire","Trompe-l'œil","Trinité","Memento mori"],
    distinctions:"Trompe-l'œil parfait. Point de fuite aux pieds du Christ = spectateur conditionné.",
    quizWrongs:["Fra Angelico","Ghirlandaio","Botticelli"],
  },
  {
    id:"a032", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Peinture",
    artist:"Fra Angelico", title:"Triptyque de Cortone", date:"1435",
    location:"Musée diocésain, Cortone", medium:"Tempera sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Cortona_Polyptych.jpg/600px-Cortona_Polyptych.jpg",
    characteristics:["Vierge à l'enfant sur trône, saints","Figures sur le même sol mais délimitées par arcatures individuelles","Fond doré unifie la scène = Paradis","Iconographie de la Sainte-Conversation"],
    context:"Fra Angelico : cherche l'équilibre entre tradition gothique et révolution perspective.",
    themes:["Sainte-Conversation","Fond doré","Transition"],
    distinctions:"Vs Pala di San Marco (1440) : le Triptyque conserve encore le fond doré. Évolution en cours.",
    quizWrongs:["Lorenzo Monaco","Gentile da Fabriano","Domenico Veneziano"],
  },
  {
    id:"a033", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Peinture",
    artist:"Fra Angelico", title:"Pala di San Marco", date:"1440",
    location:"Musée de San Marco, Florence", medium:"Tempera sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Fra_Angelico_-_Sacra_Conversazione_-_WGA00650.jpg/640px-Fra_Angelico_-_Sacra_Conversazione_-_WGA00650.jpg",
    characteristics:["Abandon du fond doré → espace construit en profondeur","Pala quadrata : retable unifié","Maîtrise de la perspective pour disposer les figures","Sainte-Conversation unifiée"],
    context:"Étape décisive : abandon du polyptique compartimenté.",
    themes:["Pala quadrata","Sainte-Conversation unifiée","Perspective"],
    distinctions:"Pala quadrata ≠ polyptique. Étape majeure dans l'évolution de la peinture religieuse.",
    quizWrongs:["Domenico Veneziano","Piero della Francesca","Ghirlandaio"],
  },
  {
    id:"a034", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Peinture",
    artist:"Paolo Uccello", title:"Bataille de San Romano", date:"1438–1456",
    location:"Louvre / Offices / National Gallery", medium:"Tempera sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Paolo_Uccello_-_The_Battle_of_San_Romano_-_National_Gallery%2C_London.jpg/640px-Paolo_Uccello_-_The_Battle_of_San_Romano_-_National_Gallery%2C_London.jpg",
    characteristics:["3 panneaux dans la chambre de Laurent de Médicis","Feuilles d'or et d'argent sur les éléments métalliques","Raccourcis : chevaux, lances","Perspective obsessionnelle","Lances arrangées pour des effets perspectifs"],
    context:"Paolo Uccello (1397–1475) : obsédé par la perspective.",
    themes:["Perspective","Bataille","Raccourci","Décor princier"],
    distinctions:"Perspective non totalement albertienne mais très expressif. Lances comme guides perspectifs.",
    quizWrongs:["Mantegna","Masaccio","Ghirlandaio"],
  },
  {
    id:"a035", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Peinture",
    artist:"Domenico Veneziano", title:"Retable de Santa Lucia de'Magnoli", date:"1445",
    location:"Galerie des Offices, Florence", medium:"Tempera sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Domenico_Veneziano_002.jpg/450px-Domenico_Veneziano_002.jpg",
    characteristics:["Étape décisive : abandon de la prédelle","Tripartition conservée mais pour induire la profondeur","Sainte-Conversation dans une loggia à l'antique"],
    context:"Franchit l'étape après Fra Angelico : plus de prédelle.",
    themes:["Sainte-Conversation","Pala","Perspective","Abandon de la prédelle"],
    distinctions:"Abandon de la prédelle = étape vers pala quadrata.",
    quizWrongs:["Fra Angelico","Masaccio","Ghirlandaio"],
  },
  {
    id:"a036", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Peinture",
    artist:"Botticelli", title:"L'Adoration des Mages", date:"vers 1475",
    location:"Galerie des Offices, Florence", medium:"Tempera sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Botticelli-adoration.jpg/640px-Botticelli-adoration.jpg",
    characteristics:["Schéma pyramidal","Portraits des Médicis inclus","Botticelli s'est représenté en jaune à droite","Style graphique et chromatique pur"],
    context:"Botticelli (1444–1510) = peintre favori des Médicis.",
    themes:["Portraits déguisés","Médicis","Composition pyramidale"],
    distinctions:"Portraits des Médicis dans la scène. Botticelli s'autoreprésente.",
    quizWrongs:["Ghirlandaio","Fra Angelico","Léonard de Vinci"],
  },
  {
    id:"a037", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Peinture",
    artist:"Botticelli", title:"Le Printemps (Primavera)", date:"vers 1478",
    location:"Galerie des Offices, Florence", medium:"Tempera sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Botticelli-primavera.jpg/1024px-Botticelli-primavera.jpg",
    characteristics:["Allégorie complexe : amour, renouveau, harmonie","Pas de perspective linéaire","Parterre ≈ tapisserie mille-fleurs (200 espèces)","Corps cachés par tissu transparent","Néoplatonisme : beauté terrestre élève l'âme","Figures allongées, grâce, cheveux flottants"],
    context:"Quintessence du style de Botticelli. Raffinement intellectuel de la cour des Médicis.",
    themes:["Mythologie","Néoplatonisme","Allégorie","Art profane"],
    distinctions:"Aucune perspective linéaire volontaire. Synthèse médiéval + renaissant. Style raffiné unique.",
    quizWrongs:["Léonard de Vinci","Ghirlandaio","Fra Angelico"],
  },
  {
    id:"a038", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Peinture",
    artist:"Domenico Ghirlandaio", title:"Fresques de la chapelle Tornabuoni", date:"1485",
    location:"Santa Maria Novella, Florence", medium:"Fresque",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Tornabuoni_chapel.jpg/640px-Tornabuoni_chapel.jpg",
    characteristics:["Spécialiste des cycles narratifs en fresque","Plusieurs registres","Cadre architectural en perspective","Portrait du commanditaire inclus"],
    context:"Michel-Ange fit son apprentissage dans l'atelier de Ghirlandaio.",
    themes:["Cycle narratif","Fresque","Portrait inclus"],
    distinctions:"Maître de la fresque narrative. Portraits contemporains intégrés dans des scènes bibliques.",
    quizWrongs:["Masaccio","Fra Angelico","Botticelli"],
  },
  // ── Piero della Francesca ──
  {
    id:"a039", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento", theme:"Peinture",
    artist:"Piero della Francesca", title:"Fresques de la basilique San Francesco d'Arezzo", date:"1452–1466",
    location:"Basilique San Francesco, Arezzo", medium:"Fresque",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Piero_della_Francesca_-_Legend_of_the_True_Cross_-_Arezzo.jpg/640px-Piero_della_Francesca_-_Legend_of_the_True_Cross_-_Arezzo.jpg",
    characteristics:["3 registres : Légende de la Vraie Croix","Figures solennelles et immobiles","Architecture à l'antique","Songe de Constantin : l'un des premiers nocturnes"],
    context:"Piero della Francesca : géomètre et peintre. Travaille à Arezzo, Rimini, Rome, Urbino.",
    themes:["Fresque narrative","Nocturne","Légende de la Vraie Croix"],
    distinctions:"Figures impassibles ≠ expressivité de Masaccio. Songe de Constantin = nocturne révolutionnaire.",
    quizWrongs:["Fra Angelico","Masaccio","Ghirlandaio"],
  },
  {
    id:"a040", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento", theme:"Peinture",
    artist:"Piero della Francesca", title:"Pala Montefeltro (Conversation sacrée)", date:"1472–1474",
    location:"Pinacothèque de Brera, Milan", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Piero_della_Francesca_046.jpg/640px-Piero_della_Francesca_046.jpg",
    characteristics:["Donateur Federico da Montefeltro de profil (tradition numismatique)","Unification via isocéphalie","Profondeur via architecture en perspective","Œuf d'autruche suspendu (mystère/perfection)"],
    context:"Travail pour le duc d'Urbino. Synthèse de l'art renaissant.",
    themes:["Sainte-Conversation","Donateur","Isocéphalie"],
    distinctions:"Œuf d'autruche = symbole mystérieux. Federico de profil = convention numismatique.",
    quizWrongs:["Fra Angelico","Mantegna","Bellini"],
  },
  // ── Portrait en Italie ──
  {
    id:"a041", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento", theme:"Portrait",
    artist:"Piero della Francesca", title:"Portrait de Sigismond Malatesta", date:"1450",
    location:"Musée du Louvre, Paris", medium:"Tempera sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Piero_della_Francesca_-_Portrait_of_Sigismondo_Pandolfo_Malatesta_-_WGA17596.jpg/400px-Piero_della_Francesca_-_Portrait_of_Sigismondo_Pandolfo_Malatesta_-_WGA17596.jpg",
    characteristics:["Figure de profil sur fond neutre","Référence à la numismatique (médailles antiques)","Style austère et monumental"],
    context:"Première formule du portrait italien : profil sur fond neutre.",
    themes:["Portrait de profil","Numismatique","Prince","Pouvoir"],
    distinctions:"Portrait de profil = convention initiale italienne. Vs ¾ flamand importé par Antonello da Messina.",
    quizWrongs:["Antonello da Messina","Botticelli","Léonard de Vinci"],
  },
  {
    id:"a042", type:"artwork", movement:"Ars nova", period:"Quattrocento", theme:"Portrait",
    artist:"Jan van Eyck", title:"Portrait du cardinal Niccolò Albergati", date:"1435",
    location:"Kunsthistorisches Museum, Vienne", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Jan_van_Eyck_-_Cardinal_Albergati.jpg/400px-Jan_van_Eyck_-_Cardinal_Albergati.jpg",
    characteristics:["Visage sur fond neutre sombre","Buste de ¾","Peinture à l'huile = naturalisme non idéalisé","Détails minutieux : rides, plis","Clair-obscur intense"],
    context:"Formule du portrait flamand : ¾ sur fond sombre. Importée en Italie par Antonello.",
    themes:["Portrait ¾","Peinture à l'huile","Naturalisme flamand"],
    distinctions:"Formule flamande ≠ profil italien. Naturalisme non idéalisé = rides et imperfections assumées.",
    quizWrongs:["Rogier van der Weyden","Hans Memling","Robert Campin"],
  },
  {
    id:"a043", type:"artwork", movement:"Ars nova", period:"Quattrocento", theme:"Portrait",
    artist:"Jan van Eyck", title:"Les époux Arnolfini", date:"1434",
    location:"National Gallery, Londres", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg/450px-Van_Eyck_-_Arnolfini_Portrait.jpg",
    characteristics:["Deux modèles en pied (illusion sur le corps entier)","Intérieur flamand avec objets symboliques","Peintre se représente dans un miroir convexe","Signature = premier autoportrait dans un miroir"],
    context:"Arnolfini : banquier italien avec agence en Flandres.",
    themes:["Portrait double","Symbolisme flamand","Autoportrait dans miroir"],
    distinctions:"Première représentation en pied d'un couple. Peintre visible dans le miroir convexe.",
    quizWrongs:["Rogier van der Weyden","Hans Memling","Robert Campin"],
  },
  {
    id:"a044", type:"artwork", movement:"Ars nova", period:"Quattrocento", theme:"Portrait",
    artist:"Hans Memling", title:"Portrait d'homme", date:"1470",
    location:"Metropolitan Museum, New York", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Hans_Memling_-_Portrait_of_a_Man_-_Metropolitan_Museum_of_Art.jpg/400px-Hans_Memling_-_Portrait_of_a_Man_-_Metropolitan_Museum_of_Art.jpg",
    characteristics:["Premier portrait d'homme de ¾ sur fond paysager","Paysage visible derrière le modèle"],
    context:"Évolution du portrait flamand : du fond sombre au fond paysager.",
    themes:["Portrait ¾","Fond paysager","Innovation nordique"],
    distinctions:"Premier ¾ sur fond paysager = formule qui influence Botticelli puis Léonard (Joconde).",
    quizWrongs:["Jan van Eyck","Rogier van der Weyden","Robert Campin"],
  },
  {
    id:"a045", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento", theme:"Portrait",
    artist:"Léonard de Vinci", title:"La dame à l'hermine", date:"1488",
    location:"Musée national, Cracovie", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine.jpg/400px-Lady_with_an_Ermine.jpg",
    characteristics:["Premier portrait féminin de ¾ sur fond sombre","Visage pivoté à 90° vers la lumière","Double pivot du corps et de la tête","Hermine blanche contre son cœur"],
    context:"Cécilia Gallerani, maîtresse de Ludovico Sforza.",
    themes:["Portrait féminin","Mouvement","Sfumato naissant","Cour de Milan"],
    distinctions:"Premier portrait féminin de ¾. Composition dynamique inédite.",
    quizWrongs:["Botticelli","Ghirlandaio","Piero della Francesca"],
  },
  // ── Ars nova – retables flamands ──
  {
    id:"a046", type:"artwork", movement:"Ars nova (Renaissance nordique)", period:"Quattrocento", theme:"Peinture",
    artist:"Frères van Eyck", title:"Retable de l'Agneau mystique", date:"1432",
    location:"Cathédrale Saint-Bavon, Gand", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Het_Lam_Gods_in_de_Kathedraal_van_Gent.jpg/640px-Het_Lam_Gods_in_de_Kathedraal_van_Gent.jpg",
    characteristics:["Superposition de 3 registres","Grisaille = trompe-l'œil imitant la sculpture","Premières ombres portées des corps","Peinture naturaliste et détaillée","Réunion des arts"],
    context:"Chef-d'œuvre de Jan et Hubert van Eyck.",
    themes:["Polyptique","Grisaille","Ombres portées","Peinture à l'huile"],
    distinctions:"Grisaille = peinture imitant la sculpture. Premières ombres portées = révolution.",
    quizWrongs:["Robert Campin","Rogier van der Weyden","Hans Memling"],
  },
  {
    id:"a047", type:"artwork", movement:"Ars nova (Renaissance nordique)", period:"Quattrocento", theme:"Peinture",
    artist:"Jan van Eyck", title:"Vierge au Chancelier Rolin", date:"1436",
    location:"Musée du Louvre, Paris", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Jan_van_Eyck_-_The_Virgin_of_Chancellor_Rolin_-_Louvre.jpg/400px-Jan_van_Eyck_-_The_Virgin_of_Chancellor_Rolin_-_Louvre.jpg",
    characteristics:["Chancelier Rolin sans humilité face à la Vierge","Perspective atmosphérique (invention flamande) : dégradé de couleurs froides","Perspective empirique","Minutie des détails"],
    context:"Nicolas Rolin = chancelier de Philippe le Bon.",
    themes:["Perspective atmosphérique","Donateur","Peinture à l'huile","Paysage flamand"],
    distinctions:"Perspective atmosphérique = invention flamande. Rolin sans humilité = arrogance.",
    quizWrongs:["Robert Campin","Rogier van der Weyden","Hans Memling"],
  },
  {
    id:"a048", type:"artwork", movement:"Ars nova (Renaissance nordique)", period:"Quattrocento", theme:"Peinture",
    artist:"Rogier van der Weyden", title:"Retable de la vie de saint Jean Baptiste", date:"1455",
    location:"Staatliche Museen, Berlin", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Rogier_van_der_Weyden_-_Bladelin_Triptych_-_Gemaldegalerie_Berlin.jpg/640px-Rogier_van_der_Weyden_-_Bladelin_Triptych_-_Gemaldegalerie_Berlin.jpg",
    characteristics:["3 scènes de la vie de Jean-Baptiste","4 plans narratifs dans chaque panneau","Paysage lointain","Maîtrise de la perspective linéaire"],
    context:"Weyden travaille à Bruxelles.",
    themes:["Narration flamande","Paysage","Perspective"],
    distinctions:"Paysage comme cadre du sujet religieux ≠ genre autonome.",
    quizWrongs:["Jan van Eyck","Robert Campin","Hans Memling"],
  },
  // ── Estampe ──
  {
    id:"a049", type:"artwork", movement:"Ars nova (Renaissance nordique)", period:"Quattrocento", theme:"Estampe",
    artist:"Martin Schongauer", title:"Saint Antoine tourmenté par des démons", date:"1470",
    location:"Collections diverses", medium:"Gravure en taille-douce (burin sur cuivre)",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Schongauer_Versuchung.jpg/450px-Schongauer_Versuchung.jpg",
    characteristics:["Premier graveur germanique à sortir de l'anonymat","Virtuose : tailles variées en direction et profondeur","Nuances de noir et gris, lignes souples"],
    context:"Schongauer = figure clé de la gravure germanique. Influence directe sur Dürer.",
    themes:["Gravure en taille-douce","Expressivité","Art nordique"],
    distinctions:"Premier grand maître de la gravure sur métal identifié.",
    quizWrongs:["Mantegna","Maître des cartes à jouer","Dürer"],
  },
  {
    id:"a050", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento", theme:"Estampe",
    artist:"Andrea Mantegna", title:"La Mise au tombeau", date:"vers 1470–1475",
    location:"Diverses collections", medium:"Gravure en taille-douce",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Andrea_Mantegna_-_The_Entombment_-_Google_Art_Project.jpg/640px-Andrea_Mantegna_-_The_Entombment_-_Google_Art_Project.jpg",
    characteristics:["Premier grand peintre à réaliser des estampes","Maîtrise des différents types de taille"],
    context:"Mantegna = le 1er grand peintre-graveur italien.",
    themes:["Gravure italienne","Diffusion de la Renaissance","Taille-douce"],
    distinctions:"Premier grand artiste peintre à graver. Synthèse technique du Nord + style italien.",
    quizWrongs:["Schongauer","Dürer","Pollaiolo"],
  },
  // ── Padoue / Diffusion ──
  {
    id:"a051", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento", theme:"Sculpture",
    artist:"Donatello", title:"Statue équestre du Gattamelata", date:"1446–1453",
    location:"Piazza del Santo, Padoue", medium:"Bronze",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Gattamelata_Padua.jpg/450px-Gattamelata_Padua.jpg",
    characteristics:["Première statue équestre de la Renaissance","Modèle : statue équestre de Marc-Aurèle","Sur une chapelle ovale avec bas-reliefs","Incarne l'autorité victorieuse"],
    context:"Donatello séjourne à Padoue (1443–1453).",
    themes:["Statue équestre","Condottiere","Pouvoir militaire","Modèle antique"],
    distinctions:"Première statue équestre en bronze de la Renaissance.",
    quizWrongs:["Verrocchio","Ghiberti","Mantegna"],
  },
  {
    id:"a052", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento", theme:"Peinture",
    artist:"Andrea Mantegna", title:"Lamentation sur le Christ mort", date:"1483",
    location:"Pinacothèque de Brera, Milan", medium:"Tempera sur toile",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Andrea_Mantegna_-_The_Lamentation_over_the_Dead_Christ_-_WGA13981.jpg/640px-Andrea_Mantegna_-_The_Lamentation_over_the_Dead_Christ_-_WGA13981.jpg",
    characteristics:["Raccourci paradigmatique du Christ","Pas de distance entre scène et spectateur","Figure tronquée vue en raccourci brutal"],
    context:"Mantegna : passionné par les vestiges antiques et la perspective.",
    themes:["Raccourci","Perspective","Lamentation","Immersion"],
    distinctions:"Raccourci paradigmatique : le plus célèbre de la Renaissance. Plongée totale sans distance.",
    quizWrongs:["Ghirlandaio","Masaccio","Botticelli"],
  },
  {
    id:"a053", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento", theme:"Peinture",
    artist:"Mantegna", title:"Retable de Saint Zénon (San Zeno)", date:"1457–1460",
    location:"Basilique San Zeno, Vérone", medium:"Tempera sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Altarpiece_of_San_Zeno_-_Mantegna.jpg/640px-Altarpiece_of_San_Zeno_-_Mantegna.jpg",
    characteristics:["Cadre architectural grandiose à l'antique","Sainte-Conversation revisitée","Entablement sculpté continu en entablement peint","Hommage à l'autel de Donatello"],
    context:"Influence décisive sur Giovanni Bellini (Triptyque des Frari).",
    themes:["Retable","Sainte-Conversation","Synthèse art et architecture"],
    distinctions:"Cadre peint = cadre sculpté. Triptyque qui semble un seul espace architectural.",
    quizWrongs:["Bellini","Carpaccio","Antonello da Messina"],
  },
  // ── Léonard à Milan ──
  {
    id:"a054", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento-XVIe", theme:"Peinture",
    artist:"Léonard de Vinci", title:"La Vierge aux rochers", date:"1483–1486",
    location:"Musée du Louvre, Paris", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Leonardo_da_Vinci_-_The_Virgin_of_the_Rocks_%28Louvre%29.jpg/450px-Leonardo_da_Vinci_-_The_Virgin_of_the_Rocks_%28Louvre%29.jpg",
    characteristics:["Pala unifiée sans cimaise ni prédelle","Personnages sacrés dans un paysage naturel","Sfumato naissant","Jeu des regards et des gestes","Perspective atmosphérique"],
    context:"Commandée à Milan. Tableau incompris → 2e version (National Gallery).",
    themes:["Sfumato","Paysage sombre","Vierge","Peinture à l'huile"],
    distinctions:"Contours estompés = sfumato. Paysage comme espace mystérieux.",
    quizWrongs:["Botticelli","Ghirlandaio","Fra Angelico"],
  },
  {
    id:"a055", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento-XVIe", theme:"Peinture",
    artist:"Léonard de Vinci", title:"La Dernière Cène", date:"vers 1495–1498",
    location:"Santa Maria delle Grazie, Milan", medium:"Tempera sur gesso (≠ fresque)",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/1024px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg",
    characteristics:["Tempera sur gesso ≠ fresque → résiste mal au temps","Judas non isolé (plus vraisemblable)","Apôtres regroupés par trinômes","Perspective linéaire relie tout","Psychologie complexe de chaque figure"],
    context:"Commandée par Ludovico Sforza. 1499 : chute de Sforza.",
    themes:["Dernière Cène","Psychologie","Narration","Perspective"],
    distinctions:"Tempera sur gesso = technique inadaptée → dégradation rapide. Judas intégré ≠ tradition.",
    quizWrongs:["Ghirlandaio","Masaccio","Botticelli"],
  },
  // ── Venise ──
  {
    id:"a056", type:"artwork", movement:"Gothique vénitien", period:"Quattrocento", theme:"Architecture",
    artist:"Palais des Doges", title:"Palais des Doges", date:"1330–1342",
    location:"Venise", medium:"Marbre polychrome",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Doge%27s_Palace_Venice.jpg/640px-Doge%27s_Palace_Venice.jpg",
    characteristics:["Résidence du Doge","Arcades ajourées, lucarnes quadrilobées","Jeu polychrome de marbre rose et blanc","Masse massive reposant sur une dentelle d'arcades"],
    context:"Venise = coexistence des héritages byzantin, gothique et oriental.",
    themes:["Gothique vénitien","Pouvoir politique","Polychromie orientale"],
    distinctions:"Masse supérieure repose sur loggia légère = inversion de la logique structurelle gothique.",
    quizWrongs:["Ca' d'Oro","Basilique Saint-Marc","Santa Maria dei Miracoli"],
  },
  {
    id:"a057", type:"artwork", movement:"Gothique vénitien", period:"Quattrocento", theme:"Architecture",
    artist:"Matteo Raverti / Bono", title:"Ca' d'Oro", date:"1421–1434",
    location:"Grand Canal, Venise", medium:"Marbre et pierre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ca_d%27oro_venice.jpg/450px-Ca_d%27oro_venice.jpg",
    characteristics:["Influence gothique nordique et orientale","Dentelle de pierre","Arcs trilobés","Polychromie dorée à l'origine","Asymétrie entre loggia et mur plein"],
    context:"Palais d'un patricien vénitien. Exemple du gothique flamboyant vénitien.",
    themes:["Gothique flamboyant","Palais vénitien","Polychromie"],
    distinctions:"Polychromie dorée originelle ≠ apparence actuelle. Asymétrie délibérée.",
    quizWrongs:["Palais des Doges","Scuola Grande di San Marco","Ca' Dario"],
  },
  {
    id:"a058", type:"artwork", movement:"Renaissance vénitienne", period:"Quattrocento", theme:"Architecture",
    artist:"Pietro Lombardo", title:"Église Santa Maria dei Miracoli", date:"1481–1489",
    location:"Venise, Cannaregio", medium:"Marbres polychromes",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Santa_Maria_dei_Miracoli_%28Venice%29_from_the_rio_dei_Miracoli.jpg/450px-Santa_Maria_dei_Miracoli_%28Venice%29_from_the_rio_dei_Miracoli.jpg",
    characteristics:["Première église complètement renaissante de Venise","Plan basilical à nef unique","Fronton curviligne","Marbres polychromes (tradition byzantine conservée)","Superposition des ordres"],
    context:"Pietro Lombardo = figure clé de l'introduction de la Renaissance à Venise.",
    themes:["Architecture religieuse vénitienne","Renaissance et tradition","Symétrie"],
    distinctions:"Première église entièrement renaissante de Venise. Fronton curviligne = particularité vénitienne.",
    quizWrongs:["Codussi","Bramante","Alberti"],
  },
  {
    id:"a059", type:"artwork", movement:"Renaissance vénitienne", period:"Quattrocento", theme:"Peinture",
    artist:"Giovanni Bellini", title:"Pala di San Giobbe", date:"vers 1487",
    location:"Galleria dell'Accademia, Venise", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Bellini%2C_giovanni%2C_pala_di_san_giobbe%2C_1487_ca.jpg/640px-Bellini%2C_giovanni%2C_pala_di_san_giobbe%2C_1487_ca.jpg",
    characteristics:["Encadrement en pierre = continuation dans une chapelle latérale fictive","Inspiré de la Trinité de Masaccio (mais plus immersif)","Saint Sébastien = saint prophylactique (contre la peste)","Lumière dorée et chaude"],
    context:"Synthèse de l'évolution : San Zaccaria → Mantegna → Antonello → Bellini. Bellini est le beau-frère de Mantegna.",
    themes:["Sainte-Conversation","Saint Sébastien","Immersion","Lumière vénitienne"],
    distinctions:"Plus immersif que la Trinité de Masaccio. Saint Sébastien = prétexte au nu masculin. Lumière chaude = particularité vénitienne.",
    quizWrongs:["Mantegna","Carpaccio","Antonello da Messina"],
  },
  // ── Andrea Verrocchio ──
  {
    id:"a060", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Andrea del Verrocchio", title:"David", date:"1473",
    location:"Musée du Bargello, Florence", medium:"Bronze, 1m25",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Verrocchio_David.jpg/400px-Verrocchio_David.jpg",
    characteristics:["Androgyne mais habillé (pour innover vs David nu de Donatello)","1m25 (plus petit que Donatello)","Expression fière et légèrement arrogante","Maître de Léonard de Vinci"],
    context:"Verrocchio = maître de Léonard. Innove en habillant le David.",
    themes:["David","Androgénéité","Tradition et innovation"],
    distinctions:"David habillé ≠ David nu de Donatello.",
    quizWrongs:["Donatello","Nanni di Banco","Pollaiolo"],
  },
  {
    id:"a061", type:"artwork", movement:"Renaissance italienne", period:"Quattrocento-XVIe", theme:"Sculpture",
    artist:"Andrea del Verrocchio", title:"Statue équestre de Bartolomeo Colleoni", date:"1480–1496",
    location:"Campo Santi Giovanni e Paolo, Venise", medium:"Bronze",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Colleoni_DSC_0430.jpg/450px-Colleoni_DSC_0430.jpg",
    characteristics:["Buste qui ne coupe pas les mains = expressivité accrue","Cheval en position dynamique","Expressivité intense du condottiere"],
    context:"Commande de la République de Venise.",
    themes:["Statue équestre","Condottiere","Mouvement","Expressivité"],
    distinctions:"Vs Gattamelata (Donatello) : plus d'expressivité et de mouvement.",
    quizWrongs:["Donatello","Mantegna","Pollaiolo"],
  },
  // ── Peinture vénitienne ──
  {
    id:"a062", type:"artwork", movement:"Renaissance vénitienne", period:"Quattrocento", theme:"Peinture",
    artist:"Vittore Carpaccio", title:"Légende de sainte Ursule", date:"vers 1490–1495",
    location:"Galleria dell'Accademia, Venise", medium:"Tempera sur toile",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Vittore_Carpaccio_-_The_Dream_of_St._Ursula_-_WGA04258.jpg/640px-Vittore_Carpaccio_-_The_Dream_of_St._Ursula_-_WGA04258.jpg",
    characteristics:["Cycle narratif complet (Scuola di Sant'Orsola)","Innombrables figures et bâtiments","Vision fantasmée dans environnement pseudo-vénitien","Hybridation : costumes occidentaux et orientaux"],
    context:"Carpaccio = maître du cycle narratif vénitien.",
    themes:["Cycle narratif","Venise","Hybridation orientale","Scuola"],
    distinctions:"Virtuosité dans la narration de scènes complexes. Venise comme décor fantasmé.",
    quizWrongs:["Bellini","Antonello da Messina","Mantegna"],
  },
  {
    id:"a063", type:"artwork", movement:"Renaissance vénitienne", period:"Quattrocento", theme:"Peinture",
    artist:"Antonello da Messina", title:"Pala di San Cassiano", date:"1475–1476",
    location:"Kunsthistorisches Museum, Vienne", medium:"Huile sur bois",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Antonello_da_Messina_Sacra_Conversazione_%28Pala_di_San_Cassiano%29.jpg/450px-Antonello_da_Messina_Sacra_Conversazione_%28Pala_di_San_Cassiano%29.jpg",
    characteristics:["Arrive à Venise en 1475 avec technique de peinture à l'huile flamande","Jeux de lumières et de sfumato permis par l'huile","Reflet chatoyant des couleurs et matériaux","Œuvre perdue mais très influente"],
    context:"Antonello de Messine (Sicilien) importe la peinture à l'huile flamande en Italie.",
    themes:["Peinture à l'huile","Transfert flamand-Venise","Lumière"],
    distinctions:"Passeur de la technique flamande vers Venise. Influence Bellini et toute l'école vénitienne.",
    quizWrongs:["Bellini","Carpaccio","Mantegna"],
  },
  // ── Arts à Florence sous Laurent le Magnifique ──
  {
    id:"a064", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Sculpture",
    artist:"Antonio del Pollaiolo", title:"Hercule et Antée", date:"vers 1475",
    location:"Galerie des Offices, Florence", medium:"Bronze, petite statuette",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Antonio_del_Pollaiolo_-_Hercules_and_Antaeus_-_WGA18044.jpg/400px-Antonio_del_Pollaiolo_-_Hercules_and_Antaeus_-_WGA18044.jpg",
    characteristics:["Virtuosité de la technique du bronze","Expressivité et représentation du mouvement","Dynamique du corps masculin exacerbée","Commande d'amateurs d'art pour sculptures de petite taille"],
    context:"Expressivité et mouvement = nouvelles exigences de la sculpture sous Laurent le Magnifique.",
    themes:["Mouvement","Nu masculin","Bronze","Expressivité"],
    distinctions:"Statuette de bronze = nouveau type de commande (amateurs, collectionneurs). Expressivité gestuelle extrême.",
    quizWrongs:["Verrocchio","Donatello","Bertoldo di Giovanni"],
  },
  {
    id:"a065", type:"artwork", movement:"Renaissance florentine", period:"Quattrocento", theme:"Architecture",
    artist:"Donato Bramante", title:"Santa Maria presso San Satiro", date:"vers 1482–1486",
    location:"Milan", medium:"Pierre et stuc",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Santa_Maria_presso_San_Satiro_%28apse%29.jpg/640px-Santa_Maria_presso_San_Satiro_%28apse%29.jpg",
    characteristics:["Plan en T (accueil de beaucoup de fidèles)","Perspective feinte donnant l'illusion d'un chœur en abside (trompe-l'œil)","Sacristie en plan centré (≈ Sacristie Vieille)","Tradition décorative lombarde conservée (polychromie)"],
    context:"Bramante = architecte majeur de la Renaissance lombarde et romaine.",
    themes:["Plan centré","Trompe-l'œil architectural","Lombard"],
    distinctions:"Trompe-l'œil = pas de place pour un vrai chœur → faux chœur en perspective. Innovation technique.",
    quizWrongs:["Alberti","Brunelleschi","Michelozzo"],
  },

  // ══════════════════════════════════════════
  // CARTES VOCABULAIRE & THÉORIE
  // ══════════════════════════════════════════

  {
    id:"v001", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Sfumato",
    definition:"Technique de peinture inventée par Léonard de Vinci consistant en la superposition de fines couches de peinture translucides. Crée un effet de brume, de flou pour les contours, donnant une atmosphère vivante et vibrante. S'oppose aux contours nets de Botticelli.",
    example:"La Joconde, La Vierge aux rochers.",
    associated:["Léonard de Vinci","Peinture à l'huile","Contours","Atmosphère"],
  },
  {
    id:"v002", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Stiacciato (relief méplat)",
    definition:"Bas-relief inventé par Donatello vers 1410, avec une profondeur inférieure à 1 cm. Crée une illusion tridimensionnelle dans un espace quasi-plan. Utilisé pour créer des effets picturaux dans la sculpture.",
    example:"Prédelle de Saint Georges (1415), Vierge à l'enfant de madame Pazzi (1422), Le Festin d'Hérode (1427).",
    associated:["Donatello","Relief","Perspective","Sculpture"],
  },
  {
    id:"v003", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Contrapposto",
    definition:"Posture antique dans laquelle le poids du corps repose sur une seule jambe, créant une légère torsion des hanches et des épaules en sens inverse. Traduit le mouvement naturel du corps humain. Réintroduit à la Renaissance.",
    example:"David de Donatello (1444), Isaïe de Nanni di Banco (1408), sculptures d'Orsanmichele.",
    associated:["Antiquité","Sculpture","Mouvement","Corps humain"],
  },
  {
    id:"v004", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Perspective linéaire (ou géométrique)",
    definition:"Système rationnel et mathématique de représentation de l'espace tridimensionnel sur un plan bidimensionnel. Inventé par Brunelleschi (expérience de la tavoletta, 1415), théorisé par Alberti (De Pictura, 1435). Repose sur la convergence des lignes de fuite vers un point unique.",
    example:"Trinité de Masaccio, Paiement du tribut, prédelle de Saint Georges.",
    associated:["Brunelleschi","Alberti","Masaccio","Point de fuite"],
  },
  {
    id:"v005", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Perspective atmosphérique",
    definition:"Technique flamande (invention des Pays-Bas) qui représente la profondeur par un dégradé progressif de couleurs froides à mesure que les éléments s'éloignent. Les contours deviennent flous et les couleurs moins saturées en fond de tableau.",
    example:"Vierge au Chancelier Rolin de van Eyck, La Vierge aux rochers de Léonard.",
    associated:["Van Eyck","Flamand","Paysage","Profondeur"],
  },
  {
    id:"v006", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Raccourci",
    definition:"Compression d'une figure ou d'un objet en fonction de son angle de vue, selon des calculs mathématiques complexes. Crée une impression de profondeur et de mouvement. Ghiberti en a une meilleure maîtrise que Brunelleschi.",
    example:"Lamentation sur le Christ mort (Mantegna), Cantoria de Donatello, panneaux de Ghiberti.",
    associated:["Mantegna","Ghiberti","Perspective","Corps humain"],
  },
  {
    id:"v007", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Ronde-bosse",
    definition:"Sculpture entièrement dégagée de tout fond, visible de tous les côtés. S'oppose au relief (sculpture inscrite dans un plan). Peut être décorative (statuettes), indépendante (statues en pied, bustes) ou monumentale (fontaine, statue équestre).",
    example:"David de Donatello (1444), Judith et Holopherne, Quatre Saints couronnés.",
    associated:["Sculpture","Autonomie","Espace","Environnement"],
  },
  {
    id:"v008", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Gisant / Transi",
    definition:"Gisant : représentation du défunt de façon intègre, idéalisée = immortalisation. Transi : représentation du corps en décomposition = memento mori. Les deux sont des typologies de sculpture funéraire médiévale et renaissante.",
    example:"Gisant : Tombeau d'Ilaria del Carreto (Quercia). Transi : Cardinal de La Grange (1403).",
    associated:["Sculpture funéraire","Mort","Mémoire","Religion"],
  },
  {
    id:"v009", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Pala quadrata",
    definition:"Retable unifié sur une image principale, qui remplace les polyptiques compartimentés. Étape décisive dans l'évolution de la peinture religieuse : unification de l'espace pictural en une seule image cohérente.",
    example:"Pala di San Marco de Fra Angelico (1440), Pala di San Giobbe de Bellini (1487).",
    associated:["Fra Angelico","Bellini","Retable","Unification"],
  },
  {
    id:"v010", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Polyptique",
    definition:"Retable articulé de plusieurs panneaux (diptyque = 2, triptyque = 3, polyptyque = plusieurs). Décor architectural en bois/marbre/pierre, doré ou non. Accueille des images monumentales ou sculptées. Plus fréquent en Italie qu'en Europe du Nord.",
    example:"Couronnement de la Vierge de Lorenzo Monaco, Triptyque de Cortone de Fra Angelico.",
    associated:["Retable","Architecture","Panneau","Peinture religieuse"],
  },
  {
    id:"v011", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Sainte-Conversation (Sacra Conversazione)",
    definition:"Représentation de la Vierge à l'Enfant assise sur un trône, entourée de saints et d'anges qui ne se sont pas nécessairement connus de leur vivant. Épisode fictif inventé par l'art. Permet de mettre en relation la Vierge avec les saints locaux ou prophylactiques.",
    example:"Pala di San Marco (Fra Angelico), Pala Montefeltro (Piero della Francesca), Pala di San Giobbe (Bellini).",
    associated:["Vierge","Saints","Iconographie","Retable"],
  },
  {
    id:"v012", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Non finito",
    definition:"Technique consistant à laisser volontairement une œuvre à l'état inachevé pour créer un effet expressif. Développé par Donatello (Marie Madeleine) et systématisé par Michel-Ange (esclaves sortant de la pierre).",
    example:"Marie Madeleine de Donatello (1453–1455).",
    associated:["Donatello","Michel-Ange","Expressivité","Technique"],
  },
  {
    id:"v013", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Xylographie",
    definition:"Gravure en relief sur bois (taille d'épargne). Apparue fin XIVe-début XVe dans la région rhénane et le duché de Bourgogne. Dessin gravé sur bois, les parties en creux ne s'impriment pas. Sur l'épreuve, le dessin est inversé. Permet le livre illustré.",
    example:"Sainte Véronique (1440), Ars moriendi (1475), Samson et le lion de Dürer (1498).",
    associated:["Estampe","Reproduction","Diffusion","Bois"],
  },
  {
    id:"v014", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Gravure en taille-douce (burin sur métal)",
    definition:"Invention vers 1430 : dessin tracé avec un burin fin sur cuivre. L'encre reste dans les entailles. Papier humide pressé sur la plaque. Permet un dessin plus complexe et de nombreuses nuances. Pratiquée par orfèvres et peintres.",
    example:"Schongauer, Mantegna, Maître des cartes à jouer.",
    associated:["Estampe","Cuivre","Burin","Orfèvrerie"],
  },
  {
    id:"v015", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Terracotta invetriata (céramique vernissée)",
    definition:"Technique inventée par Luca della Robbia. Relief en terre cuite modelé → cuisson → application d'émaux → seconde cuisson. Résistance aux intempéries. Peu coûteux, reproductible avec moules, léger. Diffusion rapide en Europe.",
    example:"Tondi chapelle Pazzi (1440), Madone à la pomme (1442), Tombeau de Federighi (1453).",
    associated:["Luca della Robbia","Céramique","Couleur","Architecture"],
  },
  {
    id:"v016", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Fonte à la cire perdue",
    definition:"Technique de coulée du bronze : on crée un modèle en cire, on l'entoure d'un moule en argile, on fait fondre la cire (elle 'se perd'), on coule le bronze en fusion. Permet des formes complexes. Technique privilégiée pour les grandes statues.",
    example:"Portes du baptistère (Ghiberti), Festin d'Hérode, Judith et Holopherne (Donatello).",
    associated:["Bronze","Sculpture","Ghiberti","Donatello"],
  },
  {
    id:"v017", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Humanisme",
    definition:"Mouvement intellectuel né de la Renaissance, caractérisé par une transformation des mentalités et une revalorisation des savoirs hérités de l'Antiquité grecque et romaine. Les humanistes = connaisseurs de l'héritage littéraire antique. Consultés pour les commandes profanes.",
    example:"Leonardo Bruni conçoit le programme iconographique de la Porte du Paradis. Alberti théorise la peinture et l'architecture.",
    associated:["Renaissance","Antiquité","Lettres","Laïcité"],
  },
  {
    id:"v018", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Paragone",
    definition:"Débat intellectuel sur les mérites comparés de chaque art (peinture vs sculpture vs architecture). Ex : la sculpture est plus réaliste que la peinture mais manque de polychromie. La terracotta invetriata répond aux deux : elle a le relief de la sculpture ET la couleur de la peinture.",
    example:"Andrea della Robbia, Saint Georges et le dragon (1490) = synthèse des arts.",
    associated:["Sculpture","Peinture","Architecture","Renaissance"],
  },
  {
    id:"v019", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Mécénat",
    definition:"Protection et promotion financière des arts. Distinction : mécène = soutient les arts de façon désintéressée / commanditaire = soutient les arts en vue d'obtenir une œuvre. Les Médicis cumulent les deux rôles.",
    example:"Cosme l'Ancien, Laurent le Magnifique, Ludovic Sforza, Gonzague de Mantoue.",
    associated:["Médicis","Pouvoir","Arts","Commanditaire"],
  },
  {
    id:"v020", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Néoplatonisme",
    definition:"Courant philosophique de la Renaissance (notamment à la cour des Médicis) selon lequel la Beauté terrestre peut élever l'âme vers le divin. La beauté sensible est le reflet de la beauté divine. Fondement intellectuel de l'art de Botticelli.",
    example:"Le Printemps, La Naissance de Vénus de Botticelli.",
    associated:["Botticelli","Médicis","Philosophie","Beauté"],
  },
  {
    id:"v021", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Renaissance vs Ars nova",
    definition:"La Renaissance italienne s'appuie sur le modèle antique, la perspective géométrique, et se développe à Florence. L'Ars nova (art nouveau flamand) se développe indépendamment en Flandres, sans intérêt pour l'antique, mais invente la peinture à l'huile et une perspective empirique. Deux innovations concomitantes mais différentes.",
    example:"Masaccio (It.) vs Van Eyck (Fl.). Brunelleschi vs Robert Campin.",
    associated:["Italie","Flandres","Perspective","Peinture à l'huile"],
  },
  {
    id:"v022", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Statut de l'artiste au XVe siècle",
    definition:"Au début du XVe : peinture = métier artisanal, exercée par les classes populaires (arts mécaniques). À la fin du XVe : reconnaissance du caractère libéral de la pratique artistique. L'artiste se distingue de l'artisan par son intellect. Introduction de la signature.",
    example:"Van Eyck signe dans le miroir des Arnolfini. Ghiberti signe doublement la Porte du Paradis. Della Robbia payé pour son 'originalité'.",
    associated:["Guilde","Atelier","Signature","Arts libéraux"],
  },
  {
    id:"v023", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Giorgio Vasari et les Vies des artistes (1550)",
    definition:"Premier historien de l'art. Écrit en 1550 un recueil de biographies d'artistes. Premier à utiliser le mot rinascimento/rinascità = Renaissance. Idée : l'art atteint la perfection en Grèce antique, décline pendant le Moyen Âge, et renaît grâce au 'climat' toscan.",
    example:"Vasari cite la Porte du Paradis comme 'la plus belle œuvre jamais réalisée'. Loue Melozzo da Forli pour ses raccourcis.",
    associated:["Historiographie","Renaissance","Florence","Italie"],
  },
  {
    id:"v024", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Alberti – De Pictura (1435) et De re edificatoria (1485)",
    definition:"De Pictura (1435) : premier traité moderne sur la peinture. Théorise la perspective linéaire. 'La peinture est une fenêtre par laquelle on regarde une histoire.' Recommande la figure de l'admoniteur. De re edificatoria (1485) : traité d'architecture ≈ De Architectura de Vitruve.",
    example:"Trinité de Masaccio (perspective). Figure admonitrice = Marie dans la Trinité.",
    associated:["Perspective","Théorie","Architecture","Peinture"],
  },
  {
    id:"v025", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Guilde (arte) et atelier (bottega)",
    definition:"Guilde/Arte : communauté des peintres/sculpteurs qui régule le travail (qualité, matériaux). À Florence, les peintres sont agrégés à la guilde des médecins et apothicaires. Atelier (bottega) : lieu d'apprentissage sous autorité d'un maître qui embauche compagnons et apprentis.",
    example:"Atelier de Botticelli (immense). Ghiberti dirige un atelier pour les portes du baptistère.",
    associated:["Organisation","Apprentissage","Maître","Production"],
  },
  {
    id:"v026", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Expérience de la tavoletta (Brunelleschi, 1415)",
    definition:"Expérience fondatrice de la perspective linéaire. Brunelleschi peint le baptistère San Giovanni. Il perce un trou dans le panneau, l'observe depuis l'arrière dans un miroir, et vérifie la correspondance exacte avec le bâtiment réel. Démontre mathématiquement la convergence des lignes vers un point de fuite.",
    example:"Perspective linéaire → Masaccio, Trinité (1425). Alberti la théorise en 1435.",
    associated:["Brunelleschi","Perspective","Florence","Mathématiques"],
  },
  {
    id:"v027", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Isocéphalie",
    definition:"Composition picturale ou sculpturale dans laquelle les têtes de toutes les figures sont au même niveau horizontal. Crée une cohésion et une unité visuelle. Peut être horizontale (par plan) ou verticale (pour les figures divines).",
    example:"Trinité de Masaccio (isocéphalie verticale pour les divins), Paiement du tribut.",
    associated:["Composition","Hiérarchie","Figures","Peinture"],
  },
  {
    id:"v028", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Admoniteur",
    definition:"Figure dans un tableau dont la gestuelle (doigt pointé, regard vers le spectateur) sert d'intermédiaire entre la scène peinte et le spectateur réel. Recommandé par Alberti dans De Pictura.",
    example:"Marie dans la Trinité de Masaccio. Ange Gabriel dans la Vierge aux rochers de Léonard.",
    associated:["Alberti","Composition","Spectateur","Narration"],
  },
  {
    id:"v029", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Grisaille",
    definition:"Peinture exécutée en camaïeu gris, imitant l'aspect de la sculpture (trompe-l'œil). Utilisée notamment pour les volets extérieurs des retables fermés (représentant des statues).",
    example:"Volets du Retable de l'Agneau mystique de van Eyck (1432) : donateurs et statues en grisaille.",
    associated:["Trompe-l'œil","Sculpture peinte","Retable","Flamand"],
  },
  {
    id:"v030", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Cartel d'une œuvre d'art",
    definition:"Ensemble des informations essentielles d'une œuvre : nom de l'artiste, titre, datation, localisation. Format des dimensions : Hauteur × Largeur × Profondeur. Les 'figures' sont des personnages non identifiés ; 'modèles' si identification possible.",
    example:"Donatello, David, 1444–1446, 158 × 51 cm, Florence, Musée national du Bargello.",
    associated:["Méthodologie","Analyse","Musée","Identification"],
  },
  {
    id:"v031", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Fresque / Panneau / Tableau",
    definition:"Fresque : peinture sur enduit frais dans une église, couvent, chapelle. Panneau : peinture sur bois. Tableau : peinture sur toile. Ces distinctions de support conditionnent la technique et la destination de l'œuvre.",
    example:"Fresque : Chapelle Brancacci (Masaccio). Panneau : Adoration des Mages (Gentile da Fabriano). Tableau : Naissance de Vénus (Botticelli).",
    associated:["Support","Technique","Matière","Conservation"],
  },
  {
    id:"v032", type:"vocab", category:"Concept théorique", theme:"Théorie & Contexte",
    term:"Iconographie et iconologie",
    definition:"Iconographie : étude des thèmes et sujets représentés dans une œuvre (ce qui est représenté). Iconologie : étude des significations symboliques et culturelles de ces images (ce que cela signifie). Les saints, attributs, gestes ont des significations codifiées.",
    example:"David = symbole de Florence. Saint Sébastien = saint prophylactique contre la peste. Fond doré = Paradis.",
    associated:["Symbole","Analyse","Sens","Religion"],
  },
  {
    id:"v033", type:"vocab", category:"Contexte historique", theme:"Théorie & Contexte",
    term:"La famille Médicis et Florence",
    definition:"Les Médicis = riche famille de marchands banquiers contrôlant officieusement Florence. Cosme l'Ancien (1386–1464) : mécène et commanditaire. Pierre le Goutteux (1416–1469) : peu d'importance. Laurent le Magnifique (1469–1492) : apogée culturel.",
    example:"Cosme commande le David de Donatello. Laurent commande la Bataille de San Romano de Uccello.",
    associated:["Florence","Pouvoir","Banque","Mécénat"],
  },
  {
    id:"v034", type:"vocab", category:"Contexte historique", theme:"Théorie & Contexte",
    term:"Conjuration des Pazzi (1478)",
    definition:"Rébellion des élites florentines contre les Médicis. Tentative d'assassinat de Julien de Médicis (tué) et Laurent le Magnifique (blessé) à la cathédrale de Florence. La papauté était impliquée → Botticelli envoyé peindre la chapelle Sixtine = acte de réconciliation.",
    example:"Médaille commémorative de la conjuration. Botticelli à la chapelle Sixtine.",
    associated:["Médicis","Violence politique","Peinture politique","Florence"],
  },
  {
    id:"v035", type:"vocab", category:"Comparaison", theme:"Théorie & Contexte",
    term:"Évolution de la peinture religieuse au XVe siècle",
    definition:"3 étapes : 1) Jusqu'au début XVe : fond doré + polyptique compartimenté. 2) Du début au milieu du XVe : abandon du fond doré → décor construit en profondeur. 3) À partir du milieu XVe : abandon de la prédelle → pala quadrata unifiée.",
    example:"Monaco → Fra Angelico (Cortone) → Fra Angelico (San Marco) → Veneziano → Piero della Francesca → Bellini.",
    associated:["Peinture","Évolution","Retable","Fond doré"],
  },
  {
    id:"v036", type:"vocab", category:"Comparaison", theme:"Théorie & Contexte",
    term:"Perspective italienne vs perspective flamande",
    definition:"Italienne (linéaire/géométrique) : système mathématique avec point de fuite unique, inventé par Brunelleschi et théorisé par Alberti. Flamande (empirique) : construction de l'espace par observation, lignes de fuite ne se rejoignent pas toujours. + perspective atmosphérique (invention flamande).",
    example:"Masaccio, Trinité (linéaire). Van Eyck, Vierge au Chancelier Rolin (empirique + atmosphérique).",
    associated:["Brunelleschi","Van Eyck","Espace","Profondeur"],
  },
  {
    id:"v037", type:"vocab", category:"Comparaison", theme:"Théorie & Contexte",
    term:"Donatello vs Luca della Robbia (Cantorie)",
    definition:"Deux approches opposées de la Cantoria : Donatello = putti dansants en frise continue, dynamisme, inspiration dionysiaque bacchique. Della Robbia = figures cloisonnées dans des panneaux, statiques et sereines.",
    example:"Cantoria Donatello (1433) vs Cantoria della Robbia (1431).",
    associated:["Donatello","Della Robbia","Musique","Contraste stylistique"],
  },
  {
    id:"v038", type:"vocab", category:"Contexte historique", theme:"Théorie & Contexte",
    term:"Les deux foyers de la Renaissance au XVe siècle",
    definition:"Italie (foyer innovant) : héritage antique valorisé par les humanistes, architecture et sculpture renouvelées. Nord / Flandres (foyer indépendant) : peinture à l'huile, invention de l'estampe, perspective empirique, souci du détail mimétique.",
    example:"Florence et Venise (Italie). Gand, Bruges, Bruxelles, Tournai (Flandres).",
    associated:["Géographie","Innovation","Échanges","Diffusion"],
  },
  {
    id:"v039", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Putto / Putti",
    definition:"Figure enfantine ailée, nue et joueuse, inspirée des génies de l'Antiquité. ≠ chérubins, anges, séraphins (iconographie religieuse). Les putti = iconographie profane. Motif réapparu à la Renaissance avec le Tombeau d'Ilaria del Carreto (1406).",
    example:"Cantoria de Donatello, Tombeau d'Ilaria del Carreto, Fonts baptismaux de Sienne.",
    associated:["Antiquité","Enfant","Décoration","Profane"],
  },
  {
    id:"v040", type:"vocab", category:"Contexte historique", theme:"Théorie & Contexte",
    term:"Plan centré dans l'architecture renaissante",
    definition:"Retour au plan centré = modèle antique absolu pour les architectes de la Renaissance. La forme parfaite réunit cercle et carré = proximité du divin. Types : rotonde, croix grecque, octogonal, trifolié. Sacristie Vieille de Brunelleschi = première utilisation.",
    example:"Sacristie Vieille San Lorenzo (Brunelleschi), Chapelle Pazzi, Santa Maria presso San Satiro (Bramante).",
    associated:["Brunelleschi","Alberti","Bramante","Perfection mathématique"],
  },
  {
    id:"v041", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Da sotto in su",
    definition:"Littéralement 'de dessous en haut'. Vue en contre-plongée utilisée pour les peintures sur voûtes ou plafonds. Le peintre calcule les raccourcis pour que la scène paraisse naturelle vue d'en bas.",
    example:"Donatello, Ascension de saint Jean (1434). Melozzo da Forli, fresques des Saint-Apôtres.",
    associated:["Raccourci","Voûte","Perspective","Plafond peint"],
  },
  {
    id:"v042", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Fond doré (or de fond)",
    definition:"Héritage médiéval : fond recouvert de feuilles d'or signifiant que la scène se déroule dans l'espace sacré du Paradis, hors du temps et du monde. Progressivement abandonné au cours du XVe au profit d'un décor naturel ou architectural.",
    example:"Couronnement de la Vierge de Lorenzo Monaco, Triptyque de Cortone (Fra Angelico). Absent dans la Pala di San Marco (Fra Angelico, 1440).",
    associated:["Médiéval","Paradis","Sacré","Évolution picturale"],
  },
  {
    id:"v043", type:"vocab", category:"Contexte historique", theme:"Théorie & Contexte",
    term:"Condottiere et cours princières",
    definition:"Condottiere = chef d'armée mercenaire. Les princes des états italiens (Urbino, Mantoue, Ferrare, Naples) sont souvent des condottieri éduqués à l'humanisme. Ils constituent des cours brillantes qui attirent artistes et intellectuels. L'artiste de cour = statut privilégié.",
    example:"Mantegna à la cour des Gonzague de Mantoue. Gattamelata (Donatello). Colleoni (Verrocchio).",
    associated:["Cour princière","Mécénat","Artiste de cour","Italie"],
  },
  {
    id:"v044", type:"vocab", category:"Terme technique", theme:"Vocabulaire",
    term:"Estampe vs Gravure",
    definition:"Gravure = technique (gravure en relief/taille d'épargne sur bois ; gravure en creux/taille-douce sur métal). Estampe = œuvre imprimée résultant d'une gravure. L'image est toujours inversée par rapport à la matrice.",
    example:"Xylographie (bois) : Schongauer, Sainte Véronique. Taille-douce (métal) : Mantegna, Schongauer.",
    associated:["Reproduction","Image","Diffusion","Imprimerie"],
  },
  {
    id:"v045", type:"vocab", category:"Comparaison", theme:"Théorie & Contexte",
    term:"Brunelleschi vs Ghiberti (concours de 1401)",
    definition:"Brunelleschi : occupe mieux l'espace (horreur du vide), cite le tireur d'épine (intellectuel), mais incapable de fondre en une pièce = technique plus coûteuse. Ghiberti : scène fondue en une pièce (économique), composition plus lisible, premier torse nu érotique dans un décor religieux, meilleure maîtrise du raccourci.",
    example:"Panneaux du Sacrifice d'Isaac (Bargello, Florence).",
    associated:["Concours 1401","Bronze","Florence","Baptistère"],
  },
];

// ══════════════════════════════════════════════
// FILTRES
// ══════════════════════════════════════════════

const FILTERS = {
  type: ["Toutes", "Œuvres", "Vocabulaire/Théorie"],
  movement: ["Tous", "Renaissance florentine", "Renaissance italienne", "Ars nova (Renaissance nordique)", "Gothique international", "Gothique vénitien", "Renaissance vénitienne"],
  theme: ["Tous", "Peinture", "Sculpture", "Architecture", "Portrait", "Estampe", "Vocabulaire", "Théorie & Contexte"],
  period: ["Tous", "Quattrocento", "XVe-XVIe", "Quattrocento-XVIe"],
};

// ══════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function movementColor(m) {
  if (!m) return "#6a5030";
  if (m.includes("florentin")) return "#c8922a";
  if (m.includes("nordique") || m.includes("Ars nova")) return "#4a8ab0";
  if (m.includes("Gothique")) return "#7a5ab0";
  if (m.includes("vénitien") || m.includes("Venise")) return "#3a8a6a";
  if (m.includes("italien")) return "#a07040";
  return "#6a5030";
}

// Génère 4 options de QCM pour une carte œuvre
function generateQuizOptions(card, allCards) {
  const correct = card.artist;
  let wrongs = card.quizWrongs || [];
  // Compléter si manque avec d'autres artistes aléatoires
  const otherArtists = allCards
    .filter(c => c.type === "artwork" && c.artist !== correct && !wrongs.includes(c.artist))
    .map(c => c.artist);
  const uniqueOthers = [...new Set(otherArtists)];
  while (wrongs.length < 3 && uniqueOthers.length > 0) {
    const idx = Math.floor(Math.random() * uniqueOthers.length);
    wrongs = [...wrongs, uniqueOthers.splice(idx, 1)[0]];
  }
  return shuffle([correct, ...wrongs.slice(0, 3)]);
}

// ══════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════

const styles = {
  app: {
    minHeight: "100vh",
    background: "#0d0d0d",
    color: "#e8e0d0",
    fontFamily: "'Crimson Text', Georgia, serif",
  },
  header: {
    background: "linear-gradient(180deg, #1a1008 0%, #0d0d0d 100%)",
    borderBottom: "1px solid #3a2a10",
    padding: "28px 40px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  logo: {
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: "0.05em",
    color: "#d4a843",
    fontFamily: "'Crimson Text', Georgia, serif",
  },
  logoSub: {
    fontSize: 13,
    color: "#8a7050",
    fontFamily: "sans-serif",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginTop: 2,
  },
  stats: { display: "flex", gap: 24, fontSize: 13, color: "#8a7050", fontFamily: "sans-serif", flexWrap: "wrap" },
  stat: { textAlign: "center" },
  statNum: { fontSize: 22, color: "#d4a843", fontWeight: 700, display: "block" },
  main: { maxWidth: 1200, margin: "0 auto", padding: "32px 24px" },
  filterBar: {
    background: "#141008", border: "1px solid #2a1e08", borderRadius: 12,
    padding: "20px 24px", marginBottom: 28, display: "flex", flexWrap: "wrap", gap: 16,
  },
  filterGroup: { display: "flex", flexDirection: "column", gap: 6, flex: "1 1 180px" },
  filterLabel: { fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6a5030", fontFamily: "sans-serif" },
  select: {
    background: "#1e1408", border: "1px solid #3a2a10", color: "#c8b87a",
    padding: "7px 12px", borderRadius: 6, fontSize: 14,
    fontFamily: "'Crimson Text', Georgia, serif", cursor: "pointer", outline: "none",
  },
  modeBar: { display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" },
  modeBtn: (active) => ({
    padding: "10px 22px", borderRadius: 30,
    border: active ? "none" : "1px solid #3a2a10",
    background: active ? "linear-gradient(135deg, #c8922a, #d4a843)" : "#141008",
    color: active ? "#0d0d0d" : "#8a7050",
    fontSize: 14, fontFamily: "sans-serif", fontWeight: active ? 700 : 400,
    cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.2s",
  }),
  cardArea: { display: "flex", flexDirection: "column", alignItems: "center", gap: 24 },
  progress: { fontSize: 13, color: "#6a5030", fontFamily: "sans-serif", letterSpacing: "0.1em" },
  progressBar: { width: "100%", maxWidth: 600, height: 3, background: "#2a1e08", borderRadius: 2, overflow: "hidden" },
  progressFill: (pct) => ({ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #c8922a, #d4a843)", transition: "width 0.4s ease" }),
  cardWrapper: { width: "100%", maxWidth: 700, perspective: 1200, cursor: "pointer", userSelect: "none" },
  cardInner: (flipped) => ({
    position: "relative", width: "100%", minHeight: 480,
    transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
    transformStyle: "preserve-3d",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  }),
  cardFace: { position: "absolute", top: 0, left: 0, right: 0, minHeight: 480, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", borderRadius: 16, overflow: "hidden" },
  cardFront: { background: "linear-gradient(160deg, #1a1208 0%, #120d06 100%)", border: "1px solid #3a2a10", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, gap: 20 },
  cardBack: { background: "linear-gradient(160deg, #0e1008 0%, #080d06 100%)", border: "1px solid #1e3010", padding: "32px 36px", overflowY: "auto", minHeight: 480 },
  cardImage: { width: "100%", maxHeight: 280, objectFit: "contain", borderRadius: 8, background: "#0d0d0d" },
  cardBadge: (color) => ({ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: color || "#8a6030", fontFamily: "sans-serif", background: "rgba(255,255,255,0.04)", padding: "4px 12px", borderRadius: 20, border: `1px solid ${color || "#3a2a10"}` }),
  frontTitle: { fontSize: 13, color: "#8a7050", fontFamily: "sans-serif", letterSpacing: "0.1em", textAlign: "center" },
  frontHint: { fontSize: 13, color: "#4a3a20", fontFamily: "sans-serif", marginTop: 12, fontStyle: "italic" },
  vocabTerm: { fontSize: 38, fontWeight: 700, color: "#d4a843", textAlign: "center", lineHeight: 1.2 },
  vocabCategory: { fontSize: 13, color: "#8a6030", fontFamily: "sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" },
  backTitle: { fontSize: 22, fontWeight: 700, color: "#d4a843", marginBottom: 4, lineHeight: 1.2 },
  backArtist: { fontSize: 16, color: "#a07840", marginBottom: 2, fontStyle: "italic" },
  backMeta: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", background: "rgba(255,255,255,0.03)", padding: "12px 16px", borderRadius: 8, marginBottom: 16, border: "1px solid #1e1408" },
  metaLabel: { fontSize: 10, color: "#5a4020", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" },
  metaValue: { fontSize: 13, color: "#c8a860", fontFamily: "sans-serif" },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 11, color: "#6a8030", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 },
  bullet: { display: "flex", gap: 8, marginBottom: 5, fontSize: 14, lineHeight: 1.5, alignItems: "flex-start" },
  dot: { color: "#c8922a", fontSize: 10, marginTop: 5, flexShrink: 0 },
  context: { fontSize: 13.5, lineHeight: 1.7, color: "#b09060", fontStyle: "italic", background: "rgba(200,146,42,0.05)", padding: "10px 14px", borderRadius: 8, borderLeft: "2px solid #3a2a10" },
  distinctions: { fontSize: 13.5, lineHeight: 1.7, color: "#e8d8a0", background: "rgba(100,150,50,0.07)", padding: "10px 14px", borderRadius: 8, borderLeft: "2px solid #4a6020" },
  navRow: { display: "flex", gap: 12, alignItems: "center", justifyContent: "center", flexWrap: "wrap" },
  navBtn: (disabled) => ({ padding: "11px 28px", borderRadius: 8, border: "1px solid #3a2a10", background: disabled ? "#0d0d0d" : "#1a1208", color: disabled ? "#3a2a10" : "#c8a860", fontSize: 14, fontFamily: "sans-serif", cursor: disabled ? "default" : "pointer", transition: "all 0.2s", opacity: disabled ? 0.4 : 1 }),
  flipBtn: { padding: "12px 36px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #c8922a, #d4a843)", color: "#0d0d0d", fontSize: 14, fontWeight: 700, fontFamily: "sans-serif", cursor: "pointer", letterSpacing: "0.05em" },
  shuffleBtn: { padding: "11px 20px", borderRadius: 8, border: "1px solid #2a4010", background: "#0e1208", color: "#7a9040", fontSize: 13, fontFamily: "sans-serif", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 },
  gridCard: { background: "#141008", border: "1px solid #2a1e08", borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "border-color 0.2s, transform 0.2s" },
  gridImg: { width: "100%", height: 180, objectFit: "cover", background: "#0d0d0d", display: "block" },
  gridInfo: { padding: "14px 16px" },
  gridTitle: { fontSize: 15, fontWeight: 700, color: "#d4a843", marginBottom: 4, lineHeight: 1.3 },
  gridArtist: { fontSize: 13, color: "#8a7050", fontStyle: "italic", marginBottom: 4 },
  gridDate: { fontSize: 12, color: "#6a5030", fontFamily: "sans-serif" },
  empty: { textAlign: "center", padding: "80px 40px", color: "#4a3a20", fontSize: 18, fontStyle: "italic" },
};

// ══════════════════════════════════════════════
// COMPOSANTS DE CARTE
// ══════════════════════════════════════════════

function ArtworkFront({ card }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div style={styles.cardFront}>
      <span style={styles.cardBadge(movementColor(card.movement))}>
        {card.theme} · {card.movement}
      </span>
      {!imgError && card.imageUrl ? (
        <img src={card.imageUrl} alt={card.title} style={styles.cardImage} onError={() => setImgError(true)} />
      ) : (
        <div style={{ width: "100%", height: 200, background: "#1a1208", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#3a2a10", fontSize: 13, fontFamily: "sans-serif", fontStyle: "italic" }}>
          [image non disponible]
        </div>
      )}
      <p style={styles.frontTitle}>Reconnaissez-vous cette œuvre ?</p>
      <p style={styles.frontHint}>↓ Cliquez pour retourner la carte</p>
    </div>
  );
}

function ArtworkBack({ card }) {
  return (
    <div style={styles.cardBack}>
      <div style={styles.backTitle}>{card.title}</div>
      <div style={styles.backArtist}>{card.artist}</div>
      <div style={styles.backMeta}>
        <div><div style={styles.metaLabel}>Date</div><div style={styles.metaValue}>{card.date}</div></div>
        <div><div style={styles.metaLabel}>Mouvement</div><div style={styles.metaValue}>{card.movement}</div></div>
        <div><div style={styles.metaLabel}>Médium</div><div style={styles.metaValue}>{card.medium}</div></div>
        <div><div style={styles.metaLabel}>Localisation</div><div style={styles.metaValue}>{card.location}</div></div>
      </div>
      {card.characteristics && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>✦ Caractéristiques visuelles</div>
          {card.characteristics.map((c, i) => (
            <div key={i} style={styles.bullet}><span style={styles.dot}>◆</span><span style={{ color: "#d0c090" }}>{c}</span></div>
          ))}
        </div>
      )}
      {card.context && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>⌂ Contexte historique</div>
          <div style={styles.context}>{card.context}</div>
        </div>
      )}
      {card.themes && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>◈ Thèmes</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {card.themes.map((t, i) => (
              <span key={i} style={{ fontSize: 12, fontFamily: "sans-serif", background: "rgba(200,146,42,0.1)", border: "1px solid #3a2a10", color: "#c8a860", padding: "3px 10px", borderRadius: 20 }}>{t}</span>
            ))}
          </div>
        </div>
      )}
      {card.distinctions && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>⚡ Points distinctifs (pour l'examen)</div>
          <div style={styles.distinctions}>{card.distinctions}</div>
        </div>
      )}
    </div>
  );
}

function VocabFront({ card }) {
  return (
    <div style={styles.cardFront}>
      <span style={styles.cardBadge("#4a8030")}>{card.category}</span>
      <div style={styles.vocabTerm}>{card.term}</div>
      <div style={styles.vocabCategory}>{card.theme}</div>
      <p style={styles.frontHint}>↓ Cliquez pour voir la définition</p>
    </div>
  );
}

function VocabBack({ card }) {
  return (
    <div style={styles.cardBack}>
      <div style={styles.backTitle}>{card.term}</div>
      <div style={{ ...styles.cardBadge("#4a8030"), display: "inline-block", marginBottom: 16 }}>{card.category}</div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>✦ Définition</div>
        <div style={{ fontSize: 15, lineHeight: 1.75, color: "#d0c090" }}>{card.definition}</div>
      </div>
      {card.example && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>◈ Exemples</div>
          <div style={styles.context}>{card.example}</div>
        </div>
      )}
      {card.associated && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>⚡ Concepts associés</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {card.associated.map((t, i) => (
              <span key={i} style={{ fontSize: 12, fontFamily: "sans-serif", background: "rgba(74,128,48,0.1)", border: "1px solid #2a4010", color: "#7a9040", padding: "3px 10px", borderRadius: 20 }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
// MODE FLASHCARD
// ══════════════════════════════════════════════

function FlashcardMode({ cards }) {
  const [deck, setDeck] = useState(() => shuffle(cards));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());

  useEffect(() => {
    setDeck(shuffle(cards));
    setIdx(0);
    setFlipped(false);
    setKnown(new Set());
  }, [cards]);

  const card = deck[idx];
  const total = deck.length;

  const next = () => { setFlipped(false); setTimeout(() => setIdx(i => Math.min(i + 1, total - 1)), 200); };
  const prev = () => { setFlipped(false); setTimeout(() => setIdx(i => Math.max(i - 1, 0)), 200); };
  const markKnown = () => { setKnown(k => new Set([...k, card.id])); next(); };
  const reshuf = () => { setDeck(shuffle(cards)); setIdx(0); setFlipped(false); };

  if (!card) return <div style={styles.empty}>Aucune carte dans cette sélection.</div>;

  const pct = total > 1 ? (idx / (total - 1)) * 100 : 100;
  const knownPct = Math.round((known.size / total) * 100);

  return (
    <div style={styles.cardArea}>
      <div style={{ width: "100%", maxWidth: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={styles.progress}>{idx + 1} / {total} · {knownPct}% maîtrisé</span>
        <button style={styles.shuffleBtn} onClick={reshuf}>⟳ Mélanger</button>
      </div>
      <div style={styles.progressBar}><div style={styles.progressFill(pct)} /></div>
      <div style={styles.cardWrapper} onClick={() => setFlipped(f => !f)}>
        <div style={styles.cardInner(flipped)}>
          <div style={{ ...styles.cardFace, ...styles.cardFront, position: "absolute" }}>
            {card.type === "artwork" ? <ArtworkFront card={card} /> : <VocabFront card={card} />}
          </div>
          <div style={{ ...styles.cardFace, position: "absolute", transform: "rotateY(180deg)" }}>
            {card.type === "artwork" ? <ArtworkBack card={card} /> : <VocabBack card={card} />}
          </div>
        </div>
      </div>
      <div style={styles.navRow}>
        <button style={styles.navBtn(idx === 0)} onClick={prev} disabled={idx === 0}>← Précédente</button>
        <button style={styles.flipBtn} onClick={() => setFlipped(f => !f)}>{flipped ? "Voir recto" : "Retourner →"}</button>
        <button style={styles.navBtn(idx === total - 1)} onClick={next} disabled={idx === total - 1}>Suivante →</button>
      </div>
      <div style={styles.navRow}>
        <button onClick={markKnown} style={{ padding: "9px 22px", borderRadius: 8, border: "1px solid #2a4010", background: "#0e1208", color: "#7a9040", fontSize: 13, fontFamily: "sans-serif", cursor: "pointer" }}>
          ✓ Je sais · Suivante
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// MODE QUIZ (QCM)
// ══════════════════════════════════════════════

function QuizMode({ cards }) {
  const artworkCards = cards.filter(c => c.type === "artwork");
  const [deck, setDeck] = useState(() => shuffle(artworkCards).slice(0, Math.min(artworkCards.length, 20)));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [history, setHistory] = useState([]);

  const startNew = () => {
    setDeck(shuffle(artworkCards).slice(0, Math.min(artworkCards.length, 20)));
    setIdx(0); setScore(0); setSelected(null); setFinished(false); setHistory([]);
  };

  useEffect(() => { startNew(); }, [cards]);

  if (artworkCards.length === 0) return <div style={styles.empty}>Le mode Quiz nécessite des cartes d'œuvres d'art.</div>;

  if (finished) {
    const pct = Math.round((score / deck.length) * 100);
    return (
      <div style={{ ...styles.cardArea, maxWidth: 700, margin: "0 auto" }}>
        <div style={{ background: "#141008", border: "1px solid #3a2a10", borderRadius: 16, padding: "48px 40px", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 64 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "📖" : "💪"}</div>
          <div style={{ fontSize: 32, color: "#d4a843", fontWeight: 700, marginTop: 16 }}>Résultat : {score} / {deck.length}</div>
          <div style={{ fontSize: 18, color: "#8a7050", fontFamily: "sans-serif", marginTop: 8 }}>{pct}% de bonnes réponses</div>
          <div style={{ marginTop: 32, borderTop: "1px solid #2a1e08", paddingTop: 24 }}>
            <div style={{ fontSize: 14, color: "#6a8030", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Révision des erreurs</div>
            {history.filter(h => !h.correct).map((h, i) => (
              <div key={i} style={{ background: "rgba(180,50,50,0.07)", border: "1px solid #3a1010", borderRadius: 8, padding: "12px 16px", marginBottom: 8, textAlign: "left" }}>
                <div style={{ fontSize: 13, color: "#d4a843", fontWeight: 700 }}>{h.card.title}</div>
                <div style={{ fontSize: 12, color: "#8a5050", fontFamily: "sans-serif", marginTop: 2 }}>Réponse donnée : <span style={{ color: "#c05050" }}>{h.given}</span></div>
                <div style={{ fontSize: 12, color: "#5a8030", fontFamily: "sans-serif" }}>Bonne réponse : <span style={{ color: "#7ab050" }}>{h.card.artist}</span></div>
              </div>
            ))}
            {history.filter(h => !h.correct).length === 0 && <div style={{ color: "#7ab050", fontSize: 16 }}>🎉 Aucune erreur !</div>}
          </div>
          <button onClick={startNew} style={{ ...styles.flipBtn, marginTop: 32, padding: "14px 40px", fontSize: 16 }}>
            ⟳ Nouveau quiz
          </button>
        </div>
      </div>
    );
  }

  const card = deck[idx];
  const options = generateQuizOptions(card, CARDS);
  const [imgError, setImgError] = useState(false);

  const handleAnswer = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    const correct = opt === card.artist;
    if (correct) setScore(s => s + 1);
    setHistory(h => [...h, { card, given: opt, correct }]);
    setTimeout(() => {
      if (idx + 1 >= deck.length) setFinished(true);
      else { setIdx(i => i + 1); setSelected(null); }
    }, 1600);
  };

  const pct = (idx / deck.length) * 100;

  return (
    <div style={styles.cardArea}>
      <div style={{ width: "100%", maxWidth: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={styles.progress}>Question {idx + 1} / {deck.length} · Score : {score}</span>
        <button style={styles.shuffleBtn} onClick={startNew}>⟳ Recommencer</button>
      </div>
      <div style={styles.progressBar}><div style={styles.progressFill(pct)} /></div>

      <div style={{ width: "100%", maxWidth: 700, background: "linear-gradient(160deg, #1a1208 0%, #120d06 100%)", border: "1px solid #3a2a10", borderRadius: 16, overflow: "hidden" }}>
        {/* Image */}
        <div style={{ background: "#0d0d0d", display: "flex", justifyContent: "center", padding: 24 }}>
          {!imgError && card.imageUrl
            ? <img src={card.imageUrl} alt="?" style={{ maxHeight: 280, maxWidth: "100%", objectFit: "contain", borderRadius: 8 }} onError={() => setImgError(true)} />
            : <div style={{ height: 200, width: "100%", background: "#1a1208", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#3a2a10", fontSize: 13, fontFamily: "sans-serif" }}>[image non disponible]</div>
          }
        </div>
        {/* Question */}
        <div style={{ padding: "24px 32px 32px" }}>
          <div style={{ fontSize: 18, color: "#e8e0d0", marginBottom: 24, textAlign: "center", fontStyle: "italic" }}>
            Qui est l'artiste de cette œuvre ?
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {options.map((opt, i) => {
              let bg = "#1a1208", border = "1px solid #3a2a10", color = "#c8a860";
              if (selected !== null) {
                if (opt === card.artist) { bg = "rgba(74,128,48,0.2)"; border = "1px solid #4a8030"; color = "#7ab050"; }
                else if (opt === selected && opt !== card.artist) { bg = "rgba(180,50,50,0.2)"; border = "1px solid #8a2020"; color = "#c05050"; }
                else { bg = "#0e0c08"; color = "#3a2a10"; }
              }
              return (
                <button key={i} onClick={() => handleAnswer(opt)} style={{
                  padding: "14px 16px", borderRadius: 10, border, background: bg, color,
                  fontSize: 15, fontFamily: "'Crimson Text', Georgia, serif", cursor: selected !== null ? "default" : "pointer",
                  transition: "all 0.3s", textAlign: "center", fontWeight: opt === card.artist && selected !== null ? 700 : 400,
                }}>
                  {selected !== null && opt === card.artist && "✓ "}{opt}
                  {selected !== null && opt === selected && opt !== card.artist && " ✗"}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid #2a1e08" }}>
              <div style={{ fontWeight: 700, color: "#d4a843", marginBottom: 4 }}>{card.title}, {card.date}</div>
              <div style={{ fontSize: 13, color: "#a08050", lineHeight: 1.6 }}>{card.distinctions || card.context}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// MODE GALERIE
// ══════════════════════════════════════════════

function GalleryMode({ cards, onSelect }) {
  const artworks = cards.filter(c => c.type === "artwork");
  const vocab = cards.filter(c => c.type === "vocab");

  const CardTile = ({ card }) => {
    const [imgError, setImgError] = useState(false);
    return (
      <div style={styles.gridCard} onClick={() => onSelect(card)}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8922a"; e.currentTarget.style.transform = "translateY(-3px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a1e08"; e.currentTarget.style.transform = "none"; }}>
        {card.type === "artwork" ? (
          <>
            {!imgError && card.imageUrl
              ? <img src={card.imageUrl} alt={card.title} style={styles.gridImg} onError={() => setImgError(true)} />
              : <div style={{ ...styles.gridImg, background: "#1a1208", display: "flex", alignItems: "center", justifyContent: "center", color: "#3a2a10", fontSize: 12, fontFamily: "sans-serif" }}>{card.theme}</div>
            }
            <div style={styles.gridInfo}>
              <div style={styles.gridTitle}>{card.title}</div>
              <div style={styles.gridArtist}>{card.artist}</div>
              <div style={styles.gridDate}>{card.date} · {card.medium}</div>
            </div>
          </>
        ) : (
          <>
            <div style={{ height: 140, background: "linear-gradient(135deg, #0e1208, #141808)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: "#d4a843", textAlign: "center", lineHeight: 1.3 }}>{card.term}</span>
            </div>
            <div style={styles.gridInfo}>
              <div style={{ fontSize: 12, color: "#6a8030", fontFamily: "sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>{card.category}</div>
              <div style={{ fontSize: 13, color: "#8a7050", marginTop: 4, lineHeight: 1.5 }}>{card.definition.slice(0, 80)}…</div>
            </div>
          </>
        )}
      </div>
    );
  };

  if (cards.length === 0) return <div style={styles.empty}>Aucune carte dans cette sélection.</div>;

  return (
    <div>
      {artworks.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 16, letterSpacing: "0.15em", color: "#6a5030", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 16, fontWeight: 400 }}>
            Œuvres d'art — {artworks.length} cartes
          </h2>
          <div style={styles.grid}>{artworks.map(c => <CardTile key={c.id} card={c} />)}</div>
        </div>
      )}
      {vocab.length > 0 && (
        <div>
          <h2 style={{ fontSize: 16, letterSpacing: "0.15em", color: "#4a6020", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 16, fontWeight: 400 }}>
            Vocabulaire & Théorie — {vocab.length} cartes
          </h2>
          <div style={styles.grid}>{vocab.map(c => <CardTile key={c.id} card={c} />)}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
// MODAL DÉTAIL
// ══════════════════════════════════════════════

function DetailModal({ card, onClose }) {
  if (!card) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: 680, width: "100%", maxHeight: "90vh", overflowY: "auto", borderRadius: 16, position: "relative" }}>
        {card.type === "artwork" ? <ArtworkBack card={card} /> : <VocabBack card={card} />}
        <button onClick={onClose} style={{ position: "sticky", bottom: 0, width: "100%", padding: "12px", background: "#1a1208", border: "1px solid #3a2a10", color: "#c8a860", fontSize: 14, fontFamily: "sans-serif", cursor: "pointer" }}>
          ✕ Fermer
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// APP PRINCIPALE
// ══════════════════════════════════════════════

export default function App() {
  const [mode, setMode] = useState("flashcard");
  const [filters, setFilters] = useState({ type: "Toutes", movement: "Tous", theme: "Tous", period: "Tous" });
  const [selected, setSelected] = useState(null);

  const filtered = CARDS.filter(c => {
    if (filters.type === "Œuvres" && c.type !== "artwork") return false;
    if (filters.type === "Vocabulaire/Théorie" && c.type !== "vocab") return false;
    if (filters.movement !== "Tous" && c.movement !== filters.movement) return false;
    if (filters.theme !== "Tous" && c.theme !== filters.theme) return false;
    if (filters.period !== "Tous" && c.period !== filters.period) return false;
    return true;
  });

  const artworkCount = CARDS.filter(c => c.type === "artwork").length;
  const vocabCount = CARDS.filter(c => c.type === "vocab").length;

  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />

      <div style={styles.header}>
        <div>
          <div style={styles.logo}>Histoire de l'Art Moderne</div>
          <div style={styles.logoSub}>Révision · XVe siècle · Quattrocento</div>
        </div>
        <div style={styles.stats}>
          <div style={styles.stat}><span style={styles.statNum}>{CARDS.length}</span>cartes totales</div>
          <div style={styles.stat}><span style={styles.statNum}>{artworkCount}</span>œuvres</div>
          <div style={styles.stat}><span style={styles.statNum}>{vocabCount}</span>définitions</div>
          <div style={styles.stat}><span style={{ ...styles.statNum, color: "#7a9040" }}>{filtered.length}</span>sélectionnées</div>
        </div>
      </div>

      <div style={styles.main}>
        {/* Mode */}
        <div style={styles.modeBar}>
          <button style={styles.modeBtn(mode === "flashcard")} onClick={() => setMode("flashcard")}>◈ Flashcards</button>
          <button style={styles.modeBtn(mode === "quiz")} onClick={() => setMode("quiz")}>◉ Quiz QCM</button>
          <button style={styles.modeBtn(mode === "gallery")} onClick={() => setMode("gallery")}>⊞ Galerie complète</button>
        </div>

        {/* Filtres */}
        <div style={styles.filterBar}>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Type de carte</span>
            <select style={styles.select} value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
              {FILTERS.type.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Mouvement artistique</span>
            <select style={styles.select} value={filters.movement} onChange={e => setFilters(f => ({ ...f, movement: e.target.value }))}>
              {FILTERS.movement.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Thème / Discipline</span>
            <select style={styles.select} value={filters.theme} onChange={e => setFilters(f => ({ ...f, theme: e.target.value }))}>
              {FILTERS.theme.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Période</span>
            <select style={styles.select} value={filters.period} onChange={e => setFilters(f => ({ ...f, period: e.target.value }))}>
              {FILTERS.period.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button style={{ ...styles.navBtn(false), height: 36 }} onClick={() => setFilters({ type: "Toutes", movement: "Tous", theme: "Tous", period: "Tous" })}>
              ✕ Réinitialiser
            </button>
          </div>
        </div>

        {/* Contenu */}
        {mode === "flashcard" && <FlashcardMode key={JSON.stringify(filters)} cards={filtered} />}
        {mode === "quiz" && <QuizMode key={JSON.stringify(filters) + "quiz"} cards={filtered} />}
        {mode === "gallery" && <GalleryMode cards={filtered} onSelect={setSelected} />}
      </div>

      {selected && <DetailModal card={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
