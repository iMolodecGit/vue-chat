<template>
    <div class="chat">
        <div v-if="windowOpen"  id="chat-window" draggable="true">
            <!--<div>{{userId}}</div>-->
            <!--<div>{{widgetId}}</div>-->
            <!--<div>{{signature}}</div>-->
            <!--<button @click="change()" style="margin: 10px; display: block;"> Change view</button>-->
            <!--<rating :grade="3" :maxStars="6" :hasCounter="true"> </rating>-->
            <!--<chat style="margin: 35px"></chat>-->

            <compponent v-bind:is="currentView" :settings="settings"></compponent>
            <a @click="closeMainWindow()" href="" class="close-button" >X</a>
        </div>

        <button @click="openMainWindow()" v-else-if="!windowOpen && showChatButton" id="yh-open-chat-button">{{settings.header_online}}</button>
    </div>

</template>

<script>

    import Chat from './components/Chat.vue'
    import ChatService from './service/Chat'
    import DragNDrop from './helpers/DragNDrop';
    import notice from './helpers/notice'
    import WidgetSettings from './models/WidgetSettings'


    console.log('WidgetSettings.getSettings()', WidgetSettings.getSettings());

    // ========================= DEMO ==========================================
    import Rating from './components/Rating.vue'

    let componentRating = {
     template: '<Rating :grade="2" :maxStars="5" :hasCounter="true"/>',
     components: { Rating }
    };
    // ========================= DEMO ==========================================

    export default {
        props: {
            userId: {
                type: String,
                required: true
            },
            widgetId: {
                type: Number,
                required: true
            },
            signature:{
                type: String,
                required: true
            },
            localeId:{
                type: Number,
                default: 1
            },
        },
        components: {
            Rating,
            Chat
        },
        computed: {

        },
        methods: {
            change() {
                this.currentView = this.currentView === Chat ? componentRating : Chat;
            },
            openMainWindow() {
                ChatService.getUserInfoBeforeOpen();
                this.windowOpen = true;
            },
            closeMainWindow() {
                this.windowOpen = false;
            }
        },
        data() {
            return {
                windowOpen: false,
                currentView: Chat,
                showChatButton: false,
                settings: WidgetSettings.getSettings()
            }

        },
        updated: function () {
            this.$nextTick(function () {
                if (this.windowOpen) {
                    new DragNDrop('chat-window');
                }
            })
        },
        mounted: function () {
            let conectionData = {
                user_id: this.userId,
                widget_id: this.widgetId,
                signature: this.signature,

            };
            ChatService.connect(conectionData);

            notice.$on('widget-settings', () => {
               this.showChatButton = true;
               this.settings = WidgetSettings.getSettings();
            });
        }
        
    }
</script>

<style scoped lang = "scss">

    div {
        display: block;
        margin: 10px;
    }

    #chat-window {
        height: 300px;
        width: 400px;
        position: absolute;
        bottom: 30px;
        right: 30px;
        line-height: 1px;
        margin: 15px;

        background: rgba(255,255,255,0.66);
        border: 2px  solid rgba(0,0,0,0.5);
        border-radius: 4px; padding: 8px;
    }

    #yh-open-chat-button {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }

    .close-button {
        position: relative;
        left: 390px;
        top: -15px;
    }

</style>
