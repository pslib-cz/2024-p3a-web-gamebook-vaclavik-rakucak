using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Monster
    {
        [Key]
        public int IdMonster { get; set; }

        public string? Name { get; set; }

        public int Hitpoints { get; set; }

        public int Damage { get; set; }

        [ForeignKey("Room")]
        public int IdRoom { get; set; }

        public required Room Room { get; set; }
        [ForeignKey("Image")]
        public string IdImage { get; set; }

        public Image Image { get; set; } // Navigační vlastnost na Image (nepovinná)
    }
}
