# DeFi Liquidity Network

A full DeFi liquidity network built on Aave v3 lending protocol with working contract interfaces, scripts, and examples to wrap ETH, deposit collateral, borrow stablecoins, repay, and withdraw. Whether you’re building a DeFi dApp, trading bot, or lending dashboard, this repo shows how to wire up real lending mechanics.

## 📖 Overview

### This project serves as both a developer starter kit and an educational playground for understanding DeFi lending.

It includes:

• Aave v3 contract interfaces (IPool, IPoolAddressesProvider, ERC20)

• Scripts to interact with Aave pools on Mainnet fork or Sepolia

• aToken handling (earning yield on deposits)

• Borrow & repay workflows with variable interest rate debt

• Modular helper scripts (getWeth, approveErc20, getUserData, getAwethBalance)

## ⚙️ Setup

1. Clone and install

```bash
git clone https://github.com/ndubuisi-ugwuja/DeFi-Liquidity-Network.git cd DeFi-Liquidity-Network
```

2. Configure environment
   Create .env file:

```env
ALCHEMY_MAINNET_URL=https://eth-mainnet.g.alchemy.com/v2/<API_KEY>
ALCHEMY_SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/<API_KEY>
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```

## 🚀 Running the Workflow

Local (Mainnet Fork)

```bash
npx hardhat node --fork $ALCHEMY_MAINNET_URL
npx hardhat run scripts/aaveBorrow.js --network localhost
```

📜 License

MIT - free to use, modify, and distribute.
