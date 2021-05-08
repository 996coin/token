import { ethers } from "hardhat";
import { Signer, utils } from "ethers";
import { expect } from "chai";

describe("Token", function () {
    let accounts: Signer[];

    beforeEach(async function () {
        accounts = await ethers.getSigners();
        console.log("Accounts:", accounts.map(a => a.getAddress()));
    });

    it("should do something right", async function () {
        // Do something with the accounts
        const sdoToken = await ethers.getContractFactory("Token");
        const sdo = await sdoToken.deploy();
        await sdo.deployed();

        // 获取合约部署地址
        let owner = await sdo.owner();
        console.log("owner:", owner);

        // 测试合约的name、symbol
        expect(await sdo.name()).to.equal("996coin");
        expect(await sdo.symbol()).to.equal("996");

        // 测试合约的decimals
        const decimals = await sdo.decimals();
        expect(decimals).to.equal(18);
        
        // 测试合约的totalSupply
        const total = 996*(10**8);
        let totalSupply = await sdo.totalSupply();
        expect(totalSupply.div(utils.parseUnits("1", decimals))).to.equal(total);
        expect(await sdo.totalSupply()).to.equal(utils.parseUnits("996", 26));

        // 测试合约的balanceOf
        let balance = await sdo.balanceOf(owner);
        console.log("owner balance:", utils.formatUnits(balance));

        // 测试合约的transfer
        let amount = utils.parseUnits("123456", decimals);
        let ret = await sdo.transfer(accounts[2].getAddress(), amount);
        console.log("owner transfer return:", ret);
        balance = await sdo.balanceOf(owner);
        console.log("owner balance:", utils.formatUnits(balance));
        balance = await sdo.balanceOf(accounts[2].getAddress());
        console.log("accounts[2] balance:", utils.formatUnits(balance));
        expect(balance).to.equal(amount);

        // 测试合约的transfer，更换不同的from地址
        amount = utils.parseUnits("123", decimals);
        let contractWithSigner = sdo.connect(accounts[2]);
        ret = await contractWithSigner.transfer(accounts[3].getAddress(), amount);
        console.log("no owner transfer return:", ret);
        balance = await sdo.balanceOf(accounts[2].getAddress());
        console.log("accounts[2] balance:", utils.formatUnits(balance));
        balance = await sdo.balanceOf(accounts[3].getAddress());
        console.log("accounts[3] balance:", utils.formatUnits(balance));
        expect(balance).to.equal(amount);

        // 测试合约的approve
        amount = utils.parseUnits("100", decimals);
        contractWithSigner = sdo.connect(accounts[3]);
        ret = await contractWithSigner.approve(accounts[4].getAddress(), amount);
        console.log("approve return:", ret);

        // 测试合约的allowance
        let allowance = await sdo.allowance(accounts[3].getAddress(), accounts[4].getAddress());
        console.log("allowance:", utils.formatUnits(allowance));
        expect(allowance).to.equal(amount);

        // 测试合约的transferFrom
        amount = utils.parseUnits("25", decimals);
        contractWithSigner = sdo.connect(accounts[4]);
        ret = await contractWithSigner.transferFrom(accounts[3].getAddress(), accounts[5].getAddress(), amount);
        console.log("transferFrom return:", ret);
        balance = await sdo.balanceOf(accounts[3].getAddress());
        console.log("accounts[3] balance:", utils.formatUnits(balance));
        balance = await sdo.balanceOf(accounts[5].getAddress());
        console.log("accounts[5] balance:", utils.formatUnits(balance));
        expect(balance).to.equal(amount);

        // 测试合约的allowance
        allowance = await sdo.allowance(accounts[3].getAddress(), accounts[4].getAddress());
        console.log("left allowance:", utils.formatUnits(allowance));

    });

});
