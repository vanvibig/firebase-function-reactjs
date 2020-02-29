import React, {Component} from 'react';
import './App.css';
import {Card} from "react-bootstrap";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("/languages/all")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    console.log(result.data);
                    let newItems = [];
                    for (const [key, value] of Object.entries(result.data)) {
                        // console.log(key, value);
                        newItems.push({
                            short: key,
                            name: value.name,
                            nativeName: value.nativeName
                        })
                    }
                    console.log(newItems);
                    this.setState({
                        isLoaded: true,
                        items: newItems
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="container mt-5">
                    <ul className="tile is-ancestor is-parent is-horizontal flex-wrap">
                        {items.map(item => (
                            <Card className="tile is-child is-3 box border-white" key={item.short}>
                                <p className="title">{item.name}</p>
                                <p className="subtitle">{item.short}</p>
                                <div className="content">
                                    <p>{item.nativeName}</p>
                                </div>
                            </Card>
                        ))}
                    </ul>
                </div>
            );
        }
    }
};
