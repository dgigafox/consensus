import { useEffect, useState } from "react";
import Web3 from "web3";
import CandidateItem from "./candidate_item";

interface iProps {
  web3?: Web3;
  contract: any;
  accounts: any[];
}

export default function CandidateList({ contract, accounts }: iProps) {
  const [candidateIds, setCandidateIds] = useState<string[]>([]);

  function loadCandidates() {
    contract && contract.methods.listCandidateIds().call({ from: accounts[0] })
      .then((result: string[]) => setCandidateIds(result))
  }

  useEffect(() => { loadCandidates() }, [contract])
  useEffect(() => {
    contract && contract.once("CandidateCreated", (error: any) => {
      if (!error) { loadCandidates() }
    })
  })

  return (
    <div className="flex flex-col space-y-4">
      {candidateIds.map((id: any) =>
        <CandidateItem key={id} candidateId={id} contract={contract} accounts={accounts} />
      )}
    </div>
  )
}