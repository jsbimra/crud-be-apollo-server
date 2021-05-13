const { RESTDataSource } = require("apollo-datasource-rest");

class EmpCrudAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_API_ENDPOINT;
  }

  async getEmployees() {
    console.log("getEmployees  invoked!");
    const response = await this.get("operation");
    // console.log(response, Array.isArray(response));
    return Array.isArray(response)
      ? response.map((employee) => this.employeeReducer(employee))
      : [];
  }

  async getEmployeeById({ employeeId }) {
    const response = await this.get("opertaion", {
      emp_id: employeeId
    });
    return this.employeeReducer(response[0]);
  }

  employeeReducer(employee) {
    // console.log("employee reducer datasource ", { employee });
    return {
      emp_id: employee.emp_id || 0,
      name: employee.name,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      designation: employee.designation,
      image: employee.image || ""
    };
  }

  employeeAddReducer(employee) {
    // console.log("employee add reducer datasource ", { employee });

    return {
      emp_id: employee.emp_id || 0,
      name: employee.name,
      message: employee.message
    };
  }

  async addEmployee({ name, phoneNumber, email, designation, image }) {
    console.clear();
    console.log({ name, phoneNumber, email, designation, image });
    const response = await this.post("operation/add", {
      name,
      phoneNumber,
      email,
      designation,
      image
    });
    console.log("response =>>> ", response);
    return this.employeeAddReducer(response);
  }

  employeeUpdateReducer(employee) {
    // console.log("employee update reducer datasource ", { employee });
    return {
      emp_id: employee.emp_id || 0,
      name: employee.name,
      message: employee.message
    };
  }

  async updateEmployee({
    emp_id,
    name,
    email,
    phoneNumber,
    designation,
    image
  }) {
    console.log({ emp_id, name });
    const response = await this.post("operation/update", {
      emp_id,
      name,
      email,
      phoneNumber,
      designation,
      image
    });
    // console.log('response =>>> ', response)
    return this.employeeUpdateReducer(response);
  }

  async deleteEmployee({ emp_id }) {
    console.log({ emp_id });
    const response = await this.post("operation/delete", { emp_id });
    // console.log("response =>>> ", response);
    return response;
  }
}

module.exports = EmpCrudAPI;
