import React, { Component } from 'react'

export default class NewCustomerForm extends Component {
  constructor() {
    super();
    this.state = {
      type: '',
      manufacturer: '',
      model: '',
      serialNumber: '',
      state: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`
      ${this.state.type} 
      ${this.state.manufacturer} 
      ${this.state.model}
      ${this.state.serialNumber}
      ${this.state.state}
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
        <label htmlFor="type">Typ urządzenia:</label>
          <input name="type" type="text" value={this.state.firstName} onChange={this.handleChange} />
        
        <label htmlFor="manufacturer">Producent:</label>
          <input name="manufacturer" type="text" value={this.state.lastName} onChange={this.handleChange} />
        
        <label htmlFor="model">Model:</label>
          <input name="model" type="text" value={this.state.lastName} onChange={this.handleChange} />

        <label htmlFor="serialNumber">Numer seryjny:</label>
          <input name="serialNumber" type="text" value={this.state.lastName} onChange={this.handleChange} />
        
        <label htmlFor="state">Stan:</label>
          <input name="state" type="text" value={this.state.lastName} onChange={this.handleChange} />
          
        <input className="btn" type="submit" value="Submit" />
      </form>
    )
  }
}
