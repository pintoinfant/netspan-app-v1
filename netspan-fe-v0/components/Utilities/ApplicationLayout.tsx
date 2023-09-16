import { Fragment, ReactNode, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  BanknotesIcon,
  Bars3Icon,
  Battery100Icon,
  BellIcon,
  CreditCardIcon,
  CursorArrowRippleIcon,
  DocumentTextIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAccount, useDisconnect } from 'wagmi';

const navigation = [
  {
    name: 'Dashboard',
    href: '/home',
    icon: HomeIcon,
  },
  {
    name: 'Governance',
    href: '/governance',
    icon: DocumentTextIcon,
  },
  {
    name: 'Register',
    href: '/register',
    icon: CursorArrowRippleIcon,
  },
  {
    name: 'PLMN Registry',
    href: '/challenge',
    icon: HomeIcon,
  },
  {
    name: 'Faucet',
    href: '/faucet',
    icon: HomeIcon,
  },
  // {
  //   name: 'Wallet',
  //   href: '/wallet',
  //   icon: CursorArrowRippleIcon,
  // },
  // {
  //   name: "Top-Up Wallet",
  //   href: "/top-up",
  //   icon: CreditCardIcon,
  // },
  // {
  //   name: "Withdraw Earnings",
  //   href: "/withdraw",
  //   icon: BanknotesIcon,
  // },
];

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  children?: ReactNode;
  customHeader: string;
  customHeaderDescription?: string;
}

export default function ApplicationLayout({
  children,
  customHeader,
  customHeaderDescription,
}: Props) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { address } = useAccount();
  const { disconnect } = useDisconnect({
    onSuccess() {
      router.push('/');
    },
  });

  return (
    <>
      <div className="min-h-full">
        <div className="bg-black pt-3 pb-32">
          <Disclosure as="nav" className="bg-black">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div>
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Link
                            href="/"
                            aria-label="Home"
                            className="flex items-center gap-x-3"
                          >
                            {/* <Logo className="h-10 w-auto" /> */}
                            <Image
                              src="/logos/logo.png"
                              className="h-12 w-12"
                              alt="Netspan"
                              height={96}
                              width={96}
                            />
                            <div className="text-2xl font-black text-white">
                              <div>Netspan</div>
                              <div className="-mt-1 text-xs font-medium text-gray-200">
                                by NFTCONOMY
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline gap-x-12">
                            {navigation.map(item => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.href === router.pathname
                                    ? 'text-primary-600 border-b-primary-600'
                                    : 'text-gray-300 hover:text-primary-600 border-b-black',
                                  'py-2 text-sm font-medium border-b-2',
                                )}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <button
                            type="button"
                            className="relative rounded-full bg-zinc-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>

                          {/* Profile dropdown */}
                          {address && (
                            <Menu as="div" className="relative ml-3">
                              <div>
                                <Menu.Button className="relative flex max-w-xs items-center rounded-full text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                  <span className="absolute -inset-1.5" />
                                  <span className="sr-only">
                                    Open user menu
                                  </span>
                                  {address.slice(0, 4)}...
                                  {address.slice(address.length - 4)}
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {userNavigation.map(item => (
                                    <Menu.Item key={item.name}>
                                      {({ active }) => (
                                        <Link
                                          href={item.href}
                                          className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700',
                                          )}
                                        >
                                          {item.name}
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  ))}
                                  <Menu.Item>
                                    <span
                                      onClick={() => disconnect()}
                                      className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    >
                                      Sign Out
                                    </span>
                                  </Menu.Item>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          )}
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    {navigation.map(item => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.href === router.pathname
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium',
                        )}
                        aria-current={
                          item.href === router.pathname ? 'page' : undefined
                        }
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map(item => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-black tracking-tight text-white">
                {customHeader}
              </h1>
              <h5 className="mt-3 text-md font-medium text-gray-400 max-w-xl">
                {customHeaderDescription}
              </h5>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
