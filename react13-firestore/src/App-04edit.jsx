// 파이어스토어 객체 임포트
import { useEffect, useState } from 'react';
import {firestore} from './firestoreConfig';
// 새로운 도큐먼트(문서)를 입력하거나 읽을때 사용하는 함수 임포트
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

function App() {
  console.log('firestore', firestore);

  const nowDate = () => {
    let dateObj = new Date();
        var year = dateObj.getFullYear();
        var month = ('0' + (1 + dateObj.getMonth())).slice(-2);
        var day = ('0' + dateObj.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
  }
  
  // 도큐먼트 수정 함수
  const memberEdit = async(p_collection, p_id, p_pass, p_name) => {
    // 기존 입력함수와 완전히 동일함. 즉 기존 도큐먼트가 있으면 수정 처리된다.
    await setDoc(doc(firestore, p_collection, p_id),{
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    });
    console.log('수정성공');
  }

  // select태그 의 내용을 추가하기 위한 스테이트
  const [showData, setShowData] = useState([]);

  // 화면의 렌더링이 끝난 후 실행되는 수명주기 함수
  useEffect(()=>{
    const getCollection = async () => {
      let trArray = [];
      // members 컬렉션 하위의 도큐먼트를 먼저 읽어온다.
      const querySnapshot = await getDocs(collection(firestore, 'members'));
      // 갯수만큼 반복해서 option 태그를 생성한다.
      querySnapshot.forEach((doc)=>{
        let memberInfo = doc.data();
        trArray.push (
          // value는 회원아이디, text는 이름 설정
          <option key={doc.id} value={doc.id}>{memberInfo.name}</option>
        );
      });
      return trArray;
    }

    // 함수 호출 후 콜백 데이터를 then절에서 처리
    getCollection().then((result)=>{
      console.log('result', result);
      // 스테이트를 변경하면 리렌더링 되면서 option이 추가된다.
      setShowData(result);
    });
  }, []);
  /*
  useEffect의 두번째 인자인 의존성배열은 빈배열을 적용하여 렌더링 후 
  딱 한번만 실행되도록 처리한다.
  */

  // input에 설정할 스테이트 선언
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  return (<>
    <h2>Firebase - Firestore 연동 App</h2>
    <h3>개별 조회 및 수정하기</h3>
    {/* 항목을 선택하면 change 이벤트가 발생된다. */}
    <select onChange={async (e)=>{
      // 선택항목의 value를 변수에 저장한다. 즉 아이디를 저장한다.
      let user_id = e.target.value;
      console.log('선택', user_id);

      // 컬렉션명과 도큐먼트(아이디)를 통해 데이터의 참조를 얻어온다.
      const docRef = doc(firestore, 'members', user_id);
      // 참조값을 통해 해당 도큐먼트를 얻어온다.
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        console.log('Document data:', docSnap.data());
        // 해당 도큐먼트가 존재하면 데이터를 인출해서
        let callData = docSnap.data();
        // 각 스테이트를 변경하여 input에 값을 설정한다.
        setId(user_id);
        setPass(callData.pass);
        setName(callData.name);
      }
      else{
        console.log('No such document');
      }
    }}>
      <option value=''>선택하세요</option>
      {showData}
    </select>

    <form id='myForm' onSubmit={(event)=>{
          event.preventDefault();

          // submit 이벤트 발생시 폼값을 얻어온다.
          let collection = event.target.collection.value;
          let id = event.target.id.value;
          let pass = event.target.pass.value;
          let name = event.target.name.value;
          
          if(id==''){alert('사용자를 먼저 선택해주세요'); return;}

          // 수정을 위한 함수 호출
          memberEdit(collection, id, pass, name);

          // 수정이 완료되면 입력폼 비우기
          event.target.id.value = '';
          event.target.pass.value = '';
          event.target.name.value = '';
        }}>
      <table className="table table-bordered table-striped">
        <colgroup>
          <col width="30%"/>
          <col width="*"/>
        </colgroup>
        <tbody>
          <tr>
            <th>컬렉션(테이블)</th>
            <td><input type="text" name="collection" value='members'
              onChange={(e)=>{
                setCollName(e.target.value);
              }}/></td>
          </tr>
          <tr>
            <th>아이디</th>
            <td><input type="text" name="id" value={id}
                onChange={(e)=>{
                  setId(e.target.value);
                }} readOnly/></td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td><input type="text" name="pass" value={pass}
              onChange={(e)=>{
                  setPass(e.target.value);
                }}/></td>
          </tr>
          <tr>
            <th>이름</th>
            <td><input type="text" name="name" value={name}
              onChange={(e)=>{
                  setName(e.target.value);
                }}/></td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="수정"/>
    </form>
  </>); 
}
export default App;