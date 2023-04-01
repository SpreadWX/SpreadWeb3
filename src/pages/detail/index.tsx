import React from "react";
import { Box, Tabs, Tab, Divider } from "@mui/material";
import Overview from "./overview";
import Activity from "./activity";
import {useLocation} from "react-router-dom";
import {useAccount, useContractRead, UseContractReadConfig} from "wagmi";

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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Detail = () => {
    const { address = '', isConnected } = useAccount();
    console.log("address:", address, "isConnected:", isConnected);
    const query = new URLSearchParams(useLocation()?.search);
    const id = query.get('id');
    console.log("id==>", id)
    const result =  useContractRead({
        address: contract,
        abi: abi,
        functionName: 'getContent',
        args:   [id],
        overrides: { from: isConnected ? address:'0x350b7BD90B1A94A022ACc7f1B9B6907FAc872bdd' },
    } as UseContractReadConfig<typeof abi, 'getContent'>)
    console.log("result:", result)
    console.log("err:", result.error)
    const res = result.data as any[]
    console.log("res:", res)

    // const contentVo:ContentVo = {
    //     content: {
    //         id: res[0][0],
    //         promoter: res[0][1],
    //         headline: res[0][2],
    //         description: res[0][3],
    //         typ: res[0][4],
    //         status: res[0][5],
    //         budget: res[0][6],
    //         url: res[0][7],
    //         previewUrl: res[0][8],
    //         total: res[0][9],
    //         createTime: res[0][10],
    //         requestedCnt: res[0][11][0],
    //         completedCnt: res[0][11][1],
    //         balance: res[0][11][2],
    //         requestQualificationId: res[0][11][3],
    //         claimQualificationId: res[0][11][4],
    //     },
    //     requestQualification: {
    //         id: res[1][0],
    //         flows: res[1][1],
    //         tags: res[1][2],
    //     },
    //     claimQualification: {
    //         id: res[2][0],
    //         likes: res[2][1],
    //         comments: res[2][2],
    //         mirrors: res[2][3]
    //     }
    // }
    const currentDate = new Date().getSeconds();
    const contentVo:ContentVo = {
        content: {
            id: parseInt(id==null?"0":id),
            promoter: "0x350b7BD90B1A94A022ACc7f1B9B6907FAc872bdd",
            headline: "test",
            description: "test",
            typ: 0,
            status: 0,
            budget: 1,
            url: "",
            previewUrl: "",
            total: 1,
            createTime: currentDate,
            requestedCnt: 0,
            completedCnt: 0,
            balance: 1,
            requestQualificationId: 0,
            claimQualificationId: 0,
        },
        requestQualification: {
            id: 0,
            flows: 0,
            tags: [],
        },
        claimQualification: {
            id: 1,
            likes: 1,
            comments: 1,
            mirrors: 1
        }
    }
    console.log("content:", contentVo?.content)
    console.log("requestQualification:", contentVo?.requestQualification)
    console.log("claimQualification:", contentVo?.claimQualification)

    const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="container-box">
      <h2 style={{ marginBottom: "30px" }}>{contentVo?.content.headline}</h2>
      <Divider light style={{ borderColor: "rgba(255, 255, 255, 0.5)" }} />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} style={{ margin: '20px 0'}}>
        <Tabs
          value={value}
          aria-label="basic tabs example"
          onChange={handleChange}
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Activity" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <div className="pd-tb-30" hidden={value !== 0}>
        <Overview vo={contentVo}></Overview>
      </div>
      <div className="pd-tb-30" hidden={value !== 1}>
        <Activity vo={contentVo}></Activity>
      </div>
    </div>
  );
};

export default Detail;
