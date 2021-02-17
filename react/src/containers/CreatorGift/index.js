import { connect } from 'react-redux';
import CreatorGift from 'src/components/EditGift';
import { addNewGift, updateGiftField } from 'src/actions/gift';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  name: state.user.name,
  details: state.user.details,
  isHighlight: state.user.isHighlight,
  link: state.user.link,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  changeField: (newValue, name) => {
    // console.log(`Nouvelle valeur ${newValue} pour le champ ${name}`);
    dispatch(updateGiftField(newValue, name));
  },

  handleAddWish: () => {
    dispatch(addNewGift());
  },

});
// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(CreatorGift);
