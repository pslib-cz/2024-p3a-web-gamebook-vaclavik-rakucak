using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
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
        public int DungeonId { get; set; }
        [ForeignKey("DungeonId")]
        public Dungeon Dungeon { get; set; }

        public int? ImageId { get; set; }
        [ForeignKey("ImageId")]
        public Image? Image { get; set; }

        public ICollection<RoomItem> RoomItems { get; set; } = new List<RoomItem>(); // Kolekce itemů v místnosti

        public int? KeyId { get; set; }
        [ForeignKey("KeyId")]
        public Key? Key { get; set; }

        public int? PositionX { get; set; } // Pozice X pro umístění klíče na obrazovce
        public int? PositionY { get; set; } // Pozice Y pro umístění klíče na obrazovce
    }
}
