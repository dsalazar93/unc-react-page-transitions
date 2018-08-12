import React from 'react';

/* eslint-disable import/no-extraneous-dependencies */
import Modernizr from 'modernizr';
/* eslint-enable import/no-extraneous-dependencies */

import './assets/animations.css';

const styles = {
  perspective: {
    height: '100%',
    perspective: '1200px',
    position: 'relative',
    width: '100%'
  }
};

const animations = {
  max: 67
};

class PageTransitions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      prevPage: undefined,
      isAnimating: false
    };

    // Without state
    this.animcursor = 0;
    this.endCurrPage = false;
    this.endPrevPage = false;
    this.support = Modernizr.cssanimations;

    // Bindings
    this.nextPage = this.nextPage.bind(this);
    this.animcursorCheck = this.animcursorCheck.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
  }

  /**
   * Return the next cursor of the animation
   *
   * @return {int} Cursor of the animation
   * @see ./assets/animations.js
   */
  animcursorCheck() {
    if (this.animcursor > animations.max - 1) {
      this.animcursor = 0;
    } else if (this.animcursor < 0) {
      this.animcursor = animations.max;
    }

    this.animcursor += 1;
    return this.animcursor;
  }

  /**
   * Fired function when the page css animation is ended.
   * This function is passed to the <Page/> component.
   *
   * @param  {boolean} endCurrPage Indicates if the current page was the one
   *                               that ended the animation.
   * @param  {boolean} endPrevPage Indicate if the previous page was the one
   *                               that ended the animation.
   */
  onAnimationEnd(endCurrPage, endPrevPage) {
    let animEnd = false;

    if (endCurrPage) {
      this.endCurrPage = endCurrPage;

      if (this.endPrevPage) {
        animEnd = true;
      }
    }

    if (endPrevPage) {
      this.endPrevPage = endPrevPage;

      if (this.endCurrPage) {
        animEnd = true;
      }
    }

    if (animEnd) {
      this.endCurrPage = false;
      this.endPrevPage = false;

      this.setState({
        isAnimating: false
      });
    }
  }

  /**
   * Fires the transition of pages.
   */
  nextPage() {
    if (this.state.isAnimating) return false;

    this.setState({
      isAnimating: true,
      prevPage: this.state.currentPage,
      currentPage: ((this.state.currentPage + 1)
        < this.props.children.length) ? (this.state.currentPage + 1) : 0
    });

    return true;
  }

  /**
   * Render function
   */
  render() {
    const children = Array.isArray(this.props.children)
      ? this.props.children : [this.props.children];

    return (
      <div className="ptr-perspective" style={styles.perspective}>
        {children.map((child, idx) => {
          const cloneElement = React.cloneElement(child, {
            key: idx,
            animcursor: this.animcursor,
            isCurrentPage: (idx === this.state.currentPage),
            isPrevPage: (this.state.isAnimating && (idx === this.state.prevPage)),
            isAnimating: this.state.isAnimating,
            onAnimationEnd: this.onAnimationEnd
          });

          return cloneElement;
        })}
      </div>
    );
  }
}

export default PageTransitions;
