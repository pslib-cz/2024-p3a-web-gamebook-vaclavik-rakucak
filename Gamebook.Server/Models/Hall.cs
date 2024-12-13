using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Hall
    {
        [Key]
        public int IdHall { get; set; }

        public required string Type { get; set; }

        public required string Description { get; set; }

        [ForeignKey("Room")]
        public int IdRoom { get; set; } // Cizí klíč na Room

        public required Room Room { get; set; } // Navigační vlastnost na Room
        [ForeignKey("Image")]
        public string IdImage { get; set; }

        public Image Image { get; set; } // Navigační vlastnost na Image (nepovinná)
    }

}
