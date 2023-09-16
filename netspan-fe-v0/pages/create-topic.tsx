import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import ApplicationLayout from '@/components/Utilities/ApplicationLayout';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function CreateTopic() {
  const [Loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    websiteURL: '',
    logoURL: '',
    webhookURL: '',
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

  // Submit form
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setShowSuccess(false);
    setShowFailed(false);

    axios
      .get(
        `/api/topics/create?name=${inputs.name}&description=${inputs.description}&websiteURL=${inputs.websiteURL}&logoURL=${inputs.logoURL}&webhookURL=${inputs.webhookURL}`,
      )
      .then(function (response) {
        console.log(response);
        // Show submission success
        setLoading(false);
        setShowSuccess(true);
        setShowFailed(false);
        setInputs({
          name: '',
          description: '',
          websiteURL: '',
          logoURL: '',
          webhookURL: '',
        });
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setShowSuccess(false);
        setShowFailed(true);
      });
  };

  return (
    <>
      <Head>
        <title>
          Create Topic - Netspan | An Open Standard For Public Land Mobile
          Networks Blockchain
        </title>
      </Head>

      <ApplicationLayout>
        <div className="max-w-3xl mx-auto">
          <div className="text-2xl font-black leading-7 text-zinc-900">
            Create Your Topic
          </div>
          <div className="mt-1 text-sm leading-6 text-zinc-600">
            Netspan makes it extremely easy to open and maintain a genuine Topic
            of communication with your users.
          </div>

          <div className="mt-8">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-600">
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-zinc-900"
                >
                  Topic Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required={true}
                  onChange={handleInput}
                  value={inputs.name}
                  className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Barbie Updates"
                />
              </div>

              <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-600">
                <label
                  htmlFor="description"
                  className="block text-xs font-medium text-zinc-900"
                >
                  Topic Description
                </label>
                <textarea
                  rows={4}
                  name="description"
                  id="description"
                  required={true}
                  onChange={handleInput}
                  value={inputs.description}
                  className="block w-full px-0 rounded-md border-0 py-1.5 text-zinc-900 ring-0 focus:ring-0 placeholder:text-zinc-400 sm:text-sm sm:leading-6"
                  placeholder="Pied Piper (PP) was an American tech company based in Silicon Valley, California. The company was formed in 2014 by Richard Hendricks as a company to develop Richard's algorithm that he'd created..."
                />
              </div>

              <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-600">
                <label
                  htmlFor="websiteURL"
                  className="block text-xs font-medium text-zinc-900"
                >
                  Website URL
                </label>
                <input
                  type="text"
                  name="websiteURL"
                  id="websiteURL"
                  required={true}
                  onChange={handleInput}
                  value={inputs.websiteURL}
                  className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="https://piedpiper.com"
                />
              </div>

              <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-600">
                <label
                  htmlFor="logoURL"
                  className="block text-xs font-medium text-zinc-900"
                >
                  Logo URL
                </label>
                <input
                  type="text"
                  name="logoURL"
                  id="logoURL"
                  required={true}
                  onChange={handleInput}
                  value={inputs.logoURL}
                  className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="https://piedpiper.com/logo.png"
                />
              </div>

              <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-primary-600">
                <label
                  htmlFor="webhookURL"
                  className="block text-xs font-medium text-zinc-900"
                >
                  Webhook URL
                </label>
                <input
                  type="text"
                  name="webhookURL"
                  id="webhookURL"
                  required={true}
                  onChange={handleInput}
                  value={inputs.webhookURL}
                  className="block w-full border-0 p-0 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="https://discord.com/api/webhooks/iwvngowiry924yg9374yg94gby..."
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
                    Loading && 'opacity-50 cursor-progress'
                  }`}
                  disabled={Loading}
                >
                  {Loading ? (
                    'Creating Topic'
                  ) : (
                    <span className="flex justify-center gap-x-2">
                      Create Topic <span aria-hidden="true">→</span>
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
