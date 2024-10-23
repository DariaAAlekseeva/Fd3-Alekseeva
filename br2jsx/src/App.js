
import './App.css';
import Br2JSX from './br2jsx';

function App() {
  let text="первый<br>второй<br/>третий<br />последний";
  return (
     <Br2JSX text={text}/>
  );
}


export default App;
