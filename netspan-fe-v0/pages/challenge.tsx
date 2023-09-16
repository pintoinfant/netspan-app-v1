import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import ApplicationLayout from '@/components/Utilities/ApplicationLayout';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { encodeFunctionData } from 'viem';
import { useContractWrite } from 'wagmi';
import {
  GOVERNOR_CONTRACT_ABI,
  GOVERNOR_CONTRACT_ADDRESS,
  TCR_CONTRACT_ABI,
  TCR_CONTRACT_ADDRESS,
} from '@/utilities/contractDetails';

export default function Challenge() {
  let data: {
    id: string;
    date: any;
    name: string;
    plmn: string;
    mnc: string;
    mcc: string;
    region: string;
  }[] = [];
  const [proposalData, setProposalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // const encodedCallData = encodeFunctionData({
  //   abi: TCR_CONTRACT_ABI.abi,
  //   functionName: 'deleteEntry',
  //   args: [plmn],
  // });

  // const {
  //   data: proposeData,
  //   isLoading,
  //   isSuccess,
  //   write,
  // } = useContractWrite({
  //   address: GOVERNOR_CONTRACT_ADDRESS,
  //   abi: GOVERNOR_CONTRACT_ABI.abi,
  //   functionName: 'propose',
  //   args: [
  //     [TCR_CONTRACT_ADDRESS],
  //     [0],
  //     [encodedCallData],
  //     JSON.stringify({
  //       ...inputs,
  //       title: `New PLMN Registry For ${inputs.name}`,
  //     }),
  //   ],
  // });

  useEffect(() => {
    axios
      .get('/api/proposalRetrival/exist')
      .then(function (proposals) {
        console.log('proposals: ', proposals.data);
        proposals.data.proposals.forEach(element => {
          let createdTime = new Date(
            parseInt(element['_id'].substring(0, 8), 16) * 1000,
          ).toLocaleDateString();
          let plmnBinders = element['args'][0].split('-');
          data.push({
            id: element['args'][0],
            date: createdTime,
            name: element['args'][2],
            plmn: element['args'][0],
            mnc: plmnBinders[1],
            mcc: plmnBinders[0],
            region: element['args'][3],
          });
        });
        setProposalData(data);
        console.log(proposalData);

        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard - Netspan | Democratizing EV Technology using the Blockchain
        </title>
      </Head>

      <ApplicationLayout customHeader="Governance Overview">
        <div className="rounded-md bg-white px-5 py-6 shadow sm:px-6">
          <div className="font-black text-zinc-900 text-2xl">PLMN Registry</div>
          <div>
            Here&apos;s a list of all registry created on the Netspan DAO.
          </div>
          {/* Recent Proposals Start */}
          <div className="mt-3">
            <ul role="list" className="divide-y divide-zinc-100">
              {proposalData.map((proposal, index) => (
                <div key={proposal.id}>
                  <li className="grid grid-cols-12 space-x-6">
                    <div className="col-span-10 flex items-center min-w-0 gap-x-4 py-5">
                      <div className="min-w-0 flex-auto">
                        <div className="font-medium text-gray-500 text-sm">
                          Network:{' '}
                          <span className="text-gray-900">{proposal.name}</span>
                        </div>
                        <div className="font-medium text-gray-500 text-sm">
                          Region:{' '}
                          <span className="text-gray-900">
                            {proposal.region}
                          </span>
                        </div>
                        <div className="font-medium text-gray-500 text-sm">
                          MCC:{' '}
                          <span className="text-gray-900">{proposal.mcc}</span>
                        </div>
                        <div className="font-medium text-gray-500 text-sm">
                          PLMN:{' '}
                          <span className="text-gray-900">{proposal.plmn}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-x-5">
                          <div className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-900 ring-1 ring-inset ring-zinc-200 capitalize">
                            <svg
                              className="h-1.5 w-1.5 fill-green-500"
                              viewBox="0 0 6 6"
                              aria-hidden="true"
                            >
                              <circle cx={3} cy={3} r={3} />
                            </svg>
                            Executed
                          </div>
                          <div className="mt-1 text-xs leading-5 text-zinc-500">
                            <time dateTime={proposal.date}>
                              {proposal.date}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 hidden shrink-0 sm:flex justify-end">
                      <div className="flex items-center gap-x-1">
                        <button
                          type="button"
                          className="flex  items-center gap-x-1 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          value={1}
                          // onClick={}
                        >
                          Challlenge{' '}
                          <XCircleIcon
                            className="text-red-200 group-hover:text-white h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          {/* Recent Proposals End */}
        </div>
      </ApplicationLayout>
    </>
  );
}
