using Microsoft.EntityFrameworkCore;
using System.Linq;
using EventElevation.Models;

namespace EventElevation.Models
{
    public class EventElevationContext : DbContext
    {
        public EventElevationContext(DbContextOptions<EventElevationContext> options) : base(options) {

        }

        public DbSet<EventDetails> EventDetails { get; set; } = null!;
        public DbSet<Sponsor> Sponsor { get; set; } = null!;
        public DbSet<User> User { get; set; } = default!;

        
    }
}
