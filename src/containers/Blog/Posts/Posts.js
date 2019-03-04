import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

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
        this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push('/posts/' + id);
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
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}></Route>
            </div>
        )
    }
}

export default Posts;