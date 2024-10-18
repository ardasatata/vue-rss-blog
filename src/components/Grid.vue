<template>
  <div class="row rtb-row">
    <div v-for="(post) in posts" :key="post.guid" :class="colClass">
      <div class="post-date" v-if="post.pubDate">
        {{ formatPostDate(post.pubDate) }}
      </div>
      <div>
        <a
          :href="post.link"
          @click="showPost($event, post.link)"
          target="_blank"
          :style="'background-image: url(' + post.thumbnail + ');'"
          :class="{'post-image' : post.thumbnail, 'no-image' : !post.thumbnail}"
        ></a>
      </div>
      <div>
        <a
          :href="post.link"
          @click="showPost($event, post.link)"
          target="_blank"
          class="post-title"
        >
          <h2>{{ post.title }}</h2>
        </a>
      </div>
      <div class="author mt-2">Author: {{ post.author }}</div>
      <div class="excerpt" v-html="formatPostDescription(post.description)"></div>
      <div class="read-more">
        <a
          :href="post.link"
          @click="showPost($event, post.link)"
          target="_blank"
          :class="buttonClass"
        >{{ readMore }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import dateFormat from "dateformat";

export default {
  name: "appGrid",
  data() {
    return {
      view: null,
    };
  },
  computed: {
    ...mapState([
      "posts",
      "maxCols",
      "layout",
      "postRows",
      "colClass",
      "currentPost",
      "postStyle",
      "buttonClass",
      "readMore",
      "offset",
    ]),
    ...mapGetters(["getCurrentPost"]),
  },
  created() {
    // Debug log for created lifecycle hook
    console.log('appGrid component created');
    console.log('Initial posts:', this.posts);
  },
  mounted() {
    // Debug log for mounted lifecycle hook
    console.log('appGrid component mounted');
  },
  methods: {
    formatPostDate(value) {
      if (value) {
        // console.log('Formatting post date:', value);
        const newDate = new Date(value.replace(' ', 'T'));
        return dateFormat(newDate, "dd mmm");
      }
      return value;
    },
    formatPostDescription(value) {
      // console.log('Formatting post description:', value);
      // Removes images from the description to keep it clean
      const formattedDescription = value.replace(/<img[^>]*>/g, "");
      // console.log('Formatted post description:', formattedDescription);
      return formattedDescription;
    },
    showPost(event, link) {
      console.log('User clicked post link:', link);

      if (this.postStyle === "external") {
        console.log('Post style is external, allowing navigation');
        // Allow the link to navigate externally
        return true;
      } else {
        // Prevent default link behavior and set the current post in the store
        event.preventDefault();
        console.log('Post style is not external, setting current post:', link);
        this.$store.dispatch("setCurrentPost", link);
        
        console.log('Scrolling to anchor with offset:', this.offset);
        setTimeout(() => {
          this.$scrollTo("#rtb-anchor", 500, { offset: this.offset });
        }, 1000);
      }
    },
  },
  watch: {
    posts(newPosts, oldPosts) {
      console.log('Posts changed:', { oldPosts, newPosts });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#rtb {
  .rtb-row {
    .post-date {
      position: absolute;
      top: 3px;
      left: 18px;
      background-color: #fff;
      padding: 5px;
      color: #000;
    }
    .post-image {
      width: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      overflow: auto;
      display: block;
      &:after {
        content: "";
        display: block;
        position: relative;
        margin-top: 60%;
        width: 100%;
        z-index: 1;
      }
    }
    .no-image {
      height: 30px;
      display: block;
    }
    .rtb-col {
      margin-bottom: 20px;
    }
    .excerpt {
      max-height: 15em;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 1.5em;
      position: relative;
    }
    .read-more {
      text-align: right;
    }
  }
}
</style>
