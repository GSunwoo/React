import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

var apikey = '173ef990a905cd9f8c5cd12232cffa8d';

function Edit(props) {
  const navigate = props.navigate;

  /**
  inputdml value속성에 값을 설정하면 React는 readonly 속성으로 렌더링한다.
  따라서 이 값을 수정하려면 반드시 스테이트가 필요하다. onChange 이벤트리스너
  에서 setter함수를 호출해서 값을 변경할 수 있다.
   */
  //  input의 갯수만큼 스테이트를 생성한다.
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [contents, setContents] = useState('');

  let params = useParams();
  console.log('idx', params.idx);

  let [boardData, setBoardData] = useState({});
  /**
  수정페이지로 진입할 때는 기존 게시물을 읽어와서 폼에 설정해야한다.
  따라서 열람API를 요청한다.
   */
  let requestUrl = 'http://nakja.co.kr/APIs/php7/boardViewJSON.php'
  let parameter = 'tname=nboard_news&idx='+params.idx;

  // 열람 API를 호출하여 데이터를 얻어온다.
  useEffect(function(){
    fetch(requestUrl + '?' + parameter + '&apikey=' + apikey)
    .then((result)=>{
      return result.json();
    })
    .then((json)=>{
      console.log('json',json);
      setBoardData(json);

      // 얻어온 데이터를 파싱해서 스테이트의 setter함수를 호출한다.
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
    {/* 입력값 수정 후 전송 버튼을 누르면 submit 이벤트가 발생된다. */}
    <article>
      <form onSubmit={(event) => {
        event.preventDefault();

        // 폼값 정리
        // let i = event.target.idx.value;
        let t = event.target.title.value;
        let w = event.target.writer.value;
        let c = event.target.contents.value;

        console.log(w,t,c);

        // 수정API 호출
        fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php', {
          method: 'POST',
          headers: {
            'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          // 수정이므로 idx가 포함되어야한다.
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

        // 수정후 열람페이지로 이동한다.
        navigate('/view/'+params.idx);

        // 경우에 따라서 목록으로 이동할 수도 있다.
        // navigate('/list');
      }}>
        {/* 수정의 경우 게시물의 일련번호를 서버로 전송해야하므로 아래와 같이
        hiddent타입의 상자를 만들어서 값을 설정해야한다. */}
        {/* <input type="hidden" name='idx' value={params.idx} /> */}
        <table id="boardTable">
          <colgroup>
            <col width="30%"/>
            <col width="*"/>
          </colgroup>
          <tbody>
            <tr>
              <th>작성자</th>
              {/* 스테이트에 저장된 값을 value에 설정하고, onChange 이벤트 리스너를
              통해 입력한 값으로 실시간으로 변경해서 적용한다. */}
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