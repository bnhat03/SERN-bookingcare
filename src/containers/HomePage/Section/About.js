// Embeded a video youtube + paragraph

import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
    render() {
        return (
            <div className='section-sahre section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về Biện Văn Nhật!
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/s7BYsMkRpjM"
                            title="Aziz Hedra - Somebody&#39;s Pleasure (Official Lyric Video)"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>Từ bao lâu nay, anh cứ mãi cô đơn bao lâu rồi ai đâu hay. Ngày cứ thế trôi qua riêng anh một mình nơi đây. Những phút giây trôi qua tầm tay. Chờ một....</p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
