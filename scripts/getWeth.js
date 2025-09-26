const { ethers, network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

const AMOUNT = ethers.parseEther("0.02");

async function getWeth() {
    const [signer] = await ethers.getSigners();
    const iWeth = await ethers.getContractAt("IWeth", networkConfig[network.config.chainId].wethTokenAddress, signer);
    const tx = await iWeth.deposit({ value: AMOUNT });
    await tx.wait(1);
    const wethBalance = await iWeth.balanceOf(signer);
    console.log("Your WETH balance is:", ethers.formatEther(wethBalance), "WETH");
}

module.exports = { getWeth, AMOUNT };
