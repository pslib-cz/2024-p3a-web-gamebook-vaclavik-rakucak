using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{

    public class Fork
    {
        public int Id { get; set; }
        public int DungeonId { get; set; }
        public int? ImageId { get; set; } // Image pro fork (volitelné)
        public Image? Image { get; set; } // Blob pro obrázek (volitelné)
        public List<ForkConnection> Connections { get; set; } = new List<ForkConnection>();
    }

}