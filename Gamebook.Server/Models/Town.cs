using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace Gamebook.Server.Models
{
    public class Town
    {
        [Key]
        public int IdTown { get; set; }
        public required string Name { get; set; }
        [ForeignKey("Image")]
        public string IdImage { get; set; }

        public Image Image { get; set; } // Navigační vlastnost na Image (nepovinná)

        // Cizí klíč pro self-referencing
        public int? ParentTownId { get; set; } // Může být NULL, pokud město nemá nadřazené město

        [ForeignKey("ParentTownId")]
        public Town? ParentTown { get; set; } // Navigační vlastnost pro nadřazené město

        public ICollection<Town> ChildTowns { get; set; } = new List<Town>(); // Navigační vlastnost pro podřízená města

    }
}
