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
    npx sequelize-cli model:generate --name Schedule --attributes currentNumber:Integer, maxNumber:Integer, date:String, timeType:String, doctorId:Integer

# Model: Doctor_infor
    npx sequelize-cli model:generate --name Doctor_Infor --attributes doctorId:Integer, priceId:String, provinceId:String, paymentId:String, addressClinic:String, nameClinic:String, note:String, count:Integer

# Model: booking
    npx sequelize-cli model:generate --name Booking --attributes statusId:String, doctorId:Integer, patientId:Integer, date:String, timeType:String, token:String

# Model: Specialty
    npx sequelize-cli model:generate --name Specialty --attributes image:blob, name:string, descriptionHTML:text, descriptionMarkdown:text

# Model: Clinic
    npx sequelize-cli model:generate --name Clinic --attributes address:string, name:string, descriptionHTML:text, descriptionMarkdown:text, image:blob