import { useState } from "react";

function CommentForm({ postId, onCommentAdded }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      alert("댓글 내용을 입력하세요.");
      return;
    }
    // TODO: API 호출로 댓글 저장 처리
    alert(`댓글 작성 완료: ${comment}`);
    setComment("");
    if (onCommentAdded) {
      onCommentAdded();
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 작성하세요."
        rows={3}
        required
      />
      <button type="submit" className="btn-submit-comment">
        댓글 작성
      </button>
    </form>
  );
}

export default CommentForm;
