import React from 'react';
import { BASE_URL } from '../../config';

const EventCard = ({ eventId, eventName, eventPoster, eventDescription, eventStartDate,eventEndDate }) => {
  return (

    <div className="card mt-4 mb-4 mx-2" style={{ width: '18rem', textAlign: 'left' }}>
      <img src={eventPoster} className="card-img-top mt-2" alt={eventName} />
      <div className="card-body">
        <h5 className="card-title" style={{ textAlign: 'center' }}>{eventName}</h5>
        <p className="text-truncate" style={{ textAlign: 'center' }}>{eventDescription}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">start date : {(eventStartDate.slice(0, 10))}</li>
        <li className="list-group-item">end date : {eventEndDate.slice(0, 10)}</li>
      </ul>
      <a href={`/eventDetails/${eventId}`} className="col-12 btn btn-primary my-2">View More</a>
    </div>
  );
};

export default EventCard;
