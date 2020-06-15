import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import './Join.css';

const initialValues = {
  name: ''
};

const validationSchema = Yup.object({
  name: Yup.string()
          .required('Required')
          .min(6)
          .max(10)
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/, { message: "Minimum of one lowercase, one uppercase and one digit, english only", excludeEmptyString: true })
});

export default function SignIn() {

  const history = useHistory();

  const onSubmit = values => {
    history.push(`/chat?name=${values.name}`);
  }
  
  return (
    <div className="join-container">
      <div className="form-container">
        <h1 className="heading">Join Chat</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="form-control">
              <Field
                placeholder="Name between 6-10 characters"
                name="name"
                id="name"
                className="join-input"
                type="text"
                autoComplete="off"
              />
              <ErrorMessage name="name" >
                {errorMsg => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <button 
              className="button-join" 
              type="submit"
            >
              Next
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
