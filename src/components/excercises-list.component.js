import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Excercise = props =>(
    <tr>
        <td>{props.excercise.username}</td>
        <td>{props.excercise.description}</td>
        <td>{props.excercise.duration}</td>
        <td>{props.excercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/"+props.excercise._id}><button type="button" className="btn btn-info">Edit</button></Link> &nbsp;
            <button type="button" onClick={()=> {props.deleteExcercise(props.excercise._id)}} className="btn btn-danger">Delete</button>
        </td>
    </tr>
)

export default class ExcercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExcercise = this.deleteExcercise.bind(this);

        this.state = {excercises: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/excercises')
        .then(response => {
            this.setState({excercises: response.data});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    deleteExcercise(id) {
        let r = window.confirm("Are you sure you want to delete ?");
        if (r == true) {
            axios.delete('http://localhost:5000/excercises/'+id)
            .then(res =>console.log(res.data));

            this.setState({
                excercises: this.state.excercises.filter(el=>el._id !== id)
            });
        }
    }

    excerciseList() {
        return this.state.excercises.map(currentexcercise => {
            return <Excercise excercise={currentexcercise} deleteExcercise={this.deleteExcercise} key={currentexcercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Excercises</h3>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.excerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}