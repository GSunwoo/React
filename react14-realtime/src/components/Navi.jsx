import { Link } from "react-router-dom";

function Navi() {
  return (<>
    <Link to="/crud">RealtimeCRUD</Link>&nbsp;&nbsp;
    <Link to="/listener">RealtimeListener</Link>&nbsp;&nbsp;
    <Link to="/chat">RealtimeChat</Link>
  </>); 
}
export default Navi;