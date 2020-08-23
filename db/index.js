const Sequelize = require('sequelize');
const {STRING} = Sequelize;
//Change below for deployment
const acme = new Sequelize('postgres://localhost/acme', {
    //logging: false
});
const faker = require('faker');

const Dept = acme.define('department', {
    deptName: {
        type: STRING,
        //allowNull: false,
    },
})

const Employee = acme.define('employees', {
    employName: {
        type: STRING,
        //allowNull: false
    },
    department: {
        type: STRING,
        //allowNull: true
    }
})

Dept.hasMany(Employee)

const syncAndSeed = async()=> {
    await acme.sync({force: true})
    const promises = []
    const morePromises = []
    while(promises.length < 5){
        promises.push(
            Dept.create({
                deptName: faker.commerce.department(),
            })
        )
    }
    const depts = await Promise.all(promises)
    while(morePromises.length < 50){
        morePromises.push(
            Employee.create({
                employName: faker.name.firstName(),
                //Stopping point: department cannot be a array. need this to be a string
                //department: depts[Math.floor(Math.random() * depts.length)]
            })
        )
    }
    await Promise.all(morePromises)
}

module.exports = {
    models: {
        Dept,
        Employee
    },
    syncAndSeed
}