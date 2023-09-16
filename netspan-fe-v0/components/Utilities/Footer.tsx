import Image from 'next/image';
import Link from 'next/link';

const navigation = {
  main: [
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/nftconomy',
      icon: (
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
      ) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/nftconomy',
      icon: (
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
      ) => (
        <svg fill="currentColor" viewBox="0 0 30 30" {...props}>
          <path
            fillRule="evenodd"
            d="M9,25H4V10h5V25z M6.501,8C5.118,8,4,6.879,4,5.499S5.12,3,6.501,3C7.879,3,9,4.121,9,5.499C9,6.879,7.879,8,6.501,8z M27,25h-4.807v-7.3c0-1.741-0.033-3.98-2.499-3.98c-2.503,0-2.888,1.896-2.888,3.854V25H12V9.989h4.614v2.051h0.065 c0.642-1.18,2.211-2.424,4.551-2.424c4.87,0,5.77,3.109,5.77,7.151C27,16.767,27,25,27,25z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:hello@nftconomy.com',
      icon: (
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
      ) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <p className="text-4xl lg:text-6xl leading-[3rem] text-center text-zinc-900 font-bold">
          Made with ❤️ by your friends at
          <Image
            src="/logos/nftconomy-bg.png"
            className="-mt-1.5 h-8 w-8 lg:h-16 lg:w-16 ml-3 lg:ml-3 inline"
            height={512}
            width={512}
            alt="NFTCONOMY"
          />
        </p>

        <div className="mt-12 max-w-2xl text-xl sm:text-2xl mx-auto text-center font-semibold text-zinc-500">
          Building Netspan has been an incredibly fun effort across many people
          at Netspan and our frens at other companies. We&apos;re always looking
          to make Netspan better, so please let us know how we can improve.
        </div>

        <nav
          className="mt-12 lg:mt-24 lg:max-w-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-5 text-center sm:gap-x-12"
          aria-label="Footer"
        >
          {navigation.main.map(item => (
            <div key={item.name}>
              <a
                href={item.href}
                className="text-xl leading-6 text-zinc-600 hover:text-zinc-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-12 flex justify-center space-x-10">
          {navigation.social.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-zinc-400 hover:text-zinc-500"
              target="_blank"
              passHref={true}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-8 w-8" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-md leading-5 text-zinc-500">
          &copy; 2023 NFTCONOMY Technologies. All rights reserved. <br />
          Netspan is the trademarks of NFTCONOMY Technologies.
        </p>
      </div>
    </footer>
  );
}
