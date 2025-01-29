import axios from "axios";
import React, { useEffect } from "react";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../features/feed/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/user/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(data?.data));
    } catch (error) {
      console.log(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center mt-2">
      {feed.length > 0 ? <UserCard user={feed[0]} /> : <h1>No users found</h1>}
    </div>
  );
};

export default Feed;
