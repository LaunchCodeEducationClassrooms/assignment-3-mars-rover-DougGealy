class Message {
   constructor(name, commandsArray) {
     this.name = name;
     if (!name) {
       throw Error("Message name required.");
     }
     this.commands = commandsArray;
   }
}

module.exports = Message;