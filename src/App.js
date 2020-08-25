import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// imports for axios and yup
import axios from 'axios'
import * as yup from 'yup'

// importing the registration form and schema
import Registration from './RegistrationForm'
import registrationSchema from './registrationSchema'
import LoginForm from './Components/LoginForm'

//import react router
import { Route, Switch, Link } from 'react-router-dom'

//import form components




//Default values*******************************************************
const initialFormValues = { 
  /*
 
  //text inputs
  name: '',
  email: '',
  password: '',
 
  //dropdown
  state: '',
 
  //checkbox
  terms: {
    termsAccept: false,
   
  },
  */

  // was told we only need to include username and password by our backend engineer

  ///// TEXT INPUTS /////
  username: '',
  password: '',
}
const initialFormErrors = {
  /*
  name: '',
  email: '',
  password: '',
  state: '',
  */
 username: '',
 password: '',
}

const initialUsers = []
const initialDisabled = true


function App() {
  //slices of State*******************************************************
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled) 

  ///// FORM ACTIONS /////
  const inputChange = (name, value) => {
    yup
      .reach(registrationSchema, name)  // sending over argument into registrationSchema
      .validate(value)  // checks if the value passed the requirements in registrationSchema
      .then(valid => {
        setFormErrors({
          ...formErrors, 
          [name]: '',
        })
      })  // if valid, clears the errors for the passed in arguments(the section that is being editted)
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })  // value not valid; catches that and sends in the error message in registrationSchema

    setFormValues({
      ...formValues,
      [name]: value
    })

    return null;
  }

  const submit = () => {
    return null;
  }

  useEffect(() => {

  }, [formValues])


  //Axios Request*******************************************************
  const postNewUser = newUser => {

    axios.post('https://marijuana-api.herokuapp.com/api/auth/register', newUser)
      .then(res => {
        
        setUsers([...users, res.data])
        console.log(res.data)
        
      })
      .catch(err => {
        
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
      
  }
  
  //login post request
  
  const postLoginUser = login => {
  
    axios.post('https://marijuana-api.herokuapp.com/api/auth/login', login)
      .then(res => {
        
        setUsers([...users, res.data])
        console.log(res.data)
        
      })
      .catch(err => {
        
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
      
  }

  return (
    <div>
    <Switch>
      <Route path ='/register'>
      <Registration 
        values={formValues} inputChange={inputChange} submit={submit} disabled={disabled} errors={formErrors}
      />
      </Route>
       

      <Route path = '/login'>
      <LoginForm 
        values={formValues} inputChange={inputChange} submit={submit} disabled={disabled} errors={formErrors}
      />
      </Route>

    </Switch>
    
    <Link to = "/register">Register</Link>
    <Link to = "/login"> Login</Link>
    </div>
  );
}

export default App;
