import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

// 
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor() {
            super();

            // clears existing errors in the state
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            // when an error occurs, it sets the state to that error message
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {

            // console.log('Will Unmount', this.requestInterceptor, this.responseInterceptor);

            // removing the interceptors when the hoc is no longer needed to prevent memory leaks
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        state = {
            error: null
        }

        // componentWillMount () {
        //     // clears existing errors in the state
        //     axios.interceptors.request.use(req => {
        //         this.setState({error: null});
        //         return req;
        //     });

        //     // when an error occurs, it sets the state to that error message
        //     axios.interceptors.response.use(res => res, error => {
        //         this.setState({error: error});
        //     });
        // }

        // clears the error when the backdrop is clicked to cancel it
        errorConfirmedHandler = () => {
            console.log(this.state);
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        cancelBackdrop={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;