import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function BoardDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    // TODO: API 호출로 댓글 목록 불러오기
    setComments([
      { id: 1, author: "user1", content: "첫 댓글입니다.", date: "2025-10-17" },
      {
        id: 2,
        author: "user2",
        content: "두번째 댓글입니다.",
        date: "2025-10-18",
      },
    ]);
  };

  useEffect(() => {
    // TODO: API 호출로 게시글 데이터 불러오기
    setPost({
      id,
      title: `게시글 제목 ${id}`,
      content: `게시글 ${id}의 상세 내용입니다.`,
      author: `user${id}`,
      date: "2025-10-17",
    });
    fetchComments();
  }, [id]);

  const handleCommentAdded = () => {
    fetchComments(); // 댓글 작성 후 댓글 목록 다시 불러오기
  };

  if (!post) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  return (
    <div className="board-detail-page">
      <h2>{post.title}</h2>
      <div className="board-detail-meta">
        <span>작성자: {post.author}</span> | <span>{post.date}</span>
      </div>
      <div className="board-detail-content">{post.content}</div>

      <div className="comments-section">
        <h3>댓글</h3>
        <CommentList comments={comments} />
      </div>

      {user ? (
        <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
      ) : (
        <p>댓글 작성은 로그인 후 가능합니다.</p>
      )}

      {user && (
        <button className="btn-back" onClick={() => navigate("/board")}>
          목록으로 돌아가기
        </button>
      )}
    </div>
  );
}

export default BoardDetail;
