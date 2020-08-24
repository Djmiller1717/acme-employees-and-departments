const Sequelize = require('sequelize');
const {STRING} = Sequelize;
//Change below for deployment
const acme = new Sequelize('postgres://localhost/acme', {
    logging: false
});
const faker = require('faker');

const Dept = acme.define('department', {
    deptName: {
        type: STRING,
        allowNull: false,
    },
})

const Employee = acme.define('employee', {
    employName: {
        type: STRING,
        allowNull: false
    },
})

//Employee.belongsTo(Dept)
Dept.hasMany(Employee)




const syncAndSeed = async()=> {
    await acme.sync({force: true})
    const promises = []
    const morePromises = []
    promises.push(
        Dept.create({
            deptName: 'Employees Without Department'
        })
    )
    while(promises.length < 6){
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
                departmentId: depts[Math.floor((Math.random() * (depts.length - 1)) + 1)].id,
                // department: depts.reduce(function(name, dept){
                //         if (this.departmentId === dept.id){
                //             name = dept.deptName
                //         }
                //         return name
                // }, '')
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