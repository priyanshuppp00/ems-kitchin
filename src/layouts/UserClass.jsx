import React, { Component } from "react";
import { useTheme } from "../context/ThemeContext";

class UserClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Priyanshu Gangwar",
        location: "Bareilly Location",
        avatar_url: "",
        login: "",
        bio: "",
        following: 0,
        followers: 0,
        email: "",
        blog: "",
      },
      userRepo: [],
      follow: [],
    };
  }

  async componentDidMount() {
    const URL = "https://api.github.com/users/priyanshuppp00";

    try {
      const [userRes, reposRes, followersRes] = await Promise.all([
        fetch(URL),
        fetch(URL + "/repos"),
        fetch(URL + "/followers"),
      ]);

      const userInfo = await userRes.json();
      const userRepo = await reposRes.json();
      const follow = await followersRes.json();

      this.setState({ userInfo, userRepo, follow });
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  }

  render() {
    return (
      <UserClassContent
        userInfo={this.state.userInfo}
        userRepo={this.state.userRepo}
        follow={this.state.follow}
      />
    );
  }
}

const UserClassContent = ({ userInfo, userRepo, follow }) => {
  const { isDarkMode } = useTheme();
  const {
    name,
    location,
    avatar_url,
    login,
    bio,
    following,
    followers,
    email,
    blog,
  } = userInfo;

  return (
    <div
      className={`grid gap-10 p-10 place-content-center sm:grid-cols-2 transition-all duration-300 
        ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"}
      `}
    >
      {/* User Info Section */}
      <div
        className={`flex flex-col items-center p-5 rounded-lg shadow-lg w-full max-w-md mx-auto
          ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
        `}
      >
        <img
          className="w-40 h-40 mb-4 rounded-full"
          src={avatar_url}
          alt={name || "User"}
        />
        <p className="text-xl font-semibold">{name || "Unknown User"}</p>
        <p className="text-gray-600">{login}</p>
        <p className="my-2 text-sm text-center">{bio || "No bio available"}</p>
        <button className="w-40 px-4 py-2 mb-3 font-semibold text-white transition-all duration-200 bg-purple-500 rounded-lg hover:bg-purple-600">
          Edit Profile
        </button>
        <p className="text-sm">
          {followers} followers · {following} following
        </p>
        <p className="text-sm">{location || "Location not available"}</p>
        {blog && (
          <a
            className="text-xs text-blue-500"
            href={blog}
            target="_blank"
            rel="noreferrer"
          >
            {blog}
          </a>
        )}
        <p className="text-sm">{email || "Email not available"}</p>
      </div>

      {/* Repositories & Followers Section */}
      <div
        className={`p-5 rounded-lg shadow-lg w-full max-w-md mx-auto
          ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
        `}
      >
        <div>
          <h2 className="py-3 text-xl font-semibold">Repositories:</h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {userRepo.length > 0 ? (
              userRepo.map((repo) => (
                <li
                  key={repo.id}
                  className="text-purple-500 cursor-pointer hover:text-purple-600"
                >
                  {repo.name}
                </li>
              ))
            ) : (
              <p className="text-xs">No repositories available</p>
            )}
          </ul>
        </div>
        <div>
          <h2 className="py-3 text-xl font-semibold">Followers:</h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {follow.length > 0 ? (
              follow.map((fol) => (
                <li
                  key={fol.id}
                  className="text-purple-500 cursor-pointer hover:text-purple-600"
                >
                  {fol.login}
                </li>
              ))
            ) : (
              <p className="text-xs">No followers</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserClass;
