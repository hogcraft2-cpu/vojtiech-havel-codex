/*
 * Zawartość kroniki. Każda pozycja to dokładnie JEDNA karta.
 * Możesz zastąpić strony testowe własnymi tekstami.
 * Rodzaje: title, text, crest, map, drawing, blank.
 */
window.CODEX_PAGES = [
  {type:'title', title:'Księga Vojtiecha Havela', subtitle:'Anno Domini MCD', text:'Tutaj rozpocznie się kronika życia, czynów i dziedzictwa Vojtiecha Havela.'},
  {type:'crest', title:'Herb rodu Havela', note:'Kruk na srebrzystym polu'},
  {type:'text',title:'Z Přítok ku ziemiom Kuttenbergu',initial:'V',paragraphs:[
    'ojtiech Havel wywodzi się z Přítok, gdzie przez lata wspierał swych druhów i poprzednich panów w licznych bojach.',
    'Ta próbna karta pokazuje, jak będzie wyglądał dłuższy tekst kroniki zapisany na pergaminie. Ostateczną historię uzupełnimy później.'
  ],footer:'Karta demonstracyjna — nie jest gotową kroniką'},
  {type:'map', title:'Ziemie i grody', note:'Poglądowa mapa próbna — do zastąpienia mapą włości'},
  {type:'text',title:'Nadanie ziem',initial:'K',paragraphs:[
    'ról Czech, zważywszy na odwagę i wierność rycerską, mógł powierzyć dzielnemu wojowi pieczę nad ziemią i zamkiem.',
    'Tu znajdzie się przyszły zapis nadania Suchodołu, jego wsi i przyległych ziem, a także relacja z uroczystego przyjęcia nowych obowiązków.'
  ],footer:'Tekst testowy — historia do opracowania'},
  {type:'drawing',title:'Miecz i słowo', note:'Znak odwagi i sprawiedliwego rozstrzygania sporów'},
  {type:'blank'}, {type:'blank'}, {type:'blank'}, {type:'blank'},
  {type:'blank'}, {type:'blank'}, {type:'blank'}, {type:'blank'},
  {type:'blank'}, {type:'blank'}
];

window.CODEX_CHAPTERS = [
 {title:'Karta tytułowa i herb',spread:0},
 {title:'Pochodzenie oraz mapa',spread:1},
 {title:'Nadanie ziem i rycerskie zasługi',spread:2},
 {title:'Puste karty do uzupełnienia',spread:3}
];
