namespace Gamebook.Server.Models
{
    public class Item
    {
        [Key]
        public int IdItem { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public string Image { get; set; }

        public int BaseStat { get; set; }

        public int BasePrice { get; set; }

        public string SpecEffect { get; set; }

        public int SpecEffectStat { get; set; }

        [ForeignKey("Room")]
        public int IdRoom { get; set; }

        public Room Room { get; set; }
    }
}
