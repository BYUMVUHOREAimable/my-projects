import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext); // Keep if authState is used, otherwise remove
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(response.data.likedPosts.map((like) => like.PostId));
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [history]); // Added history as dependency to fix ESLint warning

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === postId) {
              return response.data.liked
                ? { ...post, Likes: [...post.Likes, 0] }
                : { ...post, Likes: post.Likes.slice(0, -1) };
            }
            return post;
          })
        );

        setLikedPosts((prevLiked) =>
          prevLiked.includes(postId)
            ? prevLiked.filter((id) => id !== postId) // Fixed '!=' to '!=='
            : [...prevLiked, postId]
        );
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };

  return (
    <div>
      {listOfPosts.map((post) => (
        <div key={post.id} className="post">
          <div className="title"> {post.title} </div>
          <div
            className="body"
            onClick={() => history.push(`/post/${post.id}`)}
          >
            {post.postText}
          </div>
          <div className="footer">
            <div className="username">
              <Link to={`/profile/${post.UserId}`}>{post.username}</Link>
            </div>
            <div className="buttons">
              <ThumbUpAltIcon
                onClick={() => likeAPost(post.id)}
                className={likedPosts.includes(post.id) ? "unlikeBttn" : "likeBttn"}
              />
              <label> {post.Likes.length} </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
