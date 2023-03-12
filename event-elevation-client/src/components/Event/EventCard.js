import React from 'react';
import { BASE_URL } from '../../config';

const EventCard = ({ currentEvent }) => {
  return (

    <div className="card mt-4 mb-4 mx-2" style={{ width: '18rem', textAlign: 'left' }}>
      <img src={BASE_URL+'/api/EventDetails/event-poster/'+currentEvent.image} className="card-img-top mt-2 w-100" style={{height:'250px'}} alt={currentEvent.name} />
      <div className="card-body">
        <h5 className="card-title" style={{ textAlign: 'center' }}>{currentEvent.name}</h5>
        <p className="text-truncate" style={{ textAlign: 'center' }}>{currentEvent.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">start date : {(currentEvent.startDate.slice(0, 10))}</li>
        <li className="list-group-item">start time : {currentEvent.startTime}</li>
      </ul>
      <a href={`/eventDetails/${currentEvent.id}`} className="col-12 btn btn-primary my-2">View More</a>
    </div>
  );
};

export default EventCard;
