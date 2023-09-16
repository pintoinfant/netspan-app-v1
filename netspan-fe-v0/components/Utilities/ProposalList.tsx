import {
  GOVERNOR_CONTRACT_ABI,
  GOVERNOR_CONTRACT_ADDRESS,
} from '@/utilities/contractDetails';
import {
  CheckBadgeIcon,
  XCircleIcon,
  FlagIcon,
  PauseCircleIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';

let statusList = [
  'Pending',
  'Active',
  'Cancelled',
  'Defeated',
  'Succeeded',
  'Queued',
  'Expired',
  'Executed',
];

export default function ProposalList({ proposal, proposalId }: any) {
  const [renderMarkdown, setRenderMarkdown] = useState<any>();
  const {
    data: stateData,
    isError: isErrorState,
    isLoading: isLoadingState,
  }: { data: any; isError: boolean; isLoading: boolean } = useContractRead({
    address: GOVERNOR_CONTRACT_ADDRESS,
    abi: GOVERNOR_CONTRACT_ABI.abi,
    functionName: 'state',
    args: [proposalId],
  });

  const {
    data: votesData,
    isError: isErrorVote,
    isLoading: isLoadingVote,
  }: { data: any; isError: boolean; isLoading: boolean } = useContractRead({
    address: GOVERNOR_CONTRACT_ADDRESS,
    abi: GOVERNOR_CONTRACT_ABI.abi,
    functionName: 'proposalVotes',
    args: [proposalId],
  });

  function cal(num) {
    const val = parseInt(votesData[1]) + parseInt(votesData[0]);
    if (val < 1) {
      return (parseInt(num) / 1) * 100;
    } else {
      return (
        (parseInt(num) / (parseInt(votesData[1]) + parseInt(votesData[0]))) *
        100
      );
    }
  }

  useEffect(() => {
    try {
      return setRenderMarkdown(JSON.parse(proposal.description).title);
    } catch {
      return setRenderMarkdown(proposal.description);
    }
  }, [renderMarkdown]);

  return (
    <div>
      <li key={proposalId} className="space-x-6">
        <Link
          className="px-5 py-5 grid grid-cols-12 hover:bg-zinc-50 rounded-sm border-l-2 border-white hover:border-primary-600"
          href={`/proposals/${proposalId}`}
        >
          <div className="col-span-10 flex items-center min-w-0 gap-x-4">
            <div className="h-3 w-3">
              {statusList[stateData] === 'Active' && (
                <div className="relative flex items-center h-3 w-3 bg-primary-600 rounded-full">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-600 opacity-75" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-medium leading-6 text-zinc-900 line-clamp-2 text-ellipsis">
                {/* {JSON.parse(proposal.description).title} */}
                {renderMarkdown}
                {/* {JSON.parse(proposal.description).title &&
                  JSON.parse(proposal.description).title} */}
              </p>
              <div className="mt-3 flex items-center gap-x-5">
                <div className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-900 ring-1 ring-inset ring-zinc-200 capitalize">
                  <svg
                    className={`h-1.5 w-1.5 ${
                      statusList[stateData] === 'Active' ||
                      statusList[stateData] == 'Queued'
                        ? 'fill-yellow-500'
                        : statusList[stateData] === 'Succeeded' ||
                          statusList[stateData] == 'Executed'
                        ? 'fill-green-500'
                        : statusList[stateData] === 'Pending'
                        ? 'fill-gray-500'
                        : 'fill-red-500'
                    }`}
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx={3} cy={3} r={3} />
                  </svg>
                  {statusList[stateData]}
                </div>
                {statusList[stateData] == 'Active' &&
                  proposal.remainingTime && (
                    <div className="mt-1 text-xs leading-5 text-zinc-500">
                      <time dateTime={proposal.remainingTime}>
                        {proposal.remainingTime}
                      </time>
                    </div>
                  )}
              </div>
            </div>
          </div>
          {isLoadingVote ? (
            <div>Loading</div>
          ) : (
            <div className="col-span-2 hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              {statusList[stateData] === 'Active' ? (
                <>
                  <div className="w-full">
                    <p className="mt-1 text-xs leading-5 text-zinc-500 flex justify-between">
                      <span>
                        {parseInt(votesData[1])} out of{' '}
                        {parseInt(votesData[1]) + parseInt(votesData[0])}
                      </span>
                      <span className="font-medium text-zinc-700">For</span>
                    </p>
                    <div className="w-full bg-zinc-200 rounded-full h-1">
                      <div
                        className="bg-green-600 h-1 rounded-full"
                        style={{
                          width: `${cal(votesData[1])}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-3 w-full">
                    <p className="mt-1 text-xs leading-5 text-zinc-500 flex justify-between">
                      <span>
                        {parseInt(votesData[0])} out of{' '}
                        {parseInt(votesData[1]) + parseInt(votesData[0])}
                      </span>
                      <span className="font-medium text-zinc-700">Against</span>
                    </p>
                    <div className="w-full bg-zinc-200 rounded-full h-1">
                      <div
                        className="bg-red-600 h-1 rounded-full"
                        style={{
                          width: `${cal(votesData[0])}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </>
              ) : statusList[stateData] === 'Defeated' ||
                statusList[stateData] == 'Cancelled' ||
                statusList[stateData] == 'Expired' ? (
                <div className="flex items-center gap-x-1">
                  <span className="text-sm font-medium">
                    {statusList[stateData]}
                  </span>
                  <XCircleIcon
                    className="text-red-600 group-hover:text-white h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              ) : statusList[stateData] == 'Pending' ||
                statusList[stateData] == 'Queued' ? (
                <div className="flex items-center gap-x-1">
                  <span className="text-sm font-medium">
                    {statusList[stateData]}
                  </span>
                  <PauseCircleIcon
                    className="text-green-600 group-hover:text-white h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-x-1">
                  <span className="text-sm font-medium">
                    {statusList[stateData]}
                  </span>
                  <CheckBadgeIcon
                    className="text-green-600 group-hover:text-white h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          )}
        </Link>
      </li>
    </div>
  );
}
