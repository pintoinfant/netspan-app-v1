import { useState } from 'react';
import Head from 'next/head';
import ApplicationLayout from '@/components/Utilities/ApplicationLayout';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useContractWrite } from 'wagmi';
import {
  GOVERNOR_CONTRACT_ABI,
  GOVERNOR_CONTRACT_ADDRESS,
  TCR_CONTRACT_ADDRESS,
  TCR_CONTRACT_ABI,
} from '@/utilities/contractDetails';
import { encodeFunctionData } from 'viem';

export default function Propose() {
  const [Loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    mnc: '',
    mcc: '',
    region: '',
    plmn: '',
  });

  const handleInput = (event: {
    persist: () => void;
    target: { id: any; value: any };
  }) => {
    event.persist();
    setInputs(prev => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const plmn = `${inputs.mcc}-${inputs.mnc}`;
  inputs.plmn = plmn;

  const encodedCallData = encodeFunctionData({
    abi: TCR_CONTRACT_ABI.abi,
    functionName: 'createEntry',
    args: [inputs.plmn, inputs.name, inputs.region],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: GOVERNOR_CONTRACT_ADDRESS,
    abi: GOVERNOR_CONTRACT_ABI.abi,
    functionName: 'propose',
    args: [
      [TCR_CONTRACT_ADDRESS],
      [0],
      [encodedCallData],
      JSON.stringify({
        ...inputs,
        title: `New PLMN Registry For ${inputs.name}`,
      }),
    ],
  });

  // Submit form
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setShowSuccess(false);
    setShowFailed(false);

    write();

    if (isSuccess) {
      setLoading(false);
      setShowSuccess(true);
    } else {
      setLoading(false);
      setShowSuccess(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register PLMN - Netspan | A PLMN TCR</title>
      </Head>

      <ApplicationLayout
        customHeader="Register your PLMN"
        customHeaderDescription="Register PLMN - Netspan | A PLMN TCR"
      >
        <div className="rounded-md bg-white px-5 py-6 shadow sm:px-6">
          <div>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-600">
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-zinc-900"
                >
                  Network name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required={true}
                  onChange={handleInput}
                  value={inputs.name}
                  className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Airtel"
                />
              </div>

              <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-600">
                <label
                  htmlFor="description"
                  className="block text-xs font-medium text-zinc-900"
                >
                  Description
                </label>
                <textarea
                  rows={4}
                  name="description"
                  id="description"
                  required={true}
                  onChange={handleInput}
                  value={inputs.description}
                  className="block w-full px-0 rounded-md border-0 py-1.5 text-zinc-900 ring-0 focus:ring-0 placeholder:text-zinc-400 sm:text-sm sm:leading-6"
                  placeholder="Proposal for registering Airtel for PLMN with MCC 454 and MNC 654"
                />
              </div>

              <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-600">
                <label
                  htmlFor="mnc"
                  className="block text-xs font-medium text-zinc-900"
                >
                  MNC
                </label>
                <input
                  type="text"
                  name="mnc"
                  id="mnc"
                  required={true}
                  onChange={handleInput}
                  value={inputs.mnc}
                  className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="654"
                />
              </div>

              <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-600">
                <label
                  htmlFor="mcc"
                  className="block text-xs font-medium text-zinc-900"
                >
                  MCC
                </label>
                <input
                  type="text"
                  name="mcc"
                  id="mcc"
                  required={true}
                  onChange={handleInput}
                  value={inputs.mcc}
                  className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="454"
                />
              </div>

              <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-600">
                <label
                  htmlFor="region"
                  className="block text-xs font-medium text-zinc-900"
                >
                  Region
                </label>
                <input
                  type="text"
                  name="region"
                  id="region"
                  required={true}
                  onChange={handleInput}
                  value={inputs.region}
                  className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="TamilNadu"
                />
              </div>

              {showSuccess && (
                <div className="mt-6 sm:col-span-2 rounded-md bg-green-600 px-4 py-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon
                        className="h-5 w-5 text-green-300"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-50">
                        We have received your application!
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {showFailed && (
                <div className="mt-6 sm:col-span-2 rounded-md bg-red-600 px-4 py-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircleIcon
                        className="h-5 w-5 text-red-300"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-50">
                        Uh oh! Something went wrong. Please try again.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`rounded-md bg-primary-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600" ${
                    isLoading && 'opacity-50 cursor-progress'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Creating PLMN Registry'
                  ) : (
                    <span className="flex justify-center gap-x-2">
                      Register <span aria-hidden="true">→</span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </ApplicationLayout>
    </>
  );
}
