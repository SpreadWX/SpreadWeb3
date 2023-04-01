import React from "react";
import { Button, Divider } from '@mui/material';
import './index.less';
import { formatDate } from '@/utils';
import useContract from "@/hooks/useContract";
import abi from "@/assets/abi/ContentPool.abi.json";
const contract = '0x249d15412f15a8E5D8fc1730E6eA8A97Df515557';

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

interface IProps {
    address?: `0x${string}`;
    abi?: readonly {}[],
    functionName: string;
    args?: any[];
}

const Overview = (props) => {
    const { vo } = props
    console.log("===============overview=================")
    console.log("content: ",vo.content);
    console.log("request: ",vo.requestQualification);
    console.log("claim: ",vo.claimQualification);

    const requestBroadcastFuncName = "requestBroadcast"
    const args:IProps = {
        address: contract,
        abi: abi,
        functionName: requestBroadcastFuncName,
        args: [vo.content.id],
    }
    const {
        data: requestData,
        isLoading: requestIsLoading,
        isSuccess: requestIsSuccess,
        write: requestWrite } = useContract(args)
    const requestBroadcastFunc = () => {
        requestWrite?.()
    }

    const claimFuncName = "claim"
    const args2:IProps = {
        address: contract,
        abi: abi,
        functionName: claimFuncName,
        args: [vo.content.id],
    }
    const {
        data: claimData,
        isLoading: claimIsLoading,
        isSuccess: claimIsSuccess,
        write: claimWrite } = useContract(args2)
    const claimFunc = () => {
        claimWrite?.()
    }

    if (requestIsSuccess) {
        window.location.href="/receive";
    }
    if (claimIsSuccess) {
        window.location.reload();
        alert("Claim Successfully!");
    }

  return (
  <div>
    <div className="over-box">
        <div className="over-left">
            <div>
                <h2>Request Qualification:</h2>
                <ul style={{ marginBottom: '30px'}}>
                    <li>1. Flows must be at least {vo.requestQualification.flows.toString()}</li>
                </ul>
                <Divider light style={{ borderColor: 'rgba(255, 255, 255, 0.5)', marginBottom: '20px'}} />
            </div>
            <div>
                <h2>Claim Qualification:</h2>
                <ul style={{ marginBottom: '30px'}}>
                    <li>1. Likes must be at least {vo.claimQualification.likes.toString()}</li>
                    <li>2. Comments must be at least {vo.claimQualification.comments.toString()}</li>
                    <li>3. Mirrors must be at least {vo.claimQualification.mirrors.toString()}</li>
                </ul>
                <Divider light style={{ borderColor: 'rgba(255, 255, 255, 0.5)', marginBottom: '20px'}} />
            </div>
            <div>
                {vo.content.description.toString()}
            </div>
        </div>
        <div className="over-right">
            <div className="mg-b-16">
                <span>Promoter：</span>
                <span>{vo.content.promoter?.toString()}</span>
            </div>
            <div className="mg-b-16">
                <span>Total：</span>
                <span>{vo.content.total?.toString()}</span>
            </div>
            <div className="mg-b-16">
                <span>Requested：</span>
                <span>{vo.content.requestedCnt?.toString()}</span>
            </div>
            <div className="mg-b-16">
                <span>Completed：</span>
                <span>{vo.content.completedCnt?.toString()}</span>
            </div>
            <div className="mg-b-16 weight-item">
                <span>Award：</span>
                <span>{vo.content.budget?.toString()} CT</span>
            </div>
            <div className="mg-b-16 weight-item">
                <span>Balance：</span>
                <span>{vo.content.balance?.toString()} CT</span>
            </div>
            <div className="mg-b-16">
                <span>Created：</span>
                <span>{formatDate(parseInt(vo.content.createTime?.toString()))}</span>
            </div>
        </div>
    </div>
      {claimIsSuccess && (
          <div>
              Claim Successfully!
          </div>
      )}
      <Button
          variant="outlined"
          size="large"
          style={{ padding: '14px 200px', margin: '50px'}}
          onClick={requestBroadcastFunc}
          disabled={!requestWrite || requestIsLoading}
      >
          {requestIsLoading ? 'Requesting...' : 'Request'}
      </Button>
      <Button
          variant="outlined"
          size="large"
          style={{ padding: '14px 200px', margin: '50px'}}
          onClick={claimFunc}
          disabled={!claimWrite || claimIsLoading}
      >
          {claimIsLoading ? 'Claiming...' : 'Claim'}
      </Button>
  </div>
  );
}

export default Overview;
