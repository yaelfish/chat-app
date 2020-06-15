import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Input.css';

const initialValues = {
  message: ''
};

const validationSchema = Yup.object({
  message: Yup.string()
              .required('Required')
              .min(5)
              .max(22)
              .matches(/^[a-zA-Z .!?"-]+$/, { message: "English only", excludeEmptyString: true })
});

const Input = ({ sendMessage }) => (

  <Formik
    initialValues= {initialValues}
    onSubmit={(values, { resetForm }) => {
      sendMessage(values.message);
      resetForm();
    }}
    validationSchema={validationSchema}
  >
    <Form className="mesagges-form">
      <div className="form-control form-control-message">
        <Field
          placeholder="Type a message..."
          name="message"
          id="message"
          className="input"
          type="text"
          autoComplete="off"
        />
        <ErrorMessage name="message">
          {errorMsg => <div className="error">{errorMsg}</div>}
        </ErrorMessage>
      </div>
      <button className="send-button" type="submit">Send</button>
    </Form>
  </Formik>
)

export default Input;