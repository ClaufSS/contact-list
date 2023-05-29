import { createApp } from 'vue'


createApp({
  data() {
    return {
      search: '',
      contacts: [],
      isContactsLoaded: false,
    }
  },

  computed: {
    contactList() {
      if (/^\s*$/.test(this.search)) {
        return this.contacts;
      }

      return this.contacts.filter(({ firstName, lastName }) => {
        const fullName = (firstName + lastName).toLowerCase();
        const _search = this.search.trim().toLowerCase();

        return fullName.includes(_search);
      });
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
        const {name, email, picture, location:{ city, state }} = model;

        const contact = {
          picture: picture.large,
          firstName: name.first,
          lastName: name.last,
          email,
          city,
          state
        }

        this.contacts.push(contact);
      });
    },

    removeContact(index) {
      this.contacts.splice(index, 1);
    }
  },

  async mounted() {
    await this.loadContacts();

    this.isContactsLoaded = true
  }

}).mount("#app");
