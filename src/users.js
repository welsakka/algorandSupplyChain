import React from 'react';
import Button from '@material-ui/core/Button';

class Users extends React.Component {
    render() {
        return (
            <div align="center">
                <Button variant="contained" color="primary">
                    <h1></h1>
                </Button>
            </div>
        );
    }
}

class allUsers extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users : 0,
        }
    }
}
export default Users