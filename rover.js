class Rover {
   // Write code here!
   constructor(position, mode = 'NORMAL', generatorWatts = 110){
     this.position = position;
     this.mode = mode;
     this.generatorWatts = generatorWatts;
   }

   receiveMessage(message){
     let resultsArr = [];

      //creates the bool result object for each thing in the commands array in the message class
     for (let object of message.commands){
       let resultObj = {
         completed: false
       };

       if(object.commandType === 'STATUS_CHECK'){
         resultObj.roverStatus = {
           mode: this.mode,
           generatorWatts: this.generatorWatts,
           position: this.position
         }
         resultObj.completed = true;
         resultsArr.push(resultObj);

       }else if (object.commandType === 'MODE_CHANGE'){
         this.mode = object.value;
         resultObj.completed = true;

         resultsArr.push(resultObj);

       }else if (object.commandType === 'MOVE'){
         if(this.mode === 'LOW_POWER'){
           resultObj.completed = false;
           resultsArr.push(resultObj);
         }else{
           this.position = object.value;
           resultObj.completed = true;
           resultsArr.push(resultObj);
         }
       }else{
         message.name = 'Invalid Command';
         resultObj.completed = false;
         resultsArr.push(resultObj);
       }

     }
     let output = {
       message: message.name,
       results: resultsArr
     }
     return output;
   }
}

module.exports = Rover;