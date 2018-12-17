import React, {Component} from 'react';

function SuggestedTopics ({topics}) {

  const topicList = topics.map(topic => {
    if (topic.urlToImage) {
      return (
        <li className= "topic-item">
          <img className="url-image" src={topic.urlToImage}/>
          <a className="url-link" href={topic.url} target="_blank">{topic.title}</a>
        </li>
      )
    }
  })
  return (
    <div>
      <h5 className="subtitle">What's Going On: <a className="credit" href='https://newsapi.org'> Powered by News API</a></h5>
      <div className="topic-list">
        <ul>
          {topicList}
        </ul>
      </div>
    </div>
  );
}

export default SuggestedTopics
