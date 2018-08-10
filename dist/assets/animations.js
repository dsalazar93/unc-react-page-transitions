"use strict";

module.exports = {
  classes: [{
    outClass: 'pt-page-moveToLeft',
    inClass: 'pt-page-moveFromRight'
  }, {
    outClass: 'pt-page-moveToRight',
    inClass: 'pt-page-moveFromLeft'
  }, {
    outClass: 'pt-page-moveToTop',
    inClass: 'pt-page-moveFromBottom'
  }, {
    outClass: 'pt-page-moveToBottom',
    inClass: 'pt-page-moveFromTop'
  }, {
    outClass: 'pt-page-fade',
    inClass: 'pt-page-moveFromRight pt-page-ontop'
  }, {
    outClass: 'pt-page-fade',
    inClass: 'pt-page-moveFromLeft pt-page-ontop'
  }, {
    outClass: 'pt-page-fade',
    inClass: 'pt-page-moveFromBottom pt-page-ontop'
  }, {
    outClass: 'pt-page-fade',
    inClass: 'pt-page-moveFromTop pt-page-ontop'
  }, {
    outClass: 'pt-page-moveToLeftFade',
    inClass: 'pt-page-moveFromRightFade'
  }, {
    outClass: 'pt-page-moveToRightFade',
    inClass: 'pt-page-moveFromLeftFade'
  }, {
    outClass: 'pt-page-moveToTopFade',
    inClass: 'pt-page-moveFromBottomFade'
  }, {
    outClass: 'pt-page-moveToBottomFade',
    inClass: 'pt-page-moveFromTopFade'
  }, {
    outClass: 'pt-page-moveToLeftEasing pt-page-ontop',
    inClass: 'pt-page-moveFromRight'
  }, {
    outClass: 'pt-page-moveToRightEasing pt-page-ontop',
    inClass: 'pt-page-moveFromLeft'
  }, {
    outClass: 'pt-page-moveToTopEasing pt-page-ontop',
    inClass: 'pt-page-moveFromBottom'
  }, {
    outClass: 'pt-page-moveToBottomEasing pt-page-ontop',
    inClass: 'pt-page-moveFromTop'
  }, {
    outClass: 'pt-page-scaleDown',
    inClass: 'pt-page-moveFromRight pt-page-ontop'
  }, {
    outClass: 'pt-page-scaleDown',
    inClass: 'pt-page-moveFromLeft pt-page-ontop'
  }, {
    outClass: 'pt-page-scaleDown',
    inClass: 'pt-page-moveFromBottom pt-page-ontop'
  }, {
    outClass: 'pt-page-scaleDown',
    inClass: 'pt-page-moveFromTop pt-page-ontop'
  }, {
    outClass: 'pt-page-scaleDown',
    inClass: 'pt-page-scaleUpDown pt-page-delay300'
  }, {
    outClass: 'pt-page-scaleDownUp',
    inClass: 'pt-page-scaleUp pt-page-delay300'
  }, {
    outClass: 'pt-page-moveToLeft pt-page-ontop',
    inClass: 'pt-page-scaleUp'
  }, {
    outClass: 'pt-page-moveToRight pt-page-ontop',
    inClass: 'pt-page-scaleUp'
  }, {
    outClass: 'pt-page-moveToTop pt-page-ontop',
    inClass: 'pt-page-scaleUp'
  }, {
    outClass: 'pt-page-moveToBottom pt-page-ontop',
    inClass: 'pt-page-scaleUp'
  }, {
    outClass: 'pt-page-scaleDownCenter',
    inClass: 'pt-page-scaleUpCenter pt-page-delay400'
  }, {
    outClass: 'pt-page-rotateRightSideFirst',
    inClass: 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop'
  }, {
    outClass: 'pt-page-rotateLeftSideFirst',
    inClass: 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop'
  }, {
    outClass: 'pt-page-rotateTopSideFirst',
    inClass: 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop'
  }, {
    outClass: 'pt-page-rotateBottomSideFirst',
    inClass: 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop'
  }, {
    outClass: 'pt-page-flipOutRight',
    inClass: 'pt-page-flipInLeft pt-page-delay500'
  }, {
    outClass: 'pt-page-flipOutLeft',
    inClass: 'pt-page-flipInRight pt-page-delay500'
  }, {
    outClass: 'pt-page-flipOutTop',
    inClass: 'pt-page-flipInBottom pt-page-delay500'
  }, {
    outClass: 'pt-page-flipOutBottom',
    inClass: 'pt-page-flipInTop pt-page-delay500'
  }, {
    outClass: 'pt-page-rotateFall pt-page-ontop',
    inClass: 'pt-page-scaleUp'
  }, {
    outClass: 'pt-page-rotateOutNewspaper',
    inClass: 'pt-page-rotateInNewspaper pt-page-delay500'
  }, {
    outClass: 'pt-page-rotatePushLeft',
    inClass: 'pt-page-moveFromRight'
  }, {
    outClass: 'pt-page-rotatePushRight',
    inClass: 'pt-page-moveFromLeft'
  }, {
    outClass: 'pt-page-rotatePushTop',
    inClass: 'pt-page-moveFromBottom'
  }, {
    outClass: 'pt-page-rotatePushBottom',
    inClass: 'pt-page-moveFromTop'
  }, {
    outClass: 'pt-page-rotatePushLeft',
    inClass: 'pt-page-rotatePullRight pt-page-delay180'
  }, {
    outClass: 'pt-page-rotatePushRight',
    inClass: 'pt-page-rotatePullLeft pt-page-delay180'
  }, {
    outClass: 'pt-page-rotatePushTop',
    inClass: 'pt-page-rotatePullBottom pt-page-delay180'
  }, {
    outClass: 'pt-page-rotatePushBottom',
    inClass: 'pt-page-rotatePullTop pt-page-delay180'
  }, {
    outClass: 'pt-page-rotateFoldLeft',
    inClass: 'pt-page-moveFromRightFade'
  }, {
    outClass: 'pt-page-rotateFoldRight',
    inClass: 'pt-page-moveFromLeftFade'
  }, {
    outClass: 'pt-page-rotateFoldTop',
    inClass: 'pt-page-moveFromBottomFade'
  }, {
    outClass: 'pt-page-rotateFoldBottom',
    inClass: 'pt-page-moveFromTopFade'
  }, {
    outClass: 'pt-page-moveToRightFade',
    inClass: 'pt-page-rotateUnfoldLeft'
  }, {
    outClass: 'pt-page-moveToLeftFade',
    inClass: 'pt-page-rotateUnfoldRight'
  }, {
    outClass: 'pt-page-moveToBottomFade',
    inClass: 'pt-page-rotateUnfoldTop'
  }, {
    outClass: 'pt-page-moveToTopFade',
    inClass: 'pt-page-rotateUnfoldBottom'
  }, {
    outClass: 'pt-page-rotateRoomLeftOut pt-page-ontop',
    inClass: 'pt-page-rotateRoomLeftIn'
  }, {
    outClass: 'pt-page-rotateRoomRightOut pt-page-ontop',
    inClass: 'pt-page-rotateRoomRightIn'
  }, {
    outClass: 'pt-page-rotateRoomTopOut pt-page-ontop',
    inClass: 'pt-page-rotateRoomTopIn'
  }, {
    outClass: 'pt-page-rotateRoomBottomOut pt-page-ontop',
    inClass: 'pt-page-rotateRoomBottomIn'
  }, {
    outClass: 'pt-page-rotateCubeLeftOut pt-page-ontop',
    inClass: 'pt-page-rotateCubeLeftIn'
  }, {
    outClass: 'pt-page-rotateCubeRightOut pt-page-ontop',
    inClass: 'pt-page-rotateCubeRightIn'
  }, {
    outClass: 'pt-page-rotateCubeTopOut pt-page-ontop',
    inClass: 'pt-page-rotateCubeTopIn'
  }, {
    outClass: 'pt-page-rotateCubeBottomOut pt-page-ontop',
    inClass: 'pt-page-rotateCubeBottomIn'
  }, {
    outClass: 'pt-page-rotateCarouselLeftOut pt-page-ontop',
    inClass: 'pt-page-rotateCarouselLeftIn'
  }, {
    outClass: 'pt-page-rotateCarouselRightOut pt-page-ontop',
    inClass: 'pt-page-rotateCarouselRightIn'
  }, {
    outClass: 'pt-page-rotateCarouselTopOut pt-page-ontop',
    inClass: 'pt-page-rotateCarouselTopIn'
  }, {
    outClass: 'pt-page-rotateCarouselBottomOut pt-page-ontop',
    inClass: 'pt-page-rotateCarouselBottomIn'
  }, {
    outClass: 'pt-page-rotateSidesOut',
    inClass: 'pt-page-rotateSidesIn pt-page-delay200'
  }, {
    outClass: 'pt-page-rotateSlideOut',
    inClass: 'pt-page-rotateSlideIn'
  }]
};