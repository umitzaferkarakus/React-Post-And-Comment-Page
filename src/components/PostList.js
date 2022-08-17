import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

const PostList = (props) => {
  const [postList, setTextList] = useState([]);

  useEffect(() => {
    axios
      .get("https://react-yazi-yorum.herokuapp.com/posts")
      .then((response) => {
        setTextList(response.data);
      });
  }, []);

  return (
    <div className="ui relaxed divided list">
    {postList.map((post) => {
    return (
      <div className="item" key={post.id}>
        <i className="large github middle aligned icon"></i>
        <div className="content">
          <Link to={`/posts/${post.id}`} className="header">{post.title}</Link>
          <div className="description">{post.created_at}</div>
        </div>
      </div>
    );
  })}{" "}
  </div>
  )
};

export default PostList;
