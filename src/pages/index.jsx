import { render } from '@czechitas/render';
import { Post } from '../components/Post';
import '../global.css';
import './index.css';

// nafejkovaný login
const loggedInUserId = 1;
const response = await fetch(`http://localhost:4000/api/users/${loggedInUserId}`);
const json = await response.json();
const loggedInUser = json.data;

let editedPost = null

// ------------------ ZÍSKÁNÍ DAT Z API ------------------------ //
const fetchPosts = async () => {
  const response = await fetch(`http://localhost:4000/api/posts`);
  const json = await response.json();
  return json.data;
};
const posts = await fetchPosts();

// ----------------- VÝPIS STRÁNKY ----------------------- //
document.querySelector('#root').innerHTML = render(
  <div className="container">
    <h1>The Chirp</h1>
    <h2>Přihlášen jako: {loggedInUser.name}</h2>
    <form className="post-form">
      <p>Co máte na srdci?</p>
      <textarea placeholder="Napište něco..." className="post-input"></textarea>
      <button type="submit">Odeslat</button>
    </form>
    
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  </div>
);

// ----------------------- TLAČÍTKA (CRUD) ----------------------- //

// ------ DELETE (delete - D)------//
// v komponentě Post mám u tlačítek rovnou data-id={post.id}
document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const postId = btn.dataset.id             // v komponentě Post mám u tlačítek rovnou data-id={post.id}
    console.log("postId", postId)

    await fetch(`http://localhost:4000/api/posts/${postId}`, {
      method: 'DELETE',
    });
    window.location.reload();
  });
});

// ----- POST (create - C) ----- //  +   // ------ PUT (update - U) ---- //
//přihlášený uživatel, za kterého postujeme, je definován nahoře hned za importy -- nafejkovaný\
document.querySelector(".post-form").addEventListener("submit", async (e)=> {
  e.preventDefault()
  
  const text = document.querySelector(".post-input").value
  
  if (editedPost !== null) {    
    await fetch(`http://localhost:4000/api/posts/${editedPost.id}`, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
          userId: editedPost.userId,
          userName: editedPost.userName,
          userHandle: editedPost.userHandle,
          userAvatar: editedPost.userAvatar,
          text: text,
          likes: editedPost.likes
        }),
      }
    );
  } else {
    await fetch(`http://localhost:4000/api/posts`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          userId: loggedInUser.id,
          userName: loggedInUser.name,
          userHandle: loggedInUser.handle,
          userAvatar: loggedInUser.avatar,
          text: text,
          likes: 0
        }),
      }
    );
  }
  window.location.reload()
});

// ------ EDIT (update - U) ---- //
document.querySelectorAll(".edit-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const postId = btn.dataset.id             // v komponentě Post mám u tlačítek rovnou data-id={post.id}
    const post = posts.find((post) => post.id === Number(postId))

    document.querySelector(".post-input").value = post.text
    editedPost = post
  });
});