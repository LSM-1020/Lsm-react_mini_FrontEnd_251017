import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardWrite({ user }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  if (!user) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 글쓰기 API 호출
    alert("글 작성 기능 구현 필요");
    // 작성 완료 후 게시판 페이지로 이동
    navigate("/board");
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
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            required
          />
        </label>
        <label>
          내용
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            required
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
