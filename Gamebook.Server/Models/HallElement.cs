namespace Gamebook.Server.Models;

public class HallElement : ChainElement
{
    public Hall Data { get; set; }

    public HallElement(Hall hall)
    {
        Type = "hall";
        Data = hall;
    }
}