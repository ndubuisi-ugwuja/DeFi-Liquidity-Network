const { ethers, network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

async function getAwethBalance() {
    const [signer] = await ethers.getSigners();
    const address = await signer.getAddress();
    const aWeth = await ethers.getContractAt("IERC20", networkConfig[network.config.chainId].aWethTokenAddress, signer);
    const aWethBalance = await aWeth.balanceOf(address);
    console.log("You have deposited: ", ethers.formatUnits(aWethBalance, 18), "aWETH");
    return aWethBalance;
}

module.exports = { getAwethBalance };
