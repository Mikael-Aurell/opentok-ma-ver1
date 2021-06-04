const apiKey = '45828062';
const sessionId = '1_MX40NTgyODA2Mn5-MTYyMjcyMjA4NzAwNX5Ub285dy9YME41dU5OemFjQ2xEU2xWUWJ-UH4';
const token = 'T1==cGFydG5lcl9pZD00NTgyODA2MiZzaWc9YjEzZmU1MWMzOGVjZjk0MzYwNWY0ZmY2MmQyZDU2MmIyMmE1MWY4MDpzZXNzaW9uX2lkPTFfTVg0ME5UZ3lPREEyTW41LU1UWXlNamN5TWpBNE56QXdOWDVVYjI4NWR5OVlNRTQxZFU1T2VtRmpRMnhFVTJ4V1VXSi1VSDQmY3JlYXRlX3RpbWU9MTYyMjcyMjIwMyZub25jZT0wLjU5NzE2NTk1NTMwNjgxMzImcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYyMjgwODYwMw==';

initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
        alert(error.message);
    }
}

function initializeSession() {
    let session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream

    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%',
            frameRate: 30,
            enableStereo: true,
            insertDefaultUI: true,
            showControls: true

        }, handleError);
    });

    // Create a publisher
    let publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        frameRate: 30,
        enableStereo: true,
        insertDefaultUI: true,
        showControls: true
    }, handleError);

    // Connect to the session
    session.connect(token, function(error) {
        // If the connection is successful, publish to the session
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });
}