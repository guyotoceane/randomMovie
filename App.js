import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ScrollView
} from 'react-native';

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      isStart:true,
      
    };
  }

  componentDidMount() {
    
  }

  random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  stru = num => {
    var str = '' + num;
    var frmt = '0000000';
    return frmt.substring(0, frmt.length - str.length) + str;
  };

  new = () => {
    
    fetch(
      'http://www.omdbapi.com/?apikey=d59b6cb9&i=tt' +
        this.stru(this.random(0, 1000000))
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isStart: false,
            isLoading: true,
            dataSource: responseJson,
          },
          function() {
            if(responseJson.imdbRating === "N/A" || parseFloat(responseJson.imdbRating)<=6.5 || responseJson.Type == "episode"){
              this.new();
            } else{
              this.setState(
                {
                  isLoading: false,
                })
            }
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {

if (this.state.isStart) {
      return (
        <View style={styles.center}>
          <Button onPress={this.new} title="Random Movie" />
        </View>
      );
    }else if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView style={{ flex: 1, paddingTop: 30 }}>

        <View style={styles.center}>
          <Button onPress={this.new} title="Random Movie" />
          <View style={styles.para}>
              <Image
              style={styles.poster}
              source={{uri: this.state.dataSource.Poster}}
            />
        </View>
          <Text style={styles.title}>{this.state.dataSource.Title}</Text>
        </View>
        <View style={styles.para}>
          <Text style={styles.text}>Type : {this.state.dataSource.Type}</Text>
          <Text style={styles.text}>Rating : {this.state.dataSource.imdbRating}</Text>
          <Text style={styles.text}>Year : {this.state.dataSource.Year}</Text>
          <Text style={styles.text}>Genre : {this.state.dataSource.Genre}</Text>
        </View>
        <View style={styles.para}>
          <Text style={styles.text}>
            Director : {this.state.dataSource.Director}
          </Text>
          <Text style={styles.text}>
            Writer : {this.state.dataSource.Writer}
          </Text>
          <Text style={styles.text}>
            Actors : {this.state.dataSource.Actors}
          </Text>
        </View>
        <View style={styles.para}>
          <Text style={styles.text}>Plot : {this.state.dataSource.Plot}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#e1395a',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  para: {
    paddingTop: 15,
  },
  poster: {
    paddingTop: 15,
    paddingBottom: 100,
    width: 120, 
    height: 180
  },
});