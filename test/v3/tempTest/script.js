// RICH'S RUBE GOLDBERG MACHINE

/*
This program will make a new object for each user. Each object will have two properties. A property called 'author' that contains the name of the user, and a property called 'messages' that contains an array of all the user's messages. 

The program should be designed to scale for the next version which tracks date of each message.

The program will perform one loop through the html content. The loop will check:
- const isDifferentUserDiv =  If the message is written by a different user than the previous message
-- If (isDifferentUserDiv), program:
--- logs name of the user to keep track of currentUser
--- Checks if the user already has an object. 
----- If false, create new object & append message.
----- If true, append message
-- If (!isDifferentUserDiv), program:
--- appends message to the previous detected user.
*/

const container = document.querySelector(".history");
let tempArray = [{}, {}];

const classNames = {
  isDifferentUserDiv: "message default clearfix",
  isSameUser: "message default clearfix joined",
  checkIsDifferentUserDiv(className) {
    return className === this.isDifferentUserDiv ? true : false;
  },
  checkIsSameUser(className) {
    return className === this.isSameUser ? true : false;
  },
};

const getMessage = (childElement) => {
  const element = childElement.querySelector(".text");
  if (element !== null) return element.outerText;
};

const fetchUserMessages = function (user) {
  const childElementsLength = container.children.length;
  for (let i = 0; i < childElementsLength; i++) {
    let childElement = container.children[i];
    let currentUser = "";
    let isSameUser = classNames.checkIsSameUser(childElement.className);
    let isDifferentUserDiv = classNames.checkIsDifferentUserDiv(
      childElement.className
    );

    if (isDifferentUserDiv) {
      // update currentUser
      currentUser = getNewUserName(childElement);
      currentMessage = getMessage(childElement);
      // check if user exists in array
      let userExists = Boolean(tempArray.find((o) => o.name === currentUser));
      if (!userExists) {
        // if user does not exist in array, push object with user and message
        tempArray.push({ name: currentUser, message: [currentMessage] });
      } else if (userExists) {
        // append current message to user's message's array in object
      }
    }
  }
};

//
// IGNORE THE CODE BLOW. IT WAS FOR TESTING
//

// create object constructor
function User(author, message) {
  this.author = author;
  this.message = [];
}

// create object prototype
User.prototype.pushMessage = function (message) {
  this.message.push(message);
};

// create object
const richard = new User("richard");
// push message to object
richard.pushMessage("hello");
// push object to array
tempArray.push(richard);

const getNewUserName = (element) =>
  element.querySelector(".from_name")?.innerText;

// const test = Array.from(document.querySelectorAll(".history .body")).map(
//   (element) => {
//     return {
//       author: element.querySelector(".from_name")?.innerText,
//       message: element.querySelector(".text")?.innerText,
//     };
//   }
// );

// const container = document.querySelector(".history");
// const obj = {
//   author: "",
//   messages: [],
// };

// const getMessage = (childElement) => {
//   const element = childElement.querySelector(".text");
//   if (element !== null) return element.outerText;
// };

// const updateObject = (author, message) => {
//   obj["author"] = author;
//   obj["messages"].push(message);
// };

// const fetchUserMessages = function (desiredAuthor) {
//   const childElementsLength = container.children.length;
//   let newAuthor = "";

//   for (let i = 0; i < childElementsLength; i++) {
//     let childElement = container.children[i];
//     let authorDiv = childElement.querySelector(".from_name");

//     const isNewAuthor = childElement.className === "message default clearfix";
// const isSameAuthor =
//   childElement.className === "message default clearfix joined";

//     if (isNewAuthor) newAuthor = authorDiv.outerText;

//     if (
//       (isNewAuthor && newAuthor === desiredAuthor) ||
//       (isSameAuthor && newAuthor === desiredAuthor)
//     ) {
//       let message = getMessage(childElement);
//       updateObject(desiredAuthor, message);
//     }
//   }
//   console.log(obj);
// };

("use strict");

window.AllowBackFromHistory = false;
function CheckLocation() {
  var start = "#go_to_message";
  var hash = location.hash;
  if (hash.substr(0, start.length) == start) {
    var messageId = parseInt(hash.substr(start.length));
    if (messageId) {
      GoToMessage(messageId);
    }
  } else if (hash == "#allow_back") {
    window.AllowBackFromHistory = true;
  }
}

function ShowToast(text) {
  var container = document.createElement("div");
  container.className = "toast_container";
  var inner = container.appendChild(document.createElement("div"));
  inner.className = "toast_body";
  inner.appendChild(document.createTextNode(text));
  var appended = document.body.appendChild(container);
  setTimeout(function () {
    AddClass(appended, "toast_shown");
    setTimeout(function () {
      RemoveClass(appended, "toast_shown");
      setTimeout(function () {
        document.body.removeChild(appended);
      }, 3000);
    }, 3000);
  }, 0);
}

function ShowHashtag(tag) {
  ShowToast("This is a hashtag '#" + tag + "' link.");
  return false;
}

function ShowCashtag(tag) {
  ShowToast("This is a cashtag '$" + tag + "' link.");
  return false;
}

function ShowBotCommand(command) {
  ShowToast("This is a bot command '/" + command + "' link.");
  return false;
}

function ShowMentionName() {
  ShowToast("This is a link to a user mentioned by name.");
  return false;
}

function ShowSpoiler(target) {
  if (target.classList.contains("hidden")) {
    target.classList.toggle("hidden");
  }
}

function AddClass(element, name) {
  var current = element.className;
  var expression = new RegExp("(^|\\s)" + name + "(\\s|$)", "g");
  if (expression.test(current)) {
    return;
  }
  element.className = current + " " + name;
}

function RemoveClass(element, name) {
  var current = element.className;
  var expression = new RegExp("(^|\\s)" + name + "(\\s|$)", "");
  var match = expression.exec(current);
  while ((match = expression.exec(current)) != null) {
    if (match[1].length > 0 && match[2].length > 0) {
      current =
        current.substr(0, match.index + match[1].length) +
        current.substr(match.index + match[0].length);
    } else {
      current =
        current.substr(0, match.index) +
        current.substr(match.index + match[0].length);
    }
  }
  element.className = current;
}

function EaseOutQuad(t) {
  return t * t;
}

function EaseInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1;
}

function ScrollHeight() {
  if ("innerHeight" in window) {
    return window.innerHeight;
  } else if (document.documentElement) {
    return document.documentElement.clientHeight;
  }
  return document.body.clientHeight;
}

function ScrollTo(top, callback) {
  var html = document.documentElement;
  var current = html.scrollTop;
  var delta = top - current;
  var finish = function () {
    html.scrollTop = top;
    if (callback) {
      callback();
    }
  };
  if (!window.performance.now || delta == 0) {
    finish();
    return;
  }
  var transition = EaseOutQuad;
  var max = 300;
  if (delta < -max) {
    current = top + max;
    delta = -max;
  } else if (delta > max) {
    current = top - max;
    delta = max;
  } else {
    transition = EaseInOutQuad;
  }
  var duration = 150;
  var interval = 7;
  var time = window.performance.now();
  var animate = function () {
    var now = window.performance.now();
    if (now >= time + duration) {
      finish();
      return;
    }
    var dt = (now - time) / duration;
    html.scrollTop = Math.round(current + delta * transition(dt));
    setTimeout(animate, interval);
  };
  setTimeout(animate, interval);
}

function ScrollToElement(element, callback) {
  var header = document.getElementsByClassName("page_header")[0];
  var headerHeight = header.offsetHeight;
  var html = document.documentElement;
  var scrollHeight = ScrollHeight();
  var available = scrollHeight - headerHeight;
  var padding = 10;
  var top = element.offsetTop;
  var height = element.offsetHeight;
  var desired =
    top - Math.max((available - height) / 2, padding) - headerHeight;
  var scrollTopMax = html.offsetHeight - scrollHeight;
  ScrollTo(Math.min(desired, scrollTopMax), callback);
}

function GoToMessage(messageId) {
  var element = document.getElementById("message" + messageId);
  if (element) {
    var hash = "#go_to_message" + messageId;
    if (location.hash != hash) {
      location.hash = hash;
    }
    ScrollToElement(element, function () {
      AddClass(element, "selected");
      setTimeout(function () {
        RemoveClass(element, "selected");
      }, 1000);
    });
  } else {
    ShowToast("This message was not exported. Maybe it was deleted.");
  }
  return false;
}

function GoBack(anchor) {
  if (!window.AllowBackFromHistory) {
    return true;
  }
  history.back();
  if (!anchor || !anchor.getAttribute) {
    return true;
  }
  var destination = anchor.getAttribute("href");
  if (!destination) {
    return true;
  }
  setTimeout(function () {
    location.href = destination;
  }, 100);
  return false;
}
