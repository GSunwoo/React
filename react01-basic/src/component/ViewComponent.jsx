function ViewComponent(props){
  return(<>
    <header>
      <h2>게시판-읽기</h2>
    </header>
    <nav>
      <a href="/" onClick={(event)=>{
        event.preventDefault();
        props.changeMode('list');
      }}>목록</a>&nbsp;
      <a href="/" onClick={(event)=>{
        alert('수정')
        event.preventDefault();
      }}>수정</a>&nbsp;
      <a href="/" onClick={(event)=>{
        alert('삭제')
        event.preventDefault();
      }}>삭제</a>
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
            <td>성유겸</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>오늘은 React공부하는 날</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>2023-05-05</td>
          </tr>
          <tr>
            <th>내용</th>
            {/* br태그에도 self-closing으로 표현해야 한다. */}
            <td>열심히 해봅시당<br/>열공 합시당</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>);
}

export default ViewComponent