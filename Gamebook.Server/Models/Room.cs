using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Room
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; } //"empty", "key", "chest", "monster"
        public string Description { get; set; }
        public int DungeonId { get; set; }
        [ForeignKey("DungeonId")]
        public Dungeon Dungeon { get; set; }

        public int? ImageId { get; set; }
        [ForeignKey("ImageId")]
        public Image? Image { get; set; }

    }

}