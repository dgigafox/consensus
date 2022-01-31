import { useEffect, useState } from "react";
import Web3 from "web3";
import CandidateItem from "./candidate_item";

interface iProps {
  web3?: Web3;
  contract: any;
  accounts: any[];
}

export default function CandidateList({ contract, accounts }: iProps) {
  console.log({ accounts })
  const [candidateIds, setCandidateIds] = useState<string[]>([]);

  function loadCandidates() {
    contract && contract.methods.listCandidateIds().call({ from: accounts[0] })
      .then((result: string[]) => setCandidateIds(result))
  }

  useEffect(() => { loadCandidates() }, [contract])
  useEffect(() => {
    const subscription: any = contract && contract.events.CandidateCreated()
      .on("data", function (event: any) {
        setCandidateIds([...candidateIds, event.returnValues.candidateId])
      })

    return () => { subscription && subscription.unsubscribe() }
  })

  return (
    <div className="grid grid-cols-3 grid-rows-5 gap-6 p-6">
      {candidateIds.map((id: any) =>
        <CandidateItem key={id} candidateId={id} contract={contract} accounts={accounts} />
      )}
    </div>
  )
}