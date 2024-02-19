import React, { useState, useEffect } from "react";
import "./Settings.css";
import axios from "axios";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SpatialAudioOffIcon from "@mui/icons-material/SpatialAudioOff";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import logo from "../../public/logo.jpg";
import Host from "../utils/routes";


function Settings() {
  const [userData, setUserData] = useState({});
  const [callingVoice, setCallingVoice] = useState("");
  const [voiceSelected, setVoiceSelected] = useState("");
  console.log("🚀 ~ Settings ~ voiceSelected:", voiceSelected);
  console.log("🚀 ~ Settings ~ userData:", userData);
  const navigate = useNavigate();

  async function changeVoice() {
    const data = await axios.get(`${Host}/users/updateVoice`, {
      headers: {
        token: localStorage.getItem("token"),
        voicetype: voiceSelected,
      },
    });
    console.log(data.data, "This is the return");
    setUserData(data.data);
    let temp = userData;
    temp.voiceType = voiceSelected;
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userData.voiceType == 0) {
      setCallingVoice(`רס"ר`);
    }
    if (userData.voiceType == 1) {
      setCallingVoice(`נחמד`);
    }
    if (userData.voiceType == 2) {
      setCallingVoice(`ערס`);
    }
  }, [userData]);

  async function getUser() {
    const data = await axios.get(`${Host}/users/getUser`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log(data.data, "This is the return");
    setUserData(data.data);
  }
  return (
    <div className="settings-container">
      <img className="settings-logo" src={logo} alt="" />
      <div className="user-info-section">
        <div>
          <h1>שלום, {userData.username}</h1>
        </div>
        <div>
          <h2>פרטים אישיים</h2>
        </div>
        <div className="user-info">
          {" "}
          <PersonIcon />
          <span className="user-info-span"> {userData?.username}</span>
        </div>
        <div className="user-info">
          {" "}
          <LocalPhoneIcon />
          <span className="user-info-span"> {userData?.phoneNumber}</span>
        </div>
        <div className="user-info">
          {" "}
          <CheckCircleIcon />
          <span className="user-info-span">
            {userData?.appUses} שימושים ב wakey
          </span>
        </div>
        <div className="user-info">
          {" "}
          <SpatialAudioOffIcon />{" "}
          <span className="user-info-span">קול התקשרות: </span>
          {callingVoice}{" "}
        </div>
        <div className="voice-change-div">
          <select
            id="voice-select"
            onChange={(e) => setVoiceSelected(e.target.value)}
          >
            <option disabled selected value="">
              שנה קול
            </option>
            <option className="voice-option" value="0">
              רס"ר
            </option>
            <option className="voice-option" value="1">
              נחמד
            </option>
            <option className="voice-option" value="2">
              ערס
            </option>
          </select>
        </div>
        <div className="save-btn-container">
          <div className="save-voice-btn" onClick={() => changeVoice()}>
            שמור
          </div>
        </div>

        <div className="home-btn" onClick={() => navigate("/homepage")}>
          {" "}
          <HomeIcon /> לעמוד הבית
        </div>
      </div>
    </div>
  );
}

export default Settings;
