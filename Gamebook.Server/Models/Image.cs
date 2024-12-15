using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Image
    {
        [Key]
        public string IdImage { get; set; }

        public string? Name { get; set; }

        public required byte[] Data { get; set; } // Obrázek uložen jako binární data

        public string? ContentType { get; set; } // Např. "image/png"

    }

}
