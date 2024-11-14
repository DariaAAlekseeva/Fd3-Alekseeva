import React, { useState } from 'react';

function App() {
  const [value, setValue] = useState(1);

  function changeHandler(event) {
    setValue(event.target.value);

  }

  return <div>
    <label>
      <input
        type='radio'
        name='radio'
        value='1'
        checked={value === '1' ? true : false}
        onChange={changeHandler}
      />java</label>
    <label>
      <input
        type='radio'
        name='radio'
        value='2'
        checked={value === '2' ? true : false}
        onChange={changeHandler}
      />js</label>
    <label>
      <input
        type='radio'
        name='radio'
        value='3'
        checked={value === '3' ? true : false}
        onChange={changeHandler}
      />python</label>
    <p>{value}</p>
  </div>

}

export default App;