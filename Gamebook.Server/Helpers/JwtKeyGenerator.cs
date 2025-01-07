using System.Security.Cryptography;
using System;

namespace Gamebook.Server.Helpers  // Pou�ijte namespace pro Helpers
{
    public static class JwtKeyGenerator
    {
        public static string GenerateJwtKey()
        {
            byte[] keyBytes = new byte[32]; // D�lka kl��e (32 = 256 bit�)
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(keyBytes);
            }
            return Convert.ToBase64String(keyBytes);
        }
    }
}