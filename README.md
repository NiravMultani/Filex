
# Filex

A cloud agnostic service to handle file upload &amp; retrieve. It's to be used where you have different cloud service based on your client/project.




## Tech Stack

**Server:** Node, Express, NestJS



## Run the project

Clone the project

```bash
  git clone https://github.com/NiravMultani/Filex.git
```

Go to the project directory

```bash
  cd Filex
```

Install dependencies

```bash
  npm install
```

Copy `.env.example` file as `.env` and set the environment variables.
The file has comments which variable is used for what.

Now you can choose if you want to start server with `NestJS` or `Docker`. Choose one of the method to start server. If you just want to test APIs, start without docker.

### Start server

Run following command in terminal

```bash
 npm run start
```

### Or start server with docker

If you're familiar with Docker and want to use that then follow this method.

Build the docker image,

```bash
 docker build -t filex:latest .
```

Run the image,

 	For development,

```bash
 docker compose -f "docker-compose-prod.yml" up -d
```



## API Reference

It has 4 APIs,

- Upload file
- List all files
- Download a file
- Get pre-signed URL

Pre-signed URL is a temporary/self-expiration URL which can be given to someone for secure access.

**Find postman collection for the API in `docs/`  [directory of the project](https://github.com/NiravMultani/Filex/tree/main/docs).**

Don't forget to set Postman envrionment variables after importing the collection.
You'll need to set `BaseURL` & `Authorization`.
For local `BaseURL` will be `http://localhost:3000` and `Authorization` will be `API_KEY` that you use in `.env` file.


## Authors

- [@NiravMultani](https://www.github.com/NiravMultani)

