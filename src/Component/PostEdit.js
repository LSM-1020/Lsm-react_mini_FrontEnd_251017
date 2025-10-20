import { useState } from "react";
import api from "../api/axiosConfig";

function PostEdit({ post, setEditing, setPost }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/api/board/${post.id}`, { title, content });
      setPost(res.data);   // 수정된 내용 BoardDetail로 반영
      setEditing(false);   // 수정 모드 종료 -> BoardDetail View로 돌아가기
      alert("게시글 수정 완료!");
    } catch (err) {
      console.error(err);
      alert("게시글 수정 실패!");
    }
  };

  return (
    <div className="post-edit-page">
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            required
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용"
            rows={10}
            required
          />
        </div>
        <button type="submit">수정 완료</button>
        <button type="button" onClick={() => setEditing(false)}>
          취소
        </button>
      </form>
    </div>
  );
}

export default PostEdit;
