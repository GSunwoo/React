import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

var apikey = '173ef990a905cd9f8c5cd12232cffa8d';

function View(props) {
  // 페이지 이동을 위한 훅
  const navigate = props.navigate;
  // 중첩된 라우팅에서 일련번호를 읽어오기 위한 훅
  let params = useParams();
  console.log('idx', params.idx);

  // 열람 API는 JSON 객체이므로 빈객체를 초기값으로 지정
  let [boardData, setBoardData] = useState({});
  // API 요청 주소
  let requestUrl = 'http://nakja.co.kr/APIs/php7/boardViewJSON.php'
  // 파라미터
  let parameter = 'tname=nboard_news&idx='+params.idx;

  // 1차 렌더링 후 열람 API 요청
  useEffect(function(){
    fetch(requestUrl + '?' + parameter + '&apikey=' + apikey)
    .then((result)=>{
      return result.json();
    })
    .then((json)=>{
      console.log('json',json);
      // 스테이트 변경 및 리렌더링
      setBoardData(json);
    });
    return () => {
      console.log('useEffect실행==>컴포넌트 언마운트');
    }
  }, []);

  return (<>
    <header>
      <h2>게시판-읽기</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>&nbsp;
      {/* 수정페이지로 진입시 일련번호가 필요하므로 링크를 수정 */}
      <Link to={"/edit/"+params.idx}>수정</Link>&nbsp;
      <Link onClick={()=>{
        // 삭제를 누르면 confirm창을 먼저 띄워서 삭제여부를 물어본다.
        if(window.confirm('삭제하시겠습니까?')){
          console.log('삭제idx', params.idx);
          fetch("http://nakja.co.kr/APIs/php7/boardDeleteJSON.php",{
            method: 'POST',
            headers: {
              'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            // 수정이므로 idx가 포함되어야한다.
            body: new URLSearchParams({
              tname: 'nboard_news',
              idx: params.idx,
              apikey: apikey,
            }),
          })
          .then((result)=> {
            return result.json();
          })
          .then((json)=>{
            console.log(json);
            // 삭제에 성공한 경우에는 목록으로 이동
            if(json.result==='success'){
              alert('삭제되었습니다.');
              navigate('/list');
            }
            else{
              alert('삭제에 실패했습니다.')
            }
          })
        }
      }}>삭제</Link>
    </nav>
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="30%"/>
          <col width="*"/>
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            {/* 내용 출력은 JSON객체이므로 각 Key를 통해 접근하면 된다. */}
            <td>{boardData.name}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{boardData.subject}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{boardData.regdate}</td>
          </tr>
          <tr>
            <th>내용</th>
            {/* HTML태그가 그대로 출력된다. React는 보안적인 문제로
            태그를 화면에 그대로 출력하는 것이 디폴트 설정이다. */}
            {/* <td style={{'whiteSpace':'pre-wrap'}}>{boardData.content}</td> */}
            {/* 마크업이 적용된 상태로 출력된다. */}
            {/* 이미지가 테이블의 크기보다 큰 경우에는 450px로 맞춰서 출력한다.
            index.css에 설정되어 있다. */}
            <td className="tableImg" style={{'whiteSpace':'pre-wrap'}} dangerouslySetInnerHTML={{__html: boardData.content}}></td>
          </tr>
        </tbody>
      </table>
    </article>
  </>); 
}
export default View;