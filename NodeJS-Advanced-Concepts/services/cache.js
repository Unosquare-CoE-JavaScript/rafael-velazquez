const mongoose = require('mongoose');

const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');

client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');    

    return this;
}

mongoose.Query.prototype.exec = async function() {
    if (!this.useCache) {
        console.log('No caching');
        return exec.apply(this, arguments);
    }

    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    );

    const cacheValue = await client.hget(this.hashKey, key);
    if (cacheValue) {
        console.log('Retrieve from redis');

        const doc = JSON.parse(cacheValue);
        
        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }

    console.log('Retrieve from mongo');

    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);

    return result;
}

module.exports = {
    clearHash(hashKey) {
        console.log('Deleting key', hashKey);
        client.del(JSON.stringify(hashKey));
    }
}
