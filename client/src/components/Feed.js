import React from "react";
import "./Feed.css";

function generateImage() {
  const images = [
    "https://i.pinimg.com/originals/e9/56/ff/e956ff599b715915912777c9cca83d37.jpg",
    "https://img.freepik.com/premium-vector/profile-icon-male-avatar-hipster-man-wear-headphones_48369-8728.jpg?size=338&ext=jpg",
    "https://adnic.ae/documents/20126/51968/Icons_here_to_help%402x.png/5f50e3ce-3075-1183-dc21-e8f3bf2a7604?t=1588075402997",
    "https://media.istockphoto.com/vectors/happy-operator-girl-with-computer-headphones-and-microphone-vector-id1133167981?k=6&m=1133167981&s=612x612&w=0&h=MVhc8VRum7nCIlJzfJhhQ7_QLstrDrlxH8UfhzRSgi0=",
    "https://th.bing.com/th/id/OIP.r3dKdC-IHYHwP-wm9ldIIQHaHa?pid=ImgDet&rs=1",
    "https://cdn.dribbble.com/users/1223630/screenshots/8115260/char.gif",
    "https://i.pinimg.com/originals/48/6f/d3/486fd39c22573c9d280b0d85f99e937d.png",
    "https://th.bing.com/th/id/OIP.gEMuAH2lvwxN_aopmbwIBwHaHa?pid=ImgDet&rs=1",
    "https://dp.profilepics.in/profile_pictures/animation/animation_profile_pictures_16.jpg",
    "https://th.bing.com/th/id/OIP.lrUqoCuDgvzjlzPHE_R3ngHaGj?pid=ImgDet&rs=1",
  ];

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * images.length);

  // Get the image at the random index
  const image = images[randomIndex];

  return `${image}`;
}

function generateName() {
  const firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emily",
    "Frank",
    "Greta",
    "Henry",
    "Igor",
    "Jasmine",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
  ];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}

function Feed({ img, retrieveFile, input, setInput, AllTweets, deleteTweet }) {
  return (
    <>
      <div class="feed">
        <div class="feed__header">
          <h2>Home</h2>
          <span class="material-symbols-outlined stars"> auto_awesome </span>
        </div>

        {/* Tweet box Starts */}
        <div class="tweetbox">
          <form>
            <div class="tweetbox__input">
              <img
                src="https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/65/76/eb/6576eb98-b9b2-4a2c-5dc5-b57583bbd5fb/source/512x512bb.jpg"
                alt=""
                height="100"
              />
              <input
                id="inp"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="What's happening?"
              />
            </div>
            <div class="text">
              <span id="imageName"></span>
            </div>
            <div class="first">
              <label>
                <input
                  type="file"
                  id="file-upload"
                  name="data"
                  onChange={retrieveFile}
                />
                <span
                  onClick={() => {
                    let imageName = document.getElementById("imageName");

                    let inputImage =
                      document.querySelector("input[type=file]").files[0];
                    imageName.innerText = inputImage.name;
                  }}
                  class="material-symbols-outlined upload"
                >
                  {" "}
                  imagesmode{" "}
                </span>
              </label>

              <span class="material-symbols-outlined"> gif_box </span>
              <span class="material-symbols-outlined"> ballot </span>
              <span class="material-symbols-outlined">
                {" "}
                sentiment_satisfied{" "}
              </span>
              <span class="material-symbols-outlined"> edit_calendar </span>
              <span class="material-symbols-outlined"> pin_drop </span>

              <button onClick={img} class="tweetbox__tweetButton">
                Tweet
              </button>
            </div>
          </form>
        </div>
        {/* Tweet box end */}

        {/* post */}
        <div>
          {AllTweets.length !== 0 &&
            [...AllTweets].reverse().map((name) => {
              if (name.isVideo === true) {
                return (
                  <>
                    <div class="post">
                      <div class="post__avatar">
                        <img src={generateImage()} alt="" height="100" />
                      </div>

                      <div class="post__body">
                        <div class="post__header">
                          <div class="post__headerText">
                            <h3>
                              {name.userName.slice(0, 4)}...
                              {name.userName.slice(36, 40)}{" "}
                              <span class="post__headerSpecial">
                                <span class="material-symbols-outlined post__badge">
                                  verified{" "}
                                </span>
                                {generateName()}{" "}
                              </span>
                            </h3>
                          </div>
                          <div class="post__headerDescription" key={name.id}>
                            {name.tweetText}
                            <button
                              className="delete"
                              onClick={() => deleteTweet(name.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>

                        <video src={name.video} alt="" controls />

                        <div class="post__footer">
                          <span class="material-symbols-outlined">
                            {" "}
                            mode_comment{" "}
                          </span>
                          <span class="material-symbols-outlined">
                            {" "}
                            repeat{" "}
                          </span>
                          <span class="material-symbols-outlined">
                            {" "}
                            favorite{" "}
                          </span>
                          <span class="material-symbols-outlined">
                            {" "}
                            ios_share{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div class="post">
                    <div class="post__avatar">
                      <img src={generateImage()} alt="" height="100" />
                    </div>

                    <div class="post__body">
                      <div class="post__header">
                        <div class="post__headerText">
                          <h3>
                            {name.userName.slice(0, 4)}...
                            {name.userName.slice(36, 40)}{" "}
                            <span class="post__headerSpecial">
                              <span class="material-symbols-outlined post__badge">
                                verified{" "}
                              </span>
                              {generateName()}{" "}
                            </span>
                          </h3>
                        </div>
                        <div class="post__headerDescription" key={name.id}>
                          {name.tweetText}
                          <button
                            className="delete"
                            onClick={() => deleteTweet(name.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>

                      <img src={name.img} alt="" />

                      <div class="post__footer">
                        <span class="material-symbols-outlined">
                          {" "}
                          mode_comment{" "}
                        </span>
                        <span class="material-symbols-outlined"> repeat </span>
                        <span class="material-symbols-outlined">
                          {" "}
                          favorite{" "}
                        </span>
                        <span class="material-symbols-outlined">
                          {" "}
                          ios_share{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Feed;
