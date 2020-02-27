import React, { useState, useEffect } from "react";
import { CometChat } from "@cometchat-pro/chat";
import ChatBox from "../components/ChatBox";
import FriendList from "../components/FriendList";

const MESSAGE_LISTENER_KEY = "listener-key";
const limit = 30;

const Chat = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [chat, setChat] = useState([]);
  const [chatIsLoading, setChatIsLoading] = useState(false);
  const [friendisLoading, setFriendisLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // this useEffect will fetch all users available for chat
    // only run on mount

    let usersRequest = new CometChat.UsersRequestBuilder()
      .setLimit(limit)
      .build();

    usersRequest.fetchNext().then(
      userList => {
        console.log("User list received:", userList);
        setFriends(userList);
        setFriendisLoading(false);
      },
      error => {
        console.log("User list fetching failed with error:", error);
      }
    );

    return () => {
      CometChat.removeMessageListener(MESSAGE_LISTENER_KEY);
      CometChat.logout();
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8 h-100pr border rounded">
          <div className="row">
            <div
              className="col-lg-4 col-xs-12 bg-light"
              style={{ height: 658 }}
            >
              <div className="row p-3">
                <h2>Friend List</h2>
              </div>
              <div
                className="row ml-0 mr-0 h-75 bg-white border rounded"
                style={{ height: "100%", overflow: "auto" }}
              >
                <FriendList
                  friends={friends}
                  friendisLoading={friendisLoading}
                  selectedFriend={selectedFriend}
                  selectFriend={selectFriend}
                />
              </div>
            </div>
            <div
              className="col-lg-8 col-xs-12 bg-light"
              style={{ height: 658 }}
            >
              <div className="row p-3 bg-white">
                <h2>Who you gonna chat with?</h2>
              </div>
              <div
                className="row pt-5 bg-white"
                style={{ height: 530, overflow: "auto" }}
              >
                <ChatBox
                  chat={chat}
                  chatIsLoading={chatIsLoading}
                  user={user}
                />
              </div>
              <div
                className="row bg-light"
                style={{ bottom: 0, width: "100%" }}
              >
                <form className="row m-0 p-0 w-100" onSubmit={handleSubmit}>
                  <div className="col-9 m-0 p-1">
                    <input
                      id="text"
                      className="mw-100 border rounded form-control"
                      type="text"
                      onChange={event => {
                        setMessage(event.target.value);
                      }}
                      value={message}
                      placeholder="Type a message..."
                    />
                  </div>
                  <div className="col-3 m-0 p-1">
                    <button
                      className="btn btn-outline-secondary rounded border w-100"
                      title="Send"
                      style={{ paddingRight: 16 }}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
