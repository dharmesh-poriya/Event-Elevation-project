// import axios from 'axios';
// import React, { useState } from 'react'

// const TestComponent = () => {
//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('https://localhost:7296/api/EventsTags/upload', formData);
//       console.log("REs : ",response.data);
//       // Save the file path to your database using Entity Framework
//     } catch (error) {
//       console.error("Error1 : ",error);
//     }
//   };

//   const handleFileInputChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//     const reader = new FileReader();
//     reader.onload = () => {
//       setPreviewUrl(reader.result);
//     };
//     reader.readAsDataURL(selectedFile);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <input type="file" onChange={handleFileInputChange} />
//       </div>
//       <div>
//         {previewUrl && <img src={previewUrl} alt="Preview" />}
//       </div>
//       <div>
//         <button type="submit">Submit</button>
//       </div>
//     </form>
//   );
// };

// export default TestComponent


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TestComponent = ({ id }) => {
//   // const [model, setModel] = useState(null);

//   // useEffect(() => {
//   //   const getModel = async () => {
//   //     try {
//   //       // const response = await axios.get(`/api/${id}`);
//   //       setModel(response.data);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   getModel();
//   // }, [id]);

//   // if (!model) {
//   //   return <p>Loading...</p>;
//   // }

//   const imageUrl = `https://localhost:7296/api/EventDetails/images/Gn 1 2 3.gif`;

//   return (
//     <div>
//       <img src={imageUrl} alt="My img" />
//       <p>{'Hello'}</p>
//     </div>
//   );
// };

// export default TestComponent;

/*
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TestComponent = () => {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    description: '',
    image: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    mode: '',
    location: '',
    organiser: '',
    organiserDescription: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('Name', eventDetails.name);
    formData.append('Description', eventDetails.description);
    formData.append('Image', eventDetails.image);
    formData.append('StartDate', eventDetails.startDate);
    formData.append('StartTime', eventDetails.startTime);
    formData.append('EndDate', eventDetails.endDate);
    formData.append('EndTime', eventDetails.endTime);
    formData.append('Mode', eventDetails.mode);
    formData.append('Location', eventDetails.location);
    formData.append('Organiser', eventDetails.organiser);
    formData.append('OrganiserDescription', eventDetails.organiserDescription);
    formData.append('ImageFile', imageFile);
    

    try {
      const res = await axios.post('https://localhost:7296/api/EventDetails/AddEvent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        toast.success('Done');
        console.log("res : ", res.data);
      }).catch((err) => {
        console.log(err)
      });

      console.log("RES : ", res.data);
      // handle success
    } catch (error) {
      toast.error('Something went wrong!!');
      console.error(error);
    }
  };
  const handleChange = (event) => {
    setEventDetails({ ...eventDetails, [event.target.name]: event.target.value });
  };
  return (
    <form onSubmit={handleSubmit} method={'post'} encType={"multipart/form-data"}>
      <label>
        name :
        <input
          type="text"
          name="name"
          value={eventDetails.name}
          onChange={handleChange}
        />
      </label>
      <br /><br />
      <label>
        description :
        <input
          type="text"
          name="description"
          value={eventDetails.description}
          onChange={handleChange}
        />
      </label>
      <br /><br />
      <label>
        image :
        <input
          type="text"
          name="image"
          value={eventDetails.image}
          onChange={handleChange}
        />
      </label>
      <br /><br />

      <label>
        startDate :
        <input
          type="text"
          name="startDate"
          value={eventDetails.startDate}
          onChange={handleChange}
        />
      </label>
      <br /><br />

      <label>
        startTime :
        <input

          type="text"
          name="startTime"
          value={eventDetails.startTime}
          onChange={handleChange}
        />
      </label>
      <br /><br />

      <label>
        endDate :
        <input
          type="text"
          name="endDate"
          value={eventDetails.endDate}
          onChange={handleChange}
        />
      </label>
      <br /><br />

      <label>
        endTime :
        <input
          type="text"
          name="endTime"
          value={eventDetails.endTime}
          onChange={handleChange}
        />
      </label>
      <br /><br />

      <label>
        mode :
        <input
          type="text"
          name="mode"
          value={eventDetails.mode}
          onChange={handleChange}
        />
      </label>
      <br /><br />

      <label>
        location :
        <input
          type="text"
          name="location"
          value={eventDetails.location}
          onChange={handleChange}
        />
      </label>
      <br /><br />

      <label>
        oraganiser :
        <input
          type="text"
          name="organiser"
          value={eventDetails.organiser}
          onChange={handleChange}
        />
      </label>
      <br /><br />

      <label>
        organiserDescription :
        <input
          type="text"
          name="organiserDescription"
          value={eventDetails.organiserDescription}
          onChange={handleChange}
        />
      </label>
      <br /><br />
      <label>
        ImageFile :
        <input
          type="file"
          onChange={(event) => setImageFile(event.target.files[0])}
        />
      </label>
      <br /><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TestComponent;
*/

// import React, { useState } from 'react';
// import './react-tags.css';
// import { WithContext as ReactTags } from 'react-tag-input';
// const KeyCodes = {
//   comma: 188,
//   enter: 13
// };

// const delimiters = [KeyCodes.comma, KeyCodes.enter];

// const TestComponent = () => {
//   const [tags, setTags] = useState([]);

//   const handleDelete = i => {
//     setTags(tags.filter((tag, index) => index !== i));
//   };

//   const handleAddition = tag => {
//     setTags([...tags, tag]);
//   };

//   const handleDrag = (tag, currPos, newPos) => {
//     const newTags = tags.slice();

//     newTags.splice(currPos, 1);
//     newTags.splice(newPos, 0, tag);

//     // re-render
//     setTags(newTags);
//   };

//   // const handleTagClick = index => {
//   //   console.log('The tag at index ' + index + ' was clicked');
//   // };

//   return (
//     <div className="app">
//       <h1> React Tags Example </h1>
//       <div>
//         <ReactTags
//           tags={tags}
//           className='btn primary'
//           delimiters={delimiters}
//           handleDelete={handleDelete}
//           handleAddition={handleAddition}
//           handleDrag={handleDrag}
//           // handleTagClick={handleTagClick}
//           inputFieldPosition="bottom"
//           autocomplete
//           classNames={{
//             tags: 'ReactTags',
//             remove: 'ReactTags__remove',
//             suggestions: 'tags__suggestions'

//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default TestComponent;



import React from 'react';
import { useCookies } from 'react-cookie';

function TestComponent() {
  const [cookies, setCookie, removeCookie] = useCookies(['testCookie']);

  const handleClick = () => {
    const expires = new Date(Date.now() + 60 * 60 * 1000); // Expires in 1 hour
    setCookie('testCookie', 'Hello From Dharmesh!', { path: '/', expires });
  };
  const handleRemove = () => {
    removeCookie('testCookie', { path: '/' });
  };
  return (
    <div>
      <h1>Current Cookie : {cookies['testCookie']}</h1>
      <button onClick={handleClick}>Set Cookie</button>
      <button onClick={handleRemove}>Remove Cookie</button>
    </div>
  );
}

export default TestComponent;
