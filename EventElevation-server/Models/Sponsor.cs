using System.ComponentModel.DataAnnotations.Schema;

namespace EventElevation.Models
{
    public class Sponsor
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long MonetrySupport { get; set; }

        [ForeignKey("Id")]
        public long EventDetailsId { get; set; }

    }
}
