import './App.css';
import Dashboard from './components/Dashboard';
import SideMenu from './components/SideMenu'

function App() {
  return (
  <div id="wrapper">
    <SideMenu text="Serwisant PRO"/>
    <Dashboard />
  </div>  
  );
}

export default App;
