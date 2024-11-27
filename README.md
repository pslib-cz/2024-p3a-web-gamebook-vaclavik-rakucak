**Dungeone of Insanity**

„Gamebook “ bude ve stylu dungeon rpg, kde hráč si bude mít nevýběr z několika dungeonů (3-4), podle obtížnosti, jednotlivé dungeony, budou generovány na začátku a hráč poté celý dungeony projde a dostane odměnu peníze/sláva. Cílém hry bude získat co nejviší slávu. 

Počátek hry 

Hra začíná monologem o tom, co se vlastně stalo, proč jsme tam kde jsme a co je naším cílem.  

Samotná hra začíná po dialogu, hráč se objeví ve městě a dostane úkol do prvního dungeonu, přinést item který padne po zabití monstra (možnost že hráč musí dungeon projít vícekrát) 

 

**Technická část **

Dugeony 

Generování dugeonu:  

Každá dugeon je vytvořen s předstihem, než do něj hráč vstoupí. Když je hráč v místnosti, následné křižovatky budou řešeny že místnost ude muset mít pevně dané další místnosti - řešené ve funkci pro generování. 

 Pool map:  

Místnosti jsou spravovány v "poolu" ze kterého se bude losovat další mapa v generaci světa 
