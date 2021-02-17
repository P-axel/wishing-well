import { connect } from 'react-redux';
import { fetchOwnLists, fetchFriendsLists, fetchLists } from 'src/actions/lists';

// === on importe le composant de présentation
import TableauDeBord from 'src/components/TableauDeBord';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir : élément à récupérer dans le state
  ownLists: state.lists.ownLists,
  friendsLists: state.lists.friendsLists,
  isLogged: state.user.isLogged,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher une action vers le store
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  launchFetchOwnLists: () => {
    dispatch(fetchOwnLists());
  },
  launchFetchFriendsLists: () => {
    dispatch(fetchFriendsLists());
  },
  launchFetchLists: () => {
    dispatch(fetchLists());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(TableauDeBord);
