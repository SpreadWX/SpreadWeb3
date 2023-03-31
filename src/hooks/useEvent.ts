import { useContractEvent } from 'wagmi';

interface IProps {
  address?: `0x${string}`;
  abi?: readonly {}[],
  eventName: string;
  listener: (node: any, label: any, owner: any) => void;
}

const useEvent = (props: IProps) => {
  const { address, abi, eventName, listener } = props;

  useContractEvent({
    address: address,
    abi: abi,
    eventName: eventName,
    listener: listener,
  });
};

export default useEvent;
