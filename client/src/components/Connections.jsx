import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../utils/constants";
import { addConnections } from "../app/features/connections/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/user/connections/show`, {
        withCredentials: true,
      });
    dispatch(addConnections(res?.data?.data))
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="text-center text-gray-600 text-2xl mt-10">
        No Connections Found!!
      </h1>
    );

  return (
    <div className="flex flex-col items-center my-10 w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-100 mb-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, profileUrl, age, gender, about } =
          connection;

        return (
          <div
            className="flex items-center w-full bg-base-300 rounded-lg m-1 p-4 hover:bg-base-200 transition"
            key={_id}
          >
            <div>
              <img
                alt="User Profile"
                className="w-14 h-14 rounded-full object-cover border-2 border-secondary"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
