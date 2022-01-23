pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract VotingMachine is Ownable {
    event CandidateVoted(bytes32 candidateId, address voter);
    event CandidateCreated(bytes32 candidateId);

    struct Candidate {
        string name;
    }

    mapping(bytes32 => Candidate) public candidates;
    mapping(bytes32 => address[]) public votes;
    mapping(address => bool) public voters;

    function randomId(string memory _name) private pure returns (bytes32) {
        return keccak256(abi.encode(_name));
    }

    function createCandidate(string memory _name) external onlyOwner {
        bytes32 id = randomId(_name);
        candidates[id] = Candidate(_name);
        emit CandidateCreated(id);
    }

    function getCandidateName(bytes32 _id) public view returns (string memory) {
        return candidates[_id].name;
    }

    function vote(bytes32 _id) public {
        require(!voters[msg.sender]);
        voters[msg.sender] = true;
        votes[_id].push(msg.sender);
        emit CandidateVoted(_id, msg.sender);
    }

    function getVotes(bytes32 _id) public view returns (address[] memory) {
        return votes[_id];
    }
}
