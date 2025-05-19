import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

var apikey = '173ef990a905cd9f8c5cd12232cffa8d';

function Edit(props) {
  const navigate = props.navigate;

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [contents, setContents] = useState('');

  let params = useParams();
  console.log('idx', params.idx);

  let [boardData, setBoardData] = useState({});
  let requestUrl = 'http://nakja.co.kr/APIs/php7/boardViewJSON.php'
  let parameter = 'tname=nboard_news&idx='+params.idx;

  useEffect(function(){
    fetch(requestUrl + '?' + parameter + '&apikey=' + apikey)
    .then((result)=>{
      return result.json();
    })
    .then((json)=>{
      console.log('json',json);
      setBoardData(json);

      setTitle(json.subject);
      setWriter(json.name);
      setContents(json.content);
    });
    return () => {
      console.log('useEffect실행==>컴포넌트 언마운트');
    }
  }, []);

  return (<>
    <header>
      <h2>게시판-작성</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>
    </nav>
    <article>
      <form onSubmit={(event) => {
        event.preventDefault();

        let t = event.target.title.value;
        let w = event.target.writer.value;
        let c = event.target.contents.value;

        console.log(w,t,c);

        fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php', {
          method: 'POST',
          headers: {
            'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: new URLSearchParams({
            tname: 'nboard_news',
            id: 'jsonAPI',
            idx: params.idx,
            name: w,
            subject: t,
            content: c,
            apikey: apikey,
          }),
        })
        .then((response)=> response.json())
        .then((json)=>console.log(json));

        // 글쓰기가 완료되면 목록으로 이동한다.
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
        <input type="submit" value="수정" />
      </form>
    </article>
  </>);
}
export default Edit;