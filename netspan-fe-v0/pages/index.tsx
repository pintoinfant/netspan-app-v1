import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import Layout from '@/components/Utilities/Layout';
import Hero from '@/components/Index/Hero';
import { gql } from '@apollo/client';
import { client } from '@/utilities/graphql';
import About from '@/components/Index/About';

export default function Index() {
  const router = useRouter();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { address, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <Head>
        <title>
          Netspan | An Open Standard For Public Land Mobile Networks
        </title>
      </Head>

      <Layout>
        <Hero />
        <About />
      </Layout>
    </>
  );
}
