class LRUCache {
  constructor() {
    if (!LRUCache.instance) {
      this.cache = new Map();
      this.enable = {
        value: false,
        time: null,
      };
      this.expiryTime = 60 * 60 * 1000;
      LRUCache.instance = this;
    }

    return LRUCache.instance;
  }

  push(key, value) {
    const currentTime = Date.now();
    this.enable.value = true;
    this.enable.time = currentTime;
    this.cache.set(key, { value, timestamp: currentTime });
  }

  retrieve(key, generatedDate, uniqueId) {
    const currentTime = Date.now();

    if (
      this.enable.value &&
      currentTime - this.enable.time <= this.expiryTime
    ) {
      const cacheItem = this.cache.get(key);
      console.log(cacheItem, "cacheItem during retrieve");

      if (cacheItem) {
        if (generatedDate < cacheItem.timestamp) {
          if (currentTime - cacheItem.timestamp <= this.expiryTime) {
            console.log("currentTime date is");
            if (cacheItem.value !== uniqueId) {
              console.log("Cache item does not match uniqueId.");
              return cacheItem.value;
            }
          } else {
            this.cache.delete(key);
          }
        }
      }
    } else {
      this.enable.value = false;
      console.log("Cache is disabled or expired.");
    }

    if (this.cache.size > 0) {
      this.removeExpiredValues();
    }

    return null;
  }

  removeExpiredValues() {
    const currentTime = Date.now();
    for (const [key, cacheItem] of this.cache.entries()) {
      if (currentTime - cacheItem.timestamp > this.expiryTime) {
        console.log("Deleting expired cache item:", key);
        this.cache.delete(key);
      }
    }
  }
}

const cacheInstance = new LRUCache();

module.exports = cacheInstance;
