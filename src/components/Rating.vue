<template>
    <div class="rating">
        <ul class="list">
            <li @click="rate(star)" v-for="star in maxStars" :class="{ 'active': star <= stars }" class="star">
                 <icon :scale="scale" :name="star <= stars ? 'star' : 'star-o'"/>
            </li>
        </ul>
        <span v-if="hasCounter" >{{ counter }}</span>
    </div>
</template>

<script>
    import 'vue-awesome/icons/star'
    import 'vue-awesome/icons/star-o'

    import Icon from 'vue-awesome/components/Icon'

    import Chat from './../service/chat'

    export default {
        props: {
            grade: {
                type: Number,
                required: true
            },
            maxStars: {
                type: Number,
                default: 1
            },
            starSize:{
                type: Number,
                default: 1
            },
            hasCounter: {
                type: Boolean,
                default: true
            }
        },
        components: { Icon },
        computed: {
            counter() {
                return `${this.stars} of ${this.maxStars}`
            }
        },
        methods: {
            rate(star) {
                this.stars = this.stars === star ? star - 1 : star;
                this.scale = this.stars;
                Chat.send();

            }
        },
        data() {
            return {
                stars: this.grade,
                scale: this.grade
            }
        }
    }
</script>

<style scoped lang = "scss">
    .rating {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 14px;
        color: #a7a8a8;
        text-align: center;
        margin-top: 5%;
    }
    .list {
        margin: 0 0 5px 0;
        padding: 0;
        list-style-type: none;
    }
    .list:hover .star {
        color: #f3d23e;
    }
    .star {
        display: inline-block;
        cursor: pointer;
    }
    .star:hover ~ .star:not(.active) {
        color: inherit;
    }
    .active {
        color: #f3d23e;
    }
    .li-letter {
        margin: 5px;
    }
</style>
