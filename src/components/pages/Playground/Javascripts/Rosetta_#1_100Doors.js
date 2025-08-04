function getFindOpeneddoors(numDoors) {
    //First I need to define the array that will hold the doors
    //Create an array of the same door count, initially all set to false (closed)
    let doors = new Array(numDoors).fill(false);
    /* Now time to loop through the doors
       At first, the loop will iterate through all the doors i.e if the numDoors is 10, it will open all the doors at first
       In the second iteration all the doors in the odd positions will be closed.
       In the third iteration all the doors in the positions that are multiples of 3 will be toggled.
       This will continue until the last iteration which will only toggle the last door.
    */
   for (let itr =1; itr<= numDoors; itr++)
   {
    for (let toggleDoor = itr-1; toggleDoor<numDoors; toggleDoor += itr){
        //Toggle the door at the current position
        doors[toggleDoor] = !doors[toggleDoor];
        //The above code will negate the current state of the door
        //If it was closed, it will be opened and vice versa
    }
   }
    //Finally return the doors array
    let openedDoors =[];
    for (let i = 0; i < doors.length; i++)
    {
        if (doors[i]){
            //Meaning if the doors are closed
            openedDoors.push(i+1);
        }
    }
    return openedDoors;
}

const queryString = new getFindOpeneddoors(100);
console.log(queryString);