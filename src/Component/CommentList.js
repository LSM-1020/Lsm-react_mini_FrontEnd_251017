function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p>댓글이 없습니다.</p>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <div className="comment-author">
            {comment.author}{" "}
            <span className="comment-date">{comment.date}</span>
          </div>
          <div className="comment-content">{comment.content}</div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
