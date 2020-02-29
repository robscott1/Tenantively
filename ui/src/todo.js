import React from "react";
import { Input, List } from "antd";

import "antd/dist/antd.css"
import SearchBox from "antd-search-box";

export default class Todo extends React.Component {
    constructor() {
        super();

        this.state = {
            todos: []

        };
    }

    handlePressEnter = e => {
        const todo = {
            index: this.state.todos.length,
            content: e.target.value
        };

        const newTodos = this.state.todos.concat(todo);

        this.setState({
            todos: newTodos
        });

        e.target.value = "";
    };

  render() {
    return (
      <div className="todoContainer">
        <h1>Tenantively! </h1>

        <Input
          placeholder = "'Fasho' -Jay"
          onPressEnter={this.handlePressEnter}
          />
          <List
          locale={{ emptyText: "No todo items" }}
          dataSource={this.state.todos}
          renderItem={item => (
            <List.Item>{item.content}</List.Item>
          )}
        />
      </div>
    );
  }
  //     constructor(props) {
  //       super(props);
  //       this.state = {
  //           value: undefined,
  //           keyword: undefined,
  //       };
  //   }
  //
  //   handleChange(value) {
  //       this.setState({ value });
  //   }
  //
  //   handleSearch(value) {
  //       this.setState({ keyword: value});
  //   }
  //   render() {
  //       const { value, keyword } = this.state;
  //       return (
  //           <div style={{ margin: 32, width: 300 }}>
  //           <div>Current value: {value}</div>
  //           <div>Press `Enter/Return` to search: {keyword}</div>
  //           <div>
  //             <SearchBox
  //               value={value}
  //               placeholder="Type the keyword"
  //               onChange={this.handleChange.bind(this)}
  //               onSearch={this.handleSearch.bind(this)}
  //             />
  //           </div>
  //           </div>
  //       );
  //   }
}