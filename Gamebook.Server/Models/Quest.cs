namespace Gamebook.Server.Models
{
    public class Quest
    {
        [Key]
        public int IdQuest { get; set; }

        public string Description { get; set; }

        public string QuestCondition { get; set; }

        public string QuestParametr { get; set; }

        [ForeignKey("Dungeon")]
        public int IdDungeon { get; set; }

        public Dungeon Dungeon { get; set; }
    }
}
