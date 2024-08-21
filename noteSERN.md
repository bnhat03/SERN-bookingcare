# Run migratation
    npx sequelize-cli db:migrate
    
# Model, migration
- npx sequelize-cli model:generate --name User --attributes email:string, password:string, firstName:string, lastName:string, address:string,phonenumber:string,gender:string,roleId:string,positionId:string,image:blob


# Xóa define {freeTableName: true} trong config.json của sequelize

# Model: AllCode
    npx sequelize-cli model:generate --name AllCode --attributes type:string, keyMap:string, valueEn:string, valueVi:string

# Model: mardown
    npx sequelize-cli model:generate --name Markdown --attributes contentHTML:text, contentMarkdown:text, description:text, doctorId:Integer, specialtyId: Integer, clinicId: Integer

# Model: schedule
    npx sequelize-cli model:generate --name Schedule --attributes currentNumber:Integer, maxNumber:Integer, date:Date, timeType:String, doctorId:Integer
