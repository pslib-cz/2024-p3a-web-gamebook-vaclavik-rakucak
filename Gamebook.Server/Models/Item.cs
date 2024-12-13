using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Item
    {
        [Key]
        public int IdItem { get; set; }

        public required string Name { get; set; }

        public required string Type { get; set; }

        public int BaseStat { get; set; }

        public int BasePrice { get; set; }

        public required string SpecEffect { get; set; }

        public int SpecEffectStat { get; set; }

        [ForeignKey("Room")]
        public int IdRoom { get; set; }

        public required Room Room { get; set; }
        [ForeignKey("Image")]
        public string IdImage { get; set; }

        public Image Image { get; set; } // Navigační vlastnost na Image (nepovinná)
    }
}
