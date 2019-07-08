import React, { Component } from "react";
import firebase from "./utils/firebase";
import TodoList from "./components/TodoList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount = () => {
    const db = firebase.firestore().collection("todo");

    db.orderBy("timestamp").onSnapshot(snap => {
      const list = [];

      snap.forEach(doc => {
        const element = {
          id: doc.id,
          ...doc.data()
        };
        list.push(element);
      });

      this.setState({
        list: list
      });
    });
  };

  checkItem = event => {
    const { name, checked } = event.target;
    const db = firebase
      .firestore()
      .collection("todo")
      .doc(name);

    db.update({
      done: checked
    });
  };

  addItem = newItem => {
    const db = firebase.firestore().collection("todo");
    db.add({
      name: newItem,
      done: false,
      timestamp: new Date().getTime()
    });
  };

  render() {
    return (
      <div className="wrapper">
        <h1>Show me how</h1>
        <TodoList
          list={this.state.list}
          checkItem={this.checkItem}
          addItem={this.addItem}
        />
      </div>
    );
  }
}

export default App;
