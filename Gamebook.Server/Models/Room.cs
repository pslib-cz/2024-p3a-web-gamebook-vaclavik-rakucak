using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Room
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; } // "traproom", "chestroom", "keyroom"
        public string Description { get; set; }
        public int? DungeonId { get; set; }
        public int? ImageId { get; set; }
        [ForeignKey("ImageId")]
        public Image? Image { get; set; }
        public bool? IsDeadEnd { get; set; }
        public int? MonsterId { get; set; }
        [ForeignKey("MonsterId")]
        public Monster? Monster { get; set; }
        public bool? Active { get; set; }
        public int? RoomItemId { get; set; }
        [ForeignKey("RoomItemId")]
        public RoomItem? RoomItem { get; set; }
        public int? KeyId { get; set; }
        [ForeignKey("KeyId")]
        public Key? Key { get; set; }
        public int? PositionX { get; set; }
        public int? PositionY { get; set; }
    }
}