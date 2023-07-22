// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract TwitterContract {

    event AddTweet(address recipient, uint tweetId);
    event DeleteTweet(uint tweetId, bool isDeleted);

    struct Tweet {

        uint id;
        string img;
        bool isVideo;
        string video;
        address userName;
        string tweetText;
        bool isDeleted;
    }

    Tweet[] private tweets;

    //mapping tweet id to wallet address of the user
    mapping (uint256 => address) tweetToOwner;

    //method to be called by our front end when trying to add anew tweet
    function addTweet(string memory tweetText, string memory url, bool isVideo, string memory video, bool isDeleted) external {
        uint tweetId = tweets.length;
        tweets.push(Tweet(tweetId, url, isVideo, video, msg.sender, tweetText, isDeleted));
        tweetToOwner[tweetId] = msg.sender;
        emit AddTweet(msg.sender, tweetId);
    }

    //method to get all th tweets
    function getAllTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);

        uint counter = 0;
        for(uint i = 0; i < tweets.length; i++) {
            if(tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    //method to get only my tweet
    function getMyTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);

        uint counter = 0;
        for(uint i = 0; i < tweets.length; i++) {
            if(tweets[i].isDeleted == false && tweetToOwner[i] == msg.sender) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    //method to delete a tweet
    function deleteTweet(uint tweetId, bool isDeleted) external {
        if(tweetToOwner[tweetId] == msg.sender) {
            tweets[tweetId].isDeleted = isDeleted;
            emit DeleteTweet(tweetId, isDeleted);
        }
    }
}

//0xe4CeEfc53a19Ea2856A30B413bA9c09c9bc46892