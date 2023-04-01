import React from "react";
import ShowInfo from '@/components/show-info/index';
import {useAccount, useContractRead, UseContractReadConfig} from "wagmi";
import cpAbi from "@/assets/abi/ContentPool.abi.json";

const contract = '0x249d15412f15a8E5D8fc1730E6eA8A97Df515557';
type QueryDto = {
    pageIndex: number;
    pageSize: number;
    isDescend: boolean;
};

const Pulish = () => {
    const { address = '', isConnected } = useAccount();
    const query : QueryDto = {pageIndex:0,pageSize:20,isDescend:true}
    const result =  useContractRead({
        address: contract,
        abi: cpAbi,
        functionName: 'getReceiveContentsForUser',
        args:   [address, query],
        overrides: { from: isConnected ? address:'0x350b7BD90B1A94A022ACc7f1B9B6907FAc872bdd' },
    }as UseContractReadConfig<typeof cpAbi, 'getReceiveContentsForUser'>)
    const res = result.data as any[]

    var arr =[[1,0x350b7BD90B1A94A022ACc7f1B9B6907FAc872bdd,"title","desc",0,0,10],
        [1,0x350b7BD90B1A94A022ACc7f1B9B6907FAc872bdd,"title1","desc",0,0,10],
        [1,0x350b7BD90B1A94A022ACc7f1B9B6907FAc872bdd,"title2","desc",0,0,10]]
    if (res?.length >1)
    {
        arr= res[1]
        console.log(arr)
    }
  return (
  <div className="container-box">
   <ShowInfo dataArr={arr}/>
  </div>
  );
}

export default Pulish;
