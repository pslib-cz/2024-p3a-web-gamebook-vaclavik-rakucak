# Dungeone of Insanity

„Gamebook “ bude ve stylu dungeon rpg, kde hráč-rytíř si bude mít nevýběr z několika dungeonů (3-4), podle obtížnosti, jednotlivé dungeony, budou generovány na začátku a hráč poté celý dungeony projde a dostane odměnu peníze/sláva. Cílém hry bude získat co nejviší slávu. 

Počátek hry

Hra začíná monologem o tom, co se vlastně stalo, proč jsme tam kde jsme a co je naším cílem.  

Samotná hra začíná po dialogu, hráč se objeví ve městě a dostane úkol do prvního dungeonu, přinést item který padne po zabití monstra (možnost že hráč musí dungeon projít vícekrát) 
nasledovat budou ukoly a pribehova linka

 

Technická část

Dugeony 

Generování dugeonu:  
 Každá dugeon je vytvořen s předstihem, než do něj hráč vstoupí. Když je hráč v místnosti, následné křižovatky budou řešeny že místnost ude muset mít pevně dané další místnosti - řešené ve funkci pro generování. 

Pool map:  
 Místnosti jsou spravovány v "poolu" ze kterého se bude losovat další mapa v generaci světa 
 
Itemy a inventář
 ve městě bude trade u kterého se bude moci vylepšovat/koupit nové.
 zakladní vybavení - zbrň, armor, druha ruka(obouruční meče, shield, podobné)
 v inventáři bude armor a políčka pro itemy - heal/dmg potiony a podobné

Nepřátelé
 Fantasy stvoření  - taé "náhodné" - zavislé na místnosti
 pevně dané dmg a hp
 odměna po zabití peníze/item/vybavení

 hráč bude bojovat podle vybavených zbraní a udělovat poškození nepříteli
 nepřítel bude mmít buĎ utok od do, nebo pevně daný -> hráč bude mítbrnění negující nějaké příchozí poškození

Místnosti
 místnost se bude skládat z pozadí text který ji nějak popíše, něco příbehového
 některíé místnosti budou mít poklad truhla/zamčené dveře pro kterou budeme potřebovat klíč -> křiovatky

