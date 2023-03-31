import React from "react";
import { Box, Tabs, Tab, Divider } from "@mui/material";
import Overview from "./overview";
import Activity from "./activity";
import useContract from "@/hooks/useContract";
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Detail = () => {
    const id:string = "1"
    const args = {
        functionName: "getContents",
        args: [id],
    }
    const { data, isLoading, isSuccess, write } = useContract(args);
    console.log("data: " + data);
    console.log("isLoading: " + isLoading);
    console.log("isSuccess: " + isSuccess);
    console.log("write: " + write);

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="container-box">
      <h2 style={{ marginBottom: "30px" }}>HeadLineXXXXX</h2>
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
        <Overview></Overview>
      </div>
      <div className="pd-tb-30" hidden={value !== 1}>
        <Activity></Activity>
      </div>
    </div>
  );
};

export default Detail;
