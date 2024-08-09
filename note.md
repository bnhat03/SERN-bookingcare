- npm init
    => Tạo file package.json: Cách nodejs quản lý tất cả thư viện, cách chạy dự án nodejs
- npm install --save-exact express dotenv body-parser ejs
    +> express: @4.17.2
    +> dotenv: @10.0.0
    +> body-parser: 1.19.1
    +> ejs: @3.1.6

- npm install --save-exact @babel/core @babel/node @babel/preset-env nodemon
    +> core: @7.15.4
    +> node: @7.15.4
    +> preset-env: @7.15.4 
    +> nodemon: @2.0.15

- "start": "nodemon --exec babel-node src/server.js"
    => Thêm vô package.json

- npm start
- BS5: 
    <!-- CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Animation -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

- npm install --save-exact mysql2
    +> @2.3.3

- npm install --save-exact bcryptjs
    +> @2.4.: Hash password

- npm install --save-exact bluebird
    +>@3.7.2

- npm install --save-exact sequelize sequelize-cli
    +>@6.13.0
    +>@6.3.0

- node_modules/.bin/sequelize init
    => Tạo các file như trong .sequelizerc

# models/migrations
- npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
    => Tạo model
        +> name: the name of the model;
        +> attributes: the list of model attributes.
    => Có thể sửa các trường (attribute)
- npx sequelize-cli db:migrate
    => Running Migrations => Thêm model -> table vào DB
# seeders
- npx sequelize-cli seed:generate --name demo-user
    => Thêm file trong seeder -> Cần thay đổi
- npx sequelize-cli db:seed:all
    => Fake data ánh xạ vào db

# Tạo models/migrations
## users
- npx sequelize-cli model:generate --name User --attributes email:string,password:string,username:string,address:string,sex:string,phone:string,groupId:integer

## roles
npx sequelize-cli model:generate --name Role --attributes url:string,description:string

## projects
npx sequelize-cli model:generate --name Project --attributes name:string,description:string,startDate:string,customerId:integer

## project_user
npx sequelize-cli model:generate --name ProjectUser --attributes projectId:integer,userId:integer

## groups
npx sequelize-cli model:generate --name Group --attributes name:string,description:string

## group_role
npx sequelize-cli model:generate --name GroupRole --attributes groupId:integer,roleId:integer

# video 65:
- npm install jsonwebtoken
    +> @8.5.1
- npm install cookie-parser
    +>@1.4.6

- npm install lodash
    => Bên React có rồi