import Image from "next/image";
import Link from "next/link";

export default function Problem() {
  return (
    <>
      <div
        id="problem"
        className="relative bg-white py-24 sm:py-12 lg:py-32 px-3"
      >
        <div className="mx-auto max-w-md px-6 py-6 md:py-12 sm:max-w-3xl lg:max-w-7xl lg:px-16 lg:py-16 bg-secondary-50 rounded-3xl">
          <p className="mt-2 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900">
            The problems that Biz Devs and Partnership Leads Face Today ☹️
          </p>
          <p className="mt-8 max-w-prose text-xl md:text-2xl text-zinc-700">
            Break free from a slow cycle of searching, prospecting, cold
            emailing and waiting for potential leads to get back to you. If
            someone is interested in your product, talk to them right when they
            are most interested.
          </p>
          <div className="mt-8 px-2 py-3 lg:px-8 lg:py-8 rounded-3xl bg-white">
            <Image
              src="/Problem_h.png"
              className="hidden lg:block"
              height={807}
              width={1920}
              alt="The problem"
            />
            <Image
              src="/Problem_v.png"
              className="lg:hidden"
              height={1920}
              width={1028}
              alt="The problem"
            />
          </div>
          <div className="mt-12 text-center">
            <div className="font-bold text-zinc-900 text-2xl">
              See the difference?
            </div>
            <div className="mt-3 flex items-center justify-center gap-x-6">
              <Link
                href="#sign-up"
                scroll={false}
                className="rounded-md bg-secondary-600 px-12 py-4 text-xl font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all ease-in-out duration-200"
              >
                Join Our Waitlist!
              </Link>
            </div>
            <div className="mt-3 text-base text-zinc-600 font-normal">
              A super short form. 60 seconds max.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
