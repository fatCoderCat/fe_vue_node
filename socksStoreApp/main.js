const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: false
    };
  },
  methods: {
    addToBasket(id){
      this.cart.push(id)
    },
    removeFromBasket(){
      if(this.cart.length > 0){
        this.cart.pop()
      }
    }
  },
  computed: {
  }
});
