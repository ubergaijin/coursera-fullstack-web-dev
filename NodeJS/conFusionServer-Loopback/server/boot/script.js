'use strict';

module.exports = function(app) {
  let Customer = app.models.Customer;
  Customer.findOne({username: 'admin'}, (err, users) => {
    if (!users) {
      Customer.create([{
        username: 'admin',
        email: 'admin@confusion.net',
        password: 'password',
      }], (err, users) => {
        if (err) throw err;

        const Role = app.models.Role;
        const RoleMapping = app.models.RoleMapping;

        RoleMapping.destroyAll();

        Role.findOne({name: 'admin'}, (err, role) => {
          if (!role) {
            Role.create({name: 'admin'}, (err, role) => {
              if (err) throw err;
              role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id,
              }, (err, principal) => {
                if (err) throw err;
              });
            });
          } else {
            role.principals.create({
              principalType: RoleMapping.USER,
              principalId: users[0].id,
            }, (err, principal) => {
              if (err) throw err;
            });
          }
        });
      });
    }
  });
};
