/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { formatMessage } from 'umi/locale';
import qs from 'qs';
import { createForm } from 'rc-form';
import router from 'umi/router';

import BYHeader from '@/components/BYHeader';

import * as searchHistoryActionCreators from '@/common/actions/searchHistory';
import { SIDEINTERVAL, SCREENS } from '@/common/constants';

import InputRight from '@/components/InputRight';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    paddingTop: SIDEINTERVAL,
    paddingBottom: SIDEINTERVAL,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  textInput: {
    backgroundColor: '#f5f5f5',
    height: 40,
    paddingLeft: SIDEINTERVAL * 0.8,
    paddingRight: SIDEINTERVAL * 0.8,
    marginLeft: 0,
  },
  title: {
    fontSize: 11,
    color: '#ccc',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    marginBottom: 10,
  },
  history: {
    paddingLeft: SIDEINTERVAL,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  historyTitle: {
    fontSize: 11,
    color: '#666',
  },
  historyCloseIcon: {
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
};

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.keypressListener = this.keypressListener.bind(this);
  }

  componentDidMount() {
    document
      .querySelector('input')
      .addEventListener('keypress', this.keypressListener, false);

    document.querySelector('input').focus();
    // $("#search").addEventListener('keypress', function(e) {
    //   var keycode = e.keyCode;
    //   //获取搜索框的值
    //   var searchContent = $(this).val();
    //   if (keycode == '13') {
    //       e.preventDefault();
    //       //请求搜索接口
    //       if (searchContent == '') {
    //           alert('请输入检索内容！');
    //       } else {
    //           alert(searchContent);
    //       }
    //   }
    // });
  }

  componentWillUnmount() {
    document
      .querySelector('input')
      .removeEventListener('keypress', this.keypressListener, false);
  }

  keypressListener(e) {
    const keycode = e.keyCode;

    if (keycode === 13) {
      this.handleOnPressSubmit();
    }
  }

  handleOnPressSubmit() {
    const { form, searchHistoryAdd } = this.props;
    form.validateFields((error, value) => {
      const { search } = value;
      if (search.length > 0) {
        searchHistoryAdd([search]);
        router.push(
          `/${SCREENS.SearchResultList}?${qs.stringify({
            findcontent: search,
          })}`,
        );
      }
    });
  }

  // handleOnPressHistoryItem(val) {
  //   this.setState({ searchText: val });
  //   router.push(
  //     `/${SCREENS.SearchResultList}?${qs.stringify({
  //       findcontent: val,
  //     })}`,
  //   );
  // }

  render() {
    const {
      // items,
      // searchHistoryRemove,
      form: { getFieldProps },
    } = this.props;

    return (
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'search' })} />
        <div style={styles.search}>
          <InputRight
            getFieldProps={getFieldProps}
            style={{ borderBottomWidth: 0 }}
            styleInput={styles.textInput}
            placeholder={formatMessage({ id: 'search' })}
            name="search"
            type="search"
          />
        </div>
        {/* {items.length > 0 && (
          <div style={styles.title}>
            {formatMessage({ id: 'historicalSearch' })}
          </div>
        )}
        <div style={styles.history}>
          {items.map(val => (
            <div
              style={styles.historyItem}
              onClick={() => this.handleOnPressHistoryItem(val)}
              key={val}
            >
              <div style={styles.historyTitle}>{val}</div>
              <CustomIcon
                type="close"
                style={styles.historyCloseIcon}
                onClick={() => searchHistoryRemove(val)}
              />
            </div>
          ))}
        </div> */}
      </div>
    );
  }
}

export default connect(
  state => {
    const { searchHistory } = state;

    return {
      items: searchHistory.items,
    };
  },
  {
    ...searchHistoryActionCreators,
  },
)(createForm()(SearchResult));
