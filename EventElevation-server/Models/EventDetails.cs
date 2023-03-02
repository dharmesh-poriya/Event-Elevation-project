using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventElevation.Models
{
    public class EventDetails
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        
        [NotMapped]
        public IFormFile? ImageFile { get; set; }

        [Column(TypeName = "date")]
        public DateTime StartDate { get; set; }
        public string StartTime { get; set; }
        [Column(TypeName = "date")]
        public DateTime EndDate { get; set; }
        public string EndTime { get; set; }
        public string Mode { get; set; }
        public string Location { get; set; }
        public string Organiser { get; set; }
        public string? OrganiserDescription { get; set; }
        public ICollection<Sponsor>? Sponsors { get; set; }

    }
}
