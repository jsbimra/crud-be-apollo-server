const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here

  type Employee {
    emp_id: ID!
    name: String!
    phoneNumber: String!
    email: String!
    designation: String
    image: String
  }

  type AddEmployeeReturn {
    emp_id: ID!
    name: String
  }

  # Input type for add new employee
  input AddEmployee {
    name: String!
    phoneNumber: String!
    email: String!
    designation: String
    image: String
  }

  input UpdateEmployee {
    emp_id: ID!
    name: String!
    email: String!
    phoneNumber: String!
    designation: String
    image: String
  }

  # Input type for delete employee
  input DeleteEmployee {
    emp_id: ID!
  }

  type DeleteEmployeeReturn {
    message: String
  }

  type Query {
    employees: [Employee]!
    employeeById(emp_id: ID!): Employee
  }

  type Mutation {
    updateEmployee(employee: UpdateEmployee!): AddEmployeeReturn
    addEmployee(employee: AddEmployee!): AddEmployeeReturn!
    deleteEmployee(employee: DeleteEmployee!): DeleteEmployeeReturn!
  }
`;

module.exports = typeDefs;
