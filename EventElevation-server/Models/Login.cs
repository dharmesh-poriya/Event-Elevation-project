using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventElevation.Models
{
    [NotMapped]
    public class Login
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
