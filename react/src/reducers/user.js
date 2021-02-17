import {
  SAVE_TOKEN_AND_USER_INFOS, UPDATE_USER_FIELD, LOG_OUT, REDIRECT_USER, DELETE_PROFIL,
  DELETE_USER_FROM_STATE,
} from 'src/actions/user';

const initialState = {
  // ici l'état initial
  firstname: '',
  lastname: '',
  birthday: '',
  avatar: '',
  email: '',
  password: '',
  confirmPassword: '',
  slug: '',
  token: null,
  isLogged: false,
  isRegistered: false,

};

const User = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_TOKEN_AND_USER_INFOS:
      return {
        ...state,
        firstname: action.firstname,
        lastname: action.lastname,
        slug: action.slug,
        token: action.token,
        isLogged: true,
        password: '',
        email: action.email,
        isRegistered: false,
        birthday: action.birthday,
        avatar: action.avatar,
      };

    case UPDATE_USER_FIELD:
      // console.log(`Action reçue, nouvelle valeur ${action.value} pour le champ ${action.name}`);

      /* si action.name vaut 'email' alors
          return {
            ...state,
            email: action.value
          };
        si action.name vaut 'password' alors
          return {
            ...state,
            password: action.value
          };
        */
      return {
        ...state,
        // je veux prendre le contenu de action.name et utiliser ça comme nom
        // de propriété
        [action.name]: action.value,
      };

    case LOG_OUT:
      return {
        ...initialState,
        // ...state,
        // token: '',
        // isLogged: false,
      };

    case REDIRECT_USER:
      return {
        ...state,
        password: '',
        email: '',
        slug: action.slug,
        isRegistered: true,
      };

    case DELETE_PROFIL:
      return {
        ...state,
        password: '',
        email: '',
        picture: '',
        name: '',
      };

    case DELETE_USER_FROM_STATE: {
      console.log('slug du USER', action.slugDuUser);
      console.log('filter du reducer', state.user.filter((currentUser, slug) => slug !== action.slugDuUser));
      return {
        ...state,
        user: state.user.filter((currentUser, slug) => slug !== action.slugDuUser),
      };
    }

    default:
      return { ...state };
  }
};

export default User;
