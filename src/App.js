import './App.css';

import Home from './pages/Home/Home';
import TopNav from './components/topNav/Nav';
import Menu from './pages/Menu/Menu';

function App() {

  return (
    <div className="App">
      <TopNav />
      <Home />
      <Menu/>
    </div>
  );
}

export default App;
