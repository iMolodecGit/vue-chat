import Vue from 'vue'
import App from './App.vue'
import DragNDrop from './helpers/DragNDrop';

// import Rating from './components/Rating.vue'
//
// let componentRating = {
//     el: '#rating',
//     template: '<Rating :grade="6" :maxStars="10" :hasCounter="true"/>',
//     components: { Rating }
// };
//
// new Vue(componentRating);

let app = {
     el: '#chat-app',
     render: h => h(App)
 };

new Vue(app);


new DragNDrop('main-chat-app');
