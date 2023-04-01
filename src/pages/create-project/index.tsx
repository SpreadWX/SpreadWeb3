import React, {useState} from 'react';
import styles from './index.module.less';
import {
  FormControl,
  Input,
  Box,
  Select,
  MenuItem,
  FormLabel,
  Stack,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useContract from "@/hooks/useContract";

import abi from '@/assets/abi/ContentPool.abi.json';
const contract = '0x249d15412f15a8E5D8fc1730E6eA8A97Df515557';

type ContentDto = {
  headline: string;
  description?: string;
  typ: number;
  status?: number;
  budget: number;
  url?: string;
  previewUrl?: string;
  total: number;
}

type RequestQualificationDto = {
  flows?: number;
  tags?: any[];
}

type ClaimQualificationDto = {
  likes?: number;
  comments?: number;
  mirrors?: number;
}

type PublishContentDto = {
  contentDto: ContentDto;
  requestDto: RequestQualificationDto | undefined;
  claimDto: ClaimQualificationDto;
}

interface IProps {
  address?: `0x${string}`;
  abi?: readonly {}[],
  functionName: string;
  args?: any[];
}

function CreateProject() {
  const [headLine, setHeadLine] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [budget, setBudget] = React.useState<number>(1);
  const [url, setUrl] = React.useState<string>("");
  const [previewUrl, setPreviewUrl] = React.useState<string>("");
  const [total, setTotal] = React.useState<number>(1);
  const [typ, setTyp] = React.useState<number>(0);
  const [flows, setFlows] = React.useState<number>(0);
  const [likes, setLikes] = React.useState<number>(0);
  const [comments, setComments] = React.useState<number>(0);
  const [mirrors, setMirrors] = React.useState<number>(0);
  const [checkArr, setCheckArr] = React.useState<any[]>([]);
  const [checkData, setCheckData] = React.useState([
    { value: 0, label: 'DeFi', checked: true },
    { value: 1, label: 'NFT', checked: true },
    { value: 2, label: 'GameFi', checked: true },
    { value: 3, label: 'DAO', checked: true },
    { value: 4, label: 'SocialFi', checked: true },
    { value: 5, label: 'Metaverse', checked: true },
    { value: 6, label: 'Ecosystem', checked: true },
    { value: 7, label: 'Other', checked: true },
  ]);

  // const approveDto = {
  //   spender: "0x15af10B0eD449a793ECdFDfdb935a86DA1B6dea2",
  //   amount: 100,
  // }
  // // 授权
  // const [functionName, setFunctionName] = React.useState<string>("approve")
  // const [args, setArgs] = useState<IProps>({
  //   functionName: functionName,
  //   args: [approveDto],
  // })
  // useState()
  // const { data, isLoading, isSuccess, write } = useContract(args)

  const functionName = "publishContent"
  const args: IProps = {
    address: contract,
    abi: abi,
    functionName: functionName,
    args: [{
      contentDto: {
        headline: headLine,
        description: description,
        typ: typ,
        status: 0,
        budget: budget,
        url: url,
        previewUrl: previewUrl,
        total: total,
      },
      requestDto: {
        flows: flows,
        tags: checkArr,
      },
      claimDto: {
        likes: likes,
        comments: comments,
        mirrors: mirrors,
      },
    }],
  }
  const { data, isLoading, isSuccess, write } = useContract(args)
  const navigate = useNavigate();

  // if (isSuccess) {
  //   window.location.href="/";
  // }

  return (
    <div className={styles.createProjectContainer}>
      <Box sx={{ padding: '0 150px' }} className={styles.formWrapper}>
        <form onSubmit={
          (e) => {
            e.preventDefault()
            console.log({
              contentDto: {
                headline: headLine,
                description: description,
                typ: typ,
                status: 0,
                budget: budget,
                url: url,
                previewUrl: previewUrl,
                total: total,
              },
              requestDto: {
                flows: flows,
                tags: checkArr,
              },
              claimDto: {
                likes: likes,
                comments: comments,
                mirrors: mirrors,
              },
            })
            write?.()
          }}
        >
          <h1>Create An Content</h1>
          <Stack spacing={5}>
            <FormControl required>
              <FormLabel component="legend">
                HeadLine
              </FormLabel>
              <Input
                  onChange={
                    (e) => {
                      setHeadLine(e.target.value)
                    }
                  }
              />
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
                Description
              </FormLabel>
              <Input
                  onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl required>
              <FormLabel component="legend">
                Type
              </FormLabel>
              <Select
                  onChange={(e: React.ChangeEvent<{ value: number }>) => setTyp(e.target.value)}
                  value={typ}
              >
                <MenuItem value="0">Open</MenuItem>
                <MenuItem value="1">Restricted</MenuItem>
              </Select>
            </FormControl>
            <FormControl required>
              <FormLabel component="legend">
                Budget
              </FormLabel>
              <Input
                  onChange={(e: React.ChangeEvent<{ value: number }>) => setBudget(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
              Url
              </FormLabel>
              <Input
                  onChange={(e) => setUrl(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
              previewUrl
              </FormLabel>
              <Input
                  onChange={(e) => setPreviewUrl(e.target.value)}
              />
            </FormControl>
            <FormControl required>
              <FormLabel component="legend">
              Total
              </FormLabel>
              <Input
                  onChange={(e: React.ChangeEvent<{ value: number }>) => setTotal(e.target.value)}
              />
            </FormControl>
          </Stack>

          {/* 切换成restricted */}
          <div style={{ display: typ == 0 ? 'none' : ''}}>
            <h1>Restricted Qualification</h1>
            <Stack spacing={5}>
              <FormControl>
                <FormLabel component="legend">
                Flows
                </FormLabel>
                <Input
                    onChange={(e: React.ChangeEvent<{ value: number }>) => setFlows(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel component="legend">
                tags
                </FormLabel>
                <div className={styles.chipDiv}>
                  <FormGroup row>
                  {checkData.map((item, key) => (
                    <FormControlLabel key={`items.${key}`}
                      control={<Checkbox
                        onChange={() => {
                          checkData[key].checked = checkData[key].checked ? false : true
                          const arr = checkData.filter(it => !it.checked)
                          setCheckArr(arr)
                        }}/>}
                      label={item.label}
                    />
                    ))}
                    </FormGroup>
                </div>
              </FormControl>
            </Stack>
          </div>
          <h1>Claim Qualification</h1>
          <Stack spacing={5}>
            <FormControl>
              <FormLabel component="legend">
                Likes
              </FormLabel>
              <Input
                  onChange={(e: React.ChangeEvent<{ value: number }>) => setLikes(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
                Comments
              </FormLabel>
              <Input
                  onChange={(e: React.ChangeEvent<{ value: number }>) => setComments(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
                Mirrors
              </FormLabel>
              <Input
                  onChange={(e: React.ChangeEvent<{ value: number }>) => setMirrors(e.target.value)}
              />
            </FormControl>
          </Stack>
          <Button type="submit" sx={{ marginTop: '100px' }} size="large" variant="contained" disabled={!write || isLoading} >
            {isLoading ? 'Creating...' : 'Create Content'}
          </Button>
          {isSuccess && (
              <div>
                <br/>
                Create Content Successfully!
                <div>
                  {/*<a href={`https://etherscan.io/tx/${data?.hash}`}>TXHash: ${data?.hash}</a>*/}
                  TXHash: {data?.hash}
                </div>
              </div>
          )}
        </form>
      </Box>
    </div>
  );
}

export default CreateProject;
