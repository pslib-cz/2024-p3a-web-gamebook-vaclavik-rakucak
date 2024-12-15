using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Quest
    {
        [Key]
        public int IdQuest { get; set; }

        public string? Description { get; set; }

        public string? QuestCondition { get; set; }

        public string? QuestParametr { get; set; }

        [ForeignKey("Dungeon")]
        public int IdDungeon { get; set; }

        public required Dungeon Dungeon { get; set; }
        [ForeignKey("Image")]
        public string IdImage { get; set; }

        public Image Image { get; set; } // Navigační vlastnost na Image (nepovinná)
    }
}
