import React, { Component } from 'react'

export default class NewCustomerForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      street: '',
      postCode: '',
      city: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`
      ${this.state.firstName} 
      ${this.state.lastName} 
      ${this.state.phoneNumber}
      ${this.state.street}
      ${this.state.postCode}
      ${this.state.city}
    `);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form className="new-repair-form" onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">Imię:</label>
          <input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange} />
        
        <label htmlFor="lastName">Nazwisko:</label>
          <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} />
        
        <label htmlFor="phoneNumber">Nr kontaktowy:</label>
          <input name="phoneNumber" type="text" value={this.state.lastName} onChange={this.handleChange} />

        <label htmlFor="street">Ulica:</label>
          <input name="street" type="text" value={this.state.lastName} onChange={this.handleChange} />
        
        <label htmlFor="postCode">Kod Pocztowy:</label>
          <input name="postCode" type="text" value={this.state.lastName} onChange={this.handleChange} />
        
        <label htmlFor="city">Miasto:</label>
          <input name="city" type="text" value={this.state.lastName} onChange={this.handleChange} />
        
        <input className="btn" type="submit" value="Submit" />
      </form>
    )
  }
}
