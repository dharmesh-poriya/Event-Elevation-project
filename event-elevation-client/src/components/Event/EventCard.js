import React from 'react';
import { BASE_URL } from '../../config';

const EventCard = ({ eventId,eventName, eventDescription, eventDate, totalHours }) => {
  return (

    <div className="card mt-4 mb-4" style={{ width: '18rem', textAlign: 'left' }}>
      <img src={'https://miro.medium.com/max/450/1*E2GBhUH4dIkshPAg7SiB2w.png'} className="card-img-top" alt={eventName} />
      <div className="card-body">
        <h5 className="card-title" style={{textAlign: 'center' }}>{eventName}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">start date : {(eventDate.slice(0,10))}</li>
        <li className="list-group-item">Total hours : {totalHours}</li>
      </ul>
      <a href={`${BASE_URL}/api/EventDetails/${eventId}`} class="col-12 btn btn-primary">View More</a>
    </div>
  );
};

export default EventCard;
