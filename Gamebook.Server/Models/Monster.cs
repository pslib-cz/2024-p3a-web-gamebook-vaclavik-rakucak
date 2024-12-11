namespace Gamebook.Server.Models
{
    public class Monster
    {
        [Key]
        public int IdMonster { get; set; }

        public string Name { get; set; }

        public int Hitpoints { get; set; }

        public int Damage { get; set; }

        public string Image { get; set; }

        [ForeignKey("Room")]
        public int IdRoom { get; set; }

        public Room Room { get; set; }
    }
}
