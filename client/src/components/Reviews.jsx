import React, { useState } from 'react';
import ReviewItem from './ReviewItem.jsx';
import styled from 'styled-components';

const Headline = styled.h1`
  font-family: 'PT Sans';
  font-size: 1.3em;
  margin-top: 0;
  margin-bottom: 20px;
`;

const Select = styled.select`
  font-family: 'PT Sans';
  font-size: .7em;
  background-color: #f1f2f2;
  padding: 1px 40px 1px 3px;
  margin-bottom: 22px;
  margin-top: 30px;
  border-radius: 5px;
`;

const NoReviews = styled.h2`
  font-family: 'PT Sans';
  font-size: 1em;
`;

const Reviews = ({reviews}) => {
  const location = 'us';
  const [sortBy, setSortBy] = useState('top');

  const topReviews = [...reviews].sort((a, b) => (a.helpful < b.helpful) ? 1 : -1);
  const mostRecent = [...reviews].sort((a, b) => {
    return (new Date(b.review_date) > new Date(a.review_date)) ? 1 : -1;
  });

  return (
    <div style={{marginBottom: '50px'}}>
      {reviews.length ?
        <div>
        {location === 'us' && <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="top">Top reviews</option>
          <option value="recent">Most recent</option>
        </Select>}
        <Headline>Top reviews from {location === 'us' ? 'the United States' : 'other countries'}</Headline>
        {/* I'm passing the index as the key because this somehow solved the sorting issue */}
        {(sortBy === 'top' ? topReviews : mostRecent).map((review, index) => <ReviewItem key={index} review={review}/>)}
      </div>
      :
      <NoReviews>
        No reviews from {location === 'us' ? 'the United States' : 'other countries'}
      </NoReviews>}
    </div>
  );
};

export default Reviews;

