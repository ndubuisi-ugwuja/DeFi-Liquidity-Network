const networkConfig = {
    31337: {
        // Mainnet addresses for mainnet fork
        name: "localhost",
        wethTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        aWethTokenAddress: "0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8",
        providerAddress: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
        daiTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    },
    // Feel free to add other chains
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
    networkConfig,
    developmentChains,
};
