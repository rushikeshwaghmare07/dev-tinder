import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../app/features/user/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.data?.firstName || "");
  const [lastName, setLastName] = useState(user?.data?.lastName || "");
  const [profileUrl, setProfileUrl] = useState(user?.data?.profileUrl || "");
  const [age, setAge] = useState(user?.data?.age || "");
  const [gender, setGender] = useState(user?.data?.gender || "");
  const [about, setAbout] = useState(user?.data?.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const updateProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BACKEND_URL}/api/profile/edit`,
        {
          firstName,
          lastName,
          profileUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center gap-15">
        <div className="flex justify-center items-center h-screen">
          <form className="bg-base-300 p-8 shadow-lg rounded-lg w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Edit Profile
            </h2>
            <div className="space-y-3">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="input w-full p-2 border rounded-lg"
                placeholder="First Name"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="input w-full p-2 border rounded-lg"
                placeholder="Last Name"
              />
              <input
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                type="text"
                className="input w-full p-2 border rounded-lg"
                placeholder="Photo URL"
              />
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                className="input w-full p-2 border rounded-lg"
                placeholder="Age"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input w-full p-2 border rounded-lg"
              >
                <option value="Male">male</option>
                <option value="Female">female</option>
                <option value="Other">other</option>
              </select>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea w-full p-2 border rounded-lg"
                placeholder="Tell something about yourself"
              ></textarea>
            </div>
            <p className="text-red-400 text-center mt-2">{error}</p>
            <button
              onClick={updateProfile}
              className="btn btn-accent text-black w-full mt-4 p-2 rounded-lg"
            >
              Update Profile
            </button>
          </form>
        </div>

        <UserCard
          user={{ firstName, lastName, profileUrl, age, gender, about }}
        />
      </div>
    </>
  );
};

export default EditProfile;
