const VotingMachine = artifacts.require("VotingMachine");
module.exports = function (_deployer) {
  _deployer.deploy(VotingMachine);
};
