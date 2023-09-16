import { ReactNode } from 'react';
import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Footer from '@/components/Utilities/Footer';

const navigation = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  useAccount({
    onConnect() {
      router.push('/home');
    },
  });

  return (
    <>
      <div className="min-h-full">
        <div className="fixed w-full top-0 z-10">
          <Disclosure
            as="nav"
            className="bg-transparent"
            style={{
              backdropFilter: 'saturate(180%) blur(10px)',
              WebkitBackdropFilter: 'saturate(180%) blur(10px)',
            }}
          >
            {() => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-24 items-center justify-between">
                    <div className="flex items-center px-2 lg:px-0">
                      <div className="flex-shrink-0 flex items-center gap-x-3">
                        <Image
                          className="h-14 w-auto"
                          height={96}
                          width={96}
                          src="/logos/logo.png"
                          alt="Netspan"
                        />
                        <div className="font-black text-white text-3xl tracking-wide">
                          Netspan
                          <div className="font-medium text-zinc-400 text-xs">
                            By NFTCONOMY
                          </div>
                        </div>
                      </div>
                      <div className="hidden lg:ml-10 lg:block">
                        <div className="flex space-x-4">
                          {navigation.map(item => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.href === router.pathname
                                  ? 'bg-white text-zinc-900'
                                  : 'text-zinc-200 hover:text-zinc-900 hover:bg-zinc-100',
                                'rounded-md py-2 px-3 text-lg font-medium transition-all duration-200 ease-in-out',
                              )}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <ConnectButton />
                      {/* {isDisconnected && (
                        <div>
                          {openConnectModal && (
                            <button
                              onClick={openConnectModal}
                              className="rounded-md bg-white px-3.5 py-2.5 text-lg font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"
                            >
                              Connect Wallet
                            </button>
                          )}
                        </div>
                      )} */}

                      {/* {address !== null && (
                        <div>
                          {openAccountModal && (
                            <button onClick={openAccountModal} type="button">
                              Open Account Modal
                            </button>
                          )}

                          {openChainModal && (
                            <button onClick={openChainModal} type="button">
                              Open Chain Modal
                            </button>
                          )}

                          {!openConnectModal && (
                            <button onClick={() => disconnect()}>
                              Disconnect
                            </button>
                          )}

                          {address}
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
        </div>

        {/* <div className="h-24 bg-gradient-to-r from-cyan-950 to-sky-950" /> */}
        <main>{children}</main>

        <Footer />
      </div>
    </>
  );
}
