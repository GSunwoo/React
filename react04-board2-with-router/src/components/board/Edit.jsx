import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Edit(props) {
  var params = useParams();
  console.log('파라미터', params.no);

  const navigate = props.navigate;
  const boardData = props.boardData;
  const setBoardData = props.setBoardData;

  const selectRow = boardData.reduce((pV, cV)=>{
    return (cV.no===Number(params.no))? cV : pV;
  }, {});

  const [title, setTitle] = useState(selectRow.title);
  const [writer, setWriter] = useState(selectRow.writer);
  const [contents, setContents] = useState(selectRow.contents);

  return (<>
    <header>
      <h2>게시판-작성</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>
    </nav>
    <article>
      <form onSubmit={(event)=>{
        event.preventDefault();

        let t = event.target.title.value;
        let w = event.target.writer.value;
        let c = event.target.contents.value;
        
        console.log(boardData[boardData.indexOf(selectRow)]);
        
        let copyBoardData = [...boardData];

        let editBoardData = {no:selectRow.no, writer:w, title:t,  date:selectRow.date, contents:c};

        for(let i=0; i<copyBoardData.length; i++){
          if(copyBoardData[i].no===Number(params.no)){
            copyBoardData[i] = editBoardData;
            console.log('hi');
            break;
          }
        }

        console.log(copyBoardData[copyBoardData.indexOf(selectRow)]);
        setBoardData(copyBoardData);
        navigate('/list');
      }}>
        <table id="boardTable">
          <colgroup>
            <col width="30%"/>
            <col width="*"/>
          </colgroup>
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer" value={writer}
                      onChange={(event)=>{
                        setWriter(event.target.value);
                      }} /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" value={title}
                      onChange={(event)=>{
                        setTitle(event.target.value);
                      }}/></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea name="contents" cols="22" rows="3" value={contents}
                      onChange={(event)=>{
                        setContents(event.target.value);
                      }}></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="수정"/>
      </form>
    </article>
  </>); 
}
export default Edit;