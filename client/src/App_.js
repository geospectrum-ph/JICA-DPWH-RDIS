const [fileShapefile, setFileShapefile] = React.useState(null);

class ViewData extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    remove_all_layers();

    if (fileShapefile !== this.props.item._id) {
      add_layer(this.props.item.file);
      setFileShapefile(this.props.item._id);
    }
    else { setFileShapefile(null); }
  }

  render() {
    return (
      <div className = "button row-center" onClick = { this.handleClick }>
        <span>{ fileShapefile === this.props.item._id ? "🙈" : "👀" }</span>
      </div>
    );
  }
}

const [fileDetails, setFileDetails] = React.useState(null);
const [fileDetailsActive, setFileDetailsActive] = React.useState(false);
const [fileEdits, setFileEdits] = React.useState(null);
const [fileEditsActive, setFileEditsActive] = React.useState(false);

React.useEffect(() => {
  setFileDetails(null);
  setFileDetailsActive(false);
  setFileEdits(null);
  setFileEditsActive(false);

  remove_all_layers();
  setFileShapefile(null);
}, [localStorage.getItem("active_context")]);

class InspectData extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    setFileDetails(this.props.item);
    setFileDetailsActive(!fileDetailsActive);
  }

  render() {
    return (
      <div className = { fileShapefile === this.props.item._id ? "button row-center" : "hidden" } onClick = { this.handleClick }>
        <span>{ fileDetailsActive ? "❌" : "📋" }</span>
      </div>
    );
  }
}

function handleEditData(edits) {
  setFileEdits(edits);
  setFileEditsActive(!fileEditsActive);
}

let parsedTokens = [];

class TagsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let words = event.target.value.split(" ");
    let word = "";

    if (event.target.value.endsWith(" ")) { words.pop(); }
    else { word = words.pop(); }

    if (words[0]) { parsedTokens.push(words[0]); }
    this.setState({ value: word });
  }

  handleSubmit(event) {
    parsedTokens.push(this.state.value);
    console.log(parsedTokens);
    parsedTokens = [];
    event.preventDefault();
  }

  render() {
    return (
      <form className = "header row-center" onSubmit = { this.handleSubmit }>
        <label>
          Tags:
          <input type = "text" value = { this.state.value } onChange = { this.handleChange } required/>
        </label>
        <input type = "submit" value = "Submit"/>
      </form>
    );
  }
}

function EditContext({ object }) {
  return (
    <div className = "column-top">
      <div className = "header row-center">
        <input id = "edit-data-name" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = { object.name ? object.name : "" } onChange = { (event) => { Object.assign(editObject, { "name": event.target.value }); } } required/>
      </div>
      <div className = "header row-center">
        <input id = "edit-data-aspect" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = { object.aspect ? object.aspect : "" } onChange = { (event) => { Object.assign(editObject, { "aspect": event.target.value }); } } required/>
      </div>
      <div className = "header row-center">
        <TagsForm/>
      </div>
    </div>
  )
}

function handleDeleteData(object) {
  remove_all_layers();
  setFileShapefile(null);

  axios
    .post("http://localhost:5000/data/delete/", {
      file: object
    })
    .then((response) => {
      if (response) {
        Object.assign(fileObject, { [object.aspect]: fileObject[object.aspect].filter((item) => (item._id !== object._id)) });
        setFileArray(() =>fileArray.filter((item) => (item._id !== object._id)));
      }
    })
    .catch((error) => {
      setErrorMessage(error);
    })
    .finally(() => {});
}