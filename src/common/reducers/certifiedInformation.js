import {
  CERTIFIED_INFORMATION,
  CERTIFIED_INFORMATION_EDIT,
} from '@src/common/constants/actionTypes';

const initState = {
  loading: false,
  loaded: false,
  refreshing: false,
  certUser: {
    address: '',
    admissiontime: '',
    birthday: '',
    collegeaddr: '',
    collegename: '',
    connectuseridentification1: '',
    connectuseridentification2: '',
    connectuseridentification3: '',
    connectusermsisdn1: '',
    connectusermsisdn2: '',
    connectusermsisdn3: '',
    connectusername1: '',
    connectusername2: '',
    connectusername3: '',
    connectuserrelation1: '',
    connectuserrelation2: '',
    connectuserrelation3: '',
    degree: '',
    department: '',
    email: '',
    funid: '',
    graduationtime: '',
    headimage: '',
    identification: '',
    sex: '',
    specialty: '',
    username: '',
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case CERTIFIED_INFORMATION.CLEAR:
      return {
        ...initState,
      };
    case CERTIFIED_INFORMATION.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        certUser: {
          ...action.payload.certUser,
          admissiontime: action.payload.certUser.admissiontime
            ? `${action.payload.certUser.admissiontime.slice(
                8,
                10,
              )}-${action.payload.certUser.admissiontime.slice(
                5,
                7,
              )}-${action.payload.certUser.admissiontime.slice(0, 4)}`
            : '',
          birthday: action.payload.certUser.birthday
            ? `${action.payload.certUser.birthday.slice(
                8,
                10,
              )}-${action.payload.certUser.birthday.slice(
                5,
                7,
              )}-${action.payload.certUser.birthday.slice(0, 4)}`
            : '',
          graduationtime: action.payload.certUser.graduationtime
            ? `${action.payload.certUser.graduationtime.slice(
                8,
                10,
              )}-${action.payload.certUser.graduationtime.slice(
                5,
                7,
              )}-${action.payload.certUser.graduationtime.slice(0, 4)}`
            : '',
        },
      };
    case CERTIFIED_INFORMATION.FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case CERTIFIED_INFORMATION_EDIT.REQUEST:
      return {
        ...state,
        loading: true,
        certUser: {
          ...state.certUser,
          [action.payload.key]: action.payload.value,
        },
      };
    case CERTIFIED_INFORMATION_EDIT.SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
};
