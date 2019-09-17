import React,{ useEffect,useState } from 'react';
import { getPosts,searchTopics } from '../actions/posts';
import { connect } from 'react-redux';
import TopicPostsWrapper from './LoopHandler/TopicPostsWrapper';

const Topics = ({ getPosts,searchTopics,post }) => {
    useEffect(() => {
        getPosts();
    },[getPosts]);

    const [ searchValue,setSearchValue ] = useState('');
   
    const onChange = e => {
        setSearchValue(e.target.value);
    }

    const searchForTopic = searchValue => {
        if(searchValue !== '' && searchValue !== null){
            searchTopics(searchValue);
        } else {
            getPosts();
        }
    }

    return (
        <div>
            <header className="topics-header">
                <p className="app_color_font font__bold font__p p__size">
                    Tematy
                </p>
                <br/>
                <div>
                 <input type="checkbox" />
                 <p>Najnowsze</p>
                </div>
                <div>
                 <input type="checkbox" />
                 <p>Najbardziej aktywne</p>
                </div>
                <div className="search-topic-wrapper">
                 <input 
                 value={ searchValue }
                 onChange={(e) => onChange(e)}
                 type="text"
                 />
                 <button onClick={() => {
                    searchForTopic(searchValue)
                }}>
                     Search for topic
                 </button>
                </div>
            </header>
            <div className="topics-wrapper">
                <TopicPostsWrapper posts={post.posts}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts,searchTopics })(Topics);
