using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{

    public class Hall
    {
        [Key]
        public int Id { get; set; }
        public int? ImageId { get; set; }
        [ForeignKey("ImageId")]
        public Image? Image { get; set; }

        // Přidáme vazbu na Room
        public int RoomId { get; set; }
        [ForeignKey("RoomId")]
        public Room Room { get; set; }
        public int DungeonId { get; set; }
        [ForeignKey("DungeonId")]
        public Dungeon Dungeon { get; set; }
    }

}