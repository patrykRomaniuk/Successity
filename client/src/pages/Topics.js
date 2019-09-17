import React,{ useEffect,useState } from 'react';
import { getPosts,getLatestPosts,searchTopics } from '../actions/posts';
import { connect } from 'react-redux';
import TopicPostsWrapper from './LoopHandler/TopicPostsWrapper';

const Topics = ({ getPosts,getLatestPosts,searchTopics,post }) => {
    useEffect(() => {
        getLatestPosts();
    },[getLatestPosts]);

    const [ searchValue,setSearchValue ] = useState('');
    const [ isOldest,setOldest ] = useState(false);
    const [ isLatest,setLatest ] = useState(true);

    const onChange = e => {
        setSearchValue(e.target.value);
    }

    const searchForTopic = searchValue => {
        if(searchValue !== '' && searchValue !== null){
            searchTopics(searchValue);
        } else {
            getLatestPosts();
        }
    }

    const changeToOldestPosts = () => {
        setOldest(!isOldest);
        setLatest(false);
    }

    const changeToLatestPosts = () => {
        setLatest(!isLatest);
    }

    return (
        <div>
            <header className="topics-header">
                <p className="app_color_font font__bold font__p p__size">
                    Tematy
                </p>
                <br/>
                <div>
                 <input 
                 type="checkbox"
                  onChange={() => changeToOldestPosts()}
                  />
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

export default connect(mapStateToProps, { getPosts,searchTopics,getLatestPosts })(Topics);
