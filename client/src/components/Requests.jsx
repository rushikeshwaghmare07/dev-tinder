import axios from "axios";
import React, { useEffect } from "react";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../app/features/requests/requestSlice";
import { Heart, X } from "lucide-react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/user/connections/requests/received`,
        {
          withCredentials: true,
        }
      );
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reviewRequest();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="text-center text-gray-600 text-2xl mt-10">
        No Pending Connection Requests
      </h1>
    );

  return (
    <div className="flex flex-col items-center my-10 w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-100 mb-6">
        Pending Connection Requests
      </h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, profileUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            className="flex items-center w-full bg-base-300 rounded-lg m-1 p-4 hover:bg-base-200 transition"
            key={_id}
          >
            <div>
              <img
                alt="User Profile"
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-400"
                src={
                  profileUrl ||
                  "https://geographyandyou.com/images/user-profile.png"
                }
              />
            </div>
            <div className="ml-4 px-1 flex-1">
              <h2 className="font-bold text-lg text-gray-300">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-gray-400 text-sm">
                  {age}, {gender}
                </p>
              )}
              <p className="text-gray-400 text-sm mt-1">
                {about || "No about info available."}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm font-medium text-gray-100 bg-red-500 rounded-lg transition hover:scale-105 hover:bg-red-600">
                Reject
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-100 bg-blue-500 rounded-lg transition hover:scale-105 hover:bg-blue-600">
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
