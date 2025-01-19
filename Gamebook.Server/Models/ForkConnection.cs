namespace Gamebook.Server.Models;

public class ForkConnection
{
    public int Id { get; set; }
    public int ForkId { get; set; }
    public Fork Fork { get; set; }
    public int ConnectedRoomId { get; set; }
    public Room ConnectedRoom { get; set; }
    public bool IsDeadEnd { get; set; }
}