<template>
    <div class="chat" draggable="true">
        <button @click="change()" style="margin: 10px; display: block;"> Change view</button>
        <rating :grade="3" :maxStars="6" :hasCounter="true"> </rating>
        <chat style="margin: 35px"></chat>

        <compponent v-bind:is="currentView"></compponent>
    </div>
</template>

<script>

    import Rating from './components/Rating.vue'
    import Chat from './components/Chat.vue'
    import ChatService from './service/chat'

    let componentRating = {
     template: '<Rating :grade="2" :maxStars="5" :hasCounter="true"/>',
     components: { Rating }
 };

    export default {
        props: {
        },
        components: {
            Rating,
            Chat
        },
        computed: {

        },
        methods: {
            change() {

                ChatService.get();
                this.currentView = this.currentView === Chat ? componentRating : Chat;
            }
        },
        data() {
            return {
                currentView : Chat
            }

        }
    }
</script>

<style scoped lang = "scss">

    .chat {
        height: 300px;
        width: 400px;
        position: absolute;
        bottom: 10px;
        right: 10px;
        line-height: 1px;
        margin: 15px;

        background: rgba(255,255,255,0.66);
        border: 2px  solid rgba(0,0,0,0.5);
        border-radius: 4px; padding: 8px;
    }

</style>
