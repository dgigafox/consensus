const VotingMachineContractTest = artifacts.require("VotingMachine");

contract("VotingMachine", () => {
  it("has been deployed successfully", async () => {
    const votingMachine = await VotingMachineContractTest.deployed();
    assert(votingMachine, "voting machine was not deployed");
  })
})