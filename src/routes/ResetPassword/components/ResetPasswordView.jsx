import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import styles from './ResetPasswordView.scss';
import TextField from '../../../components/TextField';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import {reduxForm} from 'redux-form';
import {sendRequest} from '../modules/ResetPassword';
import {browserHistory} from 'react-router';
import {toastr} from 'react-redux-toastr';

class ResetPasswordView extends Component {

  /**
   * This function is called when the form is submitted
   * This is triggered by handleSubmit
   */
  onSubmit(data) {
    sendRequest(data).then(() => {
      toastr.success('', 'Password reset successfuly, kindly login again');
      browserHistory.push('/');
    }).catch((reason) => {
      const message = reason.response.body.error || 'something went wrong, please try again';
      toastr.error(message);
    });
  }

  render() {
    const {fields, handleSubmit, location: {query: {token}}} = this.props;
    const _self = this;
    return (
      <div styleName="reset-password-form">
        <form onSubmit={handleSubmit((data) => _self.onSubmit({...data, code: token}))}>
          <div styleName="row">
            <label htmlFor="email">Email:</label>
            <FormField {...fields.email} className="email-field">
              <TextField {...fields.email} label={'email'} />
            </FormField>
          </div>
          <div styleName="row">
            <label htmlFor="password">Password:</label>
            <FormField {...fields.password} className="password-field">
              <TextField {...fields.password} type={'password'} label={'New Password'} />
            </FormField>
          </div>

          {/* add-package end */}
          <div styleName="actions">
            <Button type="submit" color="blue">Submit</Button>
          </div>
        </form>
        {/* form end */}
      </div>
    );
  }
}

ResetPasswordView.propTypes = {
  fields: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
};

const form = reduxForm({
  form: 'resetPasswordForm',
  fields: ['password', 'email'],
  validate(values) {
    const errors = {};
    if (!values.password) {
      errors.password = 'required';
    }
    if (!values.email) {
      errors.email = 'required';
    }

    return errors;
  },
});

export default form(CSSModules(ResetPasswordView, styles));
