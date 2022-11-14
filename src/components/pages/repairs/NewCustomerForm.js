import React, { Component } from "react";

export default class NewCustomerForm extends Component {
  constructor() {
    super();

    this.state = {
      choice: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      street: "",
      postCode: "",
      city: "",
    };

    this.moveStateToCustomerInfo = this.moveStateToCustomerInfo.bind(this);
    this.initiateStateWithCustomerInfo =
      this.initiateStateWithCustomerInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.choice === "add") {
      this.moveStateToCustomerInfo();
    } else if (this.state.choice === "search") {
      console.log("PREPARE SEARCHING CUSTOMERS"); //TODO: PREPARE SEARCHING CUSTOMERS
    }
  }

  componentWillUnmount() {
    this.moveStateToCustomerInfo();
  }

  componentWillMount() {
    if (!(typeof this.props.customerInfo.choice === "undefined")) {
      this.initiateStateWithCustomerInfo();
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
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
          Nowy klient
          <input
            type="radio"
            value="search"
            name="choice"
            onChange={this.handleChange}
            checked={this.state.choice === "search"}
          />{" "}
          Wyszukaj klientów
        </div>

        <label htmlFor="firstName">Imię:</label>
        <input
          name="firstName"
          type="text"
          value={this.state.firstName}
          onChange={this.handleChange}
        />

        <label htmlFor="lastName">Nazwisko:</label>
        <input
          name="lastName"
          type="text"
          value={this.state.lastName}
          onChange={this.handleChange}
        />

        <label htmlFor="phoneNumber">Nr kontaktowy:</label>
        <input
          name="phoneNumber"
          type="text"
          value={this.state.phoneNumber}
          onChange={this.handleChange}
        />

        <label htmlFor="street">Ulica:</label>
        <input
          name="street"
          type="text"
          value={this.state.street}
          onChange={this.handleChange}
        />

        <label htmlFor="postCode">Kod pocztowy:</label>
        <input
          name="postCode"
          type="text"
          value={this.state.postCode}
          onChange={this.handleChange}
        />

        <label htmlFor="city">Miasto:</label>
        <input
          name="city"
          type="text"
          value={this.state.city}
          onChange={this.handleChange}
        />

        <button type="submit" className="btn" onClick={this.handleSubmit}>
          Wyślij
        </button>
      </form>
    );
  }

  moveStateToCustomerInfo() {
    this.props.customerInfoSetter({
      choice: this.state.choice,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      street: this.state.street,
      postCode: this.state.postCode,
      city: this.state.city,
    });
  }

  initiateStateWithCustomerInfo() {
    this.setState({
      choice: this.props.customerInfo.choice,
      firstName: this.props.customerInfo.firstName,
      lastName: this.props.customerInfo.lastName,
      phoneNumber: this.props.customerInfo.phoneNumber,
      street: this.props.customerInfo.street,
      postCode: this.props.customerInfo.postCode,
      city: this.props.customerInfo.city,
    });
  }
}
