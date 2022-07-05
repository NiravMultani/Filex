
# Filex

A cloud agnostic service to handle file upload &amp; retrieve. It's to be used where you have different cloud service based on your client/project.




## Tech Stack

**Server:** Node, Express, NestJS


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Copy `.env.example` file as `.env` and set the environment variables.
The file has comments which variable is used for what.

### Start server with docker
Build the docker image,

```bash
  docker build -t filex:latest
```

Run the image,

```bash
  docker run filex:latest
```

### Start server without docker

Start the server

```bash
  npm run start
```


## Deployment

### Deployment using Docker

To deploy this project run

```bash
  docker build -t filex:latest
```

### Deployment with PM2 or other process management

Build the project and have `dist` in the server with cloned project.

```bash
  npm run build
```

start the npm command in process manager,

```bash
  npm run start
```
## API Reference

Find postman collection for API here


## Authors

- [@NiravMultani](https://www.github.com/NiravMultani)

