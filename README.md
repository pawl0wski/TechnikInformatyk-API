![Technik Informatyk API](https://user-images.githubusercontent.com/59766830/171714336-e0e5a66b-bd34-4060-8443-75e92d2ff172.jpg)

# Technik informatyk API

Rest api for my [Technik Informatyk](https://play.google.com/store/apps/details?id=jebok.itexam) application.
The task of this project is to provide questions and exams to the app.
It also allows me to supervise the quality of questions thanks to the possibility of reporting data inaccuracies.

## Environment variables

| Name            | What it does                                                                                                                          |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------|
| SERVER_PORT     | Define on which port the application should listen. (Default. 3000)                                                                   |
| ENABLE_SNAPSHOT | Specify whether the API should generate a snapshot folder. You should set the location in your HTTP server e.g. nginx to this folder. |
| SNAPSHOT_PATH   | Folder where content will be generated for snapshots.                                                                                 |
| DB_USER         | Database username.                                                                                                                    |
| DB_PASS         | Database password.                                                                                                                    |
| DB_HOST         | Database location.                                                                                                                    |
| DB_DRIVER       | Driver for Sequelize. Only mariadb is installed with this project.                                                                    |
| REDIS_PREFIX    | Prefix added to the key in redis.                                                                                                     |
| REDIS_IP        | IP of Redis instance.                                                                                                                 |                                                                                                      |
