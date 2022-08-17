import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = (props) => {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState({});

  useEffect(() => {
    axios
      .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`)
      .then((response) => {
        setPostDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <React.Fragment>
        <h2 className="ui header">{postDetail.title}</h2>
        <p>{postDetail.content} </p>
        <p>{postDetail.created_at} </p>
      </React.Fragment>
    </div>
  );
};

export default PostDetail;
