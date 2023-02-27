import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeComponent from './components/Home/HomeComponent';
import TestComponent from './components/Test/TestComponent';
import NotFoundComponent from './components/NotFound/NotFoundComponent';
// toast messages
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
