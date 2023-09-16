import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    id: '1',
    question: 'PLMN Identifiers',
    answer:
      'PLMN (Public Land Mobile Network) identifiers are unique codes assigned to cellular network providers. These identifiers are crucial for the proper functioning of cellular networks and roaming services.',
  },
  {
    id: '2',
    question: 'Lack of Coordination',
    answer:
      'There is no public standards body that assigns PLMN identifiers, and there is no coordination system in place for managing these identifiers. This lack of coordination can lead to conflicts, inefficiencies, and potential issues in cellular network operations.',
  },
  {
    id: '3',
    question: 'Token Curated Registry (TCR)',
    answer:
      'A Token Curated Registry is a decentralized system that allows users (in this case, organizations) to propose and vote on entries in a list. Entries in the list represent approved PLMN identifiers. TCRs are governed by tokens, and participants can stake tokens to support or challenge proposed entries.',
  },
  {
    id: '4',
    question: 'Solidity Smart Contract',
    answer:
      'A Solidity smart contract serves as the backbone of the TCR. This contract would facilitate the following functionalities: Organizations can submit PLMN identifier requests. Staked voters can approve or reject these requests. Tokens are used for staking and voting. The contract keeps track of the current list of approved PLMN identifiers.',
  },
  {
    id: '5',
    question: 'Frontend Interface',
    answer:
      "To interact with the TCR, you'd need a user-friendly frontend interface. This interface should allow users to: Submit PLMN identifier requests. View the list of proposed and approved identifiers. Add or remove voters from the system. Stake tokens to enter the voting set. Vote on PLMN identifier requests. Monitor the status of their requests and stake.",
  },
  {
    id: '6',
    question: 'Token System',
    answer:
      'A token system is used for staking and voting within the TCR. Token holders can stake their tokens to gain the ability to vote on PLMN identifier requests. This system is integrated with the Solidity contract and the frontend.',
  },
  {
    id: '7',
    question: 'Voting Mechanism',
    answer:
      'The voting mechanism has a few rules and mechanisms for voting on PLMN identifier requests. For example, you might require a certain percentage of staked tokens to approve a request, or you could use a simple majority vote.',
  },
  {
    id: '8',
    question: 'Governance and Management',
    answer:
      "A governance mechanism is established for managing the TCR over time. This involves periodic elections of moderators or administrators responsible for adding/removing voters, managing the token system, and overseeing the TCR's operation.",
  },
  {
    id: '9',
    question: 'Security and Scalability',
    answer:
      'Ensures the security of the smart contract to prevent vulnerabilities or attacks. Considers scalability concerns as the TCR grows and more PLMN identifier requests are submitted.',
  },
];

export default function About() {
  return (
    <div id="faq" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl divide-y divide-zinc-900/10">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl text-center font-black tracking-tight text-zinc-900">
            About This Project
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-zinc-900/10 max-w-3xl mx-auto">
            {faqs.map(faq => (
              <Disclosure as="div" key={faq.id} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-zinc-900">
                        <span className="text-2xl font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-lg leading-7 text-zinc-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
