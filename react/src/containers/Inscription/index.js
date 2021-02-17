import { connect } from 'react-redux';

import Inscription from 'src/components/Inscription';

import { updateUserField, addUser } from 'src/actions/user';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  firstname: state.user.firstname,
  lastname: state.user.lastname,
  email: state.user.email,
  birthday: state.user.birthday,
  password: state.user.password,
  confirmPassword: state.user.confirmPassword,
  avatar: state.user.avatar,
  isRegistered: state.user.isRegistered,
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  changeField: (newValue, name) => {
    // console.log(`Nouvelle valeur ${newValue} pour le champ ${name}`);
    dispatch(updateUserField(newValue, name));
  },

  handleRegister: () => {
    dispatch(addUser());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inscription);
