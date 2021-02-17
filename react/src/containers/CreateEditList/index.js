import { connect } from 'react-redux';

import {
  createList,
  changeName,
  changeEventDate,
  changeDescription,
} from 'src/actions/createList';

// === on importe le composant de présentation
import CreateEditList from 'src/components/CreateEditList';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir : élément à récupérer dans le state
  name: state.createList.name,
  eventDate: state.createList.eventDate,
  description: state.createList.description,
  isLogged: state.user.isLogged,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher une action vers le store
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  createList: () => (
    dispatch(createList())
  ),
  changeName: (value) => (
    dispatch(changeName(value))
  ),
  changeEventDate: (value) => (
    dispatch(changeEventDate(value))
  ),
  changeDescription: (value) => (
    dispatch(changeDescription(value))
  ),
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(CreateEditList);
