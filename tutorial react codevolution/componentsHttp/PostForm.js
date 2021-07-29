import React, { Component } from 'react'
import axios from 'axios'


{/* <PostForm /> */}

class PostForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             userId: '',
             title: '',
             body: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitHandler = (e)=>{
        e.preventDefault()
        console.log(this.state)
        axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
            .then(response =>{
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })

    }
    
    render() {
        const { userId , title , body } = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input placeHolder="userId" type="text" name="userId" value={ userId } onChange={this.handleChange} />
                    </div>
                    <div>
                        <input placeHolder="title" type="text" name="title" value={ title } onChange={this.handleChange}  />
                    </div>
                    <div>
                        <input placeHolder="body" type="text" name="body" value={ body }  onChange={this.handleChange} />
                    </div>
                    <button type="submit">Add Post</button>
                </form>
            </div>
        )
    }
}

export default PostForm
