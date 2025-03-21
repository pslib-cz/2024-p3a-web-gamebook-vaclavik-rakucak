# Dungeonborne

**Gamebook-style dungeon RPG**, kde se hráč-rytíř vydává do různých dungeonů (3–4) podle obtížnosti. Každý dungeon je generován předem a hráč si klade za cíl projít jej celý a získat **peníze**. Hlavním cílem hry je dokoncit vsechny questy a posledni dungeon.

---

## Počátek hry

Hra začíná **prologem**, který vysvětluje:
- Co se stalo.
- Proč je hráč tam, kde je.
- Jaký je jeho cíl.

Po úvodním dialogu se hráč objeví ve **městě**, kde obdrží svůj první úkol:
- **Dokončit** první dungeon.
- Nakoupí si vybavení a vezme si quest.

Hra postupně pokračuje úkoly a příběhovou linkou.

---

## Technická část hry

### Generování dungeonů
- Každý dungeon je vytvořen před vstupem hráče.
- Při pohybu hráče mezi místnostmi se rozhoduje pevně, jaké místnosti budou následovat, struktura zahrnuje třídání místností a chodeb.

### Pool map
- Místnosti jsou spravovány v **"poolu"**, odkud jsou náhodně vybírány během generace světa.
- **Typy místností:**
  - místnost s nepřítelem
  - questovým itemem
  - nástrahou
  - truhlou
  - klíčem

---

## Herní mechaniky

### Itemy a inventář
- **Město**:
  - Obchod, kde lze nakupovat vybavení.
- **Vybavení**:
  - Zbraně (např. obouruční meče, sekery, luk).
  - Brnění + štít.
  - Doplňky (např. léčivé elixíry, klíče).
- **Inventář**:
  - Pole pro vybavení a další předměty, které hráč sbírá během hry.

### Nepřátelé
- **Fantasy stvoření**:
  - Náhodně generováni v závislosti na typu místnosti.
- **Statistiky**:
  - Pevně dané hodnoty HP a DMG / armor (neguje příchozí dmg) / štít ( % šance na vyhnutí se dmg).
- **Odměny**:
  - Peníze, předměty nebo vybavení.
- **Mechanika boje**:
  - Hráč uděluje poškození podle zbraní, které má vybavené.
  - Nepřátelé mají pevně dané útoky. Brnění hráče neguje část poškození.

---

## Cíle hry
- Prozkoumat dungeony.
- Porazit nepřátele.
- Sbírat předměty a peníze.
- Stát se nejslavnějším rytířem všech dob!

---
## Odkazy
- Figma: https://www.figma.com/design/b54s3MtwBzVlaA67LxV5FN/Project?node-id=0-1&node-type=canvas&t=rHwrmVZMOWlQkJkR-0
- SharePoint: https://pslib.sharepoint.com/sites/studium/it/web/SitePages/Project-Gamebook.aspx

---
# Příbeh

## Prastarý rituál
Království Eldros bylo kdysi domovem mírumilovných obyvatel, kteří žili v harmonii s přírodou. Tato rovnováha byla udržována díky prastarému artefaktu, **Srdci světa**, který ukrýval nesmírnou magickou sílu. Po tisíciletí byl artefakt nečinný, zapečetěný ve čtyřech tajemných svatyních roztroušených po celé zemi.  

Nyní však kult známý jako **Stíny pravdy** narušil rovnováhu, když se pokusil artefakt probudit a zneužít jeho sílu k vyvolání boha chaosu, známého jako **Malakar**. Rituál selhal, ale rozbil pečeti, a síla Srdce světa začala proudit ven. Z podzemí se vynořily příšery, země se otřásla, a v Eldrosu zavládl chaos.  

Jsi vyvolený strážce, pověřený znovu zapečetěním Srdce světa. Tvůj úkol je jasný: vydej se do čtyř svatyní, znič kultisty a obnov pečeti dříve, než bude pozdě. Na konci cesty tě čeká finální střet s Malakarem, který se snaží projít do světa živých.  

---

## Dungeony a questy 

### Dungeon 1: Jeskyně hlubin  
- **Volání temnoty:** Prozkoumej jeskyně, najdi vůdce kultistů a zjisti, co způsobilo narušení pečetě.  
- **Pátrání po klíči:** Najdi tři fragmenty prastarého klíče ukryté mezi jezery, které otevřou bránu k první pečeti.  
- **Zkáza podzemí:** Poraz monstrózního strážce, který brání první pečeť, a zapečeť první část Srdce světa.  

### Dungeon 2: Les zatracení  
- **Volání duchů:** Vysvoboď uvězněné duchy strážců lesa a získej jejich pomoc k odhalení cesty ke druhé pečeti.  
- **Jedovaté srdce:** Najdi zdroj otravy lesa – obří jedovatý strom ovládaný kultisty – a znič jej.  
- **Duchovní válka:** Otevři portál do spirituálního světa, kde zapečetíš druhou část Srdce světa.  

### Dungeon 3: Síně popela  
- **Plameny vzpoury:** Zabij kultisty, kteří oživují lávové golemy, a ukonči jejich rituál.  
- **Úl ohně:** Najdi a znič magická vajíčka, která plodí ohnivé démony.  
- **Strážce ohně:** Bojuj proti obrovskému ohnivému titánovi, který chrání třetí pečeť.  

### Dungeon 4: Chrám věčnosti  
- **Časová past:** Najdi způsob, jak deaktivovat pasti, které manipulují s tokem času.  
- **Srdce iluzí:** Překonej bludiště klamu, kde nevíš, co je skutečné, a najdi cestu k poslední pečeti.  
- **Zkáza kultu:** Poraz vůdce kultistů, kteří chrám ovládají, a obnov poslední pečeť.  

### Finální Dungeon: Trůn chaosu  
- **Finální střet:** Bojuj s Malakarem, jenž se snaží použít zbytky Srdce světa k přechodu do světa živých. Použij vše, co jsi získal, aby ses mu postavil a definitivně zničil jeho vliv.  

---

## Postavy zadávající questy  

### Eryndor, Strážce svatyní  
- Moudrý starý mág, který strávil život studiem Srdce světa. Pomáhá ti pochopit legendy a naviguje tě mezi jednotlivými svatyněmi.  
- **Osobnost:** Klidný, ale někdy tajemný. Zdá se, že něco skrývá.  

### Kaela, Lovkyně kultistů  
- Bývalá členka kultu, která se odvrátila od temnoty poté, co viděla zkázu, kterou její bratři způsobili. Nabízí vhled do plánů kultistů.  
- **Osobnost:** Tvrdá, ale skrývá pocit viny za své minulé činy.

### Tharok, Válečník klanu Skalních štítů  
- Hrubý, ale loajální bojovník, který se přidal k tobě, aby ochránil svůj lid před následky kultistických útoků. Nabízí fyzickou pomoc a informace o podzemních oblastech.  
- **Osobnost:** Přímočarý, někdy netrpělivý, ale oddaný své misi.
---

### Hráč
- playerHP = 100;
- playerHealAmount = lektvary;
#### Zbraně
1. Dungeon: { 5, 9 } - Základní zbraně, menší poškození pro začátek hry.
2. Dungeon: { 10, 15 } - Znatelný nárůst poškození oproti prvnímu dungeonu.
3. Dungeon: { 16, 22 } - Další zvýšení poškození, hráč by měl cítit, že se zlepšuje.
4. Dungeon: { 23, 30 } - Silné zbraně pro poslední dungeon před bossem.
5. 
### Brnění
1. Dungeon 1: 2, 3
2. Dungeon 2: 4, 5
3. Dungeon 3: 6, 7
4. Dungeon 4: 8, 9
   
### Nepřátelé
- minHP, maxHp, minDmg, maxDmg
1. Dungeon: { 40, 55, 5, 8 } - Nižší HP a DMG pro začátek. Hráč se učí mechaniky.
2. Dungeon: { 65, 80, 9, 12 } - Zvýšení HP a DMG, ale stále ne drastické.
3. Dungeon: { 90, 110, 13, 17 } - Nepřátelé začínají být opravdu nebezpeční.
4. Dungeon: { 120, 140, 18, 22 } - Nejtěžší běžní nepřátelé před bossem.
5. Boss HP: { 180, 220 } - Výrazně více HP než běžní nepřátelé.
6. Boss DMG: { 25, 30 } - Vysoké poškození, vyžaduje dobrou strategii a využití brnění.
---
