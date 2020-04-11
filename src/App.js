import React, { Component } from "react";
import logo from "./logo.svg";
import SearchExampleStandard from "./Search";
import "./App.css";
import { Table, Search, Grid, Header, Segment } from "semantic-ui-react";
const _ = require("underscore");

export const tableData = [
  {
    username: "richard",
    email: "richard@sample.com",
    age: 20,
  },
  {
    username: "michael",
    email: "michael@sample.com",
    age: 23,
  },
  {
    username: "diego",
    email: "diego@sample.com",
    age: 24,
  },
  {
    username: "rene",
    email: "rene@sample.com",
    age: 22,
  },
  {
    username: "agustin",
    email: "agustin@sample.com",
    age: 32,
  },
];

export default class App extends Component {
  state = {
    column: null,
    data: tableData,
    direction: null,
    isLoading: false,
    results: [],
    value: "",
  };

  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending",
      });
      return;
    }
    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(this.state);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(tableData, isMatch),
      });
    }, 300);
  };

  render() {
    const { column, data, direction, isLoading, value, results } = this.state;

    return (
      <div>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "username" ? direction : null}
                onClick={this.handleSort("username")}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "email" ? direction : null}
                onClick={this.handleSort("email")}
              >
                Age
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "age" ? direction : null}
                onClick={this.handleSort("age")}
              >
                Gender
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ username, email, age }) => (
              <Table.Row key={username}>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{age}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <SearchExampleStandard />
      </div>
    );
  }
}
