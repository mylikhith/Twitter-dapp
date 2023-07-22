const TwitterContract = artifacts.require("./TwitterContract.sol");

module.exports = function (deployer) {
  deployer.deploy(TwitterContract);
};
