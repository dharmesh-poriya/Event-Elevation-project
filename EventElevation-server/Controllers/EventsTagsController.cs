using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventElevation.Models;
using Azure;

namespace EventElevation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsTagsController : ControllerBase
    {
        private readonly EventElevationContext _context;

        public EventsTagsController(EventElevationContext context)
        {
            _context = context;
        }

        // GET: api/EventsTags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventsTags>>> GeteventsTags()
        {
          if (_context.eventsTags == null)
          {
              return NotFound();
          }
            return await _context.eventsTags.ToListAsync();
        }

        // GET: api/EventsTags/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EventsTags>> GetEventsTags(long id)
        {
          if (_context.eventsTags == null)
          {
              return NotFound();
          }
            var eventsTags = await _context.eventsTags.FindAsync(id);

            if (eventsTags == null)
            {
                return NotFound();
            }

            return eventsTags;
        }

        // PUT: api/EventsTags/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventsTags(long id, EventsTags eventsTags)
        {
            if (id != eventsTags.Id)
            {
                return BadRequest();
            }

            _context.Entry(eventsTags).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventsTagsExists(id))
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

        // POST: api/EventsTags
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostEventsTags([FromBody] List<EventsTags> eventsTags)
        {
          if (_context.eventsTags == null)
          {
              return Problem("Entity set 'EventElevationContext.eventsTags'  is null.");
          }
            _context.eventsTags.AddRange(eventsTags);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/EventsTags/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventsTags(long id)
        {
            if (_context.eventsTags == null)
            {
                return NotFound();
            }
            var eventsTags = await _context.eventsTags.FindAsync(id);
            if (eventsTags == null)
            {
                return NotFound();
            }

            _context.eventsTags.Remove(eventsTags);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventsTagsExists(long id)
        {
            return (_context.eventsTags?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        // Own Methods

        // get: api/EventsTags/EventId=5
        [HttpGet("event/{eventId}")]
        public async Task<List<Tag>> FindByEventIdAsync(long eventId)
        {
            List<EventsTags> et = await _context.eventsTags.Where(x => x.EventId == eventId).ToListAsync();
            List<Tag> tags = new List<Tag>();
            foreach (var e in et)
            {
                var tag = await _context.Tag.FindAsync(e.TagId);
                if(tag != null) tags.Add(tag);
            }
            return tags;
        }

        

    }
}
