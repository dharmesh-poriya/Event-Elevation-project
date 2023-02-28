import React, { useEffect, useState } from 'react'
import EventCard from '../Event/EventCard';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { BASE_URL } from '../../config';


function HomeComponent() {
  const [allEvents, setAllEvents] = useState([]);
  console.log('All Events : ', allEvents);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(BASE_URL + '/api/EventDetails');
      // console.log(res);
      setAllEvents(res.data);
    }
    fetchData();
  },[]);

  return (
    <div>
      {/* <h1>Home</h1> */}
      <Navbar />
      <div className="container">

        <div className="row justify-content-center">
          <div style={{ textAlign: 'left', marginTop: '45px' }} className="col-md-12">
            <h1>Happening Now!</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {
            allEvents && allEvents.map((event) => <EventCard key={event.id} eventId={event.id} eventPoster={'https://miro.medium.com/max/450/1*E2GBhUH4dIkshPAg7SiB2w.png'} eventName={event.name} eventDescription={event.description} eventDate={event.startDate} totalHours={event.totalHours} />)
          }
          
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default HomeComponent;