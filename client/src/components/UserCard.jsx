import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../app/features/feed/feedSlice";

const UserCard = ({ user }) => {
  if (!user) {
    return <p className="text-center text-gray-500">Loading user...</p>;
  }

  const dispatch = useDispatch();
  const { _id, firstName, lastName, profileUrl, age, gender, about } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-80 sm:w-80 rounded-3xl shadow-2xl overflow-hidden">
        <figure>
          <img
            className="relative w-full h-full object-cover"
            src={
              profileUrl ||
              "https://geographyandyou.com/images/user-profile.png"
            }
            alt={firstName || "User"}
          />
        </figure>

        <div className="card-body text-center p-4">
          <h2 className="card-title flex justify-center text-lg font-bold">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-gray-400">
              {age}, {gender}
            </p>
          )}
          <p className="text-gray-500 text-sm">
            {about || "No about info available."}
          </p>
          <div className="card-actions flex justify-center gap-4 my-4">
            <button
              onClick={() => handleSendRequest("ignored", _id)}
              className="btn btn-outline hover:scale-105  transition"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="btn btn-secondary shadow-lg border-none hover:scale-105 transition"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
