import React from "react";
import { Divider } from '@mui/material';
const Activity = () => {
  return (
  <div>
    <div className="activity">
      <div className="activity-box">
        <div>0xc-123456 <span className="weight-item">Claim 10CT</span>from content witn <span className="weight-item">ID 1</span></div>
        <div className="c-4caf50 status-info">success</div>
      </div>
      <div className="time-info">2023-01-01 12:00:00</div>
    </div>
    <Divider light style={{ borderColor: 'rgba(255, 255, 255, 0.5)', margin: '30px 0'}} />
    <div className="activity">
      <div className="activity-box">
        <div>0xc-123456 <span className="weight-item">Claim 10CT</span>from content witn <span className="weight-item">ID 1</span></div>
        <div className="c-f44336 status-info">Fail</div>
      </div>
      <div className="time-info">2023-01-01 12:00:00</div>
    </div>
    <Divider light style={{ borderColor: 'rgba(255, 255, 255, 0.5)', margin: '30px 0'}} />
  </div>
  );
}

export default Activity;
