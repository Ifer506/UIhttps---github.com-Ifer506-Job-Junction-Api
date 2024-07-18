import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { message } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleButtonClick = (path) => {
    setActiveButton(path);
  };

  const isButtonActive = (path) => {
    return activeButton === path;
  };

  const getUserProfile = async () => {
    console.log("INSIDE GETuserprofile");
    try {
      const accessToken = localStorage.getItem("token"); // You might need to adjust this based on how you store the access token
      const userId = jwtDecode(accessToken).userId;

      if (!accessToken) {
        // If the access token is not available, handle the authentication error
        console.error("User not authenticated.");
        return;
      }
      const headers = {
        Authorization: `${accessToken}`,
      };
      const response = await axios.get(`/users/profile/${userId}`, {
        headers,
      });
      console.log("response.data.data.email");
      console.log(response.data.data.email);

      if (response.status === 200) {
        setProfileImage(response.data.data.profile);
        setEmail(response.data.data.email);
        console.log(response.data);
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAccount = async () => {
    try {
      const accessToken = localStorage.getItem("token"); // You might need to adjust this based on how you store the access token
      if (!accessToken) {
        // If the access token is not available, handle the authentication error
        console.error("User not authenticated.");
        return;
      }
      const headers = {
        Authorization: `${accessToken}`,
      };
      const response = await axios.delete(`/users/profile/`, {
        headers,
      });
      if (response.status === 200) {
        message.success(response.data.message);
        navigate("/signup");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        message.error("User not authenticated.");
        return;
      }
      const headers = {
        Authorization: `${accessToken}`,
      };
      const pws = {
        currentPassword: password,
        newPassword: newPassword,
        reenterNewPassword: confirmPassword,
      };
      const response = await axios.post("/auth/changePassword", pws, {
        headers,
      });
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeEmail = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        message.error("User not authenticated.");
        return;
      }
      const headers = {
        Authorization: `${accessToken}`,
      };
      const emails = {
        email: newEmail,
        confirmEmail: confirmEmail,
      };
      const response = await axios.post("/users/changeEmail", emails, {
        headers,
      });
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <div className="flex navbar bg-neutral">
      <div className="navbar-start">
          <Link to="/home">
            <img className="h-8 w-auto logo" src={logo} alt="Your Company" />
          </Link>
          <Link to="/home" className="text-2xl">
            JOB JUNCTION
          </Link>
        </div>

        <div className="navbar-center">
          <div className="tab- bg-neutral">
            <Link to="/home">
              <div
                className={`tab ${isButtonActive("/home") ? "tab-active" : ""}`}
                onClick={() => handleButtonClick("/home")}
              >
                {/* <AiOutlineHome className="tab-icon" /> */}
                <span>Home</span>
              </div>
            </Link>
            <Link to="/bookmark">
              <div
                className={`tab ${
                  isButtonActive("/bookmark") ? "tab-active" : ""
                }`}
                onClick={() => handleButtonClick("/bookmark")}
              >
                {/* <BsBookmark className="tab-icon" /> */}
                <span>Bookmark</span>
              </div>
            </Link>
            <Link to="/application">
              <div
                className={`tab ${
                  isButtonActive("/application") ? "tab-active" : ""
                }`}
                onClick={() => handleButtonClick("/application")}
              >
                {/* <IoDocumentsOutline className="tab-icon" /> */}
                <span>Applications</span>
              </div>
            </Link>
            <Link to="/addjob">
              <div
                className={`tab ${
                  isButtonActive("/addjob") ? "tab-active" : ""
                }`}
                onClick={() => handleButtonClick("/addjob")}
              >
                {/* <IoBriefcaseOutline className="tab-icon" /> */}
                <span>Add Job</span>
              </div>
            </Link>
            <Link to="/faq">
              <div
                className={`tab ${isButtonActive("/faq") ? "tab-active" : ""}`}
                onClick={() => handleButtonClick("/faq")}
              >
                <span>FAQ</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-black flex ">
                <img src={profileImage} alt="pp" />
              </div>
            </label>

            <ul
              tabIndex="0"
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a tabIndex="0" onClick={() => navigate("/editProfile")}>
                  Profile
                </a>
              </li>
              <li>
                <a tabIndex="0" onClick={() => window.my_modal_3.showModal()}>
                  Change Password
                </a>
              </li>
              <li>
                <a tabIndex="0" onClick={() => window.my_modal_1.showModal()}>
                  Change Email
                </a>
              </li>
              <li>
                <a tabIndex="1" onClick={() => window.my_modal_5.showModal()}>
                  Delete Account
                </a>
              </li>
              <li>
                <a tabIndex="1" onClick={() => window.my_modal.showModal()}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>

        <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg" style={{ marginBottom: "20px" }}>
              Change Password
            </h3>
            <input
              style={{ marginBottom: "10px" }}
              type="password"
              placeholder="Current Password"
              className="input input-primary input-bordered w-full password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              style={{ marginBottom: "10px" }}
              type="password"
              placeholder="New Password"
              className="input input-primary input-bordered w-full password-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Re-enter New Password"
              className="input input-primary input-bordered w-full password-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <div className="modal-action">
              <button className="btn" onClick={changePassword}>
                Change
              </button>
            </div>
          </form>
        </dialog>

        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg" style={{ marginBottom: "20px" }}>
              Change Email
            </h3>
            <div className="text-2xl font" style={{ marginBottom: "10px" }}>
              Current Email:- {email}
            </div>
            <input
              style={{ marginBottom: "10px" }}
              type="text"
              placeholder="New Email"
              className="input input-primary input-bordered w-full"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Re-enter New Email"
              className="input input-primary input-bordered w-full"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            ></input>
            <p
              className="mt-1 text-sm leading-6 text-gray-600"
              style={{ marginBottom: "20px" }}
            >
              *This email will be used as your login email.
            </p>
            <div className="modal-action">
              <button className="btn" onClick={changeEmail}>
                Change
              </button>
            </div>
          </form>
        </dialog>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Delete Account !!!</h3>
            <p className="py-4">Are you sure you want to delete?</p>
            <div className="modal-action">
              <button className="btn">No</button>
              <button className="btn" onClick={deleteAccount}>
                Yes
              </button>
            </div>
          </form>
        </dialog>

        <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Log Out !!!</h3>
            <p className="py-4">Are you sure you want to Log Out?</p>
            <div className="modal-action">
              <button className="btn">No</button>
              <button className="btn" onClick={logOut}>
                Yes
              </button>
            </div>
          </form>
        </dialog>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default Navbar;
