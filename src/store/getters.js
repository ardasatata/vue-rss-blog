import dateFormat from "dateformat";

/**
 * Placeholder getter function.
 */
export function someGetter(state) {
  // Add your logic here if needed, or remove this function if unused.
  console.log("someGetter called with state:", state);
}

export function getCurrentPost(state) {
  console.log("getCurrentPost called");
  if (state.currentPost) {
    console.log("currentPost value:", state.currentPost);
    console.log("Available posts:", state.posts);

    // Find the post that matches the currentPost link
    const post = state.posts.find((obj) => obj.link === state.currentPost);
    if (post) {
      console.log("Matching post found:", post);

      // Construct the HTML for the current post
      let html = "";
      html += `<h1>${post.title}</h1>`;
      html += `<p class="post-author">${post.author} - ${dateFormat(
        post.pubDate.replace(' ', 'T'),
        "dd mmm"
      )}</p>`;
      html += `<div>${post.content || post.description}</div>`;

      console.log("Generated HTML for current post:", html);
      return html;
    } else {
      console.warn("No matching post found for currentPost:", state.currentPost);
    }
  } else {
    console.warn("getCurrentPost called but currentPost is null or undefined");
  }
  return null;
}

export function getCurrentPostIndex(state) {
  console.log("getCurrentPostIndex called");
  if (state.currentPost) {
    console.log("currentPost value:", state.currentPost);
    console.log("Available posts:", state.posts);

    // Find the index of the post that matches the currentPost link
    const index = state.posts.findIndex((post) => post.link === state.currentPost);
    if (index !== -1) {
      console.log("Index of current post:", index);
      return index;
    } else {
      console.warn("No post found with the currentPost link:", state.currentPost);
      return null;
    }
  } else {
    console.warn("getCurrentPostIndex called but currentPost is null or undefined");
  }
  return null;
}
