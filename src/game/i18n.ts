import type { LangCode, RoleId } from './types';

export interface LangInfo {
  code: LangCode;
  label: string;
  flag: string;
}

export const LANGUAGES: LangInfo[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
];

export interface Translation {
  appTitle: string;
  tagline: string;
  rules: string;
  close: string;
  gotIt: string;
  // Setup
  players: string;
  playersCount: string;
  addPlayer: string;
  categories: string;
  settingsRoles: string;
  blindMode: string;
  blindModeDesc: string;
  undercoverCount: string;
  startGame: string;
  // Roles
  roleCivil: string;
  roleUndercover: string;
  roleMrWhite: string;
  roleMrGreen: string;
  roleAnge: string;
  roleVoleur: string;
  roleChasseur: string;
  roleVoyante: string;
  // Reveal
  passDeviceTo: string;
  iAm: string;
  yourRole: string;
  yourSecretWord: string;
  theTheme: string;
  mrWhiteNoWord: string;
  chooseSide: string;
  sideCivils: string;
  sideUndercovers: string;
  choosePlayerToScan: string;
  validate: string;
  hideAndNext: string;
  hideAndPass: string;
  voyanteVision: string;
  roleOf: string;
  isRole: string;
  voleurYourWord: string;
  voleurAsWord: string;
  civilOrUndercover: string;
  // Game turn
  round: string;
  turnInstructions: string;
  firstToSpeak: string;
  alivePlayers: string;
  eliminate: string;
  lastChance: string;
  mrWhiteGuessPrompt: string;
  guessCivilWord: string;
  tryLuck: string;
  iDontKnow: string;
  chasseurAction: string;
  chasseurPrompt: string;
  shootAndDie: string;
  // Game over
  gameOver: string;
  scores: string;
  points: string;
  civilWord: string;
  undercoverWord: string;
  roleReveal: string;
  playAgain: string;
  sameSettings: string;
  samePlayers: string;
  fullReset: string;
  // Rules content
  rulesGoal: string;
  rulesGoalCivils: string;
  rulesGoalUndercovers: string;
  rulesRolesTitle: string;
  rulesCivilDesc: string;
  rulesUndercoverDesc: string;
  rulesMrWhiteDesc: string;
  rulesMrGreenDesc: string;
  rulesAngeDesc: string;
  rulesVoyanteDesc: string;
  rulesChasseurDesc: string;
  rulesVoleurDesc: string;
  // Premium
  premium: string;
  upgradeTitle: string;
  upgradeDesc: string;
  freeVersion: string;
  freeVersionDesc: string;
  partyPass: string;
  partyPassDesc: string;
  partyPassPrice: string;
  lifetime: string;
  lifetimeDesc: string;
  lifetimePrice: string;
  unlockAll: string;
  buyNow: string;
  restorePurchase: string;
  premiumActive: string;
  premiumActiveDesc: string;
  premiumBanner: string;
  lockedCategory: string;
  lockedWords: string;
  // Win messages
  angeWinMsg: string;
  civilsWinMsg: string;
  undercoverWinMsg: string;
  mrWhiteWinMsg: string;
  mrGreenWinMsg: string;
  // Footer
  footerTagline: string;
  footerCopyright: string;
  // Language
  language: string;
  // Errors
  errorNeedCivil: string;
  errorNeedCategory: string;
  // Misc
  loading: string;
  purchaseError: string;
  back: string;
}

const fr: Translation = {
  appTitle: 'UNDERCOVER',
  tagline: 'Le jeu d\'ambiance par excellence',
  rules: 'Règles',
  close: 'Fermer',
  gotIt: 'J\'ai compris',
  players: 'Joueurs',
  playersCount: 'Joueurs',
  addPlayer: 'Ajouter un joueur',
  categories: 'Catégories de mots',
  settingsRoles: 'Paramètres & Rôles',
  blindMode: 'Jeu à l\'aveugle',
  blindModeDesc: 'Les rôles Civils et Undercover ne sont pas précisés, seul le mot est affiché',
  undercoverCount: 'Nombre d\'Undercover',
  startGame: 'Démarrer la partie',
  roleCivil: 'Civil',
  roleUndercover: 'Undercover',
  roleMrWhite: 'M. White',
  roleMrGreen: 'M. Green',
  roleAnge: 'Ange',
  roleVoleur: 'Voleur',
  roleChasseur: 'Chasseur',
  roleVoyante: 'Voyante',
  passDeviceTo: 'Passez l\'appareil à',
  iAm: 'Je suis',
  yourRole: 'Votre rôle est',
  yourSecretWord: 'Votre mot secret :',
  theTheme: 'Le thème est :',
  mrWhiteNoWord: 'Vous n\'avez pas de mot. Essayez de deviner celui des autres et fondez-vous dans la masse !',
  chooseSide: 'Choisissez votre camp :',
  sideCivils: 'Civils',
  sideUndercovers: 'Undercovers',
  choosePlayerToScan: 'Choisissez un joueur à sonder :',
  validate: 'Valider',
  hideAndNext: 'Cacher et Suivant',
  hideAndPass: 'J\'ai compris, cacher',
  voyanteVision: 'Vision de la Voyante',
  roleOf: 'Rôle de',
  isRole: 'Le rôle de',
  voleurYourWord: 'Votre Mot Secret',
  voleurAsWord: 'En tant que Voleur, votre mot est :',
  civilOrUndercover: 'Civil ou Undercover',
  round: 'Tour',
  turnInstructions: 'Discutez, donnez un mot à tour de rôle, puis votez pour éliminer un joueur suspect.',
  firstToSpeak: 'Le premier joueur à parler est :',
  alivePlayers: 'Joueurs en vie',
  eliminate: 'Éliminer',
  lastChance: 'Dernière chance !',
  mrWhiteGuessPrompt: 'Si vous devinez le mot des Civils, vous gagnez la partie !',
  guessCivilWord: 'Mot des civils',
  tryLuck: 'Tenter ma chance',
  iDontKnow: 'Je ne sais pas',
  chasseurAction: 'Action du Chasseur !',
  chasseurPrompt: 'Avant de mourir, il peut éliminer un autre joueur.',
  shootAndDie: 'Tirer et Mourir',
  gameOver: 'Fin de la partie',
  scores: 'Scores actuels',
  points: 'pts',
  civilWord: 'Mot des Civils',
  undercoverWord: 'Mot des Undercovers',
  roleReveal: 'Révélation des rôles',
  playAgain: 'Rejouer',
  sameSettings: 'Rejouer (Mêmes paramètres)',
  samePlayers: 'Modifier les rôles (Mêmes joueurs)',
  fullReset: 'Nouvelle partie',
  rulesGoal: 'But du jeu',
  rulesGoalCivils: 'Les Civils doivent identifier et éliminer tous les Undercovers (et autres rôles hostiles).',
  rulesGoalUndercovers: 'Les Undercovers doivent survivre jusqu\'à être aussi nombreux que les Civils pour prendre le contrôle.',
  rulesRolesTitle: 'Les Rôles',
  rulesCivilDesc: 'Il reçoit le mot secret principal. Son but est de démasquer l\'Undercover sans se faire éliminer par erreur.',
  rulesUndercoverDesc: 'Il reçoit un mot secret légèrement différent. Il doit se fondre dans la masse pour ne pas être repéré.',
  rulesMrWhiteDesc: 'Il ne reçoit aucun mot. S\'il est éliminé, il a une dernière chance de deviner le mot des civils pour voler la victoire !',
  rulesMrGreenDesc: 'Il ne reçoit pas de mot, mais il connait le thème du mot. Comme M. White, il peut gagner en devinant le mot civil.',
  rulesAngeDesc: 'Son but est paradoxal : il joue avec les civils, mais s\'il est éliminé au 1er tour, il gagne immédiatement la partie.',
  rulesVoyanteDesc: 'Joue avec les civils. Au début de la partie, elle peut consulter le vrai rôle d\'un joueur de son choix.',
  rulesChasseurDesc: 'Joue avec les civils. S\'il est éliminé par vote, il emporte un autre joueur dans sa tombe avant de mourir.',
  rulesVoleurDesc: 'Au début de la partie, il choisit librement de rejoindre le camp des Civils ou des Undercovers, et découvre son mot en conséquence.',
  premium: 'Premium',
  upgradeTitle: 'Débloquez tous les mots',
  upgradeDesc: 'Accédez à plus de 1000 couples de mots dans toutes les catégories et toutes les langues.',
  freeVersion: 'Version Gratuite',
  freeVersionDesc: 'couples de mots fixes',
  partyPass: 'Pass Soirée (24h)',
  partyPassDesc: 'Débloque tous les mots pour la soirée en cours',
  partyPassPrice: '0,99 €',
  lifetime: 'Accès Illimité à vie',
  lifetimeDesc: 'Tous les mots + futures mises à jour',
  lifetimePrice: '2,99 €',
  unlockAll: 'Tout débloquer',
  buyNow: 'Acheter',
  restorePurchase: 'Restaurer l\'achat',
  premiumActive: 'Premium Actif',
  premiumActiveDesc: 'Vous avez accès à tous les mots',
  premiumBanner: 'Améliorez vers Premium pour plus de 1000 mots',
  lockedCategory: 'Catégorie verrouillée',
  lockedWords: 'Mots verrouillés',
  angeWinMsg: 'L\'Ange a été éliminé au premier tour et remporte la partie !',
  civilsWinMsg: 'Tous les Undercovers ont été éliminés. Les Civils gagnent !',
  undercoverWinMsg: 'Les Undercovers sont aussi nombreux que les Civils. Ils prennent le contrôle et gagnent !',
  mrWhiteWinMsg: 'a deviné le mot des Civils et remporte la victoire !',
  mrGreenWinMsg: 'a deviné le mot des Civils et remporte la victoire !',
  footerTagline: 'Le secret d\'une soirée réussie ? Le partage et les éclats de rire.',
  footerCopyright: 'Undercover',
  language: 'Langue',
  errorNeedCivil: 'Il doit y avoir au moins un Civil ! Réduisez les rôles spéciaux ou ajoutez des joueurs.',
  errorNeedCategory: 'Veuillez sélectionner au moins une catégorie.',
  loading: 'Chargement...',
  purchaseError: 'Le paiement a échoué. Veuillez réessayer.',
  back: 'Retour',
};

const en: Translation = {
  appTitle: 'UNDERCOVER',
  tagline: 'The ultimate party game',
  rules: 'Rules',
  close: 'Close',
  gotIt: 'Got it',
  players: 'Players',
  playersCount: 'Players',
  addPlayer: 'Add player',
  categories: 'Word categories',
  settingsRoles: 'Settings & Roles',
  blindMode: 'Blind mode',
  blindModeDesc: 'Civil and Undercover roles are not shown, only the word is displayed',
  undercoverCount: 'Number of Undercovers',
  startGame: 'Start game',
  roleCivil: 'Civil',
  roleUndercover: 'Undercover',
  roleMrWhite: 'Mr. White',
  roleMrGreen: 'Mr. Green',
  roleAnge: 'Angel',
  roleVoleur: 'Thief',
  roleChasseur: 'Hunter',
  roleVoyante: 'Seer',
  passDeviceTo: 'Pass the device to',
  iAm: 'I am',
  yourRole: 'Your role is',
  yourSecretWord: 'Your secret word:',
  theTheme: 'The theme is:',
  mrWhiteNoWord: 'You have no word. Try to guess the others\' word and blend in!',
  chooseSide: 'Choose your side:',
  sideCivils: 'Civilians',
  sideUndercovers: 'Undercovers',
  choosePlayerToScan: 'Choose a player to scan:',
  validate: 'Confirm',
  hideAndNext: 'Hide and Next',
  hideAndPass: 'Got it, hide',
  voyanteVision: 'Seer\'s Vision',
  roleOf: 'Role of',
  isRole: 'The role of',
  voleurYourWord: 'Your Secret Word',
  voleurAsWord: 'As the Thief, your word is:',
  civilOrUndercover: 'Civil or Undercover',
  round: 'Round',
  turnInstructions: 'Discuss, take turns giving a word, then vote to eliminate a suspicious player.',
  firstToSpeak: 'The first player to speak is:',
  alivePlayers: 'Alive players',
  eliminate: 'Eliminate',
  lastChance: 'Last chance!',
  mrWhiteGuessPrompt: 'If you guess the Civilians\' word, you win the game!',
  guessCivilWord: 'Civilians\' word',
  tryLuck: 'Try my luck',
  iDontKnow: 'I don\'t know',
  chasseurAction: 'Hunter\'s Action!',
  chasseurPrompt: 'Before dying, they can eliminate another player.',
  shootAndDie: 'Shoot and Die',
  gameOver: 'Game Over',
  scores: 'Current scores',
  points: 'pts',
  civilWord: 'Civilians\' word',
  undercoverWord: 'Undercovers\' word',
  roleReveal: 'Role reveal',
  playAgain: 'Play again',
  sameSettings: 'Replay (Same settings)',
  samePlayers: 'Change roles (Same players)',
  fullReset: 'New game',
  rulesGoal: 'Objective',
  rulesGoalCivils: 'Civilians must identify and eliminate all Undercovers (and other hostile roles).',
  rulesGoalUndercovers: 'Undercovers must survive until they are as numerous as Civilians to take control.',
  rulesRolesTitle: 'Roles',
  rulesCivilDesc: 'Receives the main secret word. Their goal is to unmask the Undercover without being wrongly eliminated.',
  rulesUndercoverDesc: 'Receives a slightly different secret word. Must blend in to avoid being spotted.',
  rulesMrWhiteDesc: 'Receives no word. If eliminated, they get one last chance to guess the civilians\' word to steal victory!',
  rulesMrGreenDesc: 'Receives no word but knows the theme. Like Mr. White, they can win by guessing the civilians\' word.',
  rulesAngeDesc: 'Paradoxical goal: plays with civilians, but if eliminated on the first round, they instantly win.',
  rulesVoyanteDesc: 'Plays with civilians. At the start, they can peek at one player\'s true role.',
  rulesChasseurDesc: 'Plays with civilians. If eliminated by vote, they take another player down with them.',
  rulesVoleurDesc: 'At the start, freely chooses to join the Civilians or Undercovers, and learns their word accordingly.',
  premium: 'Premium',
  upgradeTitle: 'Unlock all words',
  upgradeDesc: 'Access 1000+ word pairs across all categories and languages.',
  freeVersion: 'Free Version',
  freeVersionDesc: 'fixed word pairs',
  partyPass: 'Party Pass (24h)',
  partyPassDesc: 'Unlock all words for one evening',
  partyPassPrice: '$0.99',
  lifetime: 'Lifetime Access',
  lifetimeDesc: 'All words + future updates',
  lifetimePrice: '$2.99',
  unlockAll: 'Unlock all',
  buyNow: 'Buy',
  restorePurchase: 'Restore purchase',
  premiumActive: 'Premium Active',
  premiumActiveDesc: 'You have access to all words',
  premiumBanner: 'Upgrade to Premium for 1000+ words',
  lockedCategory: 'Locked category',
  lockedWords: 'Locked words',
  angeWinMsg: 'The Angel was eliminated on the first round and wins the game!',
  civilsWinMsg: 'All Undercovers have been eliminated. Civilians win!',
  undercoverWinMsg: 'Undercovers are as numerous as Civilians. They take control and win!',
  mrWhiteWinMsg: 'guessed the Civilians\' word and wins the game!',
  mrGreenWinMsg: 'guessed the Civilians\' word and wins the game!',
  footerTagline: 'The secret to a great evening? Sharing and laughter.',
  footerCopyright: 'Undercover',
  language: 'Language',
  errorNeedCivil: 'There must be at least one Civil! Reduce special roles or add players.',
  errorNeedCategory: 'Please select at least one category.',
  loading: 'Loading...',
  purchaseError: 'Payment failed. Please try again.',
  back: 'Back',
};

const es: Translation = {
  ...en,
  tagline: 'El juego de fiesta por excelencia',
  rules: 'Reglas',
  close: 'Cerrar',
  gotIt: 'Entendido',
  players: 'Jugadores',
  addPlayer: 'Añadir jugador',
  categories: 'Categorías de palabras',
  settingsRoles: 'Ajustes y Roles',
  blindMode: 'Modo a ciegas',
  blindModeDesc: 'Los roles Civil y Undercover no se muestran, solo se muestra la palabra',
  undercoverCount: 'Número de Undercovers',
  startGame: 'Empezar partida',
  roleCivil: 'Civil',
  roleAnge: 'Ángel',
  roleVoleur: 'Ladrón',
  roleChasseur: 'Cazador',
  roleVoyante: 'Vidente',
  passDeviceTo: 'Pasa el dispositivo a',
  iAm: 'Soy',
  yourRole: 'Tu rol es',
  yourSecretWord: 'Tu palabra secreta:',
  theTheme: 'El tema es:',
  mrWhiteNoWord: 'No tienes palabra. ¡Intenta adivinar la de los demás y confúndete!',
  chooseSide: 'Elige tu bando:',
  sideCivils: 'Civiles',
  sideUndercovers: 'Undercovers',
  choosePlayerToScan: 'Elige un jugador para investigar:',
  validate: 'Confirmar',
  hideAndNext: 'Ocultar y Siguiente',
  hideAndPass: 'Entendido, ocultar',
  voyanteVision: 'Visión de la Vidente',
  roleOf: 'Rol de',
  voleurYourWord: 'Tu Palabra Secreta',
  voleurAsWord: 'Como Ladrón, tu palabra es:',
  civilOrUndercover: 'Civil o Undercover',
  round: 'Ronda',
  turnInstructions: 'Discutid, dad una palabra por turnos, luego votad para eliminar a un jugador sospechoso.',
  firstToSpeak: 'El primer jugador en hablar es:',
  alivePlayers: 'Jugadores vivos',
  eliminate: 'Eliminar',
  lastChance: '¡Última oportunidad!',
  mrWhiteGuessPrompt: '¡Si adivinas la palabra de los Civiles, ganas la partida!',
  guessCivilWord: 'Palabra de los civiles',
  tryLuck: 'Intentar suerte',
  iDontKnow: 'No lo sé',
  chasseurAction: '¡Acción del Cazador!',
  chasseurPrompt: 'Antes de morir, puede eliminar a otro jugador.',
  shootAndDie: 'Disparar y Morir',
  gameOver: 'Fin de la partida',
  scores: 'Puntuaciones actuales',
  points: 'pts',
  civilWord: 'Palabra de los Civiles',
  undercoverWord: 'Palabra de los Undercovers',
  roleReveal: 'Revelación de roles',
  playAgain: 'Jugar de nuevo',
  sameSettings: 'Repetir (Mismos ajustes)',
  samePlayers: 'Cambiar roles (Mismos jugadores)',
  fullReset: 'Nueva partida',
  rulesGoal: 'Objetivo',
  rulesGoalCivils: 'Los Civiles deben identificar y eliminar a todos los Undercovers.',
  rulesGoalUndercovers: 'Los Undercovers deben sobrevivir hasta ser tantos como los Civiles para tomar el control.',
  rulesRolesTitle: 'Roles',
  rulesCivilDesc: 'Recibe la palabra secreta principal. Su objetivo es desenmascarar al Undercover.',
  rulesUndercoverDesc: 'Recibe una palabra ligeramente diferente. Debe confundirse para no ser detectado.',
  rulesMrWhiteDesc: 'No recibe palabra. Si es eliminado, tiene una última oportunidad de adivinar la palabra civil.',
  rulesMrGreenDesc: 'No recibe palabra pero conoce el tema. Puede ganar adivinando la palabra civil.',
  rulesAngeDesc: 'Juega con los civiles, pero si es eliminado en la primera ronda, gana inmediatamente.',
  rulesVoyanteDesc: 'Juega con los civiles. Al principio, puede ver el rol real de un jugador.',
  rulesChasseurDesc: 'Juega con los civiles. Si es eliminado, se lleva a otro jugador con él.',
  rulesVoleurDesc: 'Al principio, elige unirse a Civiles o Undercovers y descubre su palabra.',
  premium: 'Premium',
  upgradeTitle: 'Desbloquea todas las palabras',
  upgradeDesc: 'Accede a más de 1000 parejas de palabras en todas las categorías e idiomas.',
  freeVersion: 'Versión Gratuita',
  freeVersionDesc: 'parejas de palabras fijas',
  partyPass: 'Pase de Fiesta (24h)',
  partyPassDesc: 'Desbloquea todas las palabras por una noche',
  partyPassPrice: '0,99 €',
  lifetime: 'Acceso Ilimitado de por vida',
  lifetimeDesc: 'Todas las palabras + futuras actualizaciones',
  lifetimePrice: '2,99 €',
  unlockAll: 'Desbloquear todo',
  buyNow: 'Comprar',
  restorePurchase: 'Restaurar compra',
  premiumActive: 'Premium Activo',
  premiumActiveDesc: 'Tienes acceso a todas las palabras',
  premiumBanner: 'Mejora a Premium para más de 1000 palabras',
  lockedCategory: 'Categoría bloqueada',
  lockedWords: 'Palabras bloqueadas',
  angeWinMsg: '¡El Ángel fue eliminado en la primera ronda y gana la partida!',
  civilsWinMsg: 'Todos los Undercovers han sido eliminados. ¡Los Civiles ganan!',
  undercoverWinMsg: 'Los Undercovers son tantos como los Civiles. ¡Toman el control y ganan!',
  mrWhiteWinMsg: 'adivinó la palabra de los Civiles y ¡gana la partida!',
  mrGreenWinMsg: 'adivinó la palabra de los Civiles y ¡gana la partida!',
  footerTagline: 'El secreto de una gran noche? Compartir y reír.',
  footerCopyright: 'Undercover',
  language: 'Idioma',
  errorNeedCivil: '¡Debe haber al menos un Civil! Reduce los roles especiales o añade jugadores.',
  errorNeedCategory: 'Por favor, selecciona al menos una categoría.',
  loading: 'Cargando...',
  purchaseError: 'El pago ha fallado. Inténtalo de nuevo.',
  back: 'Volver',
};

const de: Translation = {
  ...en,
  tagline: 'Das ultimative Party-Spiel',
  rules: 'Regeln',
  close: 'Schließen',
  gotIt: 'Verstanden',
  players: 'Spieler',
  addPlayer: 'Spieler hinzufügen',
  categories: 'Wort-Kategorien',
  settingsRoles: 'Einstellungen & Rollen',
  blindMode: 'Blind-Modus',
  blindModeDesc: 'Civil- und Undercover-Rollen werden nicht gezeigt, nur das Wort',
  undercoverCount: 'Anzahl Undercover',
  startGame: 'Spiel starten',
  roleAnge: 'Engel',
  roleVoleur: 'Dieb',
  roleChasseur: 'Jäger',
  roleVoyante: 'Seherin',
  passDeviceTo: 'Gerät weitergeben an',
  iAm: 'Ich bin',
  yourRole: 'Deine Rolle ist',
  yourSecretWord: 'Dein geheimes Wort:',
  theTheme: 'Das Thema ist:',
  mrWhiteNoWord: 'Du hast kein Wort. Versuche, das Wort der anderen zu erraten und unterzutauchen!',
  chooseSide: 'Wähle deine Seite:',
  sideCivils: 'Zivilisten',
  sideUndercovers: 'Undercovers',
  choosePlayerToScan: 'Wähle einen Spieler zum Untersuchen:',
  validate: 'Bestätigen',
  hideAndNext: 'Verbergen und Weiter',
  hideAndPass: 'Verstanden, verbergen',
  voyanteVision: 'Vision der Seherin',
  roleOf: 'Rolle von',
  voleurYourWord: 'Dein geheimes Wort',
  voleurAsWord: 'Als Dieb ist dein Wort:',
  civilOrUndercover: 'Zivilist oder Undercover',
  round: 'Runde',
  turnInstructions: 'Diskutiert, gebt reihum ein Wort, dann stimmt ab, um einen verdächtigen Spieler zu eliminieren.',
  firstToSpeak: 'Der erste Spieler, der spricht, ist:',
  alivePlayers: 'Lebende Spieler',
  eliminate: 'Eliminieren',
  lastChance: 'Letzte Chance!',
  mrWhiteGuessPrompt: 'Wenn du das Wort der Zivilisten errätst, gewinnst du!',
  guessCivilWord: 'Wort der Zivilisten',
  tryLuck: 'Glück versuchen',
  iDontKnow: 'Ich weiß nicht',
  chasseurAction: 'Aktion des Jägers!',
  chasseurPrompt: 'Vor dem Sterben kann er einen anderen Spieler mitnehmen.',
  shootAndDie: 'Schießen und Sterben',
  gameOver: 'Spielende',
  scores: 'Aktuelle Punkte',
  points: 'Pkt',
  civilWord: 'Wort der Zivilisten',
  undercoverWord: 'Wort der Undercovers',
  roleReveal: 'Rollenaufdeckung',
  playAgain: 'Nochmal spielen',
  sameSettings: 'Wiederholen (Gleiche Einstellungen)',
  samePlayers: 'Rollen ändern (Gleiche Spieler)',
  fullReset: 'Neues Spiel',
  rulesGoal: 'Ziel',
  rulesGoalCivils: 'Die Zivilisten müssen alle Undercovers identifizieren und eliminieren.',
  rulesGoalUndercovers: 'Die Undercovers müssen überleben, bis sie so zahlreich sind wie die Zivilisten.',
  rulesRolesTitle: 'Rollen',
  rulesCivilDesc: 'Erhält das Hauptwort. Ziel ist es, den Undercover zu entlarven.',
  rulesUndercoverDesc: 'Erhält ein leicht abweichendes Wort. Muss sich tarben, um nicht aufzufallen.',
  rulesMrWhiteDesc: 'Erhält kein Wort. Bei Eliminierung eine letzte Chance, das Wort zu erraten.',
  rulesMrGreenDesc: 'Erhält kein Wort, aber kennt das Thema. Kann durch Erraten gewinnen.',
  rulesAngeDesc: 'Spielt mit Zivilisten, aber wenn in Runde 1 eliminiert, gewinnt er sofort.',
  rulesVoyanteDesc: 'Spielt mit Zivilisten. Kann zu Beginn die Rolle eines Spielers sehen.',
  rulesChasseurDesc: 'Spielt mit Zivilisten. Nimmt bei Eliminierung einen anderen Spieler mit.',
  rulesVoleurDesc: 'Wählt zu Beginn die Seite und erfährt sein Wort entsprechend.',
  premium: 'Premium',
  upgradeTitle: 'Alle Wörter freischalten',
  upgradeDesc: 'Zugriff auf über 1000 Wortpaare in allen Kategorien und Sprachen.',
  freeVersion: 'Kostenlose Version',
  freeVersionDesc: 'feste Wortpaare',
  partyPass: 'Party-Pass (24h)',
  partyPassDesc: 'Alle Wörter für einen Abend freischalten',
  partyPassPrice: '0,99 €',
  lifetime: 'Lebenslanger Zugang',
  lifetimeDesc: 'Alle Wörter + zukünftige Updates',
  lifetimePrice: '2,99 €',
  unlockAll: 'Alles freischalten',
  buyNow: 'Kaufen',
  restorePurchase: 'Kauf wiederherstellen',
  premiumActive: 'Premium Aktiv',
  premiumActiveDesc: 'Du hast Zugriff auf alle Wörter',
  premiumBanner: 'Upgrade auf Premium für über 1000 Wörter',
  lockedCategory: 'Gesperrte Kategorie',
  lockedWords: 'Gesperrte Wörter',
  angeWinMsg: 'Der Engel wurde in Runde 1 eliminiert und gewinnt!',
  civilsWinMsg: 'Alle Undercovers wurden eliminiert. Zivilisten gewinnen!',
  undercoverWinMsg: 'Undercovers sind so zahlreich wie Zivilisten. Sie übernehmen die Kontrolle!',
  mrWhiteWinMsg: 'hat das Wort der Zivilisten erraten und gewinnt!',
  mrGreenWinMsg: 'hat das Wort der Zivilisten erraten und gewinnt!',
  footerTagline: 'Das Geheimnis eines tollen Abends? Teilen und Lachen.',
  footerCopyright: 'Undercover',
  language: 'Sprache',
  errorNeedCivil: 'Es muss mindestens ein Zivilist sein! Reduziere Spezialrollen oder füge Spieler hinzu.',
  errorNeedCategory: 'Bitte wähle mindestens eine Kategorie.',
  loading: 'Laden...',
  purchaseError: 'Zahlung fehlgeschlagen. Bitte erneut versuchen.',
  back: 'Zurück',
};

const it: Translation = {
  ...en,
  tagline: 'Il gioco di festa per eccellenza',
  rules: 'Regole',
  close: 'Chiudi',
  gotIt: 'Capito',
  players: 'Giocatori',
  addPlayer: 'Aggiungi giocatore',
  categories: 'Categorie di parole',
  settingsRoles: 'Impostazioni & Ruoli',
  blindMode: 'Modalità cieca',
  blindModeDesc: 'I ruoli Civil e Undercover non sono mostrati, solo la parola',
  undercoverCount: 'Numero di Undercover',
  startGame: 'Inizia partita',
  roleAnge: 'Angelo',
  roleVoleur: 'Ladro',
  roleChasseur: 'Cacciatore',
  roleVoyante: 'Veggente',
  passDeviceTo: 'Passa il dispositivo a',
  iAm: 'Sono',
  yourRole: 'Il tuo ruolo è',
  yourSecretWord: 'La tua parola segreta:',
  theTheme: 'Il tema è:',
  mrWhiteNoWord: 'Non hai parola. Cerca di indovinare quella degli altri e confonditi!',
  chooseSide: 'Scegli la tua fazione:',
  sideCivils: 'Civili',
  sideUndercovers: 'Undercover',
  choosePlayerToScan: 'Scegli un giocatore da sondare:',
  validate: 'Conferma',
  hideAndNext: 'Nascondi e Avanti',
  hideAndPass: 'Capito, nascondi',
  voyanteVision: 'Visione della Veggente',
  roleOf: 'Ruolo di',
  voleurYourWord: 'La tua parola segreta',
  voleurAsWord: 'Come Ladro, la tua parola è:',
  civilOrUndercover: 'Civile o Undercover',
  round: 'Turno',
  turnInstructions: 'Discutete, date una parola a turno, poi votate per eliminare un giocatore sospetto.',
  firstToSpeak: 'Il primo giocatore a parlare è:',
  alivePlayers: 'Giocatori vivi',
  eliminate: 'Elimina',
  lastChance: 'Ultima possibilità!',
  mrWhiteGuessPrompt: 'Se indovini la parola dei Civili, vinci la partita!',
  guessCivilWord: 'Parola dei civili',
  tryLuck: 'Tentare la sorte',
  iDontKnow: 'Non lo so',
  chasseurAction: 'Azione del Cacciatore!',
  chasseurPrompt: 'Prima di morire, può eliminare un altro giocatore.',
  shootAndDie: 'Spara e Muori',
  gameOver: 'Fine partita',
  scores: 'Punteggi attuali',
  points: 'pt',
  civilWord: 'Parola dei Civili',
  undercoverWord: 'Parola degli Undercover',
  roleReveal: 'Rivelazione dei ruoli',
  playAgain: 'Gioca ancora',
  sameSettings: 'Rigioca (Stesse impostazioni)',
  samePlayers: 'Cambia ruoli (Stessi giocatori)',
  fullReset: 'Nuova partita',
  rulesGoal: 'Obiettivo',
  rulesGoalCivils: 'I Civili devono identificare ed eliminare tutti gli Undercover.',
  rulesGoalUndercovers: 'Gli Undercover devono sopravvivere fino a essere numerosi quanto i Civili.',
  rulesRolesTitle: 'Ruoli',
  rulesCivilDesc: 'Riceve la parola principale. Scoprire l\'Undercover senza farsi eliminare.',
  rulesUndercoverDesc: 'Riceve una parola leggermente diversa. Deve confondersi per non farsi scoprire.',
  rulesMrWhiteDesc: 'Non riceve parola. Se eliminato, un\'ultima chance per indovinare e vincere.',
  rulesMrGreenDesc: 'Non riceve parola ma conosce il tema. Può vincere indovinando.',
  rulesAngeDesc: 'Gioca con i civili, ma se eliminato al primo turno vince subito.',
  rulesVoyanteDesc: 'Gioca con i civili. Può vedere il ruolo di un giocatore all\'inizio.',
  rulesChasseurDesc: 'Gioca con i civili. Se eliminato, porta con sé un altro giocatore.',
  rulesVoleurDesc: 'All\'inizio sceglie la fazione e scopre la parola di conseguenza.',
  premium: 'Premium',
  upgradeTitle: 'Sblocca tutte le parole',
  upgradeDesc: 'Accedi a più di 1000 coppie di parole in tutte le categorie e lingue.',
  freeVersion: 'Versione Gratuita',
  freeVersionDesc: 'coppie di parole fisse',
  partyPass: 'Pass Festa (24h)',
  partyPassDesc: 'Sblocca tutte le parole per una serata',
  partyPassPrice: '0,99 €',
  lifetime: 'Accesso Illimitato a vita',
  lifetimeDesc: 'Tutte le parole + aggiornamenti futuri',
  lifetimePrice: '2,99 €',
  unlockAll: 'Sblocca tutto',
  buyNow: 'Acquista',
  restorePurchase: 'Ripristina acquisto',
  premiumActive: 'Premium Attivo',
  premiumActiveDesc: 'Hai accesso a tutte le parole',
  premiumBanner: 'Passa a Premium per più di 1000 parole',
  lockedCategory: 'Categoria bloccata',
  lockedWords: 'Parole bloccate',
  angeWinMsg: 'L\'Angelo è stato eliminato al primo turno e vince la partita!',
  civilsWinMsg: 'Tutti gli Undercover sono stati eliminati. I Civili vincono!',
  undercoverWinMsg: 'Gli Undercover sono numerosi quanto i Civili. Prendono il controllo e vincono!',
  mrWhiteWinMsg: 'ha indovinato la parola dei Civili e vince la partita!',
  mrGreenWinMsg: 'ha indovinato la parola dei Civili e vince la partita!',
  footerTagline: 'Il segreto di una bella serata? Condivisione e risate.',
  footerCopyright: 'Undercover',
  language: 'Lingua',
  errorNeedCivil: 'Deve esserci almeno un Civile! Riduci i ruoli speciali o aggiungi giocatori.',
  errorNeedCategory: 'Seleziona almeno una categoria.',
  loading: 'Caricamento...',
  purchaseError: 'Pagamento fallito. Riprova.',
  back: 'Indietro',
};

const pt: Translation = {
  ...en,
  tagline: 'O jogo de festa por excelência',
  rules: 'Regras',
  close: 'Fechar',
  gotIt: 'Entendi',
  players: 'Jogadores',
  addPlayer: 'Adicionar jogador',
  categories: 'Categorias de palavras',
  settingsRoles: 'Definições & Papéis',
  blindMode: 'Modo cego',
  blindModeDesc: 'Os papéis Civil e Undercover não são mostrados, apenas a palavra',
  undercoverCount: 'Número de Undercovers',
  startGame: 'Iniciar jogo',
  roleAnge: 'Anjo',
  roleVoleur: 'Ladrão',
  roleChasseur: 'Caçador',
  roleVoyante: 'Vidente',
  passDeviceTo: 'Passa o dispositivo a',
  iAm: 'Eu sou',
  yourRole: 'O teu papel é',
  yourSecretWord: 'A tua palavra secreta:',
  theTheme: 'O tema é:',
  mrWhiteNoWord: 'Não tens palavra. Tenta adivinhar a dos outros e confunde-te!',
  chooseSide: 'Escolhe o teu lado:',
  sideCivils: 'Civis',
  sideUndercovers: 'Undercovers',
  choosePlayerToScan: 'Escolhe um jogador para analisar:',
  validate: 'Confirmar',
  hideAndNext: 'Esconder e Seguinte',
  hideAndPass: 'Entendi, esconder',
  voyanteVision: 'Visão da Vidente',
  roleOf: 'Papel de',
  voleurYourWord: 'A tua palavra secreta',
  voleurAsWord: 'Como Ladrão, a tua palavra é:',
  civilOrUndercover: 'Civil ou Undercover',
  round: 'Ronda',
  turnInstructions: 'Discutam, deem uma palavra por turnos, depois votem para eliminar um jogador suspeito.',
  firstToSpeak: 'O primeiro jogador a falar é:',
  alivePlayers: 'Jogadores vivos',
  eliminate: 'Eliminar',
  lastChance: 'Última oportunidade!',
  mrWhiteGuessPrompt: 'Se adivinhares a palavra dos Civis, ganhas o jogo!',
  guessCivilWord: 'Palavra dos civis',
  tryLuck: 'Tentar a sorte',
  iDontKnow: 'Não sei',
  chasseurAction: 'Ação do Caçador!',
  chasseurPrompt: 'Antes de morrer, pode eliminar outro jogador.',
  shootAndDie: 'Disparar e Morrer',
  gameOver: 'Fim do jogo',
  scores: 'Pontuações atuais',
  points: 'pts',
  civilWord: 'Palavra dos Civis',
  undercoverWord: 'Palavra dos Undercovers',
  roleReveal: 'Revelação de papéis',
  playAgain: 'Jogar novamente',
  sameSettings: 'Repetir (Mesmas definições)',
  samePlayers: 'Mudar papéis (Mesmos jogadores)',
  fullReset: 'Novo jogo',
  rulesGoal: 'Objetivo',
  rulesGoalCivils: 'Os Civis devem identificar e eliminar todos os Undercovers.',
  rulesGoalUndercovers: 'Os Undercovers devem sobreviver até serem tão numerosos quanto os Civis.',
  rulesRolesTitle: 'Papéis',
  rulesCivilDesc: 'Recebe a palavra principal. Objetivo: desmascarar o Undercover.',
  rulesUndercoverDesc: 'Recebe uma palavra ligeiramente diferente. Deve confundir-se para não ser detetado.',
  rulesMrWhiteDesc: 'Não recebe palavra. Se eliminado, uma última hipótese de adivinhar e vencer.',
  rulesMrGreenDesc: 'Não recebe palavra mas conhece o tema. Pode vencer adivinhando.',
  rulesAngeDesc: 'Joga com os civis, mas se eliminado na primeira ronda, ganha logo.',
  rulesVoyanteDesc: 'Joga com os civis. Pode ver o papel de um jogador no início.',
  rulesChasseurDesc: 'Joga com os civis. Se eliminado, leva outro jogador consigo.',
  rulesVoleurDesc: 'No início escolhe o lado e descobre a palavra em conformidade.',
  premium: 'Premium',
  upgradeTitle: 'Desbloqueia todas as palavras',
  upgradeDesc: 'Acede a mais de 1000 pares de palavras em todas as categorias e idiomas.',
  freeVersion: 'Versão Gratuita',
  freeVersionDesc: 'pares de palavras fixos',
  partyPass: 'Passe de Festa (24h)',
  partyPassDesc: 'Desbloqueia todas as palavras por uma noite',
  partyPassPrice: '0,99 €',
  lifetime: 'Acesso Ilimitado vitalício',
  lifetimeDesc: 'Todas as palavras + atualizações futuras',
  lifetimePrice: '2,99 €',
  unlockAll: 'Desbloquear tudo',
  buyNow: 'Comprar',
  restorePurchase: 'Restaurar compra',
  premiumActive: 'Premium Ativo',
  premiumActiveDesc: 'Tens acesso a todas as palavras',
  premiumBanner: 'Atualiza para Premium para mais de 1000 palavras',
  lockedCategory: 'Categoria bloqueada',
  lockedWords: 'Palavras bloqueadas',
  angeWinMsg: 'O Anjo foi eliminado na primeira ronda e ganha o jogo!',
  civilsWinMsg: 'Todos os Undercovers foram eliminados. Os Civis ganham!',
  undercoverWinMsg: 'Os Undercovers são tão numerosos quanto os Civis. Tomam o controlo e ganham!',
  mrWhiteWinMsg: 'adivinhou a palavra dos Civis e ganha o jogo!',
  mrGreenWinMsg: 'adivinhou a palavra dos Civis e ganha o jogo!',
  footerTagline: 'O segredo de uma boa noite? Partilha e risos.',
  footerCopyright: 'Undercover',
  language: 'Idioma',
  errorNeedCivil: 'Deve haver pelo menos um Civil! Reduz papéis especiais ou adiciona jogadores.',
  errorNeedCategory: 'Seleciona pelo menos uma categoria.',
  loading: 'A carregar...',
  purchaseError: 'O pagamento falhou. Tente novamente.',
  back: 'Voltar',
};

export const TRANSLATIONS: Record<LangCode, Translation> = { fr, en, es, de, it, pt };

export function getTranslation(lang: LangCode): Translation {
  return TRANSLATIONS[lang] || TRANSLATIONS.fr;
}

export const CATEGORY_NAMES: Record<LangCode, Record<string, string>> = {
  fr: { nature: 'Nature', quotidien: 'Quotidien', nourriture: 'Nourriture', voyage: 'Voyage', marques: 'Marques', cinema: 'Cinéma' },
  en: { nature: 'Nature', quotidien: 'Everyday', nourriture: 'Food', voyage: 'Travel', marques: 'Brands', cinema: 'Cinema' },
  es: { nature: 'Naturaleza', quotidien: 'Día a día', nourriture: 'Comida', voyage: 'Viaje', marques: 'Marcas', cinema: 'Cine' },
  de: { nature: 'Natur', quotidien: 'Alltag', nourriture: 'Essen', voyage: 'Reise', marques: 'Marken', cinema: 'Kino' },
  it: { nature: 'Natura', quotidien: 'Quotidiano', nourriture: 'Cibo', voyage: 'Viaggio', marques: 'Marchi', cinema: 'Cinema' },
  pt: { nature: 'Natureza', quotidien: 'Dia a dia', nourriture: 'Comida', voyage: 'Viagem', marques: 'Marcas', cinema: 'Cinema' },
};

export function roleLabel(role: RoleId, t: Translation): string {
  const map: Record<RoleId, string> = {
    CIVIL: t.roleCivil,
    UNDERCOVER: t.roleUndercover,
    MR_WHITE: t.roleMrWhite,
    MR_GREEN: t.roleMrGreen,
    ANGE: t.roleAnge,
    VOLEUR: t.roleVoleur,
    CHASSEUR: t.roleChasseur,
    VOYANTE: t.roleVoyante,
  };
  return map[role];
}
