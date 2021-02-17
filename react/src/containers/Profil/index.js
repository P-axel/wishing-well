import { connect } from 'react-redux';

import Profil from 'src/components/Profil';

import { deleteProfil, deleteUserFromState, fetchUserDetails } from 'src/actions/user';

const mapStateToProps = (state) => ({

  firstname: state.user.firstname,
  lastname: state.user.lastname,
  birthday: state.user.birthday,
  email: state.user.email,
  avatar: state.user.avatar,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch

  handleDeleteProfil: () => {
    dispatch(deleteProfil());
  },

  deleteUserFromState: () => {
    dispatch(deleteUserFromState());
  },

  fetchUserDetails: () => {
    dispatch(fetchUserDetails());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profil);
