import axios from "axios";
import getThumbnailImageFromRawContent from "../utils/getThumbnailImageFromRawContent";

// A placeholder action that doesn't do anything
export function someAction(context) {
  // You can add logic here or remove this if not used
  console.log("Executing someAction with context:", context);
}

export async function getPosts({ commit }, rss) {
  console.log("getPosts action called with RSS:", rss);

  // Split RSS URLs and parse options
  const rssArray = rss.split(",");
  console.log("RSS Array after split:", rssArray);

  const rssUrlsWithOptionsArray = rssArray.map((rss) => {
    const rssUrlWithOptions = rss.split("|");
    console.log("RSS URL with options:", rssUrlWithOptions);

    const rssItemsCountParam = parseInt(rssUrlWithOptions[1]);
    console.log("Parsed RSS items count parameter:", rssItemsCountParam);

    // Validate rssItemsCountParam
    let rssItemsCount = Number.isInteger(rssItemsCountParam) ? rssItemsCountParam : null;
    console.log("Validated RSS items count:", rssItemsCount);

    return {
      rssUrl: rssUrlWithOptions[0] ? rssUrlWithOptions[0].trim() : rssUrlWithOptions[0],
      rssItemsCount,
    };
  });

  console.log("RSS URLs with options array:", rssUrlsWithOptionsArray);

  // Fetch posts for each RSS URL using async/await
  for (const rssUrlWithOptions of rssUrlsWithOptionsArray) {
    console.log("Fetching posts for RSS URL:", rssUrlWithOptions.rssUrl);

    try {
      const data = {
        rss_url: rssUrlWithOptions.rssUrl,
      };

      console.log("Sending request to rss2json API with data:", data);

      const response = await axios.get("https://api.rss2json.com/v1/api.json", { params: data });

      console.log("Received response from rss2json API:", response.data);

      // Handle the response
      let posts;

      // Take only the needed number of items if rssItemsCount is provided
      if (rssUrlWithOptions.rssItemsCount) {
        console.log(`Limiting posts to first ${rssUrlWithOptions.rssItemsCount} items.`);
        posts = response.data.items.slice(0, rssUrlWithOptions.rssItemsCount);
      } else {
        posts = response.data.items;
      }

      console.log("Posts received:", posts);

      // Add thumbnail to each post using a utility function
      const postsClone = posts.map((item) => {
        const thumbnail = getThumbnailImageFromRawContent(item.content);
        console.log("Generated thumbnail for post:", thumbnail);
        return {
          ...item,
          thumbnail,
        };
      });

      console.log("Posts after adding thumbnails:", postsClone);

      // Commit the posts to the store
      console.log("Committing posts to the store...");
      commit("addPosts", postsClone);
    } catch (error) {
      // Handle any errors
      console.error("Error fetching posts:", error);
    }
  }

  console.log("Finished processing all RSS URLs.");
}

export function setCurrentPost({ commit }, payload) {
  console.log("setCurrentPost action dispatched with link:", payload);
  commit("setCurrentPost", payload);
}

export function closePost({ commit }) {
  console.log("Closing current post.");
  commit("clearCurrentPost");
}
