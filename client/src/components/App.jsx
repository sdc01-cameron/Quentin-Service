import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Ratings from './Ratings.jsx';
import Reviews from './Reviews.jsx';
import GlobalFonts from '../fonts/fonts.js';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Loading = styled.h1`
  font-family: 'PT Sans';
  font-size: 1.3em;
`;

const LeaveReview = styled.h3`
  font-family: 'PT Sans';
  font-weight: 400;
  margin-top: 75px;
`;

const ReviewButton = styled.button`
  font-family: "PT Sans";
  background-image: linear-gradient(rgb(244, 226, 181), rgb(240, 195, 80));
  border: 0;
  border-radius: 3px;
  padding: 5px 15px;
  cursor: pointer;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      pageLoaded: false
    };
  }

  componentDidMount() {
    const randomProductId = Math.floor(Math.random() * 100) + 1;
    axios.get(`/api/products/${randomProductId}/reviews`)
      .then(results => {
        this.setState({
          reviews: results.data,
          pageLoaded: true
        });
      });
  }

  render() {
    const reviews = this.state.reviews;
    console.log(reviews);
    const unitedStates = [];
    const international = [];
    for (let review of reviews) {
      if (review.country === 'the United States') {
        unitedStates.push(review);
      } else {
        international.push(review);
      }
    }

    const ratings = reviews.map(review => review.overall_rating);
    return (
      <div>
        {!this.state.pageLoaded ? <Loading>Loading reviews...</Loading> :
        <Wrapper>
          <GlobalFonts />
          <Ratings ratings={ratings} />
          {reviews.length ?
          <div style={{display: 'block'}}>
            <Reviews reviews={unitedStates} location={'us'}/>
            <Reviews reviews={international} location={'intl'}/>
          </div>
          :
          <div>
            <LeaveReview>Share your thoughts with other customers</LeaveReview>
            <ReviewButton>Write a customer review</ReviewButton>
          </div>}
        </Wrapper>
        }
      </div>
    );
  }
}

export default App;