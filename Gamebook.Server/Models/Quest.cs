using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Quest
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Condition { get; set; } // Typ úkolu: "completeDungeon", "killMonster", "collectItem"
        public int ConditionValue { get; set; }

        public int? DungeonId { get; set; }
        [ForeignKey("DungeonId")]
        public Dungeon? Dungeon { get; set; }

        public int? MonsterId { get; set; }
        [ForeignKey("MonsterId")]
        public Monster? Monster { get; set; }

        public int? RoomItemId { get; set; }
        [ForeignKey("ItemId")]
        public RoomItem? RoomItem { get; set; }

        public int? NpcId { get; set; }
        [ForeignKey("NpcId")]
        public Npc? Npc { get; set; }

        public int? RewardItemId { get; set; }
        [ForeignKey("RewardItemId")]
        public Equipment? RewardItem { get; set; }

        public int ImageId { get; set; }    
        [ForeignKey("ImageId")]
        public Image? Image { get; set; }
    }
}
