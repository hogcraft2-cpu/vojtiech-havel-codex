# Vojtiech Havel — Kronika wojaka

Interaktywna, trójwymiarowa księga w estetyce realistycznego średniowiecza, osadzona fabularnie w okolicach Přítok i Kuttenbergu na początku XV wieku. Projekt jest osobną stroną GitHub Pages — bez zależności od innych repozytoriów.

**Strona:** https://hogcraft2-cpu.github.io/vojtiech-havel-codex/

## Opowieść

Kronika opowiada o Vojtiechu, chłopcu z rodziny utrzymującej się z przewozu towarów i opieki nad końmi. Wykazuje od wczesnych lat talent do walki, szkoli się pod okiem starego kowala i byłego zbrojnego Víta, przekonuje się jednak, że prawdziwa przemoc różni się od ćwiczeń. Następnie poznaje Jana Švarca — najmłodszego syna Heinricha, który po śmierci ojca opuścił rodowe włości w ziemi opawskiej — i zaczyna trudną służbę. Jan jest porywczy, dumny, nie zawsze moralny, ale umie walczyć i potrafi okazać litość.

**To opowieść otwarta:** ostatnia scena jest początkiem kolejnego zlecenia Jana i Vojtiecha. Nie dopisywano zakończenia przyszłych losów postaci.

## Funkcje

- 30 kart i osiem rozdziałów (ostatnia karta stanowi skórzaną tylną okładkę).
- Animowana okładka, dwie duże strony wewnątrz i trójwymiarowe przewracanie.
- Oryginalny herb Havela, malarskie sceny z Přítok, szermierki, koni i spotkania z Janem.
- Animowane tło średniowiecznej pracowni, świeca i drobiny kurzu.
- Syntetyzowany dźwięk przewracania stron; przycisk ♪ włącza/wyłącza audio.
- Spis treści, sterowanie strzałkami i przyciskami, zapis ostatniej strony, pełen ekran.

## Dopisywanie dalszych wydarzeń

Edytuj `pages.js`. Każdy obiekt `window.CODEX_PAGES` to **jedna karta księgi**. Dwie kolejne karty to jedna rozkładówka. Kolejny rozdział należy dodać **przed** końcową kartą typu `backcover`. Liczba kart musi pozostać parzysta — w razie potrzeby dodaj kartę typu `blank`.

Spis treści znajduje się w `window.CODEX_CHAPTERS`. Pole `spread` to liczony od zera numer rozkładówki. Rozdziały mogą korzystać z `type: "text"`, a sceny z `type: "illustration"` wraz z `scene: "village" | "training" | "stables" | "knight"`. Ozdobne obrazy czterech scen znajdują się w `assets/story-scenes.webp`.

Silnik stron, animacje i audio są w `app.js`, wygląd w `styles.css`, a układ strony w `index.html`. Projekt działa bez instalacji bibliotek JavaScript. Wystarczy otworzyć `index.html` lub wejść na stronę GitHub Pages.

## Publikacja

Workflow `.github/workflows/bootstrap.yml` automatycznie kontroluje składnię JavaScript, podstawowe pliki i ilustracje, po czym publikuje `main` na GitHub Pages.

**Ważne:** bohaterowie, wydarzenia oraz sceny są autorską fabułą RP. Oprawa graficzna nawiązuje do realistycznego średniowiecza znanego z gier pokroju Kingdom Come: Deliverance II, ale nie korzysta z materiałów wyciętych z tej gry.
