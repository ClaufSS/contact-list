import { createApp } from 'vue'


createApp({
  data() {
    return {
      contacts: [],
    }
  },

  methods: {
    async loadContacts() {
      const response = await fetch('https://randomuser.me/api/?results=15');
      const { results } = await response.json();


      results.forEach(model => {
        const {name, email, picture, location:{ city }} = model;

        const contact = {
          picture: picture.large,
          firstName: name.first,
          lastName: name.last,
          email,
          city
        }

        console.log(contact)

        this.contacts.push(contact);
      });
    }
  },

  async mounted() {
    await this.loadContacts();
  }

}).mount("#app");
