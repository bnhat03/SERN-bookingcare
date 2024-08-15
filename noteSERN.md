# Model, migration
- npx sequelize-cli model:generate --name User --attributes email:string, password:string, firstName:string, lastName:string, address:string,phonenumber:string,gender:string,roleId:string,positionId:string,image:blob

- npx sequelize-cli db:migrate

# Xóa define {freeTableName: true} trong config.json của sequelize

# Model: AllCode
    npx sequelize-cli model:generate --name AllCode --attributes type:string, keyMap:string, valueEn:string, valueVi:string