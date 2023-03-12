import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../config';
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import CreateEventModel from './CreateEventModel';

const AllEvents = () => {
  const [allEvents, setAllEvents] = useState([]);
  let i = 0;
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(BASE_URL + '/api/EventDetails');
      console.log(res);
      setAllEvents(res.data);
    }
    fetchData();
  }, [])
  function getHours(stdate,sttime,eddate,edtime) {
    // Starting date and time
    var start_date = stdate.slice(0, 10);
    var start_time = sttime;

    // Ending date and time
    var end_date = eddate.slice(0, 10);
    var end_time = edtime;

    // Convert dates and times to timestamps
    var start_timestamp = new Date(start_date + " " + start_time).getTime();
    var end_timestamp = new Date(end_date + " " + end_time).getTime();

    // Calculate difference in milliseconds
    var difference_ms = end_timestamp - start_timestamp;

    // Convert milliseconds to hours
    var hours = difference_ms / 3600000;

    console.log(hours);
    return hours;
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-2 col-md-3 col-sm-4 offset-lg-10 offset-md-9 offset-sm-8 mt-4">
            <button className="col-12 btn btn-primary" data-bs-toggle="modal" data-bs-target="#createEventModel">Create Event</button>
            <CreateEventModel />
          </div>
        </div>
        <div className="row justify-content-center">
          <div style={{ textAlign: 'left', marginTop: '45px' }} className="col-md-12">
            <h1>All Events!</h1>
            <hr />
          </div>
        </div>
        <div>
          {
            allEvents && allEvents.map((event) => {
              i++;
              if (i % 2 === 1 || window.innerWidth < 768)
                return (
                  <div key={event.id} className='row justify-content-left my-5' >
                    <div className='col-md-6 col-sm-12 col-12'>
                      <img style={{ width: '95%', height: '270px' }} src={BASE_URL + '/api/EventDetails/event-poster/' + event.image} alt='event poster' />
                    </div>
                    <div className='col-md-6 col-sm-12 col-12 px-md-4' style={{ textAlign: 'left', marginTop: '10px' }} >
                      <h3>{event.name}</h3>
                      <p className='text-truncate'><b>Description</b> : {event.description}</p>
                      <p><b>Date</b> : {event.startDate.slice(0, 10)}</p>
                      <p><b>Time</b> : {event.startTime}</p>
                      <p><b>TotalHours </b> : {getHours(event.startDate,event.startTime,event.endDate,event.endTime)}</p>
                      <p><b>Location </b> : {event.location}</p>
                      <a className='btn btn-primary col-12' href={'/eventDetails/' + event.id}>View Details</a>
                    </div>
                  </div>
                );
              else
                return (
                  <div key={event.id} className='row justify-content-left my-5' >
                    <div className='col-md-6 col-sm-12 col-12 px-md-4' style={{ textAlign: 'left', marginTop: '30px' }} >
                      <h3>{event.name}</h3>
                      <p className='text-truncate'><b>Description</b> : {event.description}</p>
                      <p><b>Date</b> : {event.startDate.slice(0, 10)}</p>
                      <p><b>Time</b> : {event.startTime}</p>
                      <p><b>TotalHours </b> : {getHours(event.startDate,event.startTime,event.endDate,event.endTime)}</p>
                      <p><b>Location </b> : {event.location}</p>
                      <a className='btn btn-primary col-12' href={'/eventDetails/' + event.id}>View Details</a>
                    </div>
                    <div className='col-md-6 col-sm-12 col-12'>
                      <img style={{ width: '95%', height: '270px' }} src={BASE_URL + '/api/EventDetails/event-poster/' + event.image} alt='event poster' />
                    </div>
                  </div>
                );


            }
            )
          }
        </div>
      </div>
      <div className='mt-5'>
        <Footer />
      </div>
    </>
  )
}

export default AllEvents