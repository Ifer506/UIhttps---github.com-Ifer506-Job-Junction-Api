import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { message } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { getCard, GetCreatedCard } from "./card";

const checkUserBookmark = (job, userId) => {
  if (!!job.bookmarkedBy && job.bookmarkedBy.includes(userId)) {
    return true;
  }
  return false;
};
const checkAppliedJob = (job, userId) => {
  if (!!job.appliedBy && job.appliedBy.includes(userId)) {
    return true;
  }
  return false;
};

const handleUnbookmark = async (jobId) => {
  console.log("IN GETBOOKMARKED");
  try {
    const accessToken = localStorage.getItem("token"); // You might need to adjust this based on how you store the access token
    var userId = jwtDecode(localStorage.getItem("token")).userId;
    console.log(userId);
    if (!accessToken) {
      // If the access token is not available, handle the authentication error
      console.error("User not authenticated.");
      return;
    }
    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.delete(`/jobs/removeBookmark/${jobId}`, {
      headers,
    });
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

const handleDeleteJob = async (jobId) => {
  try {
    const accessToken = localStorage.getItem("token"); // You might need to adjust this based on how you store the access token
    var userId = jwtDecode(localStorage.getItem("token")).userId;
    console.log(userId);
    if (!accessToken) {
      // If the access token is not available, handle the authentication error
      console.error("User not authenticated.");
      return;
    }
    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.delete(`/jobs/${jobId}`, {
      headers,
    });
    if (response.status === 200) {
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

const handleApplyJob = async (jobId) => {
  try {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      message.error("Not Authorized");
      return;
    }
    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.post(`/jobs/applyJob/${jobId}`, null, {
      headers,
    });

    if (response.status === 200) {
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
const handleWithdrawJob = async (jobId) => {
  try {
    const accessToken = localStorage.getItem("token"); // You might need to adjust this based on how you store the access token
    var userId = jwtDecode(localStorage.getItem("token")).userId;
    console.log(userId);
    if (!accessToken) {
      // If the access token is not available, handle the authentication error
      console.error("User not authenticated.");
      return;
    }
    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.post(`/jobs/withdraw/${jobId}`, null, {
      headers,
    });
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
const handleAddBookmark = async (jobId) => {
  try {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      message.error("Not Authorized");
      return;
    }
    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.post(`/jobs/addBookmark/${jobId}`, null, {
      headers,
    });
    console.log(`/jobs/addBookmark/${jobId}`);

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
export const GetAllJobs = ({ jobsData, getJobs }) => {
  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap mt-8 card-container ">
      {jobsData.map((job) => (
        <div>
          {/* {console.log(job.logo)} */}
          {getCard({
            logo: job.logo,
            companyName: job.company,
            jobName: job.title,
            location: job.location,
            time: job.desc,
            applied: checkAppliedJob(
              job,
              jwtDecode(localStorage.getItem("token")).userId
            ),
            bookmarked: checkUserBookmark(
              job,
              jwtDecode(localStorage.getItem("token")).userId
            ),
            onUnbookmark: () => handleUnbookmark(job._id),
            addBookmark: () => handleAddBookmark(job._id),
            apply: () => handleApplyJob(job._id),
            withdraw: () => handleWithdrawJob(job._id),
          })}
        </div>
      ))}
    </div>
  );
};

export const GetBookmarked = ({ bookmarkData, getBookmarks }) => {
  useEffect(() => {
    getBookmarks();
  }, [getBookmarks]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8 card-container">
      {bookmarkData.map((job) => (
        <div key={job.id}>
          {getCard({
            logo: job.logo,
            companyName: job.company,
            jobName: job.title,
            location: job.location,
            time: job.desc,
            applied: checkAppliedJob(
              job,
              jwtDecode(localStorage.getItem("token")).userId
            ),
            bookmarked: checkUserBookmark(
              job,
              jwtDecode(localStorage.getItem("token")).userId
            ),
            onUnbookmark: () => handleUnbookmark(job._id),
            apply: () => handleApplyJob(job._id),
            withdraw: () => handleWithdrawJob(job._id),
          })}
        </div>
      ))}
    </div>
  );
};

export const GetAppliedJobs = ({ appliedJobsData, getAppliedJobs }) => {
  useEffect(() => {
    getAppliedJobs();
  }, [getAppliedJobs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8 card-container">
      {appliedJobsData.map((job) => (
        <div>
          {getCard({
            logo: job.logo,
            companyName: job.company,
            jobName: job.title,
            location: job.location,
            time: job.desc,
            addBookmark: () => handleAddBookmark(job._id),
            bookmarked: checkUserBookmark(
              job,
              jwtDecode(localStorage.getItem("token")).userId
            ),
            applied: checkAppliedJob(
              job,
              jwtDecode(localStorage.getItem("token")).userId
            ),
            onUnbookmark: () => handleUnbookmark(job._id),
            withdraw: () => handleWithdrawJob(job._id),
          })}
        </div>
      ))}
    </div>
  );
};

export const GetCreatedJobs = ({ createdJobsData, getCreatedJobs }) => {
  useEffect(() => {
    getCreatedJobs();
  }, [getCreatedJobs]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8 card-container">
      {createdJobsData.map((job) => (
        <div>
          {GetCreatedCard({
            jobId: job._id,
            logo: job.logo,
            companyName: job.company,
            jobName: job.title,
            location: job.location,
            time: job.desc,
            applicants: job.appliedBy,
            deleteJob: () => handleDeleteJob(job._id),
          })}
        </div>
      ))}
    </div>
  );
};
