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
import { useForm, SubmitHandler } from "react-hook-form";
import useContract from "@/hooks/useContract";

import abi from '@/assets/abi/ContentPool.abi.json';
const contractAddr = "0xA0fFb312b367F1559979acd51218EbE2a61137C6"

type FormValues = {
  headLine: string;
  description: string;
  budget: number;
  url: string;
  previewUrl: string;
  total: number;
  selectType: number;
  flows?: number;
  likes?: number;
  comments?: number;
  mirrors?: number;
};

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
  tags?: string[];
}

type ClaimQualificationDto = {
  likes?: number;
  comments?: number;
  mirrors?: number;
}

type PublishContentDto = {
  contentDto?: ContentDto;
  requestDto?: RequestQualificationDto;
  claimDto?: ClaimQualificationDto;
}

interface IProps {
  address?: `0x${string}`;
  abi?: readonly {}[],
  functionName: string;
  args?: any[];
}

function CreateProject() {
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

  // const [contentDto, setContentDto] = React.useState<ContentDto>();
  // const [requestQualificationDto, setRequestQualificationDto] = React.useState<RequestQualificationDto>();
  // const [claimQualificationDto, setClaimQualificationDto] = React.useState<ClaimQualificationDto>();
  const [publishContentDto, setPublishContentDto] = React.useState<PublishContentDto>();

  const functionName = "publishContent"
  const args: IProps = {
    address: contractAddr,
    abi: abi,
    functionName: functionName,
    args: [publishContentDto],
  }
  const { data, isLoading, isSuccess, write } = useContract(args)
  console.log("data: " + data);
  console.log("isLoading: " + isLoading);
  console.log("isSuccess: " + isSuccess);
  console.log("write: " + write);

  const navigate = useNavigate();
  const [selectType, setSelectType] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{ value: number }>) => {
    setSelectType(event.target.value);
  };
  const [checkArr, setCheckArr] = React.useState<any[]>([]);
  const [checkData, setCheckData] = React.useState([
      { value: 0, label: '第一', checked: true },
      { value: 1, label: '第二', checked: true },
      { value: 2, label: 'A', checked: true },
      { value: 3, label: 'B', checked: true },
      { value: 4, label: 'C', checked: true },
      { value: 5, label: 'D', checked: true },
      { value: 6, label: 'E', checked: true },
    ]);
  const { register, handleSubmit } = useForm<FormValues>();
  const handleCreate: SubmitHandler<FormValues> = dd => {
    const contentDto: ContentDto = {
      headline: dd.headLine,
      description: dd.description,
      typ: dd.selectType,
      status: 0,
      budget: dd.budget,
      url: dd.url,
      previewUrl: dd.previewUrl,
      total: dd.total,
    };

    const requestQualificationDto: RequestQualificationDto = {
      flows: dd.flows,
      tags: checkArr,
    }

    const claimQualificationDto: ClaimQualificationDto = {
      likes: dd.likes,
      comments: dd.comments,
      mirrors: dd.mirrors,
    }

    const publishContentDto: PublishContentDto = {
      contentDto: contentDto,
      requestDto: requestQualificationDto,
      claimDto: claimQualificationDto,
    }
    setPublishContentDto(publishContentDto);
    write?.();
  };

  return (
    <div className={styles.createProjectContainer}>
      <Box sx={{ padding: '0 150px' }} className={styles.formWrapper}>
        <form onSubmit={handleSubmit(handleCreate)}>
          <h1>Create An Content</h1>
          <Stack spacing={5}>
            <FormControl required>
              <FormLabel component="legend">
                HeadLine
              </FormLabel>
              <Input fullWidth {...register("headLine")} />
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
                Description
              </FormLabel>
              <Input fullWidth {...register("description")} />
            </FormControl>
            <FormControl required>
              <FormLabel component="legend">
                Type
              </FormLabel>
              <Select {...register("selectType")} value={selectType} onChange={handleChange}>
                <MenuItem value="0">Open</MenuItem>
                <MenuItem value="1">Restricted</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
                Budget
              </FormLabel>
              <Input fullWidth {...register("budget")} />
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
              Url
              </FormLabel>
              <Input fullWidth {...register("url")} />
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
              previewUrl
              </FormLabel>
              <Input fullWidth {...register("previewUrl")} />
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
              Total
              </FormLabel>
              <Input fullWidth {...register("total")} />
            </FormControl>
          </Stack>

          {/* 切换成restricted */}
          <div style={{ display: selectType == 0 ? 'none' : ''}}>
            <h1>Restricted Qualification</h1>
            <Stack spacing={5}>
              <FormControl>
                <FormLabel component="legend">
                Flows
                </FormLabel>
                <Input fullWidth {...register("flows")} />
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
                    ))
                    }
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
              <Input fullWidth {...register("likes")} />
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
                Comments
              </FormLabel>
              <Input fullWidth {...register("comments")} />
            </FormControl>
            <FormControl>
              <FormLabel component="legend">
                Mirrors
              </FormLabel>
              <Input fullWidth {...register("mirrors")}/>
            </FormControl>
          </Stack>
          <Button type="submit" sx={{ marginTop: '100px' }} size="large" variant="contained" disabled={!write || isLoading} >
            {isLoading ? 'Create Content...' : 'Create Content'}
          </Button>
          {isSuccess && (
              <div>
                Successfully Create Content!
                <div>
                  <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                </div>
              </div>
          )}
        </form>
      </Box>
    </div>
  );
}

export default CreateProject;
