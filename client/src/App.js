import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import TwitterContract from "./contracts/TwitterContract.json";
import "./App.css";
import { Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";
import Feed from "./components/Feed";
import axios from "axios";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = TwitterContract.networks[networkId];
        // console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          TwitterContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  const setAccountListner = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };

  //connected account

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      setAccountListner(web3.givenProvider);
      setAccount(accounts[0]);
    };
    state.web3 && getAccount();
  }, [state, state.web3]);

  //addTweets

  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("NO image selected");
  const [tweets, setTweet] = useState([]);

  const addTweets = async (a, b, c) => {
    // console.log(a);
    let tweet = {
      tweetText: input,
      url: a,
      isVideo: b,
      video: c,
      isDeleted: false,
    };

    try {
      const { contract } = state;
      await contract.methods
        .addTweet(tweet.tweetText, tweet.url, tweet.isVideo, tweet.video, tweet.isDeleted)
        .send({ from: account });
      setTweet([...tweets, tweet]);
      console.log("Added tweet");
    } catch (error) {
      console.log("Not Tweeted");
    }
  };

  //getAllTweets

  const [AllTweets, setAllTweets] = useState([]);

  useEffect(() => {
    const getAllTweets = async () => {
      const { contract } = state;
      const allTweet = await contract.methods.getAllTweets().call();
      const AllTweets = await Promise.all(
        allTweet.map((a) => {
          return a;
        })
      );
      // console.log(AllTweets);
      setAllTweets(AllTweets);
    };
    state.contract && getAllTweets();
  }, [state, state.contract, setTweet]);

  //delete Tweets

  const deleteTweet = async (key) => {
    const { contract } = state;
    await contract.methods.deleteTweet(key, true).send({ from: account });
    let allTweets = await contract.methods.getAllTweets().call();
    setAllTweets(allTweets);
  };

  const img = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `eb701ddf264ad6d1775f`,
            pinata_secret_api_key: `5ecd66d467872af312c738fa7b3ad64634a0ee5dc32d4df632174676bcffb6eb`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        alert("Successfully image uploaded");
        if(file.type === "video/mp4"){
          var Video = true;
          await addTweets('',Video,ImgHash);
        }
        else {
          Video = false;
          await addTweets(ImgHash,Video,'');
        }
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to pinata");
      }
    }
    else {
      addTweets('','','');
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    // console.log("data ", data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <>
      <div className="app">
        <Sidebar />
        <Feed
          img={img}
          retrieveFile={retrieveFile}
          input={input}
          setInput={setInput}
          addTweets={addTweets}
          AllTweets={AllTweets}
          deleteTweet={deleteTweet}
        />
      </div>
    </>
  );
};
export default App;
