import { render } from '@czechitas/render';
import { Post } from '../components/Post';
import '../global.css';
import './index.css';

const params = new URLSearchParams(window.location.search)
const index = params.get("user")

const response = await fetch(`http://localhost:4000/api/users/${index}`)
const json = await response.json()

const {id, name, handle, avatar, bio} = json.data

document.querySelector('#root').innerHTML = render(
  <div key={id} className="container">
    <h1>Profil uživatele</h1>
    <img src={`http://localhost:4000${avatar}`} alt={name} />
    <h2>{name}</h2>
    <h3>{handle}</h3>
    <p>{bio}</p>
  </div>
);
