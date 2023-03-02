using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventElevation.Models;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace EventElevation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventDetailsController : ControllerBase
    {
        private readonly EventElevationContext _context;

        public EventDetailsController(EventElevationContext context)
        {
            _context = context;
        }

        // GET: api/EventDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDetails>>> GetEventDetails()
        {
            if (_context.EventDetails == null)
            {
                return NotFound();
            }
            return await _context.EventDetails.ToListAsync();
        }

        // GET: api/EventDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EventDetails>> GetEventDetails(long id)
        {
            if (_context.EventDetails == null)
            {
                return NotFound();
            }
            var eventDetails = await _context.EventDetails.FindAsync(id);

            if (eventDetails == null)
            {
                return NotFound();
            }

            return eventDetails;
        }

        // PUT: api/EventDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventDetails(long id, [FromForm] EventDetails eventDetails)
        {
            if (id != eventDetails.Id)
            {
                return BadRequest();
            }

            _context.Entry(eventDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventDetailsExists(id))
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

        // POST: api/EventDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EventDetails>> PostEventDetails(EventDetails eventDetails)
        {
            if (_context.EventDetails == null)
            {
                return Problem("Entity set 'EventElevationContext.EventDetails'  is null.");
            }
            _context.EventDetails.Add(eventDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEventDetails", new { id = eventDetails.Id }, eventDetails);
        }

        // DELETE: api/EventDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventDetails(long id)
        {
            if (_context.EventDetails == null)
            {
                return NotFound();
            }
            var eventDetails = await _context.EventDetails.FindAsync(id);
            if (eventDetails == null)
            {
                return NotFound();
            }
            var imagePathOnDisk = Path.Combine("./", "images/eventPosters", eventDetails.Image);
            //Path.Combine(_environment.WebRootPath, "images", imagePath);
            if (!System.IO.File.Exists(imagePathOnDisk))
            {
                return NotFound();
            }
            if ("default-event-poster.gif" != eventDetails.Image)
            {
                System.IO.File.Delete(imagePathOnDisk);
            }
            _context.EventDetails.Remove(eventDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventDetailsExists(long id)
        {
            return (_context.EventDetails?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        // my own actions

        // upload images on the server
        // POST : api/EventDetails/uploadImage
        [HttpPost("uploadImage")]
        public async Task<IActionResult> Upload([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file selected.");
            }

            // Save the file to disk
            var filePath = Path.Combine("images/eventPosters", file.FileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Ok(filePath);
        }

        // get uploaded images from server

        // GET : api/EventDetails/images/?
        [HttpGet("event-poster/{imagePath}")]
        public IActionResult GetImage(string imagePath)
        {
            var imagePathOnDisk = Path.Combine("./", "images/eventPosters", imagePath);
            //Path.Combine(_environment.WebRootPath, "images", imagePath);
            if (!System.IO.File.Exists(imagePathOnDisk))
            {
                return NotFound();
            }

            var imageBytes = System.IO.File.ReadAllBytes(imagePathOnDisk);

            return File(imageBytes, "image/jpeg");
        }

        // add new eventDetails
        [HttpPost("AddEvent")]
        public async Task<IActionResult> CreateMyModel([FromForm] EventDetails model)
        {
            //return Ok("Hello!!");
            try
            {
                if (model.ImageFile != null)
                {
                    // Save the image to disk and update the ImagePath property
                    var imageName = Guid.NewGuid().ToString() + Path.GetExtension(model.ImageFile.FileName);
                    var imagePathOnDisk = Path.Combine("./","images/eventPosters", imageName);

                    using (var stream = new FileStream(imagePathOnDisk, FileMode.Create))
                    {
                        await model.ImageFile.CopyToAsync(stream);
                    }

                    model.Image = imageName;
                }
                else
                {
                    model.Image = "default-event-poster.gif";
                }

                // Save the model to the database
                _context.EventDetails.Add(model);
                await _context.SaveChangesAsync();

                //return CreatedAtAction("GetEventDetails", new { id = model.Id }, model); 
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
