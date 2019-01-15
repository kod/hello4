/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';
import qs from 'qs';
import { createForm } from 'rc-form';
import router from 'umi/lib/router';

import BYHeader from '@src/components/BYHeader';

import * as searchHistoryActionCreators from '@src/common/actions/searchHistory';
import { SIDEINTERVAL, SCREENS } from '@src/common/constants';

import InputRight from '@src/components/InputRight';

import styles from './index.less';

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
      <View className={styles.container}>
        <BYHeader title={i18n.search} />
        <View
          style={{
            paddingTop: SIDEINTERVAL,
            paddingBottom: SIDEINTERVAL,
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
        >
          <InputRight
            getFieldProps={getFieldProps}
            style={{ borderBottomWidth: 0 }}
            styleInput={{
              backgroundColor: '#f5f5f5',
              height: 40,
              paddingLeft: SIDEINTERVAL * 0.8,
              paddingRight: SIDEINTERVAL * 0.8,
              marginLeft: 0,
            }}
            placeholder={i18n.search}
            name="search"
            type="search"
          />
        </View>
        {/* {items.length > 0 && (
          <View style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }} className={styles.title}>
            {i18n.historicalSearch}
          </View>
        )}
        <View style={{
          paddingLeft: SIDEINTERVAL,
        }}>
          {items.map(val => (
            <View
              className={styles.historyItem}
              onClick={() => this.handleOnPressHistoryItem(val)}
              key={val}
            >
              <View className={styles.historyTitle}>{val}</View>
              <CustomIcon
                name="close"
                type="close"
                style={{
                  paddingLeft: SIDEINTERVAL,
                  paddingRight: SIDEINTERVAL,
                }}
                className={styles.historyCloseIcon}
                onClick={() => searchHistoryRemove(val)}
              />
            </View>
          ))}
        </View> */}
      </View>
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
