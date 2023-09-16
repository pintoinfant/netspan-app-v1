import Head from 'next/head';
import {
  BanknotesIcon,
  Battery100Icon,
  CreditCardIcon,
  CursorArrowRippleIcon,
} from '@heroicons/react/24/outline';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import {
  NETSPAN_TOKEN_ABI,
  NETSPAN_TOKEN_ADDRESS,
} from '@/utilities/contractDetails';
import ApplicationLayout from '@/components/Utilities/ApplicationLayout';
import { useState } from 'react';

const stats = [
  {
    name: 'Revenue',
    value: '$405,091.00',
    change: '+4.75%',
    changeType: 'positive',
  },
  {
    name: 'Overdue invoices',
    value: '$12,787.00',
    change: '+54.02%',
    changeType: 'negative',
  },
  {
    name: 'Outstanding invoices',
    value: '$245,988.00',
    change: '-1.39%',
    changeType: 'positive',
  },
  {
    name: 'Expenses',
    value: '$30,156.00',
    change: '+10.18%',
    changeType: 'negative',
  },
];
const items = [
  {
    title: 'Register a vehicle',
    description: "Another to-do system you'll try but eventually give up on.",
    icon: CursorArrowRippleIcon,
    background: 'bg-pink-500',
  },
  {
    title: 'Register a charging station',
    description: "Stay on top of your deadlines, or don't — it's up to you.",
    icon: Battery100Icon,
    background: 'bg-primary-500',
  },
  {
    title: 'Top up charging points',
    description: 'Great for mood boards and inspiration.',
    icon: CreditCardIcon,
    background: 'bg-blue-500',
  },
  {
    title: 'Withdraw earnings',
    description: 'Track tasks in different stages of your project.',
    icon: BanknotesIcon,
    background: 'bg-purple-500',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
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

  return (
    <>
      <Head>
        <title>
          Dashboard - Netspan | Democratizing EV Technology using the Blockchain
        </title>
      </Head>

      <ApplicationLayout customHeader="Your Dashboard">
        {/* Earnings Stats Start */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 rounded-md bg-white px-5 py-6 shadow sm:px-6">
          <div>
            <div className="font-black text-zinc-900 text-2xl">
              Voting Power
            </div>
            <div className="mt-1 font-medium text-gray-500 text-sm">
              Total Votes you posses
            </div>
            <div className="mt-5 font-black text-4xl text-gray-900">
              {VotingTokens ? VotingTokens.toString() : '0'}{' '}
              <span className="text-base text-gray-500 font-medium">votes</span>
            </div>
          </div>
          <div>
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Delegate voting power
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your delegate&apos;s performance impacts your onchain
                  reputation. Delegate to someone who is aligned with your goals
                  and actively participates.
                </p>
              </div>
            </div>

            <div className="mt-4 flex-shrink-0">
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="0x00000000000000000000000000000000"
                  defaultValue={address}
                  onChange={e => setWalletAddress(e.target.value)}
                  aria-describedby="address"
                />
              </div>
              <button
                type="button"
                onClick={() => write()}
                className="relative mt-2 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Delegate Votes
              </button>
            </div>
          </div>
          {/* Recent Proposals Start */}

          {/* Recent Proposals End */}
        </div>
        {/* Earnings Stats End */}

        {/* Menu Start */}
        {/* <div className="px-5 lg:px-8">
          <h2 className="pt-8 text-base font-semibold leading-6 text-zinc-900 border-t border-zinc-200">
            {address && (
              <>
                Hello there {address.slice(0, 4)}...
                {address.slice(address.length - 4)}!
              </>
            )}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            What would you like to do today?
          </p>
          <ul
            role="list"
            className="mt-6 grid grid-cols-1 gap-6 border-b border-t border-zinc-200 py-6 sm:grid-cols-2"
          >
            {items.map((item, itemIdx) => (
              <li key={itemIdx} className="flow-root">
                <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-primary-500 hover:bg-zinc-50">
                  <div
                    className={classNames(
                      item.background,
                      'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg',
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900">
                      <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <span>{item.title}</span>
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div> */}
        {/* Menu End */}
      </ApplicationLayout>
    </>
  );
}
