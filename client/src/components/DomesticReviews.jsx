import React, { Component } from 'react';
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

class DomesticReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.domesticReviews,
      topReviews: [],
      mostRecent: [],
      filterBySelect: 'top',
      filterByKeyword: false,
      sortByStars: this.props.sortByStars || false
    };

    this.toggleSelectFilter = this.toggleSelectFilter.bind(this);
  }

  componentWillMount() {
    const top = [...this.state.reviews].sort((a, b) => (a.helpful < b.helpful) ? 1 : -1);
    const recent = [...this.state.reviews].sort((a, b) => {
      return (new Date(b.review_date) > new Date(a.review_date)) ? 1 : -1;
    });
    this.setState({
      topReviews: top,
      mostRecent: recent
    });
  }

  toggleSelectFilter(topOrRecent) {
    this.setState({
      filterBySelect: topOrRecent
    });
  }

  render() {
    let {reviews, topReviews, mostRecent, filterBySelect} = this.state;
    let filteredReviews = filterBySelect === 'top' ? topReviews : mostRecent;

    return (
      <div style={{marginBottom: '50px'}}>
        {reviews.length ?
          <div>
          <Select value={filterBySelect} onChange={(e) => this.toggleSelectFilter(e.target.value)}>
            <option value="top">Top reviews</option>
            <option value="recent">Most recent</option>
          </Select>
          <Headline>Top reviews from the United States</Headline>
          {filteredReviews.map((review, index) => <ReviewItem key={index} review={review}/>)}
        </div>
        :
        <NoReviews>No reviews from the United States</NoReviews>}
      </div>
    );
  }
};

export default DomesticReviews;

