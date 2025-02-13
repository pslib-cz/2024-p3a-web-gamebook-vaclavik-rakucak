using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class RoomItem
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; } // "trap", "chest", "crate"
        public string? Description { get; set; }
        public int? damage { get; set; }
        public int RoomId { get; set; }
        [ForeignKey("RoomId")]
        public Room? Room { get; set; }
        public int? EquipmentId { get; set; }
        [ForeignKey("EquipmentId")]
        public Equipment? Equipment { get; set; }
        public int ImageId { get; set; }
        [ForeignKey("ImageId")]
        public Image? Image { get; set; }
    }
}