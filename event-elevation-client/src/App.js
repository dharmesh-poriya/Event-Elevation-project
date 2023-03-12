import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeComponent from './components/Home/HomeComponent';
import TestComponent from './components/Test/TestComponent';
import NotFoundComponent from './components/NotFound/NotFoundComponent';
// toast messages
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EventPage from './components/Event/EventPage';
import AllEvents from './components/Event/AllEvents';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/allevents" element={<AllEvents />} />
          <Route path="/eventDetails/:eventId" element={<EventPage />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="/404" element={<NotFoundComponent />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
