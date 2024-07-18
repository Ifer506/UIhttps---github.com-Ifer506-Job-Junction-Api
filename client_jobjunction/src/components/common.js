import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsApple, BsFacebook, BsGoogle } from "react-icons/bs";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../styles/card.css";
import "../styles/signup_page.css";


export function getIcons() {
  return (
    <div className="signup-social-logos">
      <BsGoogle style={{ fontSize: "30px", "padding-right": "10px" }} />
      <BsApple style={{ fontSize: "30px", "padding-right": "10px" }} />
      <BsFacebook style={{ fontSize: "30px", "padding-right": "10px" }} />
    </div>
  );
}

export function GetUserPill({
  jobId,
  userId,
  fullName,
  num,
  cv,
  title,
  accept,
  applicants,
}) {
  const [applicant, setApplicant] = useState([]);

  const getUserDetails = async (applicants) => {
    try {
      const response = await axios.get(`/auth/getUser/${applicants}`);
      if (!applicants) {
        return;
      }
      setApplicant(response.data.data);
      console.log(applicant.profile);
    } catch (error) {
      console.error(error);
    }
  };
  const rejectUser = async (jobId, userId) => {
    console.log("IN rejectUser");
    try {
      const response = await axios.post(
        `/jobs/reject/${jobId}/${userId}`,
        null
      );
      if (response.status === 200) {
        message.success("User Rejected");
      } else {
        message.error("Unable to reject user");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const acceptUser = async (jobId, userId) => {
    try {
      console.log("IN acceptUser");

      const response = await axios.post(
        `/jobs/acceptedUser/${jobId}/${userId}`
      );
      console.log(response);
      if (response.status === 200) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const downloadCV = async (cvFilePath) => {
    try {
      const response = await axios.get(cvFilePath, {
        responseType: "blob", // Set the response type to 'blob' to get the file data
      });
      console.log("inside downloadCV");
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cv.pdf"); // You can set the desired filename here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserDetails(applicants);
  }, []);
  if (!applicant.email) {
    return;
  }
  return (
    <div
      class="spacer card w-96 bg-primary text-primary-content"
      style={{ padding: 10 }}
    >
      <div className="card-header">
        <img src={applicant.profile} alt="Logo" className="logo" />
        <h1 className="card-title">{title}</h1>
        <div></div>
      </div>
      <div class="card-body">
        <h3 class="card-title" className="text-xl font">
          {applicant.fullName}
        </h3>
        <h3 class="card-title" className="text-xl font">
          {applicant.email}
        </h3>
        <h3 class="card-title" className="text-xl font">
          {applicant.phoneNumber}
        </h3>
        <div class="card-actions justify-end">
          <button onClick={() => rejectUser(jobId, userId)} class="btn btn-sm">
            <AiOutlineDelete />
          </button>
          <button
            className="btn btn-sm"
            onClick={() => downloadCV(applicant.cv)}
          >
            CV
          </button>
          <button
            className="btn btn-sm"
            onClick={() => acceptUser(jobId, userId)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
