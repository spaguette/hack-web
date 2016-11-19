import React from 'react';
import * as styles from './MainComponent.scss';

class MainComponent extends React.PureComponent {
    static displayName = 'MainComponent';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                {this.props.children}
            </div>
        );
    }
}

export default MainComponent;
