import React, { useState } from 'react';
import axios from 'axios'; // You'll need to install axios: npm install axios

function FormComponent() {
  const [dbUri, setDbUri] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the form data to the server
      const response = await axios.post('http://localhost:8000/submit-db-info', {
        dbUri,
        url,
        username,
        password,
      });

      console.log(response.data); // Server response
      setDocumentUrl(response.data.documentUrl);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <h1>Database Configuration</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Database URI:
          <input type="text" value={dbUri} onChange={(e) => setDbUri(e.target.value)} />
        </label>
        <br />
        <label>
          URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      
      </form>
      {documentUrl && (
        <div>
          <h2>Download Document</h2>
          <a href={documentUrl} download>
            Download Word Document
          </a>
        </div>
      )}
    </div>
  );
}

export default FormComponent;
