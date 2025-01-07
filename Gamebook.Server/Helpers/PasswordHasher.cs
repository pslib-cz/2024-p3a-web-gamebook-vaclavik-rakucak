using System.Security.Cryptography;
using System.Text;
public static class PasswordHasher
{
    public static string HashPassword(string password, string salt)
    {
        byte[] passwordBytes = Encoding.UTF8.GetBytes(password + salt);
        using var sha512 = SHA512.Create();
        byte[] hashedBytes = sha512.ComputeHash(passwordBytes);
        return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
    }
    public static bool VerifyPassword(string password, string salt, string hash)
    {
        return HashPassword(password, salt) == hash;
    }

}