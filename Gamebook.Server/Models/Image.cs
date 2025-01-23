using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Image
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] Data { get; set; }
        public string ContentType { get; set; }
    }

}
