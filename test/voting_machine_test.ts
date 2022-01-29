import { VotingMachineInstance } from "../types/truffle-contracts";

const VotingMachine = artifacts.require("VotingMachine");
const truffleAssert = require("truffle-assertions");
const CANDIDATE_TEST_NAME = "Testing Candidate"

contract("VotingMAchine: list candidates", (accounts) => {
  describe("listCandidateIds()", () => {
    it("lists candidate ids", async() => {
      const votingMachine: VotingMachineInstance = await VotingMachine.deployed();
      let expected: string[] = [];
      let candidate: any;

      candidate = await votingMachine.createCandidate("Candidate1");
      truffleAssert.eventEmitted(candidate, 'CandidateCreated', (ev: any) => {
        expected.push(ev.candidateId);
        return true;
      });

      candidate = await votingMachine.createCandidate("Candidate2");
      truffleAssert.eventEmitted(candidate, 'CandidateCreated', (ev: any) => {
        expected.push(ev.candidateId);
        return true;
      });

      const result = await votingMachine.listCandidateIds();
      assert.includeMembers(result, expected, "ids not contained in result");
    })
  })
})

contract("VotingMachine: payable functions", (accounts) => {
  let votingMachine: VotingMachineInstance;
  let candidateId: string;

  beforeEach(async() => { 
    votingMachine = await VotingMachine.deployed();
    assert(votingMachine, "voting machine was not deployed");
  })

  describe("createCandidate(name)", () => {
    it("can create a candidate", async() => {
      const expected = CANDIDATE_TEST_NAME
      const candidate = await votingMachine.createCandidate(expected);
      truffleAssert.eventEmitted(candidate, 'CandidateCreated', (ev: any) => {
        candidateId = ev.candidateId
        return true;
      });

      const result = await votingMachine.getCandidateName(candidateId);
      assert.equal(result, expected, "resulting candidate not the same with expected");
    })

    it("cannot create a candidate with same name", async() => {
      truffleAssert.reverts(votingMachine.createCandidate(CANDIDATE_TEST_NAME));
    })
  })

  describe("vote(id)", () => {
    it("adds a vote to a candidate", async() => {
      const vote0 = await votingMachine.vote(candidateId, {from: accounts[1]});
      truffleAssert.eventEmitted(vote0, "CandidateVoted", {candidateId, voter: accounts[1]})
      
      const vote1 = await votingMachine.vote(candidateId, {from: accounts[2]});
      truffleAssert.eventEmitted(vote1, "CandidateVoted", {candidateId, voter: accounts[2]})

      const votes = await votingMachine.getVotes(candidateId);
      assert.sameMembers(votes, [accounts[1], accounts[2]], "not the same accounts voted");
    })

    it("does not allow voting of address that has already voted", async() => {
      await votingMachine.vote(candidateId, {from: accounts[3]})
      truffleAssert.fails(votingMachine.vote(candidateId, {from: accounts[3]}), truffleAssert.ErrorType.REVERT, "cannot vote again");
    })
  })
})
