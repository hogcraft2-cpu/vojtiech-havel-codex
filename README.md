# Vojtiech Havel — kronika otwarta

Interaktywna książka o młodym Vojciechu Havelu pochodzącym z Přítok, około roku 1400. To **powieść fabularna do RP** (nie opracowanie historyczne). Jej pierwsza część opowiada o dzieciństwie, dorastaniu, pierwszym spotkaniu z rycerzem Janem Švarcem z ziem opawskich oraz o początkach służby giermka.

## Przeczytaj

https://hogcraft2-cpu.github.io/vojtiech-havel-codex/

## Opublikowana zawartość

- I. Pod strzechą w Přítokach — dzieciństwo i rodzice Mikuláš i Dorota.
- II. Nauka strachu — podróże z ojcem, napad i pierwsze ćwiczenia.
- III. Miasto srebra — Kuttenberg, życie na trakcie, zapowiedź rodziny Švarców.
- IV. Człowiek z Opawy — pojawienie się Jana Švarca, początek znajomości.
- V. Cena służby — ciężkie obowiązki, treningi i wątpliwa moralność Jana.
- VI. Giermek — powierzenie Vojciechowi oficjalnych obowiązków.
- VII. Pierwszy szlak — pierwsza eskorta i nowa tajemnicza misja.

Rozdział VII celowo nie zawiera zamkniętego zakończenia. Ostatnie strony są puste, czekają na kolejny fragment opowieści rozwijany wraz z wydarzeniami na serwerze RP.

Założenia fabularne: rodzice Vojciecha, szczegóły dzieciństwa i pierwszej służby zostały dopisane jako fikcja literacka, natomiast Jan Švarc zachowuje podane przez gracza pochodzenie i charakter (najmłodszy syn Heinricha, odejście po śmierci ojca, służba za pieniądze, porywczość, nieufność i zasady moralne).

## Ilustracje

- `assets/vojciech-childhood.svg` — miniatura dzieciństwa w stajni.
- `assets/vojciech-squire.svg` — miniatura pierwszych nauk u Jana.
- `assets/crest.webp` — herb przesłany przez użytkownika.
- `assets/cover.webp` — dotychczasowa skórzana okładka księgi.
- `assets/paper.webp` i `assets/study.webp` — pergamin i tło pracowni.

Ilustracje są artystyczną stylizacją na miniatury rękopiśmienne, nie autentycznymi zabytkami z roku 1400.

## Dodawanie dalszych rozdziałów

Treść zawiera plik `pages.js`. Tablica `window.CODEX_PAGES` to pojedyncze strony, a `window.CODEX_CHAPTERS` — odnośniki w spisie treści. Nową historię dopisuje się zamiast kolejnych wpisów typu `blank`. Zachowaj parzystą liczbę stron: każda para tworzy jeden rozkład książki. Wpis typu `text` przyjmuje `title` i tablicę `paragraphs`, a `illustration` przyjmuje `title`, `src` i `caption`.

Stronę możesz otworzyć lokalnie poprzez `index.html`, bez instalowania bibliotek. `.github/workflows/bootstrap.yml` automatycznie wdraża ją przez GitHub Pages po zmianach na `main`.

Sterowanie: kliknij okładkę, używaj przycisków „Poprzednia” i „Następna”, strzałek klawiatury, spisu treści lub pełnego ekranu.
