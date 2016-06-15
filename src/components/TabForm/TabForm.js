import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import styles from './styles.module.css'


export class TabForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groupName : ''
        }
    }
    
    handleGroupChange (e) {
        this.setState({groupName: e.target.value});
    }

    handleSubmit (e) {
        e.preventDefault();
        let groupName = this.state.groupName.trim();
        if(!groupName) return;
        this.props.onTabSubmit({name: groupName});
        this.setState({groupName: ''});
    }

    render () {
        return (
            <div className={styles.tabForm}>          
                <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text"
                    placeholder="Add a group"
                    value={this.state.groupName}
                    onChange={this.handleGroupChange.bind(this)} />
                    <input type="submit" value="Post" />
                </form>
            </div>
        );
    }
}

export default TabForm
