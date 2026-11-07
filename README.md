# Vojtiech Havel — Kodeks Iluminowany

Interaktywna księga fabularna w estetyce iluminowanych kronik z początku XV wieku. Projekt jest całkowicie samodzielny i nie zmienia repozytorium `sacrascript-medieval`.

**Strona:** https://hogcraft2-cpu.github.io/vojtiech-havel-codex/

## Nowy wygląd

- Otwierana, gruba skórzana oprawa, złote zdobienia i herb z krukiem.
- Rozłożona księga z dwoma pełnowymiarowymi pergaminowymi stronami.
- Gotyckie nagłówki, czerwono-niebieskie iluminowane inicjały, ramy, filigrany, złote linie i ryciny wplecione pomiędzy tekst.
- Cztery malarskie sceny z poprzedniej wizualizacji przeniesione do osobnej tekstury `assets/manuscript-plates.webp` (4 pola 2×2): wieś, szermierka, stajnie i spotkanie z Janem.
- Drewniane biurko, ruchomy dym świec, migoczące światło, unoszący się pył, powolny ruch scenerii.
- Dźwięk przewracania stron ♪; można go wyłączyć.
- Przycisk **Czytaj** otwiera powiększony, przewijany widok tekstu, wygodny na telefonie.
- Spis treści, klawisze ← →, tryb pełnoekranowy, **automatyczny start od pierwszej rozkładówki przy każdym otwarciu**, prawdziwa tylna oprawa.

## Kronika

Opowieść zaczyna się od dzieciństwa Vojtiecha w Přítokach około 1386 roku, szkolenia pod okiem kowala Víta, pierwszych doświadczeń szermierczych oraz spotkania z Janem Švarcem. Kolejne rozdziały obejmują służbę i dojrzewanie Vojtiecha do **20. roku życia (około 1406)**, kiedy nadal pozostaje giermkiem. Historia jest **otwarta** — ostatnia scena prowadzi do kolejnej wyprawy.

Rok 1400 na okładce jest stylizowanym symbolem epoki; narracja obejmuje kilka lat przed nim i po nim.

## Edycja treści

`pages.js` zawiera `window.CODEX_PAGES`; każda pozycja to jedna karta, dwie pozycje to rozkładówka. Dostępne rodzaje to `title`, `crest`, `illustration`, `text`, `map`, `drawing`, `blank`, `backcover`. Kolejne teksty dopisuj **przed** ostatnimi kartami `blank` i `backcover`. Liczba stron musi być parzysta.

Nazwy i numery rozdziałów są w `window.CODEX_CHAPTERS`. Funkcja `renderPage` w `app.js` zamienia treść na edytowalny HTML. Podstawowy wygląd jest w `styles.css`, a nowa, powiększona oprawa w `codex-large.css` (ładowanym jako ostatni). Ornamenty są w `assets/manuscript-frame.svg`, a sceny malarskie w `assets/manuscript-plates.webp`. Responsywna wielkość księgi i nawigacja znajdują się w `app.js`.

## Jak zaczyna się czytanie

Każde nowe wejście na stronę i każde ponowne otwarcie okładki zaczyna się od **kart 1–2**. Nie zapisujemy ostatnio czytanej rozkładówki w przeglądarce. W trakcie czytania można swobodnie przechodzić przyciskami, klawiaturą i spisem treści. Zapamiętywana jest tylko osobista preferencja włączenia dźwięku kartek.

## Publikacja

Zmiany w gałęzi `main` publikują się automatycznie na GitHub Pages przez `.github/workflows/bootstrap.yml`.

**Uwaga:** To fabularyzowana historia postaci RP; ilustracje i projekt graficzny są autorską interpretacją historycznego klimatu, a nie zasobami wyciętymi z gry.
