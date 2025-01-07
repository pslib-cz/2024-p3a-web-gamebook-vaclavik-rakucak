using System.ComponentModel.DataAnnotations;

public class Admin
{
    [Key]
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public string Role { get; set; } = "admin"; // Nastavena defaultn� role
    public string Salt { get; set; }
}


