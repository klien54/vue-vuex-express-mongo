<template>
    <div>
        Add Card...
        <form @submit="onSubmit">
            <input type="text" placeholder="Card Text..." v-model="text">
            <input type="submit" value="Add">
        </form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'AddCard',
        data() {
            return {
                text: ''
            }
        },
        methods: {
            ...mapActions(['addCard']),
            onSubmit(e) {
                e.preventDefault();
                this.addCard(this.text);
            }
        }
    }
</script>

<style scoped>
form {
    display: flex;
}
input[type="text"] {
    flex: 10;
    padding: 10px;
    border: 1px solid #41b883;
}
input[type="submit"] {
    flex: 2;
    background: #41b883;
    color: #fff;
    border: 1px solid #41b883;
    cursor: pointer;
}
</style>