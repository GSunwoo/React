// 라우팅 관련 컴포넌트 임포트
import {Routes, Route, useNavigate} from 'react-router-dom';

import List from './components/board/List';
import View from './components/board/View';
import Write from './components/board/Write';
import NotFound from './components/common/NotFound';
import Edit from './components/board/Edit';

function App() {

  const navigate = useNavigate();

  return(<>
  {/* 라우팅 처리를 위해 App컴포넌트를 감싸야 하므로 이와같이 App.jsx에서
  처리해도 된다. 하지만 주로 main.jsx에서 처리하는게 좋다. */}
      <Routes>
        {/* 첫 실행시에는 목록이 렌더링 된다. */}
        <Route path='/' element={<List></List>} />
        <Route path='/list' element={<List></List>} />
        {/* 중첩라우팅으로 게시물의 일련번호가 하위경로 형태로 추가된다.
        이것을 useParams 훅을 통해 읽어올 수 있다. */}
        <Route path='/view'>
          <Route path=':idx' element={<View navigate={navigate}></View>} />
        </Route> 
        <Route path='/write' element={<Write navigate={navigate}></Write>} />
        {/* 수정의 경우에도 열람과 마찬가지로 수정할 게시물의 일련번호가
        필요하므로 중첩라우팅으로 설정해야한다. */}
        <Route path='/edit'>
          <Route path=':idx' element={<Edit navigate={navigate}></Edit>} />
        </Route> 
        <Route path='*' element={<NotFound></NotFound>} />
      </Routes>
  </>);
}

export default App;
