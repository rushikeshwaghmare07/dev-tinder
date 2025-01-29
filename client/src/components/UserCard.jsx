import React from "react";

const UserCard = ({ user }) => {
  if (!user) {
    return <p className="text-center text-gray-500">Loading user...</p>;
  }

  const { _id, firstName, lastName, profileUrl, age, gender, about } = user;

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
            <button className="btn btn-outline hover:scale-105  transition">
              Ignore
            </button>
            <button className="btn btn-secondary shadow-lg border-none hover:scale-105 transition">
              Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
