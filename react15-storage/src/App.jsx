import { useEffect } from "react";
import { storage } from "./storageConfig";
// 저장소에 대한 참조생성 및 파일업로드 함수 임포트
import { ref, listAll, deleteObject} from 'firebase/storage';
import { useState } from "react";

function App() {
  // 스토리지 연결 및 root 경로의 참조 생성
  const listRef = ref(storage, '');
  // 파일목록 저장
  const [fileLists, setFileLists] = useState([]);
  // 삭제 후 리렌더링을 위한 스테이트
  const [renderFlag, setRenderFlag] = useState(false);


  useEffect(()=>{
    let fileRows = [];
    // 생성된 참조객체에서 모든 폴더와 파일명 인출
    listAll(listRef)
      .then((res)=>{
        res.prefixes.forEach((folderRef) => {
          console.log('폴더', folderRef.name);
        });
        res.items.forEach((itemRef) => {
          // 개별 파일을 반복하면서 풀경로를 통해 삭제를 위한 참조객체 생성
          const deleteRef = ref(storage, itemRef.fullPath);

          fileRows.push(
            <tr key={itemRef.name}>
              <td>{itemRef.name}</td>
              <td>{itemRef.bucket}</td>
              <td>{itemRef.fullPath}</td>
              <td><button type="button" onClick={(e)=>{
                if(window.confirm('삭제할까요?')){
                  // 삭제할 파일의 참조객체를 통해 파일 삭제 처리
                  deleteObject(deleteRef).then(()=>{
                    console.log('파일 삭제 성공');
                    // 삭제 성공시에는 화면의 리렌더링 
                    setRenderFlag(!renderFlag);
                  })
                  .catch((error)=>{
                    console.log('파일 삭제 실패');
                  });
                }
              }}>삭제</button>
              </td>
            </tr>
          );
        });
        setFileLists(fileRows);
      })
      .catch((error)=>{
        console.log('에러발생', error);
      })
  },[renderFlag]);
  /*
  파일 삭제시 renderFlag가 변경되므로, 그때마다 useEffect()가 재실행되도록
  의존성배열을 설정한다.
  */

  // 스토리지에서 얻어온 파일목록을 저장한 스테이트 생성
  console.log('렌더링');
  return(<>
    <h2>Firebase - Storage App</h2>
    <h3>파일 목록 및 이미지 다운로드</h3>
    <table border={1}>
      <thead>
        <tr>
          <th>bucket</th>
          <th>fullPath</th>
          <th>name</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {/* 1차 렌더링 후 useEffect에서 얻어온 파일 목록이 출력됨 */}
        {fileLists}
      </tbody>
    </table>
  </>);
}
export default App;