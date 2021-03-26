const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);
  let testCommandObj1 = new Command('MODE_CHANGE', 'LOW_POWER');
  let testCommandObj2 = new Command('STATUS_CHECK');
  let testCommandObjsArr = [testCommandObj1, testCommandObj2]
  let testMessage = new Message('testName', testCommandObjsArr);

//test for in loop of command array
for(let command in commands){
  console.log(command)
};

console.log(response);
  // 7 tests here!
it("constructor sets position and default values for mode and generatorWatts", function(){
  let roverOne = new Rover(98382);
  expect(roverOne.position).toEqual(98382);
  expect(roverOne.mode).toEqual('NORMAL');
  expect(roverOne.generatorWatts).toEqual(110);
});

// Test 8 pass
it("response returned by receiveMessage contains name of message", function(){
  let roverOne = new Rover(8888)
  // roverOne.receiveMessage(testMessage);
  let response = roverOne.receiveMessage(testMessage).message;

  expect(response).toEqual('testName')
});

it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
  let roverOne = new Rover(4000);
  let numOfCommands = roverOne.receiveMessage(testMessage).results.length;

  expect(numOfCommands).toEqual(testCommandObjsArr.length);
});

it("responds correctly to status check command", function(){
  let statusCheckMessage = new Message('check status', [testCommandObj2]);
  let roverOne = new Rover(87382098, 'LOW_POWER', 25);
  let resultsObj0 = roverOne.receiveMessage(statusCheckMessage).results[0];

  expect(resultsObj0.completed).toEqual(true);
  expect(resultsObj0.roverStatus.mode).toEqual('LOW_POWER')
  expect(resultsObj0.roverStatus.generatorWatts).toEqual(25)
  expect(resultsObj0.roverStatus.position).toEqual(87382098)
});

it("responds correctly to mode change command", function(){
  let roverOne = new Rover(87382098, 'NORMAL', 110);
  let modeChangeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
  let commandsArr = [modeChangeCommand];
  let modeChangeMessage = new Message('change mode to low power.', commandsArr);
  let commandCompletedTest = roverOne.receiveMessage(modeChangeMessage).results[0].completed;

  expect(commandCompletedTest).toEqual(true);
  expect(roverOne.mode).toEqual('LOW_POWER');

});

it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
  let roverOne = new Rover(123, 'LOW_POWER', 5);
  let moveLowPowerCommand = new Command('MOVE', 123);
  let commandsArr = [moveLowPowerCommand];
  let moveLowPowerMessage = new Message('LOW_POWER, negative on MOVE', commandsArr);
  let moveRejectedTest = roverOne.receiveMessage(moveLowPowerMessage).results[0].completed;

  expect(moveRejectedTest).toEqual(false);
  expect(roverOne.position).toEqual(123)
});

it("responds with position for move command", function(){
  let roverOne = new Rover(12347, 'NORMAL');
  let moveCommand = new Command('MOVE', 67890);
  let commandsArr = [moveCommand];
  let moveMessage = new Message('move to 67890.', commandsArr);
  let moveTest = roverOne.receiveMessage(moveMessage).results[0].completed;

  expect(moveTest).toEqual(true)
  expect(roverOne.position).toEqual(67890)
});

});



//it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    //expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  //});