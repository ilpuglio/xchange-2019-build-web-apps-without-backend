import React, { Component } from "react";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: ""
    };
  }

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({
      inputField: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addItem(this.state.inputField);
    this.setState({
      inputField: ""
    });
  };

  render() {
    const { checkItem, list } = this.props;
    const { inputField } = this.state;

    return (
      <div>
        <h2>My awesome list</h2>
        <ul>
          {list.map(item => (
            <li key={item.id}>
              <input
                type="checkbox"
                name={item.id}
                id={item.id}
                checked={item.done ? "checked" : ""}
                onChange={checkItem}
              />
              <label htmlFor={item.id}>
                <span />
                {item.name}
              </label>
            </li>
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="inputField"
            placeholder="Aggiungi un item"
            value={inputField}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add item</button>
        </form>
      </div>
    );
  }
}

export default TodoList;
