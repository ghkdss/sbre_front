import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const BoardDetail = ({ userInfo }) => {
  const { id } = useParams();
  const [board, setBoard] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/board/${id}`)
      .then(response => {
        console.log(response.data)
        setBoard(response.data)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  if(loading)
    return <h1>로딩중 입니다....</h1>

  if(!board)
    return <h1>존재하지 않는 게시물입니다.</h1>

  return (
    <>
      <div>제목 : {board.title}</div>
      <div>작성자 : {board.writer.username}</div>
      <div>내용 : {board.content}</div>
      <button onClick={() => {
        if(board.writer.username != userInfo.username) {
          alert('작성자만 삭제 가능합니다.')
          return;
        }

        axiosInstance.delete(`/board?id=${board.id}`)
          .then(response => {
            alert(response.data);

            navigate('/')
          }).catch(error => {
            alert('삭제 실패')
            console.log(error)
          })

      }}>삭제</button>
    </>
  )
}

export default BoardDetail;