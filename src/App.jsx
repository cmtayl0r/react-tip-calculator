import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  // State to toggle the FormAddFriend component
  const [showAddFriend, setShowAddFriend] = useState(false);
  // State to store the friends array data
  const [friends, setFriends] = useState(initialFriends);

  const handleShowAddFriend = () => {
    // Toggle the value of showAddFriend
    setShowAddFriend(!showAddFriend);
  };

  const handleAddFriend = friend => {
    // Add a new friend and create a new array
    // take an as argument, spread the existing friends array and add the new friend
    setFriends(friends => [...friends, friend]);
    // Close the FormAddFriend component
    setShowAddFriend(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList data={friends} />
        {/* if showAddFriend is true, render FormAddFriend */}
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {/* // Toggle the button text */}
          {!showAddFriend ? "Add Friend" : "Close"}
        </Button>
      </div>
      <div className="main">
        <FormSplitBill />
      </div>
    </div>
  );
}

function FriendsList({ data }) {
  return (
    <ul>
      {data.map(friend => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li className="friend">
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even 👍</p>}
      <Button>Select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  // State local to the FormAddFriend component
  const [name, setName] = useState(""); // Default empty name
  const [image, setImage] = useState("https://i.pravatar.cc/48"); // Default image URL

  const id = crypto.randomUUID(); // Generate a random ID

  const handleSubmit = event => {
    event.preventDefault();

    // Guard clause to prevent empty name or image
    if (!name || !image) return;

    // Create a new friend object
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    // Call the onAddFriend function from the parent component
    onAddFriend(newFriend);

    // Reset the form
    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👭Friend Name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form action="" className="form-split-bill">
      <h2>Split bill with x</h2>
      <label htmlFor="">💰 Bill value</label>
      <input type="text" />
      <label htmlFor="">🧍 Your expense</label>
      <input type="text" />
      <label htmlFor="">🧍‍♂️ X expense</label>
      <input type="text" disabled />
      <label htmlFor="">😵 Who is paying the bill?</label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>
      <Button>Split</Button>
    </form>
  );
}
