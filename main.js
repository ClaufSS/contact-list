import { createApp } from 'vue'


createApp({
  data() {
    return {
      contacts: [],
    }
  },

  methods: {
    async loadContacts() {
      const baseURL = 'https://randomuser.me'
      const endPoint = '/api'

      const search = new URLSearchParams({
        format: 'JSON',
        results: '15',
        inc: 'name,location,picture,email',
        nat: 'br'
      }).toString();

      const url = new URL(`${endPoint}?${search}`, baseURL);

      const response = await fetch(url);
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

        this.contacts.push(contact);
      });
    }
  },

  async mounted() {
    await this.loadContacts();
  }

}).mount("#app");
