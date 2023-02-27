import React, { useEffect, useState } from 'react'
import EventCard from '../Event/EventCard';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { BASE_URL } from '../../config';


function HomeComponent() {
  const [allEvents, setAllEvents] = useState();

  useEffect(() => {
    const fetchData = () => {
      const result = async () => await axios(BASE_URL + '/api/EventDetails');
      result().then((res) => {
        setAllEvents(res.data);
        console.log('All Events : ', allEvents);
      });

      // setAllEvents(result.data);
      // console.log('All Events : ', allEvents);
    }
    !allEvents && fetchData();
  },[]);

  return (
    <div>
      {/* <h1>Home</h1> */}
      <Navbar />
      {console.log('return : ', allEvents)}
      <div className="container">

        <div className="row justify-content-center">
          <div style={{ textAlign: 'left', marginTop: '45px' }} className="col-md-12">
            <h1>Happening Now!</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {
            allEvents && allEvents.map((event) => <EventCard key={event.id} eventId={event.id} eventName={event.name} eventDescription={event.description} eventDate={event.startDate} totalHours={event.totalHours} />)
          }
          
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default HomeComponent;