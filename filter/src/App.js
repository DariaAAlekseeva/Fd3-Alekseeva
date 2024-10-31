import React from 'react';
import Filter from './Filter';

function App() {
  const wordsArray = ['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate'];

  return (
  <Filter initWords={wordsArray} />
  )
}

export default App;