using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Hall
    {
        [Key]
        public int IdHall { get; set; }

        public string? Type { get; set; }

        public string? Description { get; set; }
        [ForeignKey("Room")]
        public int? IdRoom{ get; set; } // Cizí klíč na Room

        [ForeignKey("Image")]
        public string? IdImage { get; set; }

    }
}