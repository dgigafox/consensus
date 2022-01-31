import Web3 from "web3";

interface iProps {
  web3?: Web3;
  contract: any;
  accounts: any[];
}

export default function CandidateForm({ contract, accounts }: iProps) {

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const name = event.target.name.value;
    contract && contract.methods.createCandidate(name).send({ from: accounts[0] })
      .on("receipt", function (receipt: any) {
        console.log({ receipt })
        event.target.name.value = "";
      })
      .on("error", function (error: any) {
        console.log({ error })
      })
  }

  return (
    <form className="rounded-lg bg-pink p-6 flex items-center space-x-2 bg-red-100" onSubmit={handleSubmit}>
      <div className="text-xl font-semibold">Enter a new candidate</div>
      <input className="border border-gray rounded-md p-2" name="name" />
      <button className="bg-blue-600 p-2 rounded-md text-white" type="submit">Submit</button>
    </form>
  )
}