//Test for Employee
const Employee = require('../lib/Employee');
const employee = new employee ('Chase','122','chasejames12@gmail.com');

test('test if we can get the constructor values for the employee object', () => {
expect(employee.name).toBe('Chase');
expect(employee.id).toBe('122');
expect(employee.email).toBe('chasejames12@gmail.com');

});

test('test if we can get the name from the getName () method',() =>{
    expect(employee.getName()).toBe('Chase');
});

test('test if we can get the id from the getId () method',()=> {
    expect(employee.getId()).toBe('122');

});

test('test if we can get the email from the getEmail() method', ()=>{
    expect(employee.getEmail()).toBe('chasejames12@gmail.com')
});

test('test if we can get the role from the getRole() method',()=>{
    expect(employee.getRole()).toBe('Employee');
});