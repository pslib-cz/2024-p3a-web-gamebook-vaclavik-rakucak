using System.Security.Cryptography;
using System;
public static class SaltGenerator
{
    public static string GenerateSalt()
    {
        byte[] saltBytes = new byte[16]; // D�lka soli v bajtech (16 = 128 bit�)
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(saltBytes);
        }
        return Convert.ToBase64String(saltBytes);
    }
}