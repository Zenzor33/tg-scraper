const container = document.querySelector(".history");
const obj = {
  author: "",
  messages: [],
};

const getMessage = (childNode) => {
  const element = childNode.querySelector(".text");
  if (element !== null) return element.outerText;
};

const adjustObject = (author, message) => {
  obj["author"] = author;
  obj["messages"].push(message);
};

const messages = function (user) {
  const containerChildrenLength = container.children.length;
  let currentAuthor = "";

  for (let i = 0; i < containerChildrenLength; i++) {
    // loops through each child of the container div
    let childNode = container.children[i];
    let authorNode = childNode.querySelector(".from_name");

    // Returns true if current message and previous message is written by a different user
    const newAuthorDiv = childNode.className === "message default clearfix";

    // Returns true if current message and previous message are written by the same user
    const sequentialMessagesDiv =
      childNode.className === "message default clearfix joined";

    // Check if current message and previous message are written by different users
    if (newAuthorDiv) {
      currentAuthor = authorNode.outerText; // assigns the username of the author of the iterated message.
    }

    // code ```let author = authorNode.outerText``` doesn't work
    if (
      // Check if message's author matches the search paraemter for user
      (newAuthorDiv && authorNode.outerText === user) ||
      // Check if sequential message's author matches the search parameter for user
      (sequentialMessagesDiv && currentAuthor === user)
    ) {
      let message = getMessage(childNode);
      adjustObject(user, message);
    }
  }
  console.log(obj);
};
