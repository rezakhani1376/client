import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component<any> {
    renderError({ error, touched }: any) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }: any) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues: any) => {
        this.props.onSubmit(formValues);
    };

    render(): React.ReactNode {
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter Title"
                />
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Enter Description"
                />
                <button className="ui button primary">submit</button>
            </form>
        );
    }
}

const validate = (formValues: any) => {
    const errors: any = {};
    if (!formValues.title) {
        errors.title = 'you must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'you must enter a description';
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate,
})(StreamForm);
