import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleForm, addCat, delCat, addPost, delPost } from '../actions';
import DiaryHeader from '../components/DiaryHeader';
import DiaryForm from '../components/DiaryForm';
import DiaryCatalog from '../components/DiaryCatalog';
import DiaryFooter from '../components/DiaryFooter';


class DiaryApp extends React.PureComponent {
    render() {
        const { dispatch, showForm, diarys } = this.props;
        return (
            <div>
                <DiaryForm
                  showForm={ showForm }
                  toggleForm={ () => dispatch(toggleForm()) }
                  diarys={ diarys }
                  addPost={ (cat, post) => dispatch(addPost(cat, post)) }
                />
                <DiaryHeader
                  addCat={ cat => dispatch(addCat(cat)) }
                  toggleForm={ () => dispatch(toggleForm()) }
                />
                <DiaryCatalog
                  diarys={ diarys }
                  delCat={ cat => dispatch(delCat(cat)) }
                  delPost={ (cat, date) => dispatch(delPost(cat, date)) }
                />
                <DiaryFooter />
            </div>
        );
    }
}

DiaryApp.propTypes = {
    showForm: PropTypes.bool.isRequired,
    diarys: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired
    }).isRequired).isRequired
};

function mapStateToProps(state) {
    return {
        showForm: state.get('showForm'),
        diarys: state.get('diarys').toJS()
    };
}

export default connect(mapStateToProps)(DiaryApp);
