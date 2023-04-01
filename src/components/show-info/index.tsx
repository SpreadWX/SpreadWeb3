import React from "react";
import { Input, Box, Divider, Button, Grid, Card, CardContent, Link, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './index.less';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/utils';

interface IProps {
  dataArr: any[];
}
const changeSearch = (e: React.ChangeEvent<{ value: unknown }>) => {
  console.log(e.target.value)
}
const ShowInfo = (props: IProps) => {
  const navigate = useNavigate();
  const { dataArr } = props
  return (
  <div className="home-container">
    <div className="home-search">
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }} style={{ paddingLeft: '20px'}}>
        <SearchIcon sx={{ mr: 1, my: 0.5 }} />
        <Input placeholder="Placeholder" onChange={changeSearch} />
      </Box>
      <Button variant="contained" style={{ padding: '12px 30px'}} onClick={() => navigate('/create')}>Create Ad</Button>
    </div>
    
      <Divider light style={{ borderColor: 'rgba(255, 255, 255, 0.5)'}} />
      
      <Grid container spacing={6} style={{ paddingTop: '40px' }}>
      {dataArr.map((i,index) => (
        <Grid item xs={6} sm={4} md={3} key={i}>
        <Card sx={{ width: 200, height: 200 }} className={`card-item  card${index+1}`} onClick={() => navigate(`/detail?id=${i[0].toString()}`)}>
          <CardContent style={{ textAlign: 'center'}}>
              <div className="item-title1">{i[2]}</div>
              <div className="item-title2">{i[1]}</div>
              <div className="item-title3">Award: {i[6]?.toString()} CT</div>
              <div className="item-title4">Created: {formatDate(parseInt(i[10]?.toString()))}</div>
          </CardContent>
        </Card>
      </Grid>
      ))}
      </Grid>
  </div>
  );
}

export default ShowInfo;
