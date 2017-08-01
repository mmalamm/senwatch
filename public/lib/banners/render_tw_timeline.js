const renderTwTimeline = (num, twAcc) => {
  let embedCode = `
    <a class="twitter-timeline"
      href="https://twitter.com/${twAcc}"
      data-tweet-limit="5">
      Tweets by ${twAcc}
    </a>
    <script async
      src="https://platform.twitter.com/widgets.js"
      charset="utf-8"></script>
  `;

  return $(`#twitter-timeline-container-${num}`).append($(embedCode));
};

export default renderTwTimeline;
