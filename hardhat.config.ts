import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/TPd3LuYkl3c0c1tX2zBRgiwmqkENWOTA"
        // url: "https://mainnet.infura.io/v3/5ff7611cd7534bc1b7c196d3441f5841"
      }
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/60f1cb26c41244a8bb7770d9638e04d5",
      accounts: ["863c1532484a20dd7d68fb3dac3eb422b4daf7ad4acd244f1eb8c52748c81404"]
    },
    ropsten: {
      // url: "https://ropsten.infura.io/v3/5ff7611cd7534bc1b7c196d3441f5841",
      url: "https://eth-ropsten.alchemyapi.io/v2/tQfxutB8jYV7IxY4czqE0gYZ-o8lTrVx",
      accounts: ["863c1532484a20dd7d68fb3dac3eb422b4daf7ad4acd244f1eb8c52748c81404"]
    }
  }
};

