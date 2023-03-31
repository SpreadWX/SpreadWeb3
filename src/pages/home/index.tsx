import React from "react";
import ShowInfo from '@/components/show-info/index';
import useContract from '@/hooks/useContract';

type PageQueryCondition = {
    // 当前页面
    pageIndex: number;
    // 每页数据条数
    pageSize: number;
    // 是否逆序
    isDescend: boolean;
}

const Home = () => {
    const condition: PageQueryCondition = {
        pageIndex: 1,
        pageSize: 9,
        isDescend: true,
    }
    const args = {
        functionName: "getContents",
        args: [condition],
    }
    const { data, isLoading, isSuccess, write } = useContract(args);
    console.log("data: " + data);
    console.log("isLoading: " + isLoading);
    console.log("isSuccess: " + isSuccess);
    console.log("write: " + write);

  return (
  <div className="container-box">
   <ShowInfo dataArr={ [1, 2, 3] }/>
  </div>
  );
}

export default Home;
