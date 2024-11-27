# Dungeonborne

Dungeon of Insanity je **gamebook-style dungeon RPG**, kde se hráč-rytíř vydává do různých dungeonů (3–4) podle obtížnosti. Každý dungeon je generován předem a hráč si klade za cíl projít jej celý a získat **peníze** a **slávu**. Hlavním cílem hry je dosáhnout co nejvyšší slávy.

---

## Počátek hry

Hra začíná **monologem**, který vysvětluje:
- Co se stalo.
- Proč je hráč tam, kde je.
- Jaký je jeho cíl.

Po úvodním dialogu se hráč objeví ve **městě**, kde obdrží svůj první úkol:
- **Přinést předmět** získaný po zabití monstra.
- (Poznámka: Hráč může být nucen projít dungeon vícekrát.)

Hra postupně pokračuje úkoly a příběhovou linkou.

---

## Technická část hry

### Generování dungeonů
- Každý dungeon je vytvořen před vstupem hráče.
- Při pohybu hráče mezi místnostmi se rozhoduje pevně, jaké místnosti budou následovat.
- Funkce pro generování dungeonu zajišťuje strukturované větvení a křižovatky.

### Pool map
- Místnosti jsou spravovány v **"poolu"**, odkud jsou náhodně vybírány během generace světa.

---

## Herní mechaniky

### Itemy a inventář
- **Město**:
  - Obchod, kde lze nakupovat/vylepšovat vybavení.
- **Základní vybavení**:
  - Zbraně (např. obouruční meče, štíty).
  - Brnění.
  - Doplňky (např. léčivé/dmg elixíry).
- **Inventář**:
  - Pole pro vybavení a další předměty, které hráč sbírá během hry.

### Nepřátelé
- **Fantasy stvoření**:
  - Náhodně generováni v závislosti na typu místnosti.
- **Statistiky**:
  - Pevně dané hodnoty HP a DMG.
- **Odměny**:
  - Peníze, předměty nebo vybavení.
- **Mechanika boje**:
  - Hráč uděluje poškození podle zbraní, které má vybavené.
  - Nepřátelé mají pevné nebo náhodné útoky. Brnění hráče neguje část poškození.

---

## Struktura dungeonů

### Místnosti
- Každá místnost obsahuje:
  - **Popis** – atmosférický text s příběhovým pozadím.
  - **Speciální prvky** – například:
    - Poklad (truhly).
    - Zamčené dveře (vyžadující klíč).
    - Křižovatky (více cest dál).

---

## Cíle hry
- Prozkoumat dungeony.
- Porazit nepřátele.
- Sbírat předměty, peníze a zvyšovat slávu.
- Stát se nejslavnějším rytířem všech dob!

---

