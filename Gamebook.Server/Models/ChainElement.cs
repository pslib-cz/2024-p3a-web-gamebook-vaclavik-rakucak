namespace Gamebook.Server.Models;

public abstract class ChainElement
{
    public string Type { get; protected set; }
    // Další společné vlastnosti, pokud existují (např. ImageId, Image)
}