import React, { useEffect, useState } from 'react';

const Table = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [output, setOutput] = useState([]);
  const [error, setError] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setError('');
  }, [selectedOption])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === '') {
      setError('Please select an option!');
      return;
    }

    setOutput((prevOutput) => {
      const lastColumn = prevOutput[prevOutput.length - 1];

      if (lastColumn && lastColumn[lastColumn.length - 1] === selectedOption) {
        // If last selected value is the same, append to the last column
        return [...prevOutput.slice(0, -1), [...lastColumn, selectedOption]];
      } else {
        // If last selected value is different, add a new column
        return [...prevOutput, [selectedOption]];
      }
    });

    setSelectedOption('');
    setError('');
  };

  const maxRows = Math.max(...output.map((column) => column.length));

  const transposedOutput = Array.from({ length: maxRows }, (_, rowIndex) =>
    output.map((column) => column[rowIndex])
  );

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Column-wise Selection</h2>
        <select value={selectedOption} onChange={handleOptionChange} className="select-option">
          <option value="">Select an option</option>
          <option value="H">Head</option>
          <option value="T">Tail</option>
        </select>
        <button type="submit" className="submit-button">Submit</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <table className="output-table">
        <tbody>
          {transposedOutput.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, columnIndex) => (
                <td key={`${rowIndex}-${columnIndex}`} className="output-cell">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
