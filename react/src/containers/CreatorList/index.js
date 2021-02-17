import { connect } from 'react-redux';
import {
  fetchGifts,
  clearStateGifts,
  deleteGift,
  handleClickBoughtList,
  handleClickStopBoughtList,
} from 'src/actions/gift';
import {
  saveSlug,
  fetchListInfos,
  handleClickFollow,
  handleClickUnfollow,
  deleteList,
} from 'src/actions/lists';

// === on importe le composant de présentation
import CreatorList from 'src/components/CreatorList';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir : élément à récupérer dans le state
  gifts: state.gift.giftsList,
  listInfos: state.lists.currentListInfos,
  userSlug: state.user.slug,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher une action vers le store
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  launchFetchGifts: () => {
    dispatch(fetchGifts());
  },
  launchGetSlug: (slug) => {
    dispatch(saveSlug(slug));
  },
  launchFetchListInfos: () => {
    dispatch(fetchListInfos());
  },
  clearStateGifts: () => {
    dispatch(clearStateGifts());
  },
  handleDeleteGift: (slugDuGift) => {
    dispatch(deleteGift(slugDuGift));
  },
  handleClickFollow: () => {
    dispatch(handleClickFollow());
  },
  handleClickUnfollow: () => {
    dispatch(handleClickUnfollow());
  },
  handleClickBoughtList: (giftSlug) => {
    dispatch(handleClickBoughtList(giftSlug));
  },
  handleClickStopBoughtList: (giftSlug) => {
    dispatch(handleClickStopBoughtList(giftSlug));
  },
  handleDeleteList: (nomDeLaListe) => {
    dispatch(deleteList(nomDeLaListe));
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(CreatorList);
