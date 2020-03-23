<template>
    <div>
        Cards...
        <div class="cards">
            <div class="card" v-for="card in allCards" :key="card.id" @dblclick="onDblClick(card)" :class="{'incomplete-box': card.completed}">
                {{ card.text }}
                <i class="far fa-trash-alt" @click="deleteCard(card.id)"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'Cards',
        created() {
            this.getCards();
        },
        computed: mapGetters(['allCards']),
        methods: {
            ...mapActions(['getCards', 'deleteCard', 'toggleCard']),
            onDblClick(card) {
                console.log("onDblClick -> card", card);
                this.toggleCard({
                    ...card,
                    completed: !card.completed
                });
            }
        }
    }
</script>

<style scoped>
.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}
.card {
    border: 1px solid #ccc;
    background: #41b883;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
}
i {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #fff;
    cursor: pointer;
}
.incomplete-box {
    background: #35495e;
    color: #fff;
}
</style>