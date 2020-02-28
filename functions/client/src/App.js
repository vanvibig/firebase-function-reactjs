import React, {Component} from 'react';
import './App.css';

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
                <ul>
                    {items.map(item => (
                        <li key={item.name}>
                            {item.short} | {item.name} | {item.nativeName}
                        </li>
                    ))}
                </ul>
            );
        }

        // return (
        //     <div className="App">
        //         <header className="App-header">
        //             <p>
        //                 Edit <code>src/App.js</code> and save to reload.
        //             </p>
        //             <a
        //                 className="App-link"
        //                 href="https://reactjs.org"
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //             >
        //                 Learn React
        //             </a>
        //         </header>
        //     </div>
        // );
    }
}
