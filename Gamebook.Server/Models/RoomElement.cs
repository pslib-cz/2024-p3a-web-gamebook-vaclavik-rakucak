namespace Gamebook.Server.Models;

public class RoomElement : ChainElement
{
    public Room Data { get; set; }
    public bool IsDeadEnd { get; set; }

    public RoomElement(Room room, bool isDeadEnd = false)
    {
        Type = "room";
        Data = room;
        IsDeadEnd = isDeadEnd;
    }
}