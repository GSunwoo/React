// 파이어스토어 객체 임포트
import { useState } from 'react';
import {firestore} from './firestoreConfig';
// 새로운 도큐먼트(문서)를 입력하거나 읽을때 사용하는 함수 임포트
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

function App() {
  // 파이어스토어 데이터를 저장할 스테이트 정의. 초기값은 빈 배열로 설정.
    const [showData, setShowData] = useState([]);

    const getCollection = async () => {
      let trArray = [];
      // 컬렉션명으로 하위 도큐먼트를 읽어온다.
      const querySnapshot = await getDocs(collection(firestore, 'members'));
      // 배열로 얻어온 도큐먼트의 갯수만큼 반복
      querySnapshot.forEach((doc)=>{
        // 콜백된 객체(doc)를 기반으로 data()함수를 호출하여 실제데이터 얻기
        let memberInfo = doc.data();

        // tr태그로 출력할 항목 구성
        trArray.push (
          <tr key={doc.id}>
            <td className='cen'>{doc.id}</td>
            <td className='cen'>{memberInfo.pass}</td>
            <td className='cen'>{memberInfo.name}</td>
            <td className='cen'>{memberInfo.regdate}</td>
          </tr>
        );
      });
      // 파싱된 데이터를 통해 스테이트 변경 및 리렌더링
      setShowData(trArray);
    }

  return (<>
    <h2>Firebase - Firestore 연동 App</h2>
    <h3>전체조회하기</h3>
    <button type='button' onClick={getCollection}>전체조회</button>
    <table className="table table-bordered" border='1'>
      <thead>
        <tr className='text-center'>
          <th>아이디</th>
          <th>비밀번호</th>
          <th>이름</th>
          <th>가입일</th>
        </tr>
      </thead>
      <tbody>
        {/* 상단에서 구성한 데이터를 여기서 출력 */}
        {showData}
      </tbody>
    </table>
  </>); 
}
export default App;