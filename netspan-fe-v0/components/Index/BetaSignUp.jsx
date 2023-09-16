import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import axios from 'axios';
import Link from 'next/link';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const features = [
  {
    name: 'Fill out the form.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database backups.',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi.',
    icon: ServerIcon,
  },
];

export default function BetaSignUp() {
  const productCategories = [
    {
      id: 1,
      name: 'CeFi',
      subCategories: [
        {
          id: 1,
          name: 'Centralized Exchanges (CEX)',
        },
        { id: 2, name: 'Crypto Tax Software' },
        { id: 3, name: 'Custody Solutions' },
        { id: 4, name: 'Web3 Banking' },
      ],
    },
    {
      id: 2,
      name: 'DAO',
      subCategories: [
        {
          id: 1,
          name: 'Creator DAOs',
        },
        { id: 2, name: 'DAO Tools' },
        { id: 3, name: 'Gaming DAOs' },
        { id: 4, name: 'Venture DAOs' },
      ],
    },
    {
      id: 3,
      name: 'DeFi',
      subCategories: [
        {
          id: 1,
          name: 'Bridges',
        },
        { id: 2, name: 'Collateralized Debt Position (CDP)' },
        { id: 3, name: 'Crypto Portfolio Tracker' },
        { id: 4, name: 'Crypto Staking Platforms' },
        {
          id: 5,
          name: 'Crypto Trading Tools',
        },
        { id: 6, name: 'Decentralized Derivatives' },
        { id: 7, name: 'Decentralized Exchanges (DEX)' },
        { id: 8, name: 'DeFi Research' },
        {
          id: 9,
          name: 'Fiat Onramps',
        },
        { id: 10, name: 'Gas Tools' },
        { id: 11, name: 'Launchpads' },
        { id: 12, name: 'Lending Platforms' },
        {
          id: 13,
          name: 'Liquid Staking Platforms',
        },
        { id: 14, name: 'MEV Tools' },
        { id: 15, name: 'Real World Assets (RWA)' },
        { id: 16, name: 'Regenerative Finance' },
        { id: 17, name: 'Token Management Tools' },
        { id: 18, name: 'Web3 Predictions Market' },
        { id: 19, name: 'Yield Aggregators' },
        {
          id: 20,
          name: 'Yield Farming Platforms',
        },
      ],
    },
    {
      id: 4,
      name: 'Development Software',
      subCategories: [
        {
          id: 1,
          name: 'Block Explorers',
        },
        { id: 2, name: 'Dapp Templates' },
        { id: 3, name: 'Indexing Tools' },
        { id: 4, name: 'Smart Contract Templates' },
        {
          id: 5,
          name: 'Solidity Developer Tools',
        },
        { id: 6, name: 'Wallet Development Tools' },
        { id: 7, name: 'Web3 Development Tools' },
      ],
    },
    {
      id: 5,
      name: 'Gaming',
      subCategories: [
        {
          id: 1,
          name: 'Gaming Marketplaces',
        },
        { id: 2, name: 'Web3 Game Studios' },
        { id: 3, name: 'Web3 Game Studios' },
        { id: 4, name: 'Web3 Gaming Tools' },
      ],
    },
    {
      id: 6,
      name: 'Identity',
      subCategories: [
        {
          id: 1,
          name: 'Authentication Tools',
        },
        { id: 2, name: 'Decentralized Identity Tools' },
        { id: 3, name: 'Name Service (ENS) Tools' },
        { id: 4, name: 'Web3 Credential Tools' },
      ],
    },
    {
      id: 7,
      name: 'Infrastructure',
      subCategories: [
        {
          id: 1,
          name: 'Blockchain Interoperability tools',
        },
        { id: 2, name: 'Crypto Faucets' },
        { id: 3, name: 'Crypto Payment Tools' },
        { id: 4, name: 'Decentralized Storage Network' },
        {
          id: 5,
          name: 'Oracles',
        },
        { id: 6, name: 'Wallet Connection Tools' },
      ],
    },
    {
      id: 8,
      name: 'Marketing',
      subCategories: [
        {
          id: 1,
          name: 'Ad Networks',
        },
        { id: 2, name: 'AdTech' },
        { id: 3, name: 'Creator Tools' },
        { id: 4, name: 'Crypto Conferences' },
        {
          id: 5,
          name: 'Loyalty & Referrals',
        },
        { id: 6, name: 'Marketing Tools' },
        { id: 7, name: 'On Chain Analytics' },
        { id: 8, name: 'Product Discovery' },
        {
          id: 9,
          name: 'Quests, Rewards & Incentives',
        },
        { id: 10, name: 'Social Networks' },
        { id: 11, name: 'Web3 Automations' },
        { id: 12, name: 'Web3 CRM' },
        {
          id: 13,
          name: 'Web3 Email',
        },
      ],
    },
    {
      id: 9,
      name: 'Metaverse',
      subCategories: [
        {
          id: 1,
          name: 'Metaverse Platforms',
        },
        { id: 2, name: 'Metaverse Tools' },
      ],
    },
    {
      id: 10,
      name: 'NFT',
      subCategories: [
        {
          id: 1,
          name: 'NFT Allowlist Tools',
        },
        { id: 2, name: 'NFT Analytics Tools' },
        { id: 3, name: 'NFT APIs' },
        { id: 4, name: 'NFT App Templates' },
        {
          id: 5,
          name: 'NFT Distribution Tools',
        },
        { id: 6, name: 'NFT Fractionalization Tools' },
        { id: 7, name: 'NFT Lending Platforms' },
        { id: 8, name: 'NFT Marketplaces' },
        {
          id: 9,
          name: 'NFT Minting Tools',
        },
        { id: 10, name: 'NFT Projects' },
        { id: 11, name: 'NFT Rental Marketplaces' },
        { id: 12, name: 'NFT Research' },
        {
          id: 13,
          name: 'NFT Smart Contract Templates',
        },
        {
          id: 14,
          name: 'Token Gating Tools',
        },
      ],
    },
    {
      id: 11,
      name: 'Security',
      subCategories: [
        {
          id: 1,
          name: 'Blockchain Auditing Companies',
        },
        { id: 2, name: 'Blockchain Security' },
        { id: 3, name: 'Blockchain Testing Tools' },
        { id: 4, name: 'Smart Contract Auditors' },
        { id: 5, name: 'Wallet Security Tools' },
      ],
    },
    {
      id: 12,
      name: 'Wallets',
      subCategories: [
        {
          id: 1,
          name: 'Hardware Wallets',
        },
        { id: 2, name: 'Mobile Wallets' },
        { id: 3, name: 'MPC Wallets' },
        { id: 4, name: 'Multisig Wallets' },
        { id: 5, name: 'Software Wallets' },
        { id: 5, name: 'Wallet Analytics' },
      ],
    },
  ];

  const [selectedProductCategory, setSelectedProductCategory] = useState(
    productCategories[0],
  );
  const [selectedProductSubcategory, setSelectedProductSubcategory] = useState(
    selectedProductCategory.subCategories[0],
  );
  const [Loading, setLoading] = useState(false);
  const [showAlreadyRegistered, setShowAlreadyRegistered] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    productCategory: selectedProductCategory.name,
    productSubcategory: selectedProductSubcategory.name,
  });

  useEffect(() => {
    setSelectedProductSubcategory(selectedProductCategory.subCategories[0]);
    setInputs(prev => ({
      ...prev,
      productCategory: selectedProductCategory.name,
      productSubcategory: selectedProductSubcategory.name,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProductCategory]);

  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      productSubcategory: selectedProductSubcategory.name,
    }));
  }, [selectedProductSubcategory]);

  const handleInput = event => {
    event.persist();
    setInputs(prev => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  // Server State Handling
  const handleOnSubmit = event => {
    event.preventDefault();
    setLoading(true);
    setShowSuccess(false);
    setShowFailed(false);

    console.log(inputs);

    const options = {
      method: 'POST',
      url: 'https://api.brevo.com/v3/contacts',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.NEXT_PUBLIC_BREVO_API_KEY,
      },
      data: {
        attributes: {
          FIRSTNAME: inputs.firstName,
          LASTNAME: inputs.lastName,
          EMAIL: inputs.email,
          COMPANY: inputs.company,
          PRODUCTCATEGORY: inputs.productCategory,
          PRODUCTSUBCATEGORY: inputs.productSubcategory,
        },
        updateEnabled: false,
        email: inputs.email,
        listIds: [7],
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        if ('id' in response.data) {
          setLoading(false);
          setShowAlreadyRegistered(false);
          setShowSuccess(true);
          setShowFailed(false);
        }
      })
      .catch(function (error) {
        console.error(error.response.data.code);
        if (error.response.data.code === 'duplicate_parameter') {
          setLoading(false);
          setShowAlreadyRegistered(true);
          setShowSuccess(false);
          setShowFailed(false);
        }
      });
  };

  return (
    <div
      id="sign-up"
      className="relative isolate bg-gradient-to-r from-primary-900 to-secondary-900"
    >
      <style>
        {`input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus
          input:-webkit-autofill, 
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover
          textarea:-webkit-autofill:focus,
          select:-webkit-autofill,
          select:-webkit-autofill:hover,
          select:-webkit-autofill:focus { 
            -webkit-text-fill-color: #000;
            -webkit-box-shadow: 0 0 0px 1000px #00000000 inset;
            transition: background-color 5000s ease-in-out 0s;
          }
          input::placeholder {
            -webkit-text-fill-color: #71717a;
            font-weight: normal;
          }
        `}
      </style>
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
              <svg
                className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-zinc-100/20 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                    width={200}
                    height={200}
                    x="50%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <svg
                  x="50%"
                  y={-1}
                  className="overflow-visible fill-secondary-500/20"
                >
                  <path
                    d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                    strokeWidth={0}
                  />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
                />
              </svg>
              <div
                className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                aria-hidden="true"
              >
                <div
                  className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                  style={{
                    clipPath:
                      'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                  }}
                />
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl text-center lg:text-left font-black tracking-tight text-white">
              Our Waitlist Is Still Open 👀
            </h2>
            <p className="mt-6 text-2xl leading-10 text-zinc-200">
              Engaging high-intent leads as fast as possible is a no brainer.
              Let&apos;s talk and find out how Netspan can best help your sales
              team.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-xl leading-7 text-zinc-200 lg:max-w-none">
              {features.map(feature => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-white">
                    <feature.icon
                      className="absolute left-1 top-1 h-5 w-5 text-secondary-600"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>{' '}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="self-center">
          <form
            onSubmit={handleOnSubmit}
            className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
          >
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
                <div className="col-span-2 md:col-span-1 rounded-md px-4 pb-1.5 pt-2.5 ring-2 ring-inset ring-secondary-700 focus-within:ring-2 focus-within:ring-secondary-600">
                  <label
                    htmlFor="firstName"
                    className="block text-md font-medium text-zinc-100"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required={true}
                    onChange={handleInput}
                    value={inputs.firstName}
                    className="block w-full border-0 px-0 py-2 bg-transparent !text-white font-bold placeholder-zinc-400 focus:ring-0 sm:text-xl sm:leading-6"
                    style={{
                      WebkitTextFillColor: '#fff',
                    }}
                    placeholder="Richard"
                  />
                </div>
                <div className="col-span-2 md:col-span-1 rounded-md px-4 pb-1.5 pt-2.5 ring-2 ring-inset ring-secondary-700 focus-within:ring-2 focus-within:ring-secondary-600">
                  <label
                    htmlFor="lastName"
                    className="block text-md font-medium text-zinc-100"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required={true}
                    onChange={handleInput}
                    value={inputs.lastName}
                    className="block w-full border-0 px-0 py-2 bg-transparent !text-white font-bold placeholder-zinc-400 focus:ring-0 sm:text-xl sm:leading-6"
                    style={{
                      WebkitTextFillColor: '#fff',
                    }}
                    placeholder="Hendricks"
                  />
                </div>
                <div className="col-span-2 rounded-md px-4 pb-1.5 pt-2.5 ring-2 ring-inset ring-secondary-700 focus-within:ring-2 focus-within:ring-secondary-600">
                  <label
                    htmlFor="email"
                    className="block text-md font-medium text-zinc-100"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required={true}
                    onChange={handleInput}
                    value={inputs.email}
                    className="block w-full border-0 px-0 py-2 bg-transparent !text-white font-bold placeholder-zinc-400 focus:ring-0 sm:text-xl sm:leading-6"
                    style={{
                      WebkitTextFillColor: '#fff',
                    }}
                    placeholder="richard@piedpiper.com"
                  />
                </div>
                <div className="col-span-2 rounded-md px-4 pb-1.5 pt-2.5 ring-2 ring-inset ring-secondary-700 focus-within:ring-2 focus-within:ring-secondary-600">
                  <label
                    htmlFor="company"
                    className="block text-md font-medium text-zinc-100"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    required={true}
                    onChange={handleInput}
                    value={inputs.company}
                    className="block w-full border-0 px-0 py-2 bg-transparent !text-white font-bold placeholder-zinc-400 focus:ring-0 sm:text-xl sm:leading-6"
                    style={{
                      WebkitTextFillColor: '#fff',
                    }}
                    placeholder="Pied Piper"
                  />
                </div>

                <div className="col-span-2 rounded-md px-4 py-3 ring-2 ring-inset ring-secondary-700 focus-within:ring-2 focus-within:ring-secondary-600">
                  <label
                    htmlFor="productCategory"
                    className="block text-md font-medium text-zinc-100"
                  >
                    Product Category
                  </label>
                  <div className="mt-1">
                    <Listbox
                      value={selectedProductCategory}
                      onChange={setSelectedProductCategory}
                    >
                      {({ open }) => (
                        <>
                          <div className="relative">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-transparent text-left text-white font-bold focus:outline-none sm:text-xl sm:leading-6">
                              <span className="block truncate">
                                {selectedProductCategory.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-zinc-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xl">
                                {productCategories.map(productCategory => (
                                  <Listbox.Option
                                    key={productCategory.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? 'bg-secondary-600 text-white'
                                          : 'text-zinc-900',
                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                      )
                                    }
                                    value={productCategory}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            selected
                                              ? 'font-bold'
                                              : 'font-normal',
                                            'block truncate',
                                          )}
                                        >
                                          {productCategory.name}
                                        </span>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? 'text-white'
                                                : 'text-secondary-600',
                                              'absolute inset-y-0 right-0 flex items-center pr-4',
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                </div>
                <div className="col-span-2 rounded-md px-4 py-3 ring-2 ring-inset ring-secondary-700 focus-within:ring-2 focus-within:ring-secondary-600">
                  <label
                    htmlFor="productSubcategory"
                    className="block text-md font-medium text-zinc-100"
                  >
                    Product Subcategory
                  </label>
                  <div className="mt-1">
                    <Listbox
                      value={selectedProductSubcategory}
                      onChange={setSelectedProductSubcategory}
                    >
                      {({ open }) => (
                        <>
                          <div className="relative">
                            <Listbox.Button className="rrelative w-full cursor-default rounded-md bg-transparent text-left text-white font-bold focus:outline-none sm:text-xl sm:leading-6">
                              <span className="block truncate">
                                {selectedProductSubcategory.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-zinc-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xl">
                                {selectedProductCategory.subCategories.map(
                                  productSubcategory => (
                                    <Listbox.Option
                                      key={productSubcategory.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? 'bg-secondary-600 text-white'
                                            : 'text-zinc-900',
                                          'relative cursor-default select-none py-2 pl-3 pr-9',
                                        )
                                      }
                                      value={productSubcategory}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              selected
                                                ? 'font-semibold'
                                                : 'font-normal',
                                              'block truncate',
                                            )}
                                          >
                                            {productSubcategory.name}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? 'text-white'
                                                  : 'text-secondary-600',
                                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ),
                                )}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                </div>
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
              {showAlreadyRegistered && (
                <div className="mt-6 sm:col-span-2 rounded-md bg-yellow-600 px-4 py-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon
                        className="h-5 w-5 text-yellow-300"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-yellow-50">
                        You have already submitted an application for your
                        company. Please check your inbox and spam folders for an
                        acknowledgement email :)
                        <br />
                        <br />
                        If you think this may be an error, please feel free to
                        reach out to us at{' '}
                        <Link href="mailto:hello@nftconomy.com" passHref={true}>
                          hello@nftconomy.com
                        </Link>
                        .
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
                        Uh oh! Something went wrong. Please try again. If the
                        issue persists, please email us at{' '}
                        <Link href="mailto:hello@nftconomy.com">
                          hello@nftconomy.com
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className={`w-full rounded-md bg-secondary-600 shadow-[0px_0px_40px_30px_#e5167024] px-12 py-4 text-xl font-semibold text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600 transition-all ease-in-out duration-200 ${
                    Loading && 'opacity-50 cursor-progress'
                  }`}
                  disabled={Loading}
                >
                  {Loading ? (
                    'Sending Your Application'
                  ) : (
                    <span className="flex justify-center gap-x-2">
                      Sign Me Up <span aria-hidden="true">→</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
