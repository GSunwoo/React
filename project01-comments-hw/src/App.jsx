import { useState } from "react";
import WriteComm from "./comm/WriteComm";
import Title from "./Title";
import ViewComm from "./comm/ViewComm";

  
function App() {

  const [idx, setIdx] = useState(2);
  const [comments, setComments] = useState([
    {id:1, writer:'길동이', body:'오늘은 5월27일', likes:0, time:'2025-05-27 10:55:24'}
  ]);

  return (<>
    <div className="container mt-4">
      <Title />
      <WriteComm comments={comments} setComments={setComments} idx={idx} setIdx={setIdx} />
      <ul  className="list-group mt-3" >
        <ViewComm comments={comments} setComments={setComments} />
      </ul>
    </div>
  </>);
}

export default App;
