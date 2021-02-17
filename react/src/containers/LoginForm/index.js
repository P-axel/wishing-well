import { connect } from 'react-redux';

import LoginForm from 'src/components/LoginForm';

import { updateUserField, logIn, logOut } from 'src/actions/user';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  email: state.user.email,
  password: state.user.password,
  isLogged: state.user.isLogged,
  isRegistered: state.user.isRegistered,
  slug: state.user.slug,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  changeField: (newValue, name) => {
    // console.log(`Nouvelle valeur ${newValue} pour le champ ${name}`);
    dispatch(updateUserField(newValue, name));
  },
  handleLogin: () => {
    // console.log('handleLogin');
    dispatch(logIn());
  },
  handleLogout: () => {
    localStorage.clear();
    dispatch(logOut());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
