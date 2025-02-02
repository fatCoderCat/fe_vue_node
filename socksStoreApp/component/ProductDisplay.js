app.component("product-display", {
  props: {
    premium: {
        type: Boolean,
        required: true
    }
  },
  template:
    /*html*/
    `<div>
        <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <!--syntax: <img v-bind:src="image"> OR sugar <img :src="image">-->
                    <img :class="{ 'out-of-stock-img': !inStock }" :src="image">
                </div>
                <div class="product-info">
                    <h1>{{ title }}</h1>
                    <p v-if="inStock">In Stock</p>
                    <p v-else>Out of Stock</p>
                    <p>Shipping: {{ shipping }}</p>
                    <ul>
                        <li v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{ 'background-color': variant.color }"></li>
                    </ul>
                    <product-details :details="details"></product-details>
                    <button class="button" :disabled="!inStock" :class="{ disabledButton: !inStock }" v-on:click="addToCart">Add to cart</button>
                    <button class="button" v-on:click="removeFromCart">Remove</button>
                </div>
            </div>
            <review-list :reviews="reviews" v-if="reviews.length"></review-list>
            <review-form @review-submitted-event="addReview"></review-form>
      </div>
      <a v-show="showDescription" :href="url">Made by Vue Mastery</a>
      <p v-if="localTime>=13 && localTime<14">Shop is closed for lunch till 14:00</p>
      <p v-else-if="localTime<=18 && localTime>=9">Shop is open</p>
      <p v-else>Show is closed now</p>
  </div>`,

  data: function () {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      url: "https://www.vuemastery.com/",
      localTime: 16,
      showDescription: true,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        { id: 2234, color: "green", image: "./assets/images/socks_green.jpg", quantity: 5 },
        { id: 2235, color: "blue", image: "./assets/images/socks_blue.jpg", quantity: 0 },
      ],
      reviews: []
    };
  },
  methods: {
    addToCart(id) {
      this.$emit('add-to-cart-event', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
      this.$emit('remove-from-cart-event')
    },
    updateVariant(index) {
      this.selectedVariant = index
    },
    addReview(review) {
        this.reviews.push(review)
    }
  },
  computed: {
    title() {
        return this.brand + ' ' + this.product
    }, 
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity > 0
    },
    shipping() {
        if (this.premium){
            return 'Free'
        }
        return 2.99
    }
  }
});
