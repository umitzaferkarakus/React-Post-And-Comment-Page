import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const COMMENT_START = {
  display_name: "",
  body: "",
};

const PostDetail = (props) => {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState({});
  const [postComment, setPostComment] = useState([]);
  const [commentBody, setCommentBody] = useState(COMMENT_START);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`,
        commentBody
      )
      .then((response) => {
        setPostComment([...postComment, response.data]);
        setCommentBody(COMMENT_START);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnChange = (event) => {
    setCommentBody({ ...commentBody, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    axios
      .all([
        axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`),
        axios.get(
          `https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`
        ),
      ])
      .then((responses) => {
        console.log(responses);
        setPostDetail(responses[0].data);
        setPostComment(responses[1].data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <React.Fragment>
        <h2 className="ui header">{postDetail.title}</h2>
        <p>{postDetail.content} </p>
        <p>{postDetail.created_at} </p>

        <h3>Comments</h3>
        {postComment.map((comment) => {
          return (
            <div className="ui relaxed list" key={comment.id}>
              <div className="item">
                <img
                  className="ui avatar image"
                  src="/images/avatar/small/daniel.jpg"
                />
                <div className="content">
                  <a className="header">{comment.display_name} </a>
                  <div className="description">{comment.body} </div>
                </div>
              </div>
            </div>
          );
        })}

        <h3>Write Your Comment</h3>
        <form
          className="ui form"
          onSubmit={handleCommentSubmit}
        >
          <div className="ui mini icon input">
            <input
              name="display_name"
              type="text"
              placeholder="Username"
              onChange={handleOnChange}
              value={commentBody.display_name}
            />
          </div>
          <textarea
            name="body"
            placeholder="Write Your Comment"
            rows="3"
            onChange={handleOnChange}
            value={commentBody.body}
          ></textarea>
          <div>
            <button className="ui blue button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </React.Fragment>
    </div>
  );
};

export default PostDetail;
