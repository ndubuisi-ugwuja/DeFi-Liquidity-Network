const { ethers } = require("hardhat");

async function getUserData(pool, signer) {
    const address = await signer.getAddress();
    const userData = await pool.getUserAccountData(address);
    const totalCollateral = ethers.formatUnits(userData.totalCollateralBase.toString(), 8);
    const totalDebt = ethers.formatUnits(userData.totalDebtBase.toString(), 8);
    const availableBorrows = ethers.formatUnits(userData.availableBorrowsBase.toString(), 8);
    const currentLiquidationThreshold = userData.currentLiquidationThreshold.toString();
    const threshold = (currentLiquidationThreshold / 100).toFixed(2);
    const healthFactor = ethers.formatUnits(userData.healthFactor.toString(), 18);
    console.log("Networth (Dashboard):", totalCollateral, "USDT");
    console.log("Total dept (Dashboard):", totalDebt, "USDT");
    console.log("Available to borrow (Dashboard):", availableBorrows, "USDT");
    console.log("current liquidation threshold (Dashboard):", threshold, "%");
    console.log("health factor (Dashboard):", healthFactor);
    return { totalDebt, availableBorrows, currentLiquidationThreshold, healthFactor };
}

module.exports = { getUserData };
