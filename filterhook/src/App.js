import './App.css';
import Filter from './components/Filter';

function App() {
  const wordsArray = ['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate'];

  return (
  <Filter initWords={wordsArray} />
  )
}

export default App;
