const NodeEnvironment = require("jest-environment-node");
const { v4: uuid } = require("uuid");


class CustomEnvironment extends NodeEnvironment {

  constructor(config) {
    super(config)
    this.schema = `code_schema_${uuid()}`
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`
  }

  setup() {

  }
}

module.exports = CustomEnvironment;
