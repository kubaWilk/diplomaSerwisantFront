import './App.css';
import DashContainer from './components/DashContainer';
import SideMenu from './components/SideMenu'

function App() {
  return (
  <div id="wrapper">
    <SideMenu text="Serwisant PRO"/>
    <DashContainer sectionName="Start"/>
  </div>  
  );
}

export default App;
