import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function BoardWrite({ user }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(""); //제목은 공백문자열
  const [content, setContent] = useState(""); //내용도 공백문자열
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault({ title, content });
    if (!user) {
      alert("로그인 후 사용가능합니다");
      return (
        <div className="write-blocked">
          <h2>글 작성 접근 불가</h2>
          <p>로그인이 필요한 서비스입니다.</p>
          <button onClick={() => navigate("/login")} className="btn-login">
            로그인 하러 가기
          </button>
        </div>
      );
    }
    try {
      await api.post("/api/board", { title, content });
      alert("글작성 완료");
      navigate("/board");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        //회원가입 400에러 발생
        setErrors(err.response.data); //에러 추출,errors에 저장
      } else {
        console.error(err);
        alert("글쓰기 실패");
      }
    }
  };

  return (
    <div className="board-write-page">
      <h2>새 글 작성</h2>
      <form onSubmit={handleSubmit} className="board-write-form">
        <label>
          제목
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </label>
        <label>
          내용
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            // required
          />
        </label>
        <button type="submit" className="btn-submit">
          작성 완료
        </button>
      </form>
    </div>
  );
}

export default BoardWrite;
