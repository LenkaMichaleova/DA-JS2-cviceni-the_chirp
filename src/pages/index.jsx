import { render } from '@czechitas/render';
import { Post } from '../components/Post';
import '../global.css';
import './index.css';

const fetchPosts = async () => {
  const response = await fetch(`http://localhost:4000/api/posts`);
  const json = await response.json();
  return json.data;
};

const posts = await fetchPosts();

document.querySelector('#root').innerHTML = render(
  <div className="container">
    <h1>The Chirp</h1>
    <form className="post-form">
      <p>Co máte na srdci?</p>
      <textarea placeholder="Napište něco..." className="post-input"></textarea>
      <button type="submit">Publikovat</button>
    </form>
    
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  </div>
);
