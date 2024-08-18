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
  // 1. STATE

  // State to toggle the FormAddFriend component
  const [showAddFriend, setShowAddFriend] = useState(false);
  // Initialize state to store the friends array data.
  const [friends, setFriends] = useState(initialFriends);
  // State to store the selected friend
  const [selectedFriend, setSelectedFriend] = useState(null);

  // 2. EVENT HANDLERS

  const handleShowAddFriend = () => {
    // Toggle the value of showAddFriend
    setShowAddFriend(!showAddFriend);
  };

  // Function to add a new friend
  const handleAddFriend = friend => {
    // Add a new friend and create a new array
    // take an as argument, spread the existing friends array and add the new friend
    // Ensure immutability by spreading the existing array and adding the new friend.
    setFriends(friends => [...friends, friend]);
    // Close the FormAddFriend component
    setShowAddFriend(false);
  };

  // Function to handle the friend selection
  const handleSelection = friend => {
    // If the selected friend is the same as the current friend, set the selected friend to null
    // Which will close the FormSplitBill component
    // Else, set the selected friend to the current friend and open the FormSplitBill component
    // optional chaining (curSelection?.id) to prevent errors if selectedFriend is null
    setSelectedFriend(curSelection =>
      curSelection?.id === friend.id ? null : friend
    );
  };

  // 3. RENDER

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          data={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {/* if showAddFriend is true, render FormAddFriend */}
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {/* // Toggle the button text */}
          {!showAddFriend ? "Add Friend" : "Close"}
        </Button>
      </div>
      {/*  
        If a friend is selected, render the FormSplitBill component 
        if null, short-circuit and don't render the FormSplitBill component  
      */}
      <div className="main">
        {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
      </div>
    </div>
  );
}

function FriendsList({ data, onSelection, selectedFriend }) {
  return (
    <ul>
      {data.map(friend => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  // Check if the friend is selected, by comparing the selectedFriend ID with the friend ID
  // This affects the className of the list item and the button text
  // Optional chaining (selectedFriend?.id) to prevent errors if selectedFriend is null
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className="friend" className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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
  // Set state local to the form component because it's not needed in the parent component
  const [name, setName] = useState(""); // Default empty name
  const [image, setImage] = useState("https://i.pravatar.cc/48"); // Default image URL

  const id = crypto.randomUUID(); // Generate a random ID

  // Function to handle the form submission
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
    // and pass the new friend object as an argument
    onAddFriend(newFriend);

    // Reset the form
    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="friend-name">👭Friend Name</label>
      <input
        type="text"
        id="friend-name"
        value={name}
        onChange={e => setName(e.target.value)}
        aria-label="Friend Name"
      />
      <label htmlFor="friend-image">🖼️ Image URL</label>
      <input
        type="text"
        id="friend-image"
        value={image}
        onChange={e => setImage(e.target.value)}
        aria-label="Friend Image URL"
      />
      <Button type="submit">Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form action="" className="form-split-bill">
      <h2>Split bill with {selectedFriend.name}</h2>
      <label htmlFor="">💰 Bill value</label>
      <input type="text" />
      <label htmlFor="">🧍 Your expense</label>
      <input type="text" />
      <label htmlFor="">🧍‍♂️ {selectedFriend.name} expense</label>
      <input type="text" disabled />
      <label htmlFor="">😵 Who is paying the bill?</label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split</Button>
    </form>
  );
}
