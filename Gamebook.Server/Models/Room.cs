using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Room
    {
        [Key]
        public int IdRoom { get; set; }

        public required string Type { get; set; }


        public required string Description { get; set; }

        [ForeignKey("Dungeon")]
        public int IdDungeon { get; set; }

        public required Dungeon Dungeon { get; set; }

        public required Monster Monster { get; set; }

        public ICollection<Item> Items { get; set; } = new List<Item>();

        // Navigační vlastnost pro Hall, která odkazuje na tuto Room
        [ForeignKey("IdHall")]
        public int IdHall { get; set; }
            
        [ForeignKey("Image")]
        public string IdImage { get; set; }

        public Image Image { get; set; } // Navigační vlastnost na Image (nepovinná)
    }

    public class RoomChainDto
    {
        public int IdRoom { get; set; }
        public string RoomDescription { get; set; }
        public HallDto LinkedHall { get; set; }
    }

    public class HallDto
    {
        public int IdHall { get; set; }
        public string HallDescription { get; set; }
        public RoomChainDto NextRoom { get; set; } // Navazující místnost
    }

}
