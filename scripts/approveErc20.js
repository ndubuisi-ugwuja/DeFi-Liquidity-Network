const { ethers } = require("hardhat");

async function approveErc20(erc20Address, spenderAddress, amountToSpend, signer) {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, signer);

    const tx = await erc20Token.approve(spenderAddress, amountToSpend);
    await tx.wait(1);
    console.log("Transaction triggered and approved!");
}

module.exports = { approveErc20 };
