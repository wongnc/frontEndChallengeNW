import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './profile.css';
import genderTypes from './../helpers/constants';
import Field from './Field/Field'; 

function getFieldData(key) {
  let data = {
    classlist: {
      label: 'profile-form__row',
      field: 'profile-form__field',
      select: 'profile-form__select'
    },
    title: key, 
    content: key === 'gender' ? genderTypes.map(gender => ({value: gender})): [{value: key}] 
  };

  return data;
}
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      statusClass: ''
    };
    
    this.fieldsData = Object.keys(Profile.defaultProps.profile).map(getFieldData);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  
  removeInvalidClasses(requiredFields) {
    requiredFields.forEach((element) => {
      element.classList.remove('profile-form__field--invalid');
    });
  }
  
  addInvalidClassesAndValidationMessage(emptyFields) {
    const emptyFieldNames = emptyFields.map(element => element.name);

    this.setState({ message: `${emptyFieldNames.join(', ').capitalize()} can not be blank`, 
    statusClass: 'profile-form__message--invalid' })
  }

  showFormSuccess() {
    this.setState({ message: 'Form submitted!' })
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const requiredFields = [
      event.target.name,
      event.target.gender,
      event.target.email,
      event.target.phone
    ];
    const emptyFields = requiredFields.filter(element => (
      !Boolean(element.value)
    ));

    this.removeInvalidClasses(requiredFields);
    this.setState({ message: '', statusClass: '' });
    
    if (emptyFields.length) {
      this.addInvalidClassesAndValidationMessage(emptyFields);

      emptyFields.forEach(element => {
        element.classList.add('profile-form__field--invalid');
      });

    } else {
      this.showFormSuccess();

      console.log({
        name: event.target.name.value,
        gender: event.target.gender.value,
        email: event.target.email.value,
        phone: event.target.phone.value
      });
    }

  }

  render() {
    return (
      <div className='app'>
        <h1>{this.props.name}</h1>
        <form onSubmit={this.handleFormSubmit}>
          {this.fieldsData.map((d, i) => <Field key={i} data={Object.assign(d, {default: this.props.profile[d.title] || ''})} />)}
          <div className='profile-form__row'>
            <input type='submit' value='Save' onChange={this.handleFormSubmit} />
          </div>
          <div className='profile-form__row'>
            <span className={`profile-form__message ${this.state.statusClass}`}> {this.state.message} </span>
          </div>
        </form>
      </div>
    );
  }
}

Profile.defaultProps = {
  profile: {
    name: '',
    gender: '',
    email: '',
    phone: ''
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }),
  name: PropTypes.string.isRequired
}

export default Profile;
