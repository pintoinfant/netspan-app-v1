import Head from 'next/head';
import ApplicationLayout from '@/components/Utilities/ApplicationLayout';
import ProposalList from '@/components/Utilities/ProposalList';
import { gql } from '@apollo/client';
import { client } from '@/utilities/graphql';
import { useEffect, useState } from 'react';

function timeDiff(tstart: number, tend: number) {
  var diff = Math.floor((tend - tstart) / 1000),
    units = [
      { d: 60, l: 'seconds' },
      { d: 60, l: 'minutes' },
      { d: 24, l: 'hours' },
      { d: 7, l: 'days' },
    ];

  var s = '';
  for (var i = 0; i < units.length; ++i) {
    s = (diff % units[i].d) + ' ' + units[i].l + ' ' + s;
    diff = Math.floor(diff / units[i].d);
  }
  return s;
}

export default function Proposals() {
  let [data, setData] = useState<any[]>([]);

  //get all proposals
  useEffect(() => {
    (async () => {
      {
        try {
          const result = await client.query({
            query: gql`
              query ProposalEvents {
                tcrRegistries(
                  query: { event_in: ["ProposalCreated"], chainId_in: [417834] }
                ) {
                  _id
                  args
                }
              }
            `,
          });
          if (result.data.tcrRegistries) {
            let proposalsMod: any[] = [];
            result.data.tcrRegistries.forEach((element, index) => {
              let num = element['args'][0]
                .replace('{', '')
                .replace('[', '')
                .replace(']', '')
                .replace('}', '')
                .replace('_hex', '')
                .replace('{_isBigNumber true}', '')
                .replace(' ', '');

              var bigNumb = BigInt(num);

              //get remaining time
              let createdTime = new Date(
                parseInt(element['_id'].substring(0, 8), 16) * 1000,
              ).getTime();
              // console.log('created time for ', index, ' is: ', createdTime);

              // since voting period is 10mins min delay 1 min 10+1 = 11mins
              let endTime = Math.floor(+createdTime) + 11 * 60 * 1000;

              // console.log('end time for ', index, ' is: ', endTime);

              let currTime = new Date().getTime();
              let remTime = timeDiff(currTime, endTime);
              // console.log(remTime)

              proposalsMod.push({
                id: bigNumb.toString(10),
                description: element['args'][8],
                remainingTime: remTime,
              });
            });
            setData(proposalsMod);
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard - Netspan | Democratizing EV Technology using the Blockchain
        </title>
      </Head>

      <ApplicationLayout customHeader="Governance Overview">
        <div className="rounded-md bg-white px-5 py-6 shadow sm:px-6">
          <div className="font-black text-zinc-900 text-2xl">
            Recent Proposals
          </div>
          <div>
            Here&apos;s a list of all recent proposals created on the Netspan
            DAO.
          </div>
          {/* Recent Proposals Start */}
          <div className="mt-8">
            <ul role="list" className="divide-y divide-zinc-100">
              {data.map((proposal, index) => (
                <ProposalList
                  proposal={proposal}
                  key={index}
                  proposalId={proposal.id}
                />
              ))}
            </ul>
          </div>
          {/* Recent Proposals End */}
        </div>
      </ApplicationLayout>
    </>
  );
}
