import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://www.omdbapi.com/?apikey=44659dcd&i=tt1092026')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,

        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
   
    }

    return(
      <View style={{flex: 1, paddingTop:30}}>
          <View style={styles.center}>
              <Text style={styles.title}>{this.state.dataSource.Title}</Text>
          </View>
          <View style={styles.para}>
              <Text style={styles.text}>Year : {this.state.dataSource.Year}</Text>
              <Text style={styles.text}>Genre : {this.state.dataSource.Genre}</Text>
          </View>
          <View style={styles.para}>
              <Text style={styles.text}>Director : {this.state.dataSource.Director}</Text>
              <Text style={styles.text}>Writer : {this.state.dataSource.Writer}</Text>
              <Text style={styles.text}>Actors : {this.state.dataSource.Actors}</Text>
          </View>
          <View style={styles.para}>
              <Text style={styles.text}>Plot : {this.state.dataSource.Plot}</Text>
          </View>
          <Text style={styles.text}>Lien image a debug : {this.state.img}</Text>

      </View>
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
    alignItems: 'center', 
  },
  para: {
    paddingTop: 15,
  }
});