import { expect } from "chai";
import { VotingMachineInstance } from "../types/truffle-contracts";

const VotingMachine = artifacts.require("VotingMachine");
const truffleAssert = require("truffle-assertions");
const CANDIDATE_TEST_NAME = "Testing Candidate"

contract("VotingMachine", (accounts) => {
  let votingMachine: VotingMachineInstance;

  beforeEach(async () => { 
    votingMachine = await VotingMachine.deployed();
    assert(votingMachine, "voting machine was not deployed");
  })

  describe("createCandidate(name)", () => {
    it("creates a candidate", async () => {
      let candidateId: string;
      const expected = CANDIDATE_TEST_NAME
      const candidate = await votingMachine.createCandidate(expected);
      truffleAssert.eventEmitted(candidate, 'CandidateCreated', (ev: any) => {
        candidateId = ev.candidateId
        return true;
      });

      const result = await votingMachine.getCandidateName(candidateId);
      assert.equal(result, expected, "resulting candidate not the same with expected");
    })

    it("can only be done by the owner", async () => {
      truffleAssert.passes(votingMachine.createCandidate(CANDIDATE_TEST_NAME, {from: accounts[0]}));
      truffleAssert.reverts(votingMachine.createCandidate(CANDIDATE_TEST_NAME, {from: accounts[1]}));
    })
  })

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

  describe("vote(id)", () => {
    it("adds a vote to a candidate", async () => {
      let candidateId: string;
      const candidate = await votingMachine.createCandidate(CANDIDATE_TEST_NAME);
      truffleAssert.eventEmitted(candidate, 'CandidateCreated', (ev: any) => {
        candidateId = ev.candidateId
        return true;
      });

      const vote0 = await votingMachine.vote(candidateId, {from: accounts[0]});
      truffleAssert.eventEmitted(vote0, "CandidateVoted", {candidateId, voter: accounts[0]})
      
      const vote1 = await votingMachine.vote(candidateId, {from: accounts[1]});
      truffleAssert.eventEmitted(vote1, "CandidateVoted", {candidateId, voter: accounts[1]})

      const votes = await votingMachine.getVotes(candidateId);
      assert.sameMembers(votes, [accounts[0], accounts[1]], "not the same accounts voted");
    })

    it("does not allow voting of address that has already voted", async () => {
      let candidateId: string;
      const candidate = await votingMachine.createCandidate(CANDIDATE_TEST_NAME);
      truffleAssert.eventEmitted(candidate, 'CandidateCreated', (ev: any) => {
        candidateId = ev.candidateId
        return true;
      });
      
      await votingMachine.vote(candidateId, {from: accounts[3]});

      truffleAssert.fails(votingMachine.vote(candidateId, {from: accounts[3]}), truffleAssert.ErrorType.REVERT, "cannot vote again");
    })
  })
})


