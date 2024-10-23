import './App.css';
import DoubleButton from './components/DoubleButton';
import { withRainbowFrame } from './components/withRainbowFrame';

const App = () => {
  const colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple', 'deep-purple'];
  let FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);
  return (
    <>
      <DoubleButton caption1='однажды' caption2='пору' cbPressed={num => alert(num)} > в студеную зимнюю </DoubleButton>
      <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={num => alert(num)}> вышел, был сильный </FramedDoubleButton>
    </>
  );
};

export default App;