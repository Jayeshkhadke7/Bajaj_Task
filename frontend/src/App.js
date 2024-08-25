import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(jsonInput);
      const result = await axios.post('https://bajaj-finserv-task-3g51.onrender.com/bfhl', data);
      setResponse(result.data);
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Invalid JSON or request failed');
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;

    const options = selectedOptions.map(option => option.value);
    const filteredResponse = {
      numbers: options.includes('Numbers') ? response.numbers : [],
      alphabets: options.includes('Alphabets') ? response.alphabets : [],
      highest_lowercase_alphabet: options.includes('Highest lowercase alphabet') ? response.highest_alphabet : []
    };

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  const dropdownOptions = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
  ];

  return (
    <div className="App">
      <h1>React Frontend for BFHL API</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON here, e.g., {"data": ["A", "b", "C", "1", "2"]}'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <Select
        isMulti
        options={dropdownOptions}
        onChange={handleSelectChange}
      />
      {renderResponse()}
    </div>
  );
};

export default App;
