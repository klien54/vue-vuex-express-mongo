import axios from 'axios';

const url = "http://localhost:5000/api/posts";

const state = {
    cards: [
        {
            id: 1,
            text: "First Card",
            completed: false,
            created: new Date()
        },
        {
            id: 2,
            text: "Second Card",
            completed: false,
            created: new Date()
        }
    ]
};
const getters = {
    allCards: (state) => state.cards
};
const actions = {
    // get Cards
    async getCards({commit}) {
        const cards = await axios.get(url);
        commit('fetchCards', cards.data);
    },

    // add card
    async addCard({commit}, text) {
        const card = await axios.post(url, {
            text,
            completed: false,
            createdAt: new Date()
        });
        if (card.status === 201) {
            commit('addCard', card.data);
        }
    },

    // delete card
    async deleteCard({commit}, id) {
        const card = await axios.delete(`${url}/${id}`);
        if (card.status === 200) {
            commit('removeCard', id);
        }
    },

    // update card
    async toggleCard({commit}, card) {
        const post = await axios.put(`${url}/${card.id}`, card);
        if (post.status === 200){
            commit('updateCard', card);
        }
    }

};
const mutations = {
    fetchCards: (state, cards) => state.cards = cards.map(card => ({ ...card, id: card._id})),
    addCard: (state, card) => state.cards.unshift(card),
    removeCard: (state, id) => state.cards = state.cards.filter(card => card.id !== id),
    updateCard: (state, updCard) => {
        const matchIdx = state.cards.findIndex(card => card.id === updCard.id);
        if (matchIdx !== -1) {
            state.cards.splice(matchIdx, 1, updCard);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}