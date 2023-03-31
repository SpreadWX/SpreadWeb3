import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';

interface IProps {
  address?: `0x${string}`;
  abi?: readonly {}[],
  functionName: string;
  args?: any[];
}

const useContract = (props: IProps) => {
  const {address, abi, functionName, args } = props;
  const { config } = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName,
    args,
  });

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return { data, isLoading, isSuccess, write };
};

export default useContract;

