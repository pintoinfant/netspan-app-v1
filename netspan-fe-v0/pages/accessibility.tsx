/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Utilities/Layout';
import BigHeading from '@/components/Utilities/BigHeading';
import Paragraph from '@/components/Utilities/Paragraph';

export default function Accessibiity() {
  return (
    <>
      <Head>
        <title>
          Accessibility - Netspan | An Open Standard For Public Land Mobile
          Networks Blockchain
        </title>
      </Head>

      <Layout>
        <div className="relative bg-white py-24 sm:pt-16 sm:pb-32">
          <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
            <div className="text-zinc-900 font-black text-3xl">
              Accessibility
            </div>
            <div className="text-zinc-700 text-xl font-semibold mt-3">
              NFTconomy Technologies Private Limited
            </div>
            <div className="text-zinc-700 text-xl mt-1">
              Last revised on August 16, 2023
            </div>
            <p className="text-zinc-700 mt-8 text-xl">
              We are committed to making our website as accessible as possible,
              it is tested for accessibility every 4 months.
            </p>
            <p className="text-zinc-700 mt-8 text-xl">
              We want everyone to be able to us use it, no matter what their
              impairments and which technologies they use.
            </p>
            <p className="text-zinc-700 mt-8 text-xl">
              We have created the site taking best practice web accessibility
              guidelines into account, including{' '}
              <Link
                href="https://www.w3.org/TR/WCAG20/"
                target="_blank"
                passHref={true}
              >
                WCAG 2.0
              </Link>
              ,{' '}
              <Link
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                passHref={true}
              >
                WCAG 2.1
              </Link>{' '}
              and{' '}
              <Link
                href="https://www.hassellinclusion.com/bs8878/"
                target="_blank"
                passHref={true}
              >
                BS 8878
              </Link>
              .
            </p>
            <BigHeading>Adapting your experience to your needs</BigHeading>
            <Paragraph>
              We have made the site as usable as we can, but you might have a
              better experience if you change the settings on your computer to
              suit your individual needs.
            </Paragraph>
            <Paragraph>
              For example you might change the site’s colours, increase the text
              size, or have the site spoken aloud.
            </Paragraph>
            <Paragraph>
              For help with customising your experience using accessibility
              features already on your computer, or by installing extra
              assistive technologies. Try these sites:
            </Paragraph>
            <ul className="list-disc text-zinc-700 text-xl">
              <li>
                AbilityNet's{' '}
                <Link
                  href="https://mcmw.abilitynet.org.uk/"
                  target="_blank"
                  passHref={true}
                >
                  My Computer, My way
                </Link>
              </li>
              <li>
                The Web Accessibility Initiative's{' '}
                <Link
                  href="https://www.w3.org/WAI/users/browsing"
                  target="_blank"
                  passHref={true}
                >
                  Better Web Browsing: Tips for Customising your Computer
                </Link>
              </li>
            </ul>

            <BigHeading>
              Known problems with this site's accessibility
            </BigHeading>
            <Paragraph>
              We know that there are some accessibility problems with this site,
              and we are going to fix them as soon as we can.
            </Paragraph>
            <Paragraph>We are currently working to fix:</Paragraph>
            <ul className="list-disc text-zinc-700 text-xl">
              <li>
                some websites we link to may not have been tested for their
                accessibility
              </li>
              <li>
                some of our older PDF documents may not work correctly with
                screen readers
              </li>
              <li>
                most, but not all of our videos are understandable by people
                with vision impairments without audio-description
              </li>
              <li>
                the cookies banner may remain accessible to screen readers when
                it is closed and cannot be seen visually
              </li>
            </ul>

            <Paragraph>
              If any of these problems stop you getting the information or
              service you need from our site, please{' '}
              <Link
                href="mailto:hello@nftconomy.com"
                target="_blank"
                passHref={true}
              >
                contact us
              </Link>{' '}
              and we will be happy to help you.
            </Paragraph>
          </div>
        </div>
      </Layout>
    </>
  );
}
