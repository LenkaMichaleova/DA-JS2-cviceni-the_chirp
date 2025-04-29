import './style.css';

export const Post = ({ post }) => {
  return (
    <div className="post">
      <img
        className="post__avatar"
        src={`http://localhost:4000${post.userAvatar}`}
        alt={post.userName}
      />
      <div className="post__body">
        <div className="post__head">
          <div className="post__user">
            <h2>{post.userName}</h2>
            <a className="post__handle" href={`/profil.html?user=${post.userId}`}>@{post.userHandle}</a>
          </div>
          <button data-id={post.id} className="edit-btn">Edit</button>
          <button data-id={post.id} className="delete-btn">Delete</button>
        </div>
        <p className="post__text">{post.text}</p>
      </div>
    </div>
  );
};
