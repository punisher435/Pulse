
import React, {useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import RouteTabs from './RouteTabs';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from './redux/actions/authactions';

const AuthCheck = (props) => {

    useEffect(() => {
        const fetchData = () => {
            try {
                props.checkAuthenticated();
            } catch (err) {

            }
        }

        fetchData();
    }, []);

    return (
       <RouteTabs />
    )
}

export default connect(null, { checkAuthenticated, load_user })(AuthCheck);





