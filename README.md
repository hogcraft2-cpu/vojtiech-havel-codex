# Vojtiech Havel — Interaktywna księga (Anno Domini MCD)

Osobny, samodzielny projekt strony internetowej. Nie używa żadnych plików z `sacrascript-medieval` ani zewnętrznych bibliotek JavaScript. Wymaga tylko aktualnej przeglądarki internetowej. Ozdobne czcionki pobierają się z Google Fonts; w trybie offline są zastępowane systemowymi.

## Co jest gotowe?

- Prawidłowy układ: **jedna okładka zamkniętej księgi** i **dokładnie dwie duże strony po otwarciu**.
- Animacja otwierania i zamykania księgi oraz przewracania kart w obie strony (CSS 3D).
- Okładka z napisem `Vojtiech Havel — 1400 rok pański` i krukiem z przesłanego herbu.
- Kilka stron testowych: karta tytułowa, herb, próbne zapiski, mapa, rycina miecza.
- Kolejne puste karty na przyszłą historię.
- Klimatyczne tło pracowni ze stołem, światłem świecy i animowanym pyłem.
- Spis treści, nawigacja klawiaturą, pamięć ostatniego miejsca i pełny ekran.

## Uruchomienie na komputerze

Po rozpakowaniu ZIP-a otwórz **`index.html`** dwuklikiem. Nie trzeba uruchamiać serwera, niczego instalować ani podawać kluczy API.

## Nowe repozytorium na GitHubie (bez ruszania innych projektów)

1. Przejdź do [github.com/new](https://github.com/new).
2. Nazwij nowe repozytorium **`vojtiech-havel-codex`**, ustaw widoczność `Public`, utwórz repozytorium.
3. W widoku nowego repozytorium wybierz **Add file → Upload files**.
4. Prześlij **zawartość** katalogu `vojtiech-havel-codex` (a nie katalog nadrzędny). Ważne, żeby `index.html` znalazł się w katalogu głównym. Prześlij również katalog `assets` i `.github/workflows`.
5. Przejdź do **Settings → Pages** i ustaw **Build and deployment → Source: GitHub Actions**, jeśli nie jest ustawione automatycznie.
6. Zakładka **Actions** pokaże wdrożenie; po udanym zakończeniu strona będzie pod adresem:
   `https://TWOJ_LOGIN.github.io/vojtiech-havel-codex/`

W repozytorium jest gotowy workflow `.github/workflows/pages.yml`; uruchamia wdrożenie po przesłaniu zmian na gałąź `main`.

Jeżeli tworzysz puste repozytorium, można też po prostu przesłać ZIP przez opcję importu w używanym przez siebie kliencie Git (pamiętaj o rozpakowaniu ZIP-a).

## Edytowanie kroniki

Cała zawartość znajduje się w pliku **`pages.js`**. Każdy wpis tablicy `CODEX_PAGES` to dokładnie **jedna strona**, a dwie kolejne strony tworzą rozkładówkę. Dozwolone typy: `title`, `text`, `crest`, `map`, `drawing`, `blank`.

Na początek przygotowano 16 stron. Kolejne rozdziały można dopisać bez zmiany silnika w `app.js`, zachowując parzystą liczbę wpisów. Spis treści edytuje się w tablicy `CODEX_CHAPTERS`.

## Sterowanie

- Kliknięcie okładki lub przycisku **Otwórz księgę** otwiera księgę.
- Kliknięcie prawej strony / przycisk **Następna** / klawisz `→` przewraca do przodu.
- Kliknięcie lewej strony / przycisk **Poprzednia** / klawisz `←` przewraca wstecz.
- Przyciskiem **Zamknij** zamykasz księgę.
- **Spis treści** pozwala przeskakiwać między rozdziałami.
- **⛶** włącza lub wyłącza pełny ekran.

## Struktura

```
index.html
styles.css
app.js
pages.js
assets/
  cover.webp   (tekstura okładki przygotowana z wcześniejszej wizualizacji)
  study.webp   (tło średniowiecznej pracowni z wcześniejszej wizualizacji)
  crest.webp   (oryginalny przesłany herb)
  paper.webp   (tekstura pergaminu)
.github/workflows/pages.yml
.nojekyll
README.md
```

To stylizowana, interaktywna księga 3D oparta na transformacjach CSS — nie pełna symulacja fizyki elastycznego papieru. Strony i okładka poruszają się w trójwymiarowej perspektywie, a treści zachowują swój układ.
