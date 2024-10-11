export default {
  // Holds the array of posts fetched from RSS feeds
  posts: [],

  // URL of the RSS feed
  rssUrl: "",

  // Maximum number of columns in the grid layout
  maxCols: 2,

  // CSS class for the grid column layout
  colClass: "col-sm-6",

  // Layout style for displaying posts (either "grid" or "slider")
  layoutStyle: "grid",

  // Holds the rows of posts for display in a grid
  postRows: [],

  // The currently selected post (if any)
  currentPost: null,

  // Style for how the post is displayed (e.g., "modal", "inline", "external")
  postStyle: "modal",

  // CSS class for the button used in the UI
  buttonClass: "",

  // Text for the "Read More" link
  readMore: "Read more",

  // Offset value used for pagination or scrolling
  offset: 0,
};
