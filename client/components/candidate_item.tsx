import { useEffect, useState } from "react";

interface iProps {
  candidateId: string;
  contract: any;
  accounts: string[];
}

export default function CandidateItem({ candidateId, contract, accounts }: iProps) {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    contract && contract.methods.getCandidateName(candidateId).call({ from: accounts[0] })
      .then((result: string) => setName(result))
  }, [contract])

  return (
    <div>{name}</div>
  )
}