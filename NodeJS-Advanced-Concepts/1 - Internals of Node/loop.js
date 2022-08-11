// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasjs, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
    // Check 1: any pending setTimeout, setInterval, setInmediate

    // Check 2: any pending OS task, like a server listening to port

    // Check 3: any pending long running operations, like fs module

    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// Each cycle is a "tick"
while (shouldContinue()) {
    // Step 1: Node looks at pendingTimers and sees if any functions are ready to be called. settimeout, setInterval.

    // Step 2: Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks

    // Step 3: Node pauses execution. Continues when:
    //          - a new pendingOSTasks is done
    //          - a new pendingOperations is done
    //          - a timer is about to complete

    // Step 4: Look at pendingTimers. Call any setInmediate.

    // Step 5: Handle any 'close' events
}


// exit back to terminal

