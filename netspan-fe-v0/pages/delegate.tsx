import Head from 'next/head';
import ApplicationLayout from '@/components/Utilities/ApplicationLayout';
import ProposalList from '@/components/Utilities/ProposalList';
import { gql } from '@apollo/client';
import { client } from '@/utilities/graphql';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import {
  NETSPAN_TOKEN_ABI,
  NETSPAN_TOKEN_ADDRESS,
} from '@/utilities/contractDetails';

export default function Proposals() {
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = useState(address);
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: NETSPAN_TOKEN_ADDRESS,
    abi: NETSPAN_TOKEN_ABI.abi,
    functionName: 'delegate',
    args: [walletAddress],
  });

  const { data: VotingTokens } = useContractRead({
    address: NETSPAN_TOKEN_ADDRESS,
    abi: NETSPAN_TOKEN_ABI.abi,
    functionName: 'getVotes',
    args: [address],
  });

  console.log(VotingTokens);

  return (
    <>
      <Head>
        <title>
          Dashboard - Netspan | Democratizing EV Technology using the Blockchain
        </title>
      </Head>

      <ApplicationLayout customHeader="Governance Overview">
        <div className="rounded-md bg-white px-5 py-6 shadow sm:px-6">
          <div className="font-black text-zinc-900 text-2xl">Voting Power</div>
          {/* <div>
            Here&apos;s a list of all recent proposals created on the Netspan
            DAO.
          </div> */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
            <dt className="text-sm font-medium leading-6 text-zinc-500">
              Total Votes you posses
            </dt>
            <dd className="w-full flex-none text-3xl font-bold leading-10 tracking-tight text-zinc-900">
              {VotingTokens ? VotingTokens.toString() : '0'}
            </dd>
          </div>
          <div className="">
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Delegate voting power
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Your delegate&apos;s performance impacts your onchain
                    reputation. Delegate to someone who is aligned with your
                    goals and actively participates.
                  </p>
                </div>
              </div>

              <div className="ml-4 mt-4 flex-shrink-0">
                <div className="mt-2">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0x00000000000000000000000000000000"
                    defaultValue={address}
                    onChange={e => setWalletAddress(e.target.value)}
                    aria-describedby="address"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => write()}
                  className="relative mt-2 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Delegate votes
                </button>
              </div>
            </div>
          </div>
          {/* Recent Proposals Start */}

          {/* Recent Proposals End */}
        </div>
      </ApplicationLayout>
    </>
  );
}
