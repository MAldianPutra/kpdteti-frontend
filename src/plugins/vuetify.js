import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faEllipsisV,
  faEnvelope,
  faHeart,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faVuejs,
} from '@fortawesome/free-brands-svg-icons';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(
  faEllipsisV,
  faInstagram,
  faGithub,
  faEnvelope,
  faLinkedin,
  faHeart,
  faVuejs,
  faSmile,
);

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        // primary: '#F7F5E6',
        secondary: '#333A56',
        primary: '#E8E8E8',
        interactive: '#52658F',
      },
    },
  },
  icons: {
    iconfont: 'faSvg',
  },
});
