import React, { useRef, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description" },
    { id: 2, title: "JavaScript 2", body: "Description" },
    { id: 3, title: "JavaScript 3", body: "Description" },
  ])

  const [selectedSort, setSelectorSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  function getSortedPosts() {
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts
  }

  const sortedPosts = getSortedPosts();

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectorSort(sort);
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }}></hr>
      <div>
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Sort By"
          options={[
            { value: 'title', name: 'Name' },
            { value: 'body', name: 'Descr' },
          ]}
        />
      </div>
      {posts.length !== 0
        ?
        <PostList remove={removePost} posts={sortedPosts} title="Spisok posts" />
        :
        <h1 style={{ textAlign: 'center' }}>
          Post not found
        </h1>
      }

    </div>
  );
}

export default App;
