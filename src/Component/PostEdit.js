import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig"; // axios 인스턴스가 있다고 가정

function BoardEdit({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 게시글 데이터 불러오기
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/board/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        alert("게시글을 불러오는 중 오류가 발생했습니다.");
        navigate("/board");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    try {
      await api.put(`/api/board/${id}`, { title, content });
      alert("게시글이 수정되었습니다.");
      navigate(`/board/${id}`);
    } catch (error) {
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="board-edit-page">
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit} className="board-edit-form">
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-save">
          수정 완료
        </button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => navigate(`/board/${id}`)}
        >
          취소
        </button>
      </form>
    </div>
  );
}

export default BoardEdit;
