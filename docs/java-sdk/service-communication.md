---
sidebar_position: 5
description: "Find out how Restate services can send requests to each other."
---

# Service communication
A Restate service can call another service either synchronously or asynchronously.

## Synchronous calls
Synchronous calls are requests where the client waits for the response.
Restate services can perform synchronous calls in the same way as they would without Restate,
by using the service client provided in the generated Proto files.
The Restate SDK hooks into these calls and ensures that their execution is logged in the execution log.

Let's assume we have a Greeter service running next to the service we are currently developing.
This Greeter service has a method called `Greet` that takes a `Request` as input, containing a field name as a string.
To make synchronous calls to the Greeter service, do the following:

```java

```

## Asynchronous calls
To make an asynchronous call, where the client does not wait for a response, use a similar syntax to synchronous calls. Create a client using the one provided by Protobuf and call the method on that client, but wrap the call with `ctx.inBackground` as shown below:

```java

```

This ensures the call is made in the background, freeing up the client to execute other tasks.