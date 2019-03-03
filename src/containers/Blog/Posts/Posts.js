import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('/posts')
        .then(response => {
            const posts = response.data.splice(0, 4);
            const updatedPosts = posts.map(post => {
                return{
                    ...post,
                    author: 'Max'
                }    
            });
            this.setState({posts: updatedPosts});
        })
        .catch(error => {
            console.log(error);
            // this.setState({error: true});
        })
    }

    postSelectedHandler = (id) => {
         console.log(id)
      //  this.setState({selectedPostId: id});
    }

    render(){
        let posts = <p>Something went wrong!</p>;
        
        if(!this.state.error){
            posts = this.state.posts.map((post, index) => {
                return(
                    <Link key={index} to={post.id}>
                        <Post 
                            key={post.id} 
                            title={post.title} 
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}
                        />
                    </Link>
                )
            })    
        }

        return(
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;