import { create } from 'ipfs-http-client';

/**
 * 上传ipfs
 * @returns
 */

const useIpfs = () => {
  const ipfsClient = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: 'Basic Mk1NNlFkeUx3Y1JQVE53R0pXb1pFdEJKWFRnOjlmYzMxOTE3YmNmNDE1ZmZkMTdlNTFiYmVjN2Y3NmEz',
    },
  });

  // const added = await ipfsClient.add(file);
  //     console.info(added);

  return { ipfsClient };
};

export default useIpfs;
