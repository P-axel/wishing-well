import { connect } from 'react-redux';
import {
  getSlug,
  fetchList,
  changeNameEditList,
  changeEventDateEditList,
  changeDescriptionEditList,
  editList,
} from 'src/actions/editList';

// === on importe le composant de présentation
import EditList from 'src/components/EditList';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir : élément à récupérer dans le state
  name: state.editList.name,
  eventDate: state.editList.eventDate,
  description: state.editList.description,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher une action vers le store
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  getSlug: (slug) => {
    dispatch(getSlug(slug));
  },
  fetchList: () => {
    dispatch(fetchList());
  },
  changeNameEditList: (value) => (
    dispatch(changeNameEditList(value))
  ),
  changeEventDateEditList: (value) => (
    dispatch(changeEventDateEditList(value))
  ),
  changeDescriptionEditList: (value) => (
    dispatch(changeDescriptionEditList(value))
  ),
  editList: () => (
    dispatch(editList())
  ),
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(EditList);
