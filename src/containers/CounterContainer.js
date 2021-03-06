import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import Counter from '../components/Counter';
import { increment, decrement } from '../store/modules/counter'


class CounterContainer extends Component {
    handleIncrement = () => {
        this.props.increment();
    };
    handleDecrement = () => {
        this.props.decrement();
    }
    render() {
        const { color, number } = this.props
        return (
            <Counter color={color} value={number} onIncrement={this.handleIncrement} onDecrement={this.handleDecrement} />
        )
    }
}

const mapStateToProps = ({ counter }) => ({
    color: counter.color,
    number: counter.number
})

//bindActionCreators를 이용하여 여러개의 액션을 dispatch한다.
// const mapDispatchToProps = dispatch =>
//     bindActionCreators({ increment, decrement }, dispatch);


// **** 함수가 아닌 객체 설정시 자동 bindActionCreators 됨
const mapDispatchToProps = { increment, decrement };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CounterContainer)
