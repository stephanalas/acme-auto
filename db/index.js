const { Sequelize, Model, DataTypes}= require('sequelize');
const db = new  Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_car_sales_db');

class User extends Model {};
class Car extends Model {};
class Sale extends Model {};

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
},{sequelize:db, modelName:'users'});

Car.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
},{sequelize:db, modelName:'cars'});

Sale.init({
    extendedWarranty: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{sequelize:db, modelName:'sales'});

Sale.belongsTo(User);
Sale.belongsTo(Car);

const syncSeed = async() => {
    try {
        await db.sync({ force:true });
        const [ moe, lucy, larry ] = await Promise.all(['moe','lucy','larry'].map( name => User.create({name})));
        const [ford, toyota, audi] = await Promise.all(['Ford', 'Toyota', 'Audi'].map(name => Car.create({name})));
        const sales = await Promise.all([Sale.create({userId:moe.id, carId: ford.id}),
        Sale.create({userId: moe.id, carId: ford.id, extendedWarranty:true})])
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    models: {
        User, Car, Sale
    },
    db,
    syncSeed
}