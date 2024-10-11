<template>
  <div id="rtb">
    <div id="rtb-anchor"></div>
    <transition-group name="fade">
      <!-- Debug to check component visibility -->
      <app-grid
        v-if="layoutStyle == 'grid' && !currentPost"
        :key="'grid'"
        v-once
        v-on:mounted="logDebug('Grid component is visible')"
      ></app-grid>
      
      <app-slider
        v-if="layoutStyle == 'slider' && !currentPost"
        :key="'slider'"
        v-once
        v-on:mounted="logDebug('Slider component is visible')"
      ></app-slider>

      <app-post
        v-if="postStyle === 'inline' && currentPost"
        :key="'post'"
        v-once
        v-on:mounted="logDebug('Post component (inline) is visible')"
      ></app-post>
    </transition-group>
    
    <app-post
      v-if="postStyle === 'modal'"
      v-once
      v-on:mounted="logDebug('Post component (modal) is visible')"
    ></app-post>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { useTemplateRef, onMounted, ref } from 'vue'; 
import appGrid from './components/Grid';
import appPost from './components/Post';
import appSlider from './components/Slider';





export default {
  // data() {
  //   return {
  //     rss: null, // Initialize with null or empty value
  //     maxcols: null,
  //     layout: null,
  //     poststyle: null,
  //     buttonclass: null,
  //     readmore: null,
  //     offset: null,
  //   };
  // },
  props: [
    'rss',
    'maxcols',
    'layout',
    'poststyle',
    'buttonclass',
    'readmore',
    'offset'
  ],
  components: {
    appGrid,
    appPost,
    appSlider
  },
  created() {
// Access the data-rss attribute from the #app element
    const appElement = document.getElementById('retainable-rss-embed');
    // Access all data-* attributes from the #app element
    if (appElement) {
      const dataAttributes = appElement.dataset;
      console.log('All data attributes:', dataAttributes);
    

    // Debug messages to track Vuex commits and dispatched actions
    console.log('Created lifecycle hook triggered');
    console.log('Prop values received:', {
      rss: dataAttributes.rss,
      maxcols: dataAttributes.maxcols,
      layout: dataAttributes.layout,
      poststyle: dataAttributes.poststyle,
      buttonclass: dataAttributes.buttonclass,
      readmore: dataAttributes.readmore,
      offset: dataAttributes.offset,
    });
    // Kick off the store
    this.$store.commit('setRss', dataAttributes.rss);
    console.log('Committed RSS to store:', dataAttributes.rss);

    this.$store.commit('setMaxCols', dataAttributes.maxcols);
    console.log('Committed maxCols to store:', dataAttributes.maxcols);

    this.$store.commit('setLayout', dataAttributes.layout);
    console.log('Committed layout to store:', dataAttributes.layout);

    this.$store.commit('setPostStyle', dataAttributes.poststyle);
    console.log('Committed postStyle to store:', dataAttributes.poststyle);

    this.$store.dispatch('getPosts', dataAttributes.rss);
    console.log('Dispatched action getPosts with RSS:', dataAttributes.rss);

    this.$store.commit('setButtonClass', dataAttributes.buttonclass);
    console.log('Committed buttonClass to store:', dataAttributes.buttonclass);

    this.$store.commit('setReadMore', dataAttributes.readmore);
    console.log('Committed readMore text to store:', dataAttributes.readmore);

    this.$store.commit('setOffset', dataAttributes.offset);
    console.log('Committed offset to store:', dataAttributes.offset);
  }},
  computed: {
    ...mapState([
      'posts',
      'maxCols',
      'layoutStyle',
      'postRows',
      'colClass',
      'currentPost',
      'postStyle'
    ]),
    ...mapGetters([
      'getCurrentPost'
    ]),
  },
  methods: {
    logDebug(message) {
      console.log(message);
    }
  }
};
</script>

<style lang="scss">
/* Transition animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* Bootstrap utilities */
@-ms-viewport {
    width: device-width
}

html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
}

*,
:after,
:before {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
}
$container-max-widths: (
  sm: 540px,
  md: 699px,
  lg: 700px,
  xl: 800px
);

#rtb, #rtb-modal {
  @import '../node_modules/bootstrap/scss/bootstrap-grid.scss';
  @import '../node_modules/bootstrap/scss/utilities/_spacing.scss';
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
}
#rtb {
  position: relative;
}
</style>
