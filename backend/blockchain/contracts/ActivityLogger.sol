// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ActivityLogger {
    struct Activity {
        string userId;
        string action;
        uint256 timestamp;
    }

    Activity[] public activities;

    event ActivityLogged(string userId, string action, uint256 timestamp);

    function recordActivity(string memory userId, string memory action, uint256 timestamp) public {
        activities.push(Activity(userId, action, timestamp));
        emit ActivityLogged(userId, action, timestamp);
    }

    function getActivityCount() public view returns (uint256) {
        return activities.length;
    }

    function getActivity(uint256 index) public view returns (string memory userId, string memory action, uint256 timestamp) {
        return (activities[index].userId, activities[index].action, activities[index].timestamp);
    }
}
