// import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import "../styles/card.css";
import { GetUserPill } from "./common";
import { initializeModal } from "./modal";

export const getCard = ({
  logo,
  companyName,
  jobName,
  location,
  time,
  onUnbookmark,
  addBookmark,
  bookmarked,
  applied,
  apply,
  withdraw,
}) => {
  return (
    <div class="spacer">
      <Card className="custom-card">
        <div className="card-header">
          <img src={logo} alt="Logo" className="logo" />
          <div class="text-xl font">{companyName}</div>
          <span
            className="bookmark-icon"
            onClick={bookmarked ? onUnbookmark : addBookmark}
          >
            {bookmarked ? <BsBookmarkFill /> : <BsBookmark />}
          </span>
        </div>
        <div className="card-body">
          <div class="text-lg font">{jobName}</div>
          <div className="location">
            
            {/* <span className="location-icon">
              <EnvironmentOutlined />
            </span> */}
            <div class="text-base"> Location : {location}</div>
          </div>
          <div className="time">
            {/* <span className="clock-icon">
              <ClockCircleOutlined />
            </span> */}
            <div class="text-base">Requirement : {time}</div>
          </div>
        </div>
        <button
          onClick={applied ? withdraw : apply}
          class="btn btn-sm card-footer"
        >
          {applied ? "Withdraw" : "Apply"}
        </button>
      </Card>
    </div>
  );
};

const getCv = async () => {};
const acceptUser = async () => {};
export const GetCreatedCard = ({
  logo,
  companyName,
  jobName,
  location,
  time,
  deleteJob,
  view,
  applicants,
  jobId,
}) => {
  const applicantKeys = Object.keys(applicants);
  initializeModal();

  return (
    <div className="spacer">
      <Card className="custom-card">
        <div className="card-header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="text-xl font">{companyName}</div>
        </div>
        <div className="card-body">
          <div className="text-lg font">{jobName}</div>
          <div className="location">
            {/* <span className="location-icon">
              <EnvironmentOutlined />
            </span> */}
            <div className="text-sm font-bold">{location}</div>
          </div>
          <div className="time">
            {/* <span className="clock-icon">
              <ClockCircleOutlined />
            </span> */}
            <div className="text-sm font-bold">{time}</div>
          </div>
        </div>
        <div className="card-footer">
          <div style={{ marginRight: "10px" }}>
            <button class="btn btn-sm" onClick={deleteJob}>
              <AiOutlineDelete />
            </button>
          </div>
          <button
            onClick={() => window.display_users.showModal()}
            className="btn btn-sm"
          >
            View
          </button>
          <dialog id="display_users" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Applied users for the job</h3>
              {/* <GetUserPill applicants={applicants} /> */}
              {applicantKeys.map((applicantId) => (
                <GetUserPill
                  applicants={applicants[applicantId]}
                  cv={getCv}
                  accept={acceptUser}
                  jobId={jobId}
                  userId={applicants[applicantId]}
                  title={jobName}
                />
              ))}
              <div className="modal-action">
                <button className="btn">Close</button>
              </div>
            </form>
          </dialog>
        </div>
      </Card>
    </div>
  );
};
