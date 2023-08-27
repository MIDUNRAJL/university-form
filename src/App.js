import React, { useState } from 'react';
import List from './List';

const course1 = ["College: Amrita Vishwa Vidyapeetam", "Duration: 4 years", "Qualifying rank:4800", "Electives: 8"]
const course2 = ["College: Amrita Vishwa Vidyapeetam ", "Duration: 4 years", "Qualifying rank:6000", "Electives: 6"]
const course3 = ["College: Amrita Vishwa Vidyapeetam", "Duration: 4 years", "Qualifying rank:5800", "Electives: 8"]
const course4 = ["College: Amrita Vishwa Vidyapeetam", "Duration: 4 years", "Qualifying rank:8000", "Electives: 8"]
const course5 = ["College: Amrita Vishwa Vidyapeetam", "Duration: 4 years", "Qualifying rank: 3000", "Electives: 6"]
function App() {
  const initialFormData = {
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    checkbox: '',

  };
  const [formData, setFormData] = useState(initialFormData);
  const [savedId, setSavedId] = useState(null);

  const [data, setData] = useState({});

  const handleChange = (event) => {

    const { name, value, type, checked } = event.target;

    const inputValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({

      ...prevData,

      [name]: inputValue

    }));

  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5500/submit', {
        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

        },

        body: JSON.stringify(formData),

      });
      if (!response.ok) {

        throw new Error('Error saving form data');

      }

      const data = await response.json();

      setSavedId(data.id);

      console.log('Form data submitted:', data);

      setFormData(initialFormData);

    } catch (error) {

      console.error('An error occurred:', error);

    }

  };
  const handleViewClick = async () => {
    if (savedId) {
      try {

        const response = await fetch(`http://localhost:5500/data?id=${savedId}`);

        const fetchedData = await response.json();

        setData(fetchedData);

        console.log(Object.entries(fetchedData));

      } catch (error) {

        console.error('Error fetching data:', error);

      }

    }

  };

  return (
    <div>
      <h1>University Registeration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email1"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />


        <label>
          Mobile number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />

        <label>
          Gender :
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
          />
          Female
        </label>
        <br />
        <br />

        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onchange={handleChange}
          />
        </label>
        <br />
        <br />

        <label>
          CGPA:
          <input
            type="tel"
            name="number"
            value={formData.number}
            onchange={handleChange}
          />
        </label>
        <br />
        <br />

        <label>
          Courses:
          <select
            name="courses"
            value={formData.courses}
            onchange={handleChange}>
            <option value="">Select</option>
            <option value="mech">aeronautical Engineering</option>
            <option value="computer">Computer Science Engineering</option>
            <option value="electrical">Electrical Engineering</option>
            <option value="chemical">Chemical Engineering</option>
            <option value="biomedical">Biomedical Engineering</option>
          </select>
        </label>
        <br />
        <br />


        <div>
          <List heading="aeronautical Engineering" value={course1} />
          <List heading="Computer Science Engineering" value={course2} />
          <List heading="Electrical Engineering" value={course3} />
          <List heading="Chemical Engineering" value={course4} />
          <List heading="Biomedical Engineering" value={course5} />
        </div>
        <label>
          <input
            type="checkbox"
            name="checkbox"
            checked={formData.checkbox}
            onChange={handleChange}
            required
          />
          I have read and agree to all terms and conditions.
        </label>
        <br />
        <br />



        <button type="submit">Submit</button>

        {savedId && <p>Form Data saved{savedId}</p>}

        <button onClick={handleViewClick} disabled={!savedId} id="view">View Data</button>
        {Object.entries(data).length > 0 && (

          <div>

            <h2>Fetched Data:</h2>

            <ul>

              {Object.entries(data).map(item => (

                // <li key={item.id}>{item.fetchedData}</li>

                <li key={item[0]}>{JSON.stringify(item, null, 2)}</li>

                // <pre>{JSON.stringify(data, null, 2)}</pre>

              ))}

            </ul>

          </div>

        )}

      </form>
      <div id="value"></div>
      {/* <div>
        <List heading="Mechanical Engineering" value={course1} />
        <List heading="Computer Science Engineering" value={course2} />
        <List heading="Electrical Engineering" value={course3} />
        <List heading="Chemical Engineering" value={course4} />
        <List heading="Biomedical Engineering" value={course5} />
      </div> */}
    </div>

  );

}
export default App;
