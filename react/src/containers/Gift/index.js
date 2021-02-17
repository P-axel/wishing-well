import { connect } from 'react-redux';
import {
  getGiftDetailsSlug,
  fetchGiftDetails,
  handleClickBought,
} from 'src/actions/gift';

// === on importe le composant de présentation
import Gift from 'src/components/Gift';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir : élément à récupérer dans le state
  details: state.gift.details,
  buyer: state.gift.details.buyer,
  userSlug: state.user.slug,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher une action vers le store
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  getGiftDetailsSlug: (nomDuGift, nomDeLaListe) => {
    dispatch(getGiftDetailsSlug(nomDuGift, nomDeLaListe));
  },
  fetchGiftDetails: () => {
    dispatch(fetchGiftDetails());
  },
  handleClickBought: () => {
    dispatch(handleClickBought());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Gift);
