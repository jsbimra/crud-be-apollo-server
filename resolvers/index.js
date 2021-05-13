module.exports = {
  Query: {
    // All three resolver functions assign their first positional argument (parent) to the variable _ as a convention to indicate that they don't use its value.
    // The launches and me functions assign their second positional argument (args) to __ for the same reason.
    // (The launch function does use the args argument, however, because our schema's launch field takes an id argument.)
    // All three resolver functions do use the third positional argument (context). Specifically, they destructure it to access the dataSources we defined.
    // None of the resolver functions includes the fourth positional argument (info), because they don't use it and there's no other need to include it.

    employees: (_, __, { dataSources }) => {
      console.log({employees: dataSources.empCrudAPI.getEmployees()});
      return dataSources.empCrudAPI.getEmployees()
    },
    employeeById: (_, { id }, { dataSources }) =>
      dataSources.empCrudAPI.getEmployeeById(id)
  },
  Mutation: {
    addEmployee: async (_, { employee }, { dataSources }) =>
      dataSources.empCrudAPI.addEmployee(employee),
    updateEmployee: async (_, { employee }, { dataSources }) =>
      dataSources.empCrudAPI.updateEmployee(employee),
    deleteEmployee: async (_, { employee }, { dataSources }) =>
      dataSources.empCrudAPI.deleteEmployee(employee)
  }
};
