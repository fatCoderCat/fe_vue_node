app.component("product-details", {
    props: {
        details: {
          type: Array,
          required: true
      }
    },
    template: 
    /*html*/
    `<div v-for="detail in details">{{ detail }}</div>`
})