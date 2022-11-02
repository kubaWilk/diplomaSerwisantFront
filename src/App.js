import './App.css';
import Dashboard from './components/layout/Dashboard';
import SideMenu from './components/layout/SideMenu'
import React, {useState} from 'react';


function App() {  
  const [sectionName, setSectionName] = useState('Start');

  return (
      <div id="wrapper">
        <SideMenu onLinkClick={setSectionName} text="Serwisant PRO" />
        <Dashboard sectionName={sectionName} />
      </div>  
  );
}

export default App;
