import React from 'react';
import * as styles from './AccountComponent.scss';
import SessionStore from '../../reflux/stores/SessionStore';

class AccountComponent extends React.PureComponent {
    static displayName = 'AccountComponent';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <h1>Ваш аккаунт: {SessionStore.enteredEmail}</h1>
                <h2>Вам доступны средства в размере {(100000 * Math.random()).toFixed(2)} руб.</h2>
            </div>
        );
    }
}

export default AccountComponent;
