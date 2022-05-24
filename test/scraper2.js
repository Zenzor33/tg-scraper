const container = document.querySelector(".history");
const obj = {
  author: "",
  messages: [],
};

const getMessage = (childNode) => {
  const element = childNode.querySelector(".text");
  if (element !== null) return element.outerText;
};

const adjustObject = function (author, message) {
  obj["author"] = author;
  obj["messages"].push(message);
};

// 1) Program loops though history div

const messages = function (user) {
  const containerChildrenLength = container.children.length;
  let currentAuthor = "";

  for (let i = 0; i < containerChildrenLength; i++) {
    // loops through each child of container
    let childNode = container.children[i];
    // Next message with new author
    const newAuthor = childNode.className === "message default clearfix";
    const sequentialMessages =
      childNode.className === "message default clearfix joined";
    let authorNode = childNode.querySelector(".from_name");

    // check for new authors
    if (newAuthor) {
      currentAuthor = authorNode.outerText;
      console.log(currentAuthor);
    }

    // let author = authorNode.outerText // doesn't work
    if (newAuthor && authorNode.outerText === user) {
      let message = getMessage(childNode);
      adjustObject(user, message);
    }

    if (sequentialMessages && currentAuthor === user) {
      let message = getMessage(childNode);
      adjustObject(user, message);
    }
    // check for items = sequential messages
    // loop through length of items and append each item to messages

    // check for items = sequential messages
    // loop through length of items and append each item to messages
  }
};

messages("Ryuk 1776");
console.log(obj);

// 2) If program detects author -> wipe & replace array author and messages
// 3) If program detects .joined class, push to array
