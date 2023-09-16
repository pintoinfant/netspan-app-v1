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
  const [amount, setAmount] = useState(1000000);
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: NETSPAN_TOKEN_ADDRESS,
    abi: NETSPAN_TOKEN_ABI.abi,
    functionName: 'faucet',
    args: [walletAddress, amount],
  });

  return (
    <>
      <Head>
        <title>
          Dashboard - Netspan | Democratizing EV Technology using the Blockchain
        </title>
      </Head>

      <ApplicationLayout customHeader="">
        {/* Earnings Stats Start */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 rounded-md bg-white px-5 py-6 shadow sm:px-6">
          <div>
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Fuel Your Wallet with Netspan Tokens!
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Top up your wallet with Netspan tokens and help create a new
                  path toward a coordinated future for cellular networks.
                </p>
              </div>
            </div>

            <div className="mt-4 flex-shrink-0 w-full">
              <div className="mt-2 flex">
                <div className="min-w-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
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
                <div className="ml-4 min-w-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Amount
                  </label>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    placeholder="1000000"
                    defaultValue={1000000}
                    onChange={e => setAmount(e.target.value)}
                    aria-describedby="amount"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => write()}
                className="relative mt-2 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Fund Wallet
              </button>
            </div>
          </div>
          {/* Recent Proposals Start */}

          {/* Recent Proposals End */}
        </div>
        {/* Earnings Stats End */}
      </ApplicationLayout>
    </>
  );
}
