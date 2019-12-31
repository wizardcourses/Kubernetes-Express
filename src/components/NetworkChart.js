import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryBrushContainer,
} from 'victory-native';

export default class NetworkChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomDomain: null,
      selectedDomain: null,
    };

    this.handleZoom = this.handleZoom.bind(this);
    this.handleBrush = this.handleBrush.bind(this);
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    return (
      <View>
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Network Usage</Text>
        </View>
        <VictoryChart
          responsive
          padding={{top: 0, left: 70, right: 10, bottom: 30}}
          height={250}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom}
            />
          }>
          <VictoryAxis
            dependentAxis
            tickFormat={x => (x / 1000).toFixed(1) + 'kb/s'}
          />
          <VictoryAxis
            tickFormat={x => {
              const date = new Date(x * 1000);
              const hours = date.getHours();
              const minutes = '0' + date.getMinutes();
              const seconds = '0' + date.getSeconds();
              return (
                hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
              );
            }}
          />
          <VictoryLine style={lineTheme} data={this.props.data} />
        </VictoryChart>
        <VictoryChart
          responsive
          padding={{top: 0, left: 10, right: 10, bottom: 30}}
          height={90}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              onBrushDomainChange={this.handleBrush}
            />
          }>
          <VictoryAxis
            tickFormat={x => {
              const date = new Date(x * 1000);
              const hours = date.getHours();
              const minutes = '0' + date.getMinutes();
              const seconds = '0' + date.getSeconds();
              return (
                hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
              );
            }}
          />
          <VictoryLine style={lineTheme} data={this.props.data} />
        </VictoryChart>
      </View>
    );
  }
}

const styles = {
  headerWrapper: {
    alignSelf: 'stretch',
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 10,
    marginTop: 50,
    marginRight: 10,
    marginBottom: 10,
    borderTopColor: '#076280',
    borderBottomColor: '#ddd',
    borderTopWidth: 5,
    borderBottomWidth: 1,
    position: 'relative',
  },
  header: {
    alignSelf: 'flex-start',
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#076280',
  },
};

const lineTheme = {
  data: {
    stroke: '#076280',
    strokeWidth: 1,
  },
  parent: {
    border: '1px solid #000',
  },
};
