import Vue from 'vue'
import App from './App.vue'

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
     render(h) {
         return h(App, {
             props: {
                 userId: this.$el.attributes['user_id'].value,
                 widgetId: +this.$el.attributes['widget_id'].value,
                 signature: this.$el.attributes['signature'].value
             }
         })
     },
     mounted() {

     }
 };

new Vue(app);


