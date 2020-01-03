import React, {Component} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import NetworkChart from '../components/NetworkChart';
import SaturationChart from '../components/SaturationChart';
import MemUsageChart from '../components/MemUsageChart';
import CpuUsageChart from '../components/CpuUsageChart';
import * as actions from '../actions';
import {Spinner} from '../containers/common';

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    const {apiKey, url} = this.props;
    this.setState({refreshing: true});
    this.props.fetchMetrics({apiKey, url});
    this.setState({refreshing: false});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isLoading ? (
          // loading feature
          <View style={styles.indicatorContainer}>
            <Spinner size="large" />
          </View>
        ) : (
          <ScrollView
            style={{marginTop: 10}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }>
            {Object.keys(this.props).map((dataType, i) => {
              if (dataType === 'networkTraffic') {
                return (
                  <View key={i}>
                    <NetworkChart data={this.props[dataType]} />
                  </View>
                );
              } else if (dataType === 'cpuUsage') {
                return (
                  <View key={i}>
                    <CpuUsageChart data={this.props[dataType]} />
                  </View>
                );
              } else if (dataType === 'memUsage') {
                return (
                  <View key={i}>
                    <MemUsageChart data={this.props[dataType]} />
                  </View>
                );
              } else if (dataType === 'saturation') {
                return (
                  <View key={i}>
                    <SaturationChart data={this.props[dataType]} />
                  </View>
                );
              }
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
};

const mapStateToProps = ({metrics, api}) => {
  const {isLoading, cpuUsage, memUsage, networkTraffic, saturation} = metrics;

  return {isLoading, cpuUsage, memUsage, networkTraffic, saturation};
};

const mapDispatchToProps = dispatch => ({
  fetchMetrics: () => dispatch(actions.fetchMetrics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
