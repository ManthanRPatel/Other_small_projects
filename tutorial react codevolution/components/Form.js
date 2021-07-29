import React, { Component } from 'react'

// {/* <Form /> */}

export class Form extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             username: '',
             comments: '',
             topic:'react'
        }
    }
    handlerUsername = (event) =>{
        this.setState({
            username: event.target.value
        })
    }
    handlerTopic = (event) =>{
        this.setState({
            topic: event.target.value
        })
    }
    handlerComments = (event)=>{
        this.setState({
         comments: event.target.value
        })
    }
    handlerSubmit = (event)=>{
        alert(`${this.state.username} ,, ${this.state.comments}==${this.state.topic}`)
        event.preventDefault()
    }

    render() {
        return (
            <div onSubmit={this.handlerSubmit}>
                <form>
                    <div>
                        <label>Username</label>
                        <input type='text' value={this.state.username} onChange={this.handlerUsername} />
                    </div>
                    <div>
                        <label>Comments</label>
                        <textarea value={this.state.comments} onChange={this.handlerComments}></textarea>
                    </div>
                    <div>
                        <label>Topic</label>
                        <select value={this.state.topic} onChange={this.handlerTopic}>
                            <option value="react">React</option>
                            <option value="anguler">Anguler</option>
                            <option value="vue">Vue</option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Form
