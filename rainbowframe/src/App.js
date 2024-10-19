
import './App.css';
import RainbowFrame from './RainbowFrame';

const App = () => {
  const colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple', 'deep-purple'];

  return (
    <RainbowFrame colors={colors}>
      <h1>Hello!</h1>
    </RainbowFrame>
  );
};

export default App;
