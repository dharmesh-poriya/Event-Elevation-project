using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventElevation.Models;

namespace EventElevation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorsController : ControllerBase
    {
        private readonly EventElevationContext _context;

        public SponsorsController(EventElevationContext context)
        {
            _context = context;
        }

        // GET: api/Sponsors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sponsor>>> GetSponsor()
        {
          if (_context.Sponsor == null)
          {
              return NotFound();
          }
            return await _context.Sponsor.ToListAsync();
        }

        // GET: api/Sponsors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sponsor>> GetSponsor(long id)
        {
          if (_context.Sponsor == null)
          {
              return NotFound();
          }
            var sponsor = await _context.Sponsor.FindAsync(id);

            if (sponsor == null)
            {
                return NotFound();
            }

            return sponsor;
        }

        // PUT: api/Sponsors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSponsor(long id, Sponsor sponsor)
        {
            if (id != sponsor.Id)
            {
                return BadRequest();
            }

            _context.Entry(sponsor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SponsorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sponsors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sponsor>> PostSponsor(Sponsor sponsor)
        {
          if (_context.Sponsor == null)
          {
              return Problem("Entity set 'EventElevationContext.Sponsor'  is null.");
          }
            _context.Sponsor.Add(sponsor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSponsor", new { id = sponsor.Id }, sponsor);
        }

        // DELETE: api/Sponsors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSponsor(long id)
        {
            if (_context.Sponsor == null)
            {
                return NotFound();
            }
            var sponsor = await _context.Sponsor.FindAsync(id);
            if (sponsor == null)
            {
                return NotFound();
            }

            _context.Sponsor.Remove(sponsor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SponsorExists(long id)
        {
            return (_context.Sponsor?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
