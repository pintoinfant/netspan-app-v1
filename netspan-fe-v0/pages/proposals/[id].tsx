import Head from 'next/head';
import ApplicationLayout from '@/components/Utilities/ApplicationLayout';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  QueueButton,
  ExecuteButton,
} from '@/components/Utilities/ProposalMethods';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import {
  GOVERNOR_CONTRACT_ABI,
  GOVERNOR_CONTRACT_ADDRESS,
  TCR_CONTRACT_ABI,
  TCR_CONTRACT_ADDRESS,
} from '@/utilities/contractDetails';
import { useRouter } from 'next/router';
import axios from 'axios';
import Proposals from '../governance';
import { encodeFunctionData, toHex, keccak256 } from 'viem';

export default function Proposal() {
  const { address } = useAccount();
  const [proposalData, setProposalData] = useState();
  const [votes, setVotes] = useState();
  const [totalVoteCount, setTotalVoteCount] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const id = router.query.id;

  const { data: voted } = useContractRead({
    address: GOVERNOR_CONTRACT_ADDRESS,
    abi: GOVERNOR_CONTRACT_ABI.abi,
    functionName: 'hasVoted',
    args: [id, address],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: GOVERNOR_CONTRACT_ADDRESS,
    abi: GOVERNOR_CONTRACT_ABI.abi,
    functionName: 'castVote',
  });

  const { data: stateData, isSuccess: isStateSuccess } = useContractRead({
    address: GOVERNOR_CONTRACT_ADDRESS,
    abi: GOVERNOR_CONTRACT_ABI.abi,
    functionName: 'state',
    args: [id],
  });

  // const encodedCallData = encodeFunctionData({
  //   abi: TCR_CONTRACT_ABI.abi,
  //   functionName: 'createEntry',
  //   args: ['598-766', 'FabianNet', 'Goa'],
  // });

  // console.log(encodedCallData);

  // if (
  //   encodedCallData ==
  //   '0xb8ba58a5000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000073539382d37363600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000946616269616e4e657400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003476f610000000000000000000000000000000000000000000000000000000000'
  // ) {
  //   console.log('matches');
  // } else {
  //   console.log('does not match');
  // }

  // const {
  //   data: hashData,
  //   isLoading: isHashLoading,
  //   isSuccess: isHashSuccess,
  //   isError: isHashError,
  // } = useContractRead({
  //   address: GOVERNOR_CONTRACT_ADDRESS,
  //   abi: GOVERNOR_CONTRACT_ABI.abi,
  //   functionName: 'hashProposal',
  //   args: [
  //     [TCR_CONTRACT_ADDRESS],
  //     [0],
  //     [encodedCallData],
  //     keccak256(
  //       toHex(
  //         '{"name":"FabianNet","description":"Proposal for FabianNet","mnc":"766","mcc":"598","region":"Goa","plmn":"598-766","title":"New PLMN Registry For FabianNet"}',
  //       ),
  //     ),
  //   ],
  // });

  // console.log(hashData);

  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`/api/proposalRetrival/details?proposalId=${router.query.id}`)
        .then(function (proposal) {
          console.log(proposal);
          setProposalData(proposal.data.proposal);
          // console.log(proposal.data.votes)
          setTotalVoteCount(proposal.data.votes.length);
          let votes = proposal.data.votes;
          let forVotes: any = [];
          let againstVotes: any = [];
          let abstainVotes: any = [];
          votes.forEach(vote => {
            let voteIndex = vote.args[2];
            if (voteIndex == 0) {
              againstVotes.push(vote.args[0]);
            } else if (voteIndex == 1) {
              forVotes.push(vote.args[0]);
            } else {
              abstainVotes.push(vote.args[0]);
            }
          });
          setVotes({
            forVotes,
            againstVotes,
            abstainVotes,
          });
          setLoading(false);
          // console.log({ forVotes, againstVotes, abstainVotes });
        });
    }
  }, [router.isReady]);

  if (loading) {
    return <ApplicationLayout customHeader="Loading..."></ApplicationLayout>;
  }

  return (
    <>
      <Head>
        <title>
          Dashboard - Netspan | Democratizing EV Technology using the Blockchain
        </title>
      </Head>

      <ApplicationLayout customHeader={JSON.parse(proposalData.args[8]).title}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <div className="rounded-md bg-white shadow py-6">
            {/* Votes Progress Bar Start */}
            <div className="w-full px-5 sm:px-6">
              <p className="mt-1 text-md leading-5 font-bold flex justify-between">
                <span className="text-zinc-700">For</span>
                <span className="">
                  {votes.forVotes.length} out of {totalVoteCount}
                </span>
              </p>
              <div className="mt-3 w-full bg-zinc-200 rounded-full h-1">
                <div
                  className="bg-green-600 h-1 rounded-full"
                  style={{
                    width: `${(votes.forVotes.length / totalVoteCount) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            {/* Votes Progress Bar End */}
            {/* Addresses Start */}
            <div className="mt-8 px-5 sm:px-6 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-0"
                        >
                          {votes.forVotes.length} Addresses
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-right text-sm font-semibold text-gray-400"
                        >
                          Votes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {votes.forVotes.map(address => (
                        <tr key={address.address}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {address}
                          </td>
                          {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                            {address.votes}
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Addresses End */}
            <div className="mt-5 pt-5 border-t border-gray-200 font-black text-gray-600 text-md text-center">
              View All
            </div>
          </div>

          <div className="rounded-md bg-white shadow py-6">
            {/* Votes Progress Bar Start */}
            <div className="w-full px-5 sm:px-6">
              <p className="mt-1 text-md leading-5 font-bold flex justify-between">
                <span className="text-zinc-700">Against</span>
                <span className="">
                  {votes.againstVotes.length} out of {totalVoteCount}
                </span>
              </p>
              <div className="mt-3 w-full bg-zinc-200 rounded-full h-1">
                <div
                  className="bg-red-600 h-1 rounded-full"
                  style={{
                    width: `${
                      (votes.againstVotes.length / totalVoteCount) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            {/* Votes Progress Bar End */}
            {/* Addresses Start */}
            <div className="mt-8 px-5 sm:px-6 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-0"
                        >
                          {votes.againstVotes.length} Addresses
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-right text-sm font-semibold text-gray-400"
                        >
                          Votes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {votes.againstVotes.map(address => (
                        <tr key={address.address}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {address}
                          </td>
                          {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 text-right">
                            {address.votes}
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Addresses End */}
            <div className="mt-5 pt-5 border-t border-gray-200 font-black text-gray-600 text-md text-center">
              View All
            </div>
          </div>
        </div>

        {stateData == 1 && voted ? (
          <div
            className="container m-4 flex justify-center rounded-sm border-black shadow-md p-3"
            style={{ backgroundColor: '#e9c46a' }}
          >
            <h4>You have voted!</h4>
          </div>
        ) : (
          stateData == 1 && (
            <div className="flex space-x-4 my-4">
              <button
                type="button"
                className="flex-1 rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                value={1}
                onClick={() =>
                  write({
                    args: [id, 1],
                    from: address,
                  })
                }
              >
                For
              </button>
              <button
                type="button"
                className="flex-1 rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                value={0}
                onClick={() =>
                  write({
                    args: [id, 0],
                    from: address,
                  })
                }
              >
                Against
              </button>
              <button
                type="button"
                className="flex-1 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                value={2}
                onClick={() =>
                  write({
                    args: [id, 2],
                    from: address,
                  })
                }
              >
                Abstain
              </button>
            </div>
          )
        )}

        {/* Current: Success */}
        {stateData === 4 && <QueueButton proposalData={proposalData} />}
        {/* Current: Queue */}
        {stateData === 5 && <ExecuteButton proposalData={proposalData} />}

        <div className="rounded-md bg-white shadow py-6">
          {/* {!isLoading && (
            <ReactMarkdown children={JSON.parse(proposalData.args[8])} />
          )} */}
          <div className="rounded-md bg-white shadow px-5 sm:px-6 py-6">
            {
              <ReactMarkdown
                children={JSON.parse(proposalData.args[8]).description}
              />
            }
          </div>
        </div>
      </ApplicationLayout>
    </>
  );
}
