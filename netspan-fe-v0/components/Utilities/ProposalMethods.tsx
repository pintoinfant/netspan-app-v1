import { useContractRead, useContractWrite } from 'wagmi';
import {
  GOVERNOR_CONTRACT_ABI,
  GOVERNOR_CONTRACT_ADDRESS,
  TCR_CONTRACT_ABI,
  TCR_CONTRACT_ADDRESS,
} from '@/utilities/contractDetails';

import { encodeFunctionData, toHex, keccak256 } from 'viem';

export function QueueButton({ proposalData }) {
  const {
    data: queueData,
    isLoading: isQueueLoading,
    isSuccess: isQueueSuccess,
    isError: isQueueError,
    write: queueProposal,
  } = useContractWrite({
    address: GOVERNOR_CONTRACT_ADDRESS,
    abi: GOVERNOR_CONTRACT_ABI.abi,
    functionName: 'queue',
  });

  const encodedCallData = encodeFunctionData({
    abi: TCR_CONTRACT_ABI.abi,
    functionName: 'createEntry',
    args: [
      JSON.parse(proposalData.args[8]).plmn,
      JSON.parse(proposalData.args[8]).name,
      JSON.parse(proposalData.args[8]).region,
    ],
  });

  const queueArgs = [
    [TCR_CONTRACT_ADDRESS],
    [0],
    [encodedCallData],
    keccak256(toHex(proposalData.args[8])),
  ];

  // const {
  //   data: hashData,
  //   isLoading: isHashLoading,
  //   isSuccess: isHashSuccess,
  //   isError: isHashError,
  // } = useContractRead({
  //   address: GOVERNOR_CONTRACT_ADDRESS,
  //   abi: GOVERNOR_CONTRACT_ABI.abi,
  //   functionName: 'hashProposal',
  //   args: queueArgs,
  // });

  // console.log(hashData);

  return (
    <div className="flex m-2">
      <button
        type="button"
        className="flex-1 rounded-md bg-yellow-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          queueProposal({
            args: queueArgs,
          });
        }}
      >
        {isQueueLoading
          ? 'Queueing'
          : isQueueSuccess
          ? 'Queued'
          : isQueueError
          ? 'Error in Queueing'
          : 'Queue'}
      </button>
    </div>
  );
}

export function ExecuteButton({ proposalData }) {
  const {
    data: executeData,
    isLoading: isExecuteLoading,
    isSuccess: isExecuteSuccess,
    isError: isExecuteError,
    write: executeProposal,
  } = useContractWrite({
    address: GOVERNOR_CONTRACT_ADDRESS,
    abi: GOVERNOR_CONTRACT_ABI.abi,
    functionName: 'execute',
  });

  const encodedCallData = encodeFunctionData({
    abi: TCR_CONTRACT_ABI.abi,
    functionName: 'createEntry',
    args: [
      JSON.parse(proposalData.args[8]).plmn,
      JSON.parse(proposalData.args[8]).name,
      JSON.parse(proposalData.args[8]).region,
    ],
  });

  const executeArgs = [
    [TCR_CONTRACT_ADDRESS],
    [0],
    [encodedCallData],
    keccak256(toHex(proposalData.args[8])),
  ];

  return (
    <div className="flex m-2">
      <button
        type="button"
        className="flex-1 rounded-md bg-yellow-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          executeProposal({
            args: executeArgs,
          });
        }}
      >
        {isExecuteLoading
          ? 'Executing'
          : isExecuteSuccess
          ? 'Executed'
          : isExecuteError
          ? 'Error in Executing'
          : 'Execute'}
      </button>
    </div>
  );
}
