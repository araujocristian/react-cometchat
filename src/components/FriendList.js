import React from "react";
import MDSpinner from "react-md-spinner";

const FriendList = props => {
  const { friends, friendisLoading, selectedFriend } = props;
  if (friendisLoading) {
    return (
      <div className="col-xl-12 my-auto text-center">
        <MDSpinner size="72" />
      </div>
    );
  } else {
    return (
      <ul className="list-group list-group-flush w-100">
        {friends.map(friend => (
          <li
            key={friend.uid}
            className={`list-group-item ${
              friend.uid === selectedFriend ? "active" : ""
            }`}
            onClick={() => props.selectFriend(friend.uid)}
          >
            {friend.name}
          </li>
        ))}
      </ul>
    );
  }
};

export default FriendList;
