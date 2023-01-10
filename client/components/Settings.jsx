import React, { useEffect, useState } from "react";
import "../styles/Settings.scss";

const { SERVER_URL } = process.env;

const Settings = (props) => {
  const {
    showsettingspopup: showSettingsPopup,
    setshowsettingspopup: setShowSettingsPopup
  } = props;
  const [settingValues, setSettingValues] = useState({
    subscribers: [],
    status300: false,
    status400: false,
    status500: false
  });

  function handleChange(e, updateValue) {
    let settingsUpdate;
    let updatedState;
    if (
      updateValue === "status300" ||
      updateValue === "status400" ||
      updateValue === "status500"
    ) {
      settingsUpdate = { [updateValue]: e.target.checked };
      updatedState = {
        ...settingValues,
        ...settingsUpdate
      };
    } else {
      settingsUpdate = { [updateValue]: e.target.value };
      updatedState = {
        ...settingValues,
        ...settingsUpdate
      };
    }
    setSettingValues(updatedState);
  }
  //send a post request to update the settings
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${SERVER_URL}/registration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settingValues)
    }).then(() => {
      setSettingValues({
        subscribers: [],
        status300: false,
        status400: false,
        status500: false
      });
    });
  }
  //settings form
  const settingsForm = (
    <form className="modal">
      <div className="modal-content">
        <button
          className="close-button"
          onClick={() => setShowSettingsPopup(false)}
        >
          X
        </button>
        <p className="modal-header">Settings</p>
        <label htmlFor="subscribers">Enter all subscribers:</label>
        <input
          name="subscribers"
          className="subscribers"
          placeholder="codesmith@codesmith.io"
          type="email"
          multiple
          onChange={(e) => handleChange(e, "subscribers")}
        ></input>
        <table>
          <label for="alert">
            Select the status code when you would like us to notify subscribers:
          </label>
          <tr>
            <input
              type="checkbox"
              id="checkbox300"
              value="300"
              onChange={(e) => handleChange(e, "status300")}
            ></input>
            <label htmlFor="checkbox300">300</label>
          </tr>
          <tr>
            <input
              type="checkbox"
              id="checkbox400"
              value="400"
              onChange={(e) => handleChange(e, "status400")}
            ></input>
            <label htmlFor="checkbox400">400</label>
          </tr>
          <tr>
            <input
              type="checkbox"
              id="checkbox500"
              value="500"
              onChange={(e) => handleChange(e, "status500")}
            ></input>
            <label htmlFor="checkbox500">500</label>
          </tr>
        </table>
        <button
          className="submit-button"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Update Settings
        </button>
      </div>
    </form>
  );
  return (
    <div className="settingsContainer">{showSettingsPopup && settingsForm}</div>
  );
};

export default Settings;
