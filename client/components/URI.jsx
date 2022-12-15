import React from "react";

const URI=(props)=>{
  const {endpoint, status} = props

  return(
    <div>
      <section className="tableHeader">
        <title>Available URI Endpoints</title>
        <table>
          <thead>
            <tr>
              <th>Tracking</th>
              <th>URI Endpoint</th>
              <th>Status Code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <span>
        <input type="checkbox" id="checked" name="checkTrackingURI" checked="checked"></input>
        <field>{endpoint}</field>
        <field>{status}</field>
      </span>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default URI