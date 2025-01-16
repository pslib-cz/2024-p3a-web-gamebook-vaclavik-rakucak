using System.Collections.Generic;
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
        public string Condition { get; set; }
        public int ConditionValue { get; set; }
        public int? NpcId { get; set; }
        [ForeignKey("NpcId")]
        public Npc? Npc { get; set; }
        public int? RewardItemId { get; set; }
        [ForeignKey("RewardItemId")]
        public Equipment? RewardItem { get; set; }
        public int ImageId { get; set; }
        [ForeignKey("ImageId")]
        public Image Image { get; set; }
    }

}
