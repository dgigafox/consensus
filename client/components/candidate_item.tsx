import { useEffect, useState } from "react";
import getAvatar from "../utils/get_avatar";
import CandidateAvatar from "./candidate_avatar";
import Web3 from "web3";

interface iProps {
  web3?: Web3;
  candidateId: string;
  contract: any;
  accounts: string[];
}

export default function CandidateItem({ candidateId, contract, accounts }: iProps) {
  const [name, setName] = useState<string | null>(null);
  const [votes, setVotes] = useState<string[]>([]);
  const src = getAvatar(name);

  function getVotes() {
    contract && contract.methods.getVotes(candidateId).call({ from: accounts[0] })
      .then((result: string[]) => setVotes(result))
  }

  useEffect(() => {
    contract && contract.methods.getCandidateName(candidateId).call({ from: accounts[0] })
      .then((result: string) => setName(result))

    getVotes()
  }, [contract])

  function vote() {
    contract && contract.methods.voters(accounts[0]).call({ from: accounts[0] })
      .then((result: boolean) => {
        if (result) {
          alert("You have already voted")
        } else {
          contract && contract.methods.vote(candidateId).send({ from: accounts[0] })
            .on("receipt", function (receipt: any) {
              getVotes()
            })
            .on("error", function (error: any) {
              alert(error.message)
            })
        }
      })
  }

  const isVoter = () => votes.includes(accounts[0])

  return (
    <button className={`flex space-x-4 items-center justify-between rounded-full border border-gray-400 p-4 cursor-pointer ${isVoter() ? "border-none bg-green-100 font-bold" : ""}`} onClick={() => vote()}>
      <div className="flex items-center space-x-2">
        <CandidateAvatar src={src} />
        <div>{name}</div>
      </div>
      <div className="text-3xl p-2">{votes.length}</div>
    </button>
  )
}