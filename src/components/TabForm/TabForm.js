import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import styles from './styles.module.css'
import { InputGroup, FormControl, Button } from 'react-bootstrap'


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
                    <InputGroup>
                    <FormControl type="text"
                        value={this.state.groupName}
                        placeholder="Add a group"
                        onChange={this.handleGroupChange.bind(this)}
                        />
                        <InputGroup.Button>
                            <Button bsStyle="primary" type="submit" value="Post">
                                Add
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </form>
            </div>
        );
    }
}

export default TabForm
