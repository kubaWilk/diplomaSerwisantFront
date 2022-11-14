import React, { Component } from "react";

export default class NewCustomerForm extends Component {
  constructor() {
    super();
    this.state = {
      choice: "",
      type: "",
      manufacturer: "",
      model: "",
      serialNumber: "",
      deviceState: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (!(typeof this.props.deviceInfo.choice === "undefined")) {
      this.initiateStateWithDeviceInfo();
    }
  }

  componentWillUnmount() {
    this.saveStateToDeviceInfo();
  }

  render() {
    return (
      <form className="new-repair-form" onSubmit={this.handleSubmit}>
        <div className="user-choice">
          <input
            type="radio"
            value="add"
            name="choice"
            onChange={this.handleChange}
            checked={this.state.choice === "add"}
          />{" "}
          Dodaj nowe urządzenie
          <input
            type="radio"
            value="search"
            name="choice"
            onChange={this.handleChange}
            checked={this.state.choice === "search"}
          />{" "}
          Wyszukaj urządzenia
        </div>

        <label htmlFor="type">Typ urządzenia:</label>
        <input
          name="type"
          type="text"
          value={this.state.type}
          onChange={this.handleChange}
        />

        <label htmlFor="manufacturer">Producent:</label>
        <input
          name="manufacturer"
          type="text"
          value={this.state.manufacturer}
          onChange={this.handleChange}
        />

        <label htmlFor="model">Model:</label>
        <input
          name="model"
          type="text"
          value={this.state.model}
          onChange={this.handleChange}
        />

        <label htmlFor="serialNumber">Numer seryjny:</label>
        <input
          name="serialNumber"
          type="text"
          value={this.state.serialNumber}
          onChange={this.handleChange}
        />

        <label htmlFor="deviceState">Stan:</label>
        <input
          name="deviceState"
          type="text"
          value={this.state.deviceState}
          onChange={this.handleChange}
        />

        <button type="submit" className="btn" onClick={this.handleSubmit}>
          Wyślij
        </button>
      </form>
    );
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.saveStateToDeviceInfo();
  }

  initiateStateWithDeviceInfo() {
    this.setState({
      choice: this.props.deviceInfo.choice,
      type: this.props.deviceInfo.type,
      manufacturer: this.props.deviceInfo.manufacturer,
      model: this.props.deviceInfo.model,
      serialNumber: this.props.deviceInfo.serialNumber,
      deviceState: this.props.deviceInfo.deviceState,
    });
  }

  saveStateToDeviceInfo() {
    this.props.deviceInfoSetter({
      choice: this.state.choice,
      type: this.state.type,
      manufacturer: this.state.manufacturer,
      model: this.state.model,
      serialNumber: this.state.serialNumber,
      deviceState: this.state.deviceState,
    });
  }
}
