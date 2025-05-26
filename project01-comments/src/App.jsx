import './App.css';
import {useState} from 'react';

import Board from './commons/Board';
import ComList from './commons/ComList';
import ComWrite from './commons/ComWrite';
import ComEdit from './commons/ComEdit';
import { Route, Routes } from 'react-router-dom';
  
function App() {
  const [myData, setMyData] = useState([
    {no:1, comment:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01'},
    {no:2, comment:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'},
    {no:3, comment:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'},
  ]);

  return (
    <div className="App">
      <Routes>
        <Route></Route>
      </Routes>
      <Board></Board>
      <ComList myData={myData}></ComList>
      <ComWrite />
      <ComEdit />
    </div>
  );
}

export default App;
