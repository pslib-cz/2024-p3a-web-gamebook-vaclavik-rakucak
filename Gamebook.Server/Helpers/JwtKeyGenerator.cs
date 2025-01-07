using System.Security.Cryptography;
using System;

namespace Gamebook.Server.Helpers  // Použijte namespace pro Helpers
{
    public static class JwtKeyGenerator
    {
        public static string GenerateJwtKey()
        {
            byte[] keyBytes = new byte[32]; // Délka klíèe (32 = 256 bitù)
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(keyBytes);
            }
            return Convert.ToBase64String(keyBytes);
        }
    }
}