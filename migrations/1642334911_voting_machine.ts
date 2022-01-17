const VotingMachineContract = artifacts.require("VotingMachine")

module.exports = function(_deployer: any) {
  _deployer.deploy(VotingMachineContract);
};
