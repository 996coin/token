//  SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";
import "./interfaces/IToken.sol";
import "./libraries/SafeMath.sol";

contract Token is IToken {
    using SafeMath for uint;

    //  Token名称
    string public override name = "996Coin";

    //  Token简写
    string public override symbol = "996";

    //  Token小数位
    uint8 public override decimals = 18;

    //  Token总量996亿个
    uint public override totalSupply = 99_600_000_000e18; 

    //  每个账户的token余额
    mapping (address => uint256) internal balances;

    //  地址之间的授权的数量
    mapping (address => mapping (address => uint256)) internal allowances;

    //  合约管理员
    address public override immutable owner;

    //  合约构造函数
    constructor() {
        owner = msg.sender;
        balances[msg.sender] = totalSupply;
        console.log("Deploying Token contract owner:", msg.sender);
    }

    //  获取某个地址的token数量
    function balanceOf(address _owner) external override view returns (uint256 balance) {
        return balances[_owner];
    }

    //  给to地址转移token
    function transfer(address _to, uint256 _value) external override returns (bool success) {
        require(_to != address(0), "996: transfer to zero address");
        require(balances[msg.sender] > _value, "996: transfer amount exceeds balance");

        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    //  token从from地址转移到to地址
    function transferFrom(address _from, address _to, uint256 _value) external override returns (bool success) {
        require(_from != address(0), "996: transferFrom from zero address");
        require(_to != address(0), "996: transferFrom to zero address");

        require(balances[_from] > _value, "996: transfer amount exceeds balance");
        require(allowances[_from][msg.sender] > _value, "996: transfer amount exceeds allowance");

        balances[_to] = balances[_to].add(_value);
        balances[_from] = balances[_from].sub(_value);
        allowances[_from][msg.sender] = allowances[_from][msg.sender].sub(_value);

        emit Transfer(_from, _to, _value);
        return true;
    }

    //  授权spender可以转移token的数量
    function approve(address _spender, uint256 _value) external override returns (bool success) {
        require(_spender != address(0), "996: approve to zero address");
        require(_value < totalSupply, "996: approved amount must be smaller than totalSupply");

        allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    //  查询owner授权给spender的数量
    function allowance(address _owner, address _spender) external override view returns (uint256 remaining) {
        return allowances[_owner][_spender];
    }

}
