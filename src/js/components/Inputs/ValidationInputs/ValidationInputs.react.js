import React from 'react';
import * as styles from './ValidationInputs.scss';

class TextInput extends React.PureComponent {
    static displayName = 'TextInput';

    constructor(props) {
        super(props);

        this.state = {
            valid: true
        };
    }

    static propTypes = {
        labelClassName: React.PropTypes.string,
        inputClassName: React.PropTypes.string,
        value: React.PropTypes.string
    };

    onBlur = (event) => {
        this.validate(event.target.value);
    };

    validate = (value) => {
        this.setState({valid: value && value.trim() !== ''});
    };

    render() {
        const {labelClassName, inputClassName, label, value, type, required} = this.props;
        let resultClassName = null;
        if (inputClassName) {
            resultClassName = inputClassName;
        } else if (this.state.valid) {
            resultClassName = styles.inputContainer;
        } else {
            resultClassName = styles.inputContainerInvalid;
        }
        return (
            <div>
                {label ? <label className={labelClassName}><p>{label}</p></label> : null}
                <input
                    ref="input"
                    type={type ? type : 'text'}
                    required={required ? required : false}
                    className={resultClassName}
                    onBlur={this.onBlur}
                    defaultValue={value}
                />
            </div>
        );
    }
}
class PasswordInput extends React.Component {
    static displayName = 'PasswordInput';
    constructor(props) {
        super(props);
    }

    static propTypes = {
        labelClassName: React.PropTypes.string,
        inputClassName: React.PropTypes.string
    };

    render() {
        const {labelClassName, inputClassName, label} = this.props;
        return (
            <div>
                {label ? <label className={labelClassName}><p>{label}</p></label> : null}
                <input
                    ref="input"
                    type="password"
                    className={inputClassName ? inputClassName : styles.inputContainer}
                />
            </div>
        );
    }
}
export default TextInput;
export {TextInput, PasswordInput};
