//  SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.0;

import "./IERC20.sol";

interface IToken is IERC20{

    function owner() external view returns (address);
    
}
