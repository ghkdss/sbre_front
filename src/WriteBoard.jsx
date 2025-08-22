import { useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";

const WriteBoard = ({ userInfo }) => {
  const [board, setBoard] = useState({
    title : '',
    content : '',
    writer: {username : userInfo.username}
  })
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setBoard({
      ...board,
      [e.target.name] : e.target.value
    })
  }

  return (
    <>
      제목 : <input type="text" name="title" onChange={onChangeHandler} /> <br />
      내용 : <textarea name="content" onChange={onChangeHandler}></textarea> <br />
      <button onClick={() => {
        axiosInstance.post('/board', board)
          .then(response => {
            alert(response.data)
            navigate('/')
          }).catch(error => {
            console.error(error)
          })
      }}>글등록</button>
    </>
  )
}

export default WriteBoard;