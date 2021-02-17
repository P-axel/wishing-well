import { connect } from 'react-redux';

import EditGift from 'src/components/EditGift';

import { updateGiftField, editGift, addGift, fetchCurrentGiftInfos } from 'src/actions/gift';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  name: state.gift.name,
  description: state.gift.description,
  isHighlighted: state.gift.isHighlighted,
  link: state.gift.link,
  listInfos: state.lists.currentListInfos,
  type: state.gift.type,
  status: state.gift.status,
  giftDetails: state.gift.details,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  changeField: (newValue, name) => {
    // console.log(`Nouvelle valeur ${newValue} pour le champ ${name}`);
    dispatch(updateGiftField(newValue, name));
  },

  editGift: (slugDuGift, nomDeLaListe) => {
    dispatch(editGift(slugDuGift, nomDeLaListe));
  },
  addGift: (nomDeLaListe) => {
    dispatch(addGift(nomDeLaListe));
  },
  fetchCurrentGiftInfos: (nomDuWish) => {
    dispatch(fetchCurrentGiftInfos(nomDuWish));
  },

});
// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(EditGift);
