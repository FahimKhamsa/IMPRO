import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        dispatch(setPosts({ posts: data }));
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        dispatch(setPosts({ posts: data }));
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(posts) ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      ) : (
        <p>No posts available.</p>
      )}
    </>
  );
};

export default PostsWidget;
