<template>
  <div class="rtb-pagination-container" v-if="posts.length > 1" :class="`rtb-${postStyle}`">
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <a
          :href="previousPostLink"
          @click.prevent="showPost(previousPostLink)"
          v-if="getCurrentPostIndex > 0"
          :class="`${buttonClass} pager newer`"
        >Prev</a>
        <a href="#" @click.prevent="closePost" v-if="postStyle === 'inline'">See all posts</a>
        <a
          :href="nextPostLink"
          @click.prevent="showPost(nextPostLink)"
          v-if="(posts.length - 1) > getCurrentPostIndex"
          :class="`${buttonClass} pager older`"
        >Next</a>
      </div>
      <div class="source-link col-sm-3">
        <a :href="currentPost" target="_blank">View the original post</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import dateFormat from "dateformat";

export default {
  name: "appPagination",
  computed: {
    ...mapState([
      "posts",
      "maxCols",
      "layout",
      "postRows",
      "colClass",
      "currentPost",
      "postStyle",
      "offset",
      "buttonClass"
    ]),
    ...mapGetters(["getCurrentPostIndex"]),
    previousPostLink() {
      // Compute the link to the previous post if available
      if (this.getCurrentPostIndex > 0) {
        const link = this.posts[this.getCurrentPostIndex - 1].link;
        console.log("Computed previous post link:", link);
        return link;
      }
      return null;
    },
    nextPostLink() {
      // Compute the link to the next post if available
      if (this.getCurrentPostIndex < this.posts.length - 1) {
        const link = this.posts[this.getCurrentPostIndex + 1].link;
        console.log("Computed next post link:", link);
        return link;
      }
      return null;
    }
  },
  methods: {
    formatPostDate(value) {
      if (value) {
        console.log("Formatting post date:", value);
        const newDate = new Date(value.replace(' ', 'T'));
        return dateFormat(newDate, "dd mmm");
      }
      return value;
    },
    showPost(link) {
      console.log("Navigating to post with link:", link);

      this.$store.dispatch("setCurrentPost", link);
      if (this.postStyle === "modal") {
        console.log("Post style is 'modal', scrolling to #postTop");
        setTimeout(() => this.$scrollTo("#postTop", 500, { container: "#post-container" }), 1000);
      } else if (this.postStyle === "inline") {
        console.log("Post style is 'inline', scrolling to #rtb-anchor");
        setTimeout(() => this.$scrollTo("#rtb-anchor", 500, { offset: this.offset }), 1000);
      }
    },
    closePost() {
      console.log("Closing current post");

      this.$store.dispatch("closePost");
      setTimeout(() => {
        console.log("Scrolling to top of posts list (#rtb)");
        this.$scrollTo("#rtb", 500, { offset: this.offset });
      }, 1000);
    }
  },
  watch: {
    currentPost(newPost, oldPost) {
      console.log("Current post changed:", { oldPost, newPost });
    },
    getCurrentPostIndex(newIndex, oldIndex) {
      console.log("Current post index changed:", { oldIndex, newIndex });
    }
  },
  mounted() {
    console.log("appPagination component mounted with postStyle:", this.postStyle);
    console.log("Initial currentPost:", this.currentPost);
    console.log("Initial getCurrentPostIndex:", this.getCurrentPostIndex);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.rtb-pagination-container {
  &.rtb-modal {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
  }
  .row {
    text-align: center;
    .source-link {
      text-align: right;
      a {
        color: #000;
        padding: 5px;
        margin: 5px 10px;
        display: inline-block;
      }
    }
    a.pager {
      padding: 5px;
      margin: 5px 10px;
      cursor: pointer;
      display: inline-block;
      text-decoration: none;
      border: solid 1px #000;
      color: #000;
      border-radius: 3px;
    }
  }
}
</style>
