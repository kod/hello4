/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'dva';
import BYHeader from '@/components/BYHeader';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';

import { WINDOW_HEIGHT, SCREENS, WINDOW_WIDTH } from '@/common/constants';
import BYButton from '@/components/BYButton';

@connect(
  (state, props) => {
    const {
      location: {
        query: { msg = 20000 },
      },
    } = props;

    return {
      msg,
    };
  },
  {},
)
class Address extends React.Component {
  constructor(props) {
    super(props);

    // icon
    const imageError =
      'data:image/png;base64,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';
    const imageSuccess =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAIAAAC3ytZVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNjg2REIyRDY4NzZFNzExOUM1N0IyNzkxNDcwOEIzQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNEE4RDVBRTk3OTMxMUU3OTI0MEE5N0FCMTAzNDc0MyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNEE4RDVBRDk3OTMxMUU3OTI0MEE5N0FCMTAzNDc0MyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M0IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMjRDMzFFQzM2NzdFNzExQTNFQ0M2MUJFOTM0OEZBRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyNjg2REIyRDY4NzZFNzExOUM1N0IyNzkxNDcwOEIzQiIvPiA8L3JkZjpEZXNjcmlwdGlv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';
    const imageProcess =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1RjhDMjUzM0NBODBFNzExQkEwRThCRTcxOEZGOTNCNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowOUE0QTNCNUYxRTUxMUU3OTdDOThEODRCMUZGOUNBMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowOUE0QTNCNEYxRTUxMUU3OTdDOThEODRCMUZGOUNBMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M0IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMjdBQzE5NDY3RUZFNzExQTBEOThGMDA4QTI5OThGMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RjhDMjUzM0NBODBFNzExQkEwRThCRTcxOEZGOTNCNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkwzoJ8AAA9PSURBVHja7F0JtBZlGX4vm6CQbEaCyBKxiBDicgg8hWGC4OGiGAgKkYKKKFukgkkeIckDJ0EwUwgXFhXBAil2IuNCiAXohSCNzRANERO4giL0Ps37H69w7/3nm/lm/lne55zn/JzL/PPPfPPMt7zbl3fq1ClSKGyjnDaBQoWlUGEpVFgKhQpLocJSpBgVgjhpfsGEuNx/JWZLZmNmQ+EFzFrFWEnaqZp85zDzBPMz5sFi/Ddzt3Anc6scExks7DA63sKKKCoyL2O2Y17BbMVs5qENqhX7d50yjoP4djDfYr7O/CvzDebn2mPFH02YXZjXMr/HPCfktm0pvEn+dpT5Z+YS5lLmOyqs+AAPsjezl/RIUQKE3VVI0qPNY74kQ6dO3iOGmsyhzDeZhcwHIyiqktBMrrVQrn2o3IsKK8dow3yOuY85ReZNcUUruYd9ck9tVFjh4xrmCuYmZn9m5QSNIpXlnjbJPV6jwgoe32euZS5jXp2CxdXVcq9r5d5VWAFMyFcJO1D60KHY/V+swvKP2swnmJvj9sYG2GNvkjaprcLyhpuZ25h3UboMudlQQdoEbXOLCss96pNjQJzNPE91VCrQNrOkrepHUf1Rwo3MpyhcWw5cLNvJsSXBx7ebuZf5PvMQ84gcc0SOr0qOewif1ZnnMy8kx8/YWOZAzeWYMADPwhbm7cz5KqyvogpzGvPWEH7rAHOlrLTWkWPxNvHfZQQG0b1Lji/wdFSUBUd7mXj/IODetwbzZeZM5t3MT1VYRI2Yr1CwBsEt8hsYNv7GPBlCL7hZ+GuZclxKjs/yBua3A/pdvJht5Td2pVlYMP69ENDQt0/e4Lky1OUSEPJG4cMyVPYVIdSz/Ft4QRFF0Ye5PI2T99uYiwMQFYa57swGzLEREFVJ2C7X1kCudaXl89eUtr0tVzeYF0ReYZZAvzzmOOYDlnsERAk8KsNPHIGe5j5yojJsvvBzmP2Y1h90WYGDYfdYENUTlkX1e3kofWIsKpJr7yP3stDieWEPfF3aPpFDYXlyvPaDLZ0PFuirmNeXsjKLK3AvPeTeNlk6JyJnH0qisPJkIt3Pwrmw3B8ujbWGkos1co/Dipk4/OB+WYEnRliZ4a+/hXNhlQMD5JQQTAZRAO7xcblnvys8JIX0TpKwHrEw/B1njiTHyryH0oc9cu8jpC284pKkCGuwdMF+AEPfd5iPBbGycfGWI1x4PTlpX4fl30Pl/8IE7n0yOVlGu6L+JgQpLLgxpvo8BzJZLrc4iTUBDJcbZNjFw6wqbCd/20D2jZtuV49ok2Uevrst7sLCJPFFWQl6BVwh15GTDBo20BstprLdTPi/PzDPysH1oU26MZ80nK/Ni62w8gsmnM0fC8i7RR1d/r3MIcwvctST30HufJfw+d2eo2tE2yAua5rBi/qPOPdYU3xMEtFYA5kTczxF6BvQsUHgHlk5lrVKRjjNT2I7x+Le6kYRhldRwSk7MwJzz7ZRXGmVAdi6WjCfZu6Xv6FuxGvkRDr8kEKuI2HNV8iiqi8TSy9D4CkZfqZHZFFj2ih5FC0ghexY0D8Slq/waR/zqjERElUScCzXF2BFWNxbwdHZxePXsbL5pWohWShnQVRIQ5rs8etLZfKpUGGdAUREeslxg/X45hyaFBQBwldoMvdWKGThxY4Df1dP5kf6CHIOlFZC7TB4ET4gJ6z5vZwKixz/nRfrOpYTm/SZ5hTwLjwkU5Gqxf6ORBAYuEcWM12EJyzurRCI1snDV1f4mJMp7IkK7qiSCqsgdQ0VCOH4v5Kc2qqhzrHGe/gOAtYGUfhRCoozR4xs1XqQ6DE71Mk791ZI22rv4auwV+3R55pTwJfr1r2Dudd3w+yx7vPwnUzypiK3QIdQzeD4a0MRFvdW8I15KSk0Qk0LkcDXDY+vF4qwyElkMMXvKNmJD3HCfw2PLwpcWNxbwRfYy/A3EM7xM32ekQFCq00iHQrC6LFQ6Mu0kCxqmG/T5xkZwCj9rMtjYShdEIawvNQCmKjPMnJAgsvbWY5Br3Zr4EMhD4PIbWtteH4UY1ULe/RwSEwJpRUjgR8XyTDLvP6AieW9l4fzq4U9utgv4oGdCh6URtI7FcjwV+Tn5CbCMs2ihStgqT6/yOM1oVW4Ggp5GGzKH00Nz40J4gl9bumE2zmWl+jQOdq8KizbwsJOVtu1eVVYZQ2DFcjcETlfm1aFlQ3I9jXdmfRVbVoVVjZcaXhOFN7fok2rwsqGKwzPuYY0kC/1cGPHMi3sX6DNmgggDr4jsy7zE3Kc13usCIsn7ijRY2q/WqfPJNZAcgxCl0cxzy32d4xCi8ipArTP71DYnMys8wiR0UiGeE+NUENr3GmiAlCfIp+cLWOa+BVWE8ML27Oww+hj+nxiCwRx3pDlmDrkGL/L+RGWaflmNYrGewh0m8uABV0XP8JqaHhx/9TnE1sgl8EkHr6zH2HVNby4Hfp8YovzDY+v40dYtQx/bKc+n9jCNMniiB9hme4K+qE+n9gCqz2TnVn/4kdYNQwv7qA+n9jiKLmv//ofcrYK9iysKoYXdyilD+WBhNwH0vSylexG8OYAyhK6nE1Yplk8J1MqrPEJEdfH5Gxnt6KU/0eAAYykS7KdKJtV3STHH1V0D6d4KMlU3/lFzO8DxddQ9AUxeNgZ5ALpnTCnmi9DJvkVVlpxwmPbJEVcgK8ki2xDnVEPlF8woVpChOVnx9akDIu+kE1YJy2fLy54VudcwQrrU8PzVU9IuzxF/o29qRZXNmGZmg9qJ6Rdjsvk9T0VVzDCOmB4vloJahsEszVys7RWcZkLy9SSfmHC2gcVV7oyx6q47ArLdCholNB2Gqfisius3SosFZcXVLAsrIsT3l7j5PNhn+ICompE/Ro5bhtkZ2EzAfgOUUP2fZvCetvwoprnF0zAxXyu4oqluFCxcRKdaTb6FfNRuXdXla+zDYWIYTcpRQRRtUpBT5/EYRGbCsygkm2RqDv7c+ZUK3OshR1Gw55jGsfentIBiOvBhIirJbnbjHQws7uNHgswrcPQIUWr6vEJEddQcu90H2FLWBsMLxJFU/NUXLES11WGI1I5G8IyrcWAbI/WlC7EXVwmuQ3Ykq6KDWFhcyXTCrrdKX2Is7hMTAnwHx/1LSyewGNVaBrw1ZPSibiKa7XBsWtszbEAU0csqgA2U3HFRlyox3/cxXGoODPJprC81Gu/hdKLuIkLhvBhlL1gHmxZ66wJi4dD2LJM7VkDKN0x9XETF4IbezD3lvB/SETGvjrj3J7M5MG/ZNhQyO5ARZLFKRcXmTyQMs4RhvtnkUx7EOQIoykK78H7gj13jKKJTYQ1z8MbOCzlwoqjuODnXSX0DNfJDzwcFpJ59gp2Sr+EFLaGxXvjcsOmWTUzPfzGKNWVNXHBn9c5icJ6nmlaCvIm5kWqKyviyiN3zuJ4CYuHw49krmX6G+NVU9bEhQC8BknrsQAvm1teT45zWmFHXE0SJyzutbAV7588CrK8asqKuI4mTljFJpFeuvC7VE++xQXXS6HH32tBjtnjReYr8vvNIiMs7rWWk7cdKB6h5OUehi2u2ZSl/mcJQMj4RBEkiqv1lukJrPrY8GEKWfaS+Cni4SXmG/uzTKd0BQLaFBfcLaM9nB9molGlPG/8DRGkv42EsLjX8mqdRVGvYaqlEsV1J5XuOkGIOCI9TcseIJXLTUBAf2a3KPRYwEhymQ5UwhytjWrpDMAR/C0ZDf7IXEvO9iJ9mJeStwo4IwyOvdPWjeSdOuVva8H8gglPerwgNNJllN6CuGEtztADVnJ5PEoq1DMYtQLrsTJzLS/13Rsz56oJIlBUNhAVUMumon2BVXtAhkQvQFjNVH3+gaHI8KXfGxlhibhm8ccyj19HEuT9qoHAsMLg2EWREpZgkI/5EuxbA1UDga023QQOoMb7pMgJi3utd/njDq+LCOZvmP1UB9YBA+jdVHahYljz+5JhRZmweiyIC/urzPT4dUzinyEnVl5hFzB+IuiyJG8JEpIvJ/8lMb+CIJId7mG2JW92qvIizNo2u2XF/4HAAdTVQCz7RTI8ojf7V1B2DqvgXgsrkZ4+5lsYFuHXmqamiECwlZydu14NSlSBCEsA4yciR7/wcY4h5CRi1FQtxA9B7iSxXIZFP4Cd6w1S98/pOE/a5BtpFBYAd4/fGG0UzF3PHE4aFYFRAM5obESJgMv95NQIHRi1tglj75sxYkrwA7gmHpOVSxrjuSCax5kv0JklopqTE4r0cpTmpGEIC15uRI4+b+FcSH0qlCG2XIqENdzFtAILpglpElZGXMj9n2XhXNXk7cXcq2MKRHUuua/QjBCZemkSFskK8UcWhsUMkGEN2wxqkCe5vjx66aouj4Vd8rq0Cav4sGizBkEPmdDOTejq8ZuGxzdOo7Ay4kJAP5zWJyzeRx9ZKcGb342SY1w13Yz0k7QKK4MZIgDbEaTwicGwulvmJk1jLqy/Gx5fmHZhATCiIjx5cwDnRn0uZL7skJ5sjMzL4mYLwzzSbaz7LrLsTI6rsEgaDc7RZwL8jTYyr8Pbj7huJCgMpi83IrKNinJu5O1tl+HpmPTOKLtpUlX6hFxrNvcY6lrBUPpZFIQVlVKORWKOWCqrxhoB/hbcIH2FmQcC6/VWETneeoToIjYJwW9H5GFl0trPISeOHCu16nK++uR4CDDRRvRAi1IEe5as8jrLYuPHLoWAnh1JptNLaZuP5X5WR+R5Rq5GKCrZrJcGDKsOFATQmsLf9KCvCGKIy+MXkJMOhh26OjHrkBPPvlJexg+j9CCjaL1GJCqcz/2i1lgBAGlzJja4D8gJ4+4k3+tITuhx5Nopym6R2TKkzPCw5I4L0P69knpjUQbexEGyclydUHE1V2HlDpuk+y8tbjvOqKjCyj1WiWmia4J6sG0qrOhgifRgMHgiHOd4TO8D7q05KqzoARZ7REzUJSdm6a2YXf9k7bGiDVRzRlW6jD0K5RB3RPyan2P+NKELkkRGYaLXGiurLdSaQuQl6koUReDaYOWHdwF2ugHkL4sp0kj67lzvkJOfOE1WX8j4bSef6NmaBtgG8PFhx7Q3mRvJ8ShspGKhQqfXl8ovCDayuKx6Viosf73FutPMFfDdISsYwXEN5RPzNWRi1xJWlOPOlu8UyWIB5ztYjPvI8TOCO2XuVOaiIiMkPPCgRRU2fFf0UyjSMsdSqLAUKiyFQoWlUGEpVFgKhVv8T4ABAC3hJscAlfY/AAAAAElFTkSuQmCC';

    this.state = {
      errorJson: {
        10000: {
          text: 'Thành công',
          icon: imageSuccess,
        },
        20000: {
          text: 'Lỗi',
          icon: imageError,
        },
        50006: {
          text:
            'Người dùng đã bị thêm vào danh sách đen, xin hãy liên hệ chăm sóc khách hang',
          icon: imageError,
        },
        30000: {
          text: 'Đang xử lý đơn hàng',
          icon: imageProcess,
        },
        40000: {
          text: 'Vui lòng không thanh toán lặp lại',
          icon: imageError,
        },
      },
    };
  }

  renderMainContent() {
    const { errorJson } = this.state;
    const { msg } = this.props;

    const styles = {
      container: {
        height: WINDOW_HEIGHT - 45,
        display: 'flex',
      },
      main: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
      image: {
        width: 150,
        height: 150,
        marginBottom: 30,
      },
      text: {
        fontSize: 18,
        paddingBottom: WINDOW_HEIGHT * 0.1,
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.main}>
          <img
            alt=""
            style={styles.image}
            src={`${errorJson[msg].icon}?x-oss-process=image/format,webp`}
          />
          <div style={styles.text}>{errorJson[msg].text}</div>
          <BYButton
            text={formatMessage({ id: 'confirm' })}
            styleWrap={{
              width: WINDOW_WIDTH,
              paddingBottom: WINDOW_HEIGHT * 0.2,
            }}
            onClick={() => router.push(`/${SCREENS.Me}`)}
          />
        </div>
      </div>
    );
  }

  render() {
    // const { authUser } = this.props;

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        height: WINDOW_HEIGHT,
        backgroundColor: '#fff',
      },
    };
    return (
      <div style={styles.container}>
        <BYHeader />
        {/* <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
          router={router}
          SCREENS={SCREENS}
        /> */}

        {this.renderMainContent()}
      </div>
    );
  }
}

export default Address;
