<template>
    <Carousel :wrap-around="true" :breakpoints="breakpoints" :autoplay="2000" itemsToShow=maxCols>
        <Slide v-for="(post,index) in posts" :key="post.guid" :data-index="index">
            <div class="slider-post">
                <div class="post-date">{{ formatPostDate(post.pubDate) }}</div>
                <div>
                    <a :href="post.link" @click="showPost($event, post.link)" target="_blank"
                        :style="'background-image: url(' + post.thumbnail + ');'" class="post-image"></a>
                </div>
                <div>
                    <a :href="post.link" @click="showPost($event, post.link)" target="_blank" class="post-title">
                        <h2>{{ post.title }}</h2>
                    </a>
                </div>
                <div class="author mt-2">Author: {{ post.author }}</div>
                <div class="read-more">
                    <a :href="post.link" @click="showPost($event, post.link)" target="_blank" :class="buttonClass">{{
                        readMore }}</a>
                </div>
            </div>
        </Slide>
    </Carousel>

</template>

<script>
import { mapState, mapGetters } from "vuex";
import dateFormat from "dateformat";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
    name: "appSlider",
    components: {
        Carousel,
        Slide
        // Pagination,
        // Navigation
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
            "readMore",
            "buttonClass"
        ]),
        ...mapGetters(["getCurrentPost"]),
    },
    methods: {
        formatPostDate(value) {
            if (value) {
                const newDate = new Date(value.replace(' ', 'T'));
                return dateFormat(newDate, "dd mmm");
            }
            return '';
        },
        formatPostDescription(value) {
            return value.replace(/<img[^>]*>/g, "");
        },
        showPost(event, link) {
            if (this.postStyle === "external") {
                /** Pass through the link */
                return true;
            } else {
                event.preventDefault();
                this.$store.dispatch("setCurrentPost", link);
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#rtb {
    .slider-post {
        padding: 10px;
        position: relative;

        .post-date {
            position: absolute;
            top: 18px;
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

        .excerpt {
            max-height: 4.5em;
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