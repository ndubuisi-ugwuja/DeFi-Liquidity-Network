const { ethers, network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
const { getWeth, AMOUNT } = require("./getWeth");
const { approveErc20 } = require("./approveErc20");
const { getUserData } = require("./getUserData");
const { getAwethBalance } = require("./getAwethBalance");

async function main() {
    await getWeth(); // Mint Weth Token

    // Get pool address
    const [signer] = await ethers.getSigners();
    const poolAddressProvider = await ethers.getContractAt(
        "contracts/interfaces/IPoolAddressesProvider.sol:IPoolAddressesProvider",
        networkConfig[network.config.chainId].providerAddress,
        signer,
    );
    const poolAddress = await poolAddressProvider.getPool();
    console.log("The Pool address is:", poolAddress);

    // Get pool contract
    const pool = await ethers.getContractAt("contracts/interfaces/IPool.sol:IPool", poolAddress, signer);

    // Deposit WETH
    await approveErc20(networkConfig[network.config.chainId].wethTokenAddress, poolAddress, AMOUNT, signer);
    console.log("Depositing WETH...");
    const tx = await pool.deposit(networkConfig[network.config.chainId].wethTokenAddress, AMOUNT, signer, 0);
    await tx.wait(1);
    console.log("WETH deposited✅");

    // Get aWETH balance
    await getAwethBalance();

    // Get user account info
    await getUserData(pool, signer);

    // Borrow DAI
    const daiToBorrowWei = ethers.parseUnits("50", 18);
    console.log("Borrowing DAI..."); // We borrow $50 to avoid a lower health factor
    const borrowTx = await pool.borrow(
        networkConfig[network.config.chainId].daiTokenAddress,
        daiToBorrowWei,
        2, // interestRateMode of 2(variables)
        0,
        signer,
    );
    await borrowTx.wait(1);
    const borrowedDai = ethers.formatUnits(daiToBorrowWei.toString(), 18);
    console.log("✅You have successfully borrowed", borrowedDai, "DAI");
    await getUserData(pool, signer);

    // Repay DAI
    const daiToRepay = ethers.parseUnits("49", 18);
    await approveErc20(networkConfig[network.config.chainId].daiTokenAddress, poolAddress, daiToRepay, signer);
    console.log("Repaying DAI...");
    const repayTx = await pool.repay(networkConfig[network.config.chainId].daiTokenAddress, daiToRepay, 2, signer);
    await repayTx.wait(1);
    const repaidDai = ethers.formatUnits(daiToRepay.toString(), 18);
    console.log("✅You have successfully repaid", repaidDai, "DAI");
    await getUserData(pool, signer);

    // Withdraw WETH
    const amountToWithdraw = ethers.parseUnits("0.019", 18);
    console.log("Withdrawing WETH...");
    const withdrawTx = await pool.withdraw(
        networkConfig[network.config.chainId].wethTokenAddress,
        amountToWithdraw,
        signer,
    );
    await withdrawTx.wait(1);
    console.log("✅You have successfully withdrawn", ethers.formatUnits(amountToWithdraw, 18), "WETH");
    await getUserData(pool, signer);
}

main().catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
});
