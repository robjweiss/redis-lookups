const bluebird = require("bluebird");
const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient();
const data = require("./data");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const history = [];

app.get("/api/people/history", async (req, res) => {
    res.send(history.slice(0, 20));
});

app.get("/api/people/:id", async (req, res) => {
    id = parseInt(req.params.id);
    let entry = await client.hgetallAsync(id);

    // Not found in redis
    if (entry === null) {
        entry = await data.getById(id);

        // Not found in data
        if (entry === undefined) {
            res.status(404).send("Entry not Found");
        }
        // Found in data
        else {
            res.json(entry);
            await client.hmsetAsync(entry.id, entry);
            history.unshift(entry);
        }
    }
    // Found in redis
    else {
        // Convert id back to int after being cast to string by redis
        entry.id = parseInt(entry.id);
        res.json(entry);
        history.unshift(entry);
    }
});

app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

app.listen(3000, () => {
    console.log("Express server running on http://localhost:3000");
});