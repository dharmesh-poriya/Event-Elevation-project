import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../config';
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

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

  return (
    <>
      <Navbar />
      <div className="container">
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
                      <img className='col-lg-10 col-md-12 col-sm-12 col-12' src='https://i.ytimg.com/vi/RPoTuCHttn4/maxresdefault.jpg' alt='event poster' />
                    </div>
                    <div className='col-md-6 col-sm-12 col-12 px-md-4' style={{ textAlign: 'left', marginTop: '10px' }} >
                      <h3>{event.name}</h3>
                      <p className='text-truncate'><b>Description</b> : {event.description}</p>
                      <p><b>Date</b> : {event.startDate.slice(0, 10)}</p>
                      <p><b>Time</b> : {event.startTime}</p>
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
                      <p><b>Location </b> : {event.location}</p>
                      <a className='btn btn-primary col-12' href={'/eventDetails/' + event.id}>View Details</a>
                    </div>
                    <div className='col-md-6 col-sm-12 col-12'>
                      <img className='col-lg-10 col-md-12 col-sm-12 col-12' src='https://i.ytimg.com/vi/RPoTuCHttn4/maxresdefault.jpg' alt='event poster' />
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