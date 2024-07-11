
## To Do App

Implemented using nodejs

Basic CRUD ToDo app API with Node.js and Express
The admin can CRUD users and also use Todo
The admin creates the user
The user can use the app after login only
The user can CRUD todo tasks


## API Endpoints


### For Todo
* GET /tasks : To view all the to-do tasks
* GET /tasks/id : To view the specific task using id
* POST /tasks : To add new to-do task
* PUT /tasks/id : To update the existing task
* DELETE /tasks/id : To delete the task using id

### For User CRUD by admin
* POST /users/signup : To create user
* GET /users : To view all user 
* GET /users/id : To get user by id
* PUT /users/id : To update user by id
* DELETE /users/id : To delete users by id

### For login
* POST /auth/login : To login













## Run Locally

Clone the project

```bash
  git clone https://github.com/Nis13/TODO-App.git
```

Go to the project directory

```bash
  cd To-Do-assignment
```

Install dependencies

```bash
  npm install
```

Run the project
```bash
  npm start
```


## Docker Image

https://hub.docker.com/repository/docker/nisthabajra/todo_app/general
