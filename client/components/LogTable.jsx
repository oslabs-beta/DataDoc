import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const { SERVER_URL } = process.env;

const LogTable = (props) => {
  const location = useLocation();
  const { method, path } = location.state;

  let [logEntries, setLogEntries] = useState([]);

  setTimeout(async () => {
    const encodedPath = path.replaceAll("/", "%2F");
    setLogEntries(
      (await (await fetch(`${SERVER_URL}/logdata/?method=${method}&path=${encodedPath}`)).json())
      .map((log) => {
        // console.table(log);
        return (
          <LogEntry
            key={crypto.randomUUID()}
            method={method}
            path={path}
            timestamp={log.timestamp}
            res_time={log.res_time}
            status_code={log.status_code}
          />
        );
        })
  )}, 2000);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Path</th>
            <th>Method</th>
            <th>Response Time</th>
            <th>Status Code</th>
          </tr>
        </thead>
        <tbody>
          {logEntries}
        </tbody>
      </table>
    </>
  );
};

const LogEntry = (props) => {
  const { timestamp, path, method, res_time, status_code } = props;

  return (
    <tr>
      <td>{timestamp}</td>
      <td>{path}</td>
      <td>{method}</td>
      <td>{res_time}</td>
      <td>{status_code}</td>
    </tr>
  );
};

export default LogTable;
