// RUBE GOLDBERG TELEGRAM SCRAPER

const history = document.querySelector(".history");

// loop through the children element and search for message default clearfix

// The program takes a name and returns all mesages by the TG user of that name
// NEGATIVE: The program returns an array of messages
// Program must use objects because spaces in user names

const array = [
  {
    author: "Ryuk 1776",
    messages: [],
  },
  {
    author: "retard",
    messages: [],
  },
];

const userExists = function (user) {
  const newArray = array.filter((obj) => obj.author.includes(user));
  return newArray.length > 0 ? true : false;
};

const getMessage = (childNode) => {
  const element = childNode.querySelector(".text");
  if (element !== null) return element.outerText;
};

const messages = function (user) {
  const historyChildrenLength = history.children.length;

  for (let i = 0; i < historyChildrenLength; i++) {
    let childNode = history.children[i];
    if (childNode.className === "message default clearfix") {
      if (user === childNode.querySelector(".from_name").outerText) {
        if (userExists(user)) {
          // push message content to existing object in array
          let message = getMessage(childNode);
          array[0].messages.push(message);
          console.log(
            `${user} messages found, and user messages exist in object`
          );
        } else if (!userExists(user)) {
          // create new object profile in the array
          let message = getMessage(childNode);
          typeof message === "string";
          array[0].author = user;
          array[0].messages.push(message);
          console.log(
            `${user} messages found, but user does not exist in object yet`
          );
        }
      }
    } else if (childNode.className === "message default clearfix joined") {
      let message = getMessage(childNode);
      array[0].messages.push(message);
    }
  }
};

// let newArray = array.filter((user) => user.author.includes("Ryuk 1776"));
// obj["message"] = childNode.querySelector(".text").outerText;
// messages("Ryuk 1776");

messages("Bull Jesus aka Fake Randy aka the oracle");
console.log(array);
// messages("Randy");
