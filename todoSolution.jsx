class TodoApp extends React.Component {
  state = {
    tasks: ["task 1", "task 2", "task 3", "task 4", "task 5"],
  };
//   initializing the state of a component in React. It defines an initial state with 
//   a property tasks that holds an array of tasks.

// Here's what the code does:

// It defines the state property within the component's class.
// The state object has a single property called tasks.
// The tasks property is initialized with an array of strings, representing 
// a list of tasks. In this case, the array contains five tasks: "task 1", "task 2", "task 3", "task 4", 
// and "task 5".
// This initial state will be used to render the component's UI and can be updated using the setState method.

// Initializing state allows the component to keep track of and manage its
//  data. In this case, the component starts with a predefined set of tasks, 
//  but this state can be updated later based on user interactions or other factors.

  handleSubmit = (task) => {
    this.setState({ tasks: [...this.state.tasks, task] });
  };
  // In summary, handleSubmit is responsible for adding a new task to the existing list of 
  // tasks in the component's state. It creates a new array by combining the existing tasks
  //  with the new task, and then updates the component's state with the new array of tasks.

  // TODO: Add handleDelete to remove the index from the state
  handleDelete = (index) => {
    const newArr = [...this.state.tasks];
    newArr.splice(index, 1);
    this.setState({ tasks: newArr });
  };
//   "index" is a parameter of the handleDelete function. 
//   It represents the index of the element in the tasks array that needs to be deleted.

// The code creates a copy of the tasks array using the spread operator [...this.state.tasks] 
// and assigns it to the newArr variable. Then, the splice method is used to remove the element 
// at the specified index from the newArr. The second argument 1 indicates that only one element 
// should be removed.

// Finally, the setState method is called to update the tasks state with the modified newArr, 
// effectively removing the element from the array.

  render() {
    return (
      <div className="wrapper">
        <div className="card frame">
          <SubmitForm onFormSubmit={this.handleSubmit} />
          <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
        </div>
      </div>
    );
  }
}
// render method of a React component. It defines the structure and layout of the component's UI.
//  Here's what it does:

// It returns JSX code, which represents the structure of the component's UI.
// The JSX code is enclosed within a <div> element with the class name "wrapper". 
// This serves as a container for the component's content.
// Inside the wrapper <div>, there is another <div> element with the class name 
// "card frame". This represents a card-like container for the component's form and list elements.
// Within the card frame, there are two child components:
// <SubmitForm />: This is a custom component, presumably representing a form for 
// submitting tasks or input data. It is passed the onFormSubmit prop, which refers 
// to a function handleSubmit defined in the component's class. This allows the form 
// component to trigger the handleSubmit function when the form is submitted.
// <TodoList />: This is another custom component, likely responsible for rendering a 
// list of tasks. It is passed two props: tasks, which refers to an array of tasks stored 
// in the component's state, and onDelete, which refers to a function handleDelete defined 
// in the component's class. This allows the list component to access the tasks and trigger the 
// handleDelete function when a task deletion is requested.
// Overall, the render method defines the structure and layout of the component's UI, 
// including the form and list components, and handles the passing of relevant props and 
// event handlers to these child components.

class SubmitForm extends React.Component {
  state = { item: "" };

  handleSubmit = (e) => {
    e.preventDefault();
//     The code e.preventDefault(); is typically used in event 
//     handlers in JavaScript, including React event handlers.

// When an event is triggered, such as a form submission or a link click, 
// the default behavior of the event is typically performed by the browser. 
// For example, when a form is submitted, the default behavior is to refresh the page.

// By calling e.preventDefault(); within an event handler, you can prevent 
// the default behavior from occurring. It stops the event from performing its default action.
    if (this.state.item === "") return;
    this.props.onFormSubmit(this.state.item);
    this.setState({ item: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Enter Item"
          value={this.state.item}
          onChange={(e) => this.setState({ item: e.target.value })}
        />
        <button className="button">Add</button>
      </form>
    );
  }
}

const TodoList = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return (
      <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
    );
  });
  return <div className="list-wrapper">{todos}</div>;
};

const Todo = (props) => {
  return (
    <div id={props.id * 10} className="list-item test-item">
      {props.content}
      <button
        id={props.id}
        className="delete is-pulled-right"
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        X
      </button>
    </div>
  );
};

ReactDOM.render(React.createElement(TodoApp), document.getElementById("root"));
