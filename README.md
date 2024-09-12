# poll-server-check

An npm package that checks if a server is running or if it's down. If the server is down, it repeatedly sends a check API to the backend to wake it up and displays toast notifications of the current status.

## Installation

To use the `poll-server-check` package, you first need to install it via npm:

```npm install poll-server-check```

## Usage

### Client-Side

In your client-side code, you can use the `` function to monitor your server's availability and display notifications. While using ``, ensure you pass the backend URL and place it inside a `useEffect` hook if you are working in a React environment.

```
import { useEffect } from 'react';
import { clientCheck } from 'poll-server-check';

function MyComponent(){
  useEffect(() => {
    clientCheck(process.env.BACKEND_URL);
  }, []);
}
```

### Server-Side

In your server-side code, use the `serverPoll` function to set up an endpoint for API check. While using `serverPoll`, ensure you pass an Express application instance like `app` or `server`.

```
import express from 'express';
import { serverPoll } from 'poll-server-check';

const app = express();
serverPoll(app);
```

## API

### `clientCheck(BackendUrl)`

- **BackendUrl**: The base URL of your backend server.
  
### `serverPoll(app)`

- **app**: The Express app instance to which the API check route will be added.

## Contribution

If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes. For bug reports or feature requests, please open an issue in the [GitHub repository](https://github.com/Ansari-Irfan-360/poll-server-check/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by [Ansari Mohammad Irfan](https://www.linkedin.com/in/ansari-irfan-/).
