import React from "react";
import { Divider } from '@mui/material';

type Content = {
    id?: number;
    promoter: "" | `0x${string}`;
    headline: string;
    description: string;
    typ: number;
    status: number ;
    budget: number;
    url: string;
    previewUrl: string;
    total: number;
    createTime: number;
    requestedCnt: number;
    completedCnt: number;
    balance: number;
    requestQualificationId: number;
    claimQualificationId: number;
}

type RequestQualification = {
    id: number;
    flows: number;
    tags?: string[];
}

type ClaimQualification = {
    id: number;
    likes: number;
    comments: number;
    mirrors: number;
}

type ContentVo = {
    content: Content;
    requestQualification: RequestQualification;
    claimQualification: ClaimQualification;
}

const Activity = (props) => {
    const { vo } = props
    console.log("===============activity=================")
    console.log("content: ",vo.content);
    console.log("request: ",vo.requestQualification);
    console.log("claim: ",vo.claimQualification);
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
