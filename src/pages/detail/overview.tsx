import React from "react";
import { Button, Divider } from '@mui/material';
import './index.less';
const Overview = () => {
  return (
  <div>
    <div className="over-box">
        <div className="over-left">
            <div>
                <h2>Request Qualification:</h2>
                <ul style={{ marginBottom: '30px'}}>
                    <li>1、</li>
                    <li>1、</li>
                    <li>1、</li>
                </ul>
                <Divider light style={{ borderColor: 'rgba(255, 255, 255, 0.5)', marginBottom: '20px'}} />
            </div>
            <div>
                <h2>Claim Qualification:</h2>
                <ul style={{ marginBottom: '30px'}}>
                    <li>1、</li>
                    <li>1、</li>
                    <li>1、</li>
                </ul>
                <Divider light style={{ borderColor: 'rgba(255, 255, 255, 0.5)', marginBottom: '20px'}} />
            </div>
            <div>
                contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
            </div>
        </div>
        <div className="over-right">
            <div className="mg-b-16">
                <span>Promoter：</span>
                <span>0xabcoj...</span>
            </div>
            <div className="mg-b-16">
                <span>Total：</span>
                <span>10</span>
            </div>
            <div className="mg-b-16">
                <span>Requested：</span>
                <span>8</span>
            </div>
            <div className="mg-b-16">
                <span>Completed：</span>
                <span>8</span>
            </div>
            <div className="mg-b-16 weight-item">
                <span>Award：</span>
                <span>100Ct</span>
            </div>
            <div className="mg-b-16 weight-item">
                <span>Balance：</span>
                <span>50Ct</span>
            </div>
            <div className="mg-b-16">
                <span>Created：</span>
                <span>2020-01-01</span>
            </div>
        </div>
    </div>
    <Button variant="outlined" size="large" style={{ padding: '14px 80px'}}>Claim</Button>
  </div>
  );
}

export default Overview;
