import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const BoardDetail = () => {
  const { id } = useParams();
  const [board, setBoard] = useState();
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <div>제목 : {board.title}</div>
      <div>작성자 : {board.writer.username}</div>
      <div>내용 : {board.content}</div>
    </>
  )
}

export default BoardDetail;