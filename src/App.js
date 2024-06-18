import './App.css';

import Home from './pages/Home/Home';
import TopNav from './components/topNav/Nav';
import Menu from './pages/Menu/Menu';
import Modal from './components/Modal/Modal';

function App() {

  return (
    <div className="App">
      <TopNav />
      <Modal />
      <Home />
      <Menu/>
    </div>
  );
}

export default App;
