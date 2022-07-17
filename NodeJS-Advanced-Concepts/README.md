# NodeJS Advanced Concepts

## Different ways to improve Node applications:

- By taking advantage of the thread pool
    ```js
    process.env.UV_THREADPOOL_SIZE = 5;
    ```

- By creating multiple node instances using cluster mode (``cluster.fork()``) or pm2
    ```bash
    pm2 start index.js -i 0
    pm2 show index
    pm2 monit
    pm2 delete index
    ```

- By using worker threads

- By using standard libraries written in C++

- By using OS operations such as HTTPS
