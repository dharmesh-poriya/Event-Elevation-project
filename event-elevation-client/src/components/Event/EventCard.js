import React from 'react';
import { BASE_URL } from '../../config';

const EventCard = ({ eventId, eventName, eventPoster, eventDescription, eventDate, totalHours }) => {
  return (

    <div className="card mt-4 mb-4" style={{ width: '18rem', textAlign: 'left' }}>
      <img src={eventPoster} className="card-img-top mt-2" alt={eventName} />
      <div className="card-body">
        <h5 className="card-title" style={{ textAlign: 'center' }}>{eventName}</h5>
        <p className="text-truncate" style={{ textAlign: 'center' }}>{eventDescription}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">start date : {(eventDate.slice(0, 10))}</li>
        <li className="list-group-item">Total hours : {totalHours}</li>
      </ul>
      <a href={`/eventDetails/${eventId}`} className="col-12 btn btn-primary">View More</a>
    </div>
  );
};

export default EventCard;
