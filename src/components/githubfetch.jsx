import React, { Component } from 'react';
import RenderListItem from './RenderListItem';

class GithubAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            response: {},
            counter: 0
        }
    }

    componentDidMount() {
        this.getLocalCount()
    }

    getLocalCount = async () => {
        let result = localStorage.getItem("count");
        console.log("🚀 ~ file: githubfetch.jsx ~ line 20 ~ GithubAPI ~ getLocalCount= ~ result", result);
        this.setState({
            ...this.state,
            counter: Number(result)
        })
    }


    handleChange = (event) => {
        let cloneState = { ...this.state }
        cloneState.input = event.target.value
        this.setState(cloneState)
    }


    getInfo = () => {
        if (this.state.input !== "") {
            fetch(`https://api.github.com/users/${this.state.input}`)
                .then(response => response.json())
                .then(response => {
                    let cloneState = { ...this.state }
                    cloneState.response = response


                    if (Object.keys(response).length > 5) {
                        // cloneState.counter = parseInt(localStorage.getItem("count"))

                        cloneState.counter += 1

                    }
                    localStorage.setItem("count", String(cloneState.counter))
                    this.setState(cloneState)

                    console.log(cloneState.counter)

                })
        }

    }


    render() {
        const { response } = this.state
        const mystyle = {
            display: 'flex',
            flexDirection: "row-reverse",
            // justifyContent: "space-between"
            paddingRight: "100px",
            paddingTop: "10px"
        }
        const yourstyle = {
            display: 'flex',
            flexDirection: "row-reverse",
            backgroundColor: "grey",
            width: "fit-content"
        }
        return (
            <div>
                <div>
                    <input onChange={this.handleChange} onload={this.onload} />
                    <button onClick={this.getInfo}>
                        Submit
                    </button>
                    <div style={yourstyle}> <span style={mystyle}> Total Searches=> {this.state.counter}</span></div>
                </div>
                <div >
                    {
                        Object.keys(response).map((eachItem, index) => {
                            return (
                                <RenderListItem
                                    key={index}
                                    label={eachItem}
                                    value={response[eachItem]}
                                />

                            )
                        })
                    }
                </div>
            </div>

        );

    }
}

export default GithubAPI;

