import React, { Component } from 'react';
import { connect } from 'react-redux';


class About extends Component {


    render() {

        return (
            <div className="section-about">
                <div className="section-about-header">
                    <h1>

                        Truyền thông nói gì về BookingCare
                    </h1>
                </div>
                <div className="section-about-content">
                    <div className="section-content-left">
                        <iframe width="550" height="309" src="https://www.youtube.com/embed/FyDQljKtWnI" title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className="section-content-right">
                        <h2>
                            Giải pháp tiết kiệm, thông minh và hiệu quả


                        </h2>
                        <div>

                            Giải pháp của BookingCare là xây dựng nền tảng công nghệ kết nối mạng lưới bác sĩ giỏi và các cơ sở y tế uy tín với thông tin được xác thực rõ ràng, cập nhật. Ứng dụng công nghệ giúp người bệnh dễ dàng lựa chọn đúng bác sĩ chuyên khoa phù hợp với vấn đề của mình và Đặt lịch khám.
                            Tiết kiệm, thông minh và hiệu quả là 3 giá trị, 3 lợi ích người bệnh nhận được qua việc đặt lịch khám. Tiết kiệm thời gian, giảm thời gian chờ đợi, tiết kiệm tiền bạc, công sức. Thông minh vì đã ứng dụng công nghệ trong kết nối người bệnh với bác sĩ và cơ sở y tế. Hiệu quả bởi người bệnh được định hướng đi khám đúng chuyên khoa, đúng bác sĩ phù hợp nhất.
                        </div>



                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
