import {
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Apply",
    description:
      "We verify and accept only legitimate companies, ensuring you make the best connections possible.",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: "Search",
    description:
      "Look up profiles of other Web3 companies that you can potentially network and partner with.",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Message",
    description:
      "Directly message key stakeholders of companies on our platform and close leads faster.",
    icon: ChatBubbleLeftRightIcon,
  },
];

export default function Why() {
  return (
    <>
      <div id="why" className="relative bg-white py-24 sm:pt-16 sm:pb-32">
        <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <h2 className="text-xl font-bold text-secondary-600">
            Meet Netspan - The Solution!
          </h2>
          <p className="mt-2 text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-zinc-900">
            Everything you need to close leads 10x faster than the competition!
          </p>
          <p className="mx-auto mt-8 max-w-prose text-xl text-zinc-500">
            Phasellus lorem quam molestie id quisque diam aenean nulla in.
            Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
            condimentum id viverra nulla.
          </p>
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root rounded-2xl bg-secondary-100/20 px-6 pb-8 h-full border border-secondary-50/50 shadow-md">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center rounded-xl bg-secondary-600 p-3 shadow-lg">
                          <feature.icon
                            className="h-8 w-8 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-3xl font-black leading-8 tracking-tight text-zinc-900">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-xl leading-8 font-medium text-zinc-700">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
