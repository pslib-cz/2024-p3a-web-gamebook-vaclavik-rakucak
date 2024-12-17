using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Room
    {
        [Key]
        public int IdRoom { get; set; }

        public string? Type { get; set; }

        public string? Description { get; set; }

        [ForeignKey("Dungeon")]
        public int IdDungeon { get; set; }

        public Dungeon Dungeon { get; set; }

        public Monster? Monster { get; set; }

        public ICollection<Item> Items { get; set; } = new List<Item>();

        [ForeignKey("Hall")]
        public int? IdHall { get; set; } // Cizí klíč na Hall
        public Hall Hall { get; set; }

        [ForeignKey("Image")]
        public string? IdImage { get; set; }

    }
    public class RoomChainDto
    {
        public int IdRoom { get; set; }
        public string RoomDescription { get; set; }
        public HallDto LinkedHall { get; set; }
    }

    public class HallDto
    {
        public int IdIdHall { get; set; }
        public string HallDescription { get; set; }
        public RoomChainDto NextRoom { get; set; } // Navazující místnost
    }
}