using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace EventElevation.Models
{
    public class EventElevationContext : DbContext
    {
        public EventElevationContext(DbContextOptions<EventElevationContext> options) : base(options) {
        }

        public DbSet<EventDetails> EventDetails { get; set; } = null!;
        public DbSet<Sponsor> Sponsor { get; set; } = null!;
        public DbSet<Tag> Tag { get; set; } = null!;
        public DbSet<EventsTags> eventsTags { get; set; } = null!;

        
    }
}
