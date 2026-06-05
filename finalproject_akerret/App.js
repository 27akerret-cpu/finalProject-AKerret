import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, ImageBackground, Dimensions, TextInput,
TouchableHighlight, Image, ScrollView } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {

  state = {
    // Pages
    reportPage: 'block',
    gradePage: 'none', 
    accountPage: 'none',
    // variables
    studentName: 'New Student',
    profilePicture: 'https://codehs.com/uploads/3b3014173329e818b68892fdab5d53ce',
    currentGradeInput: 'Enter Grade (e.g. 3.7)',
    activeStudentIndex: 0,
    totalIndex: 1,
    // Lists
    accountList: [
      {
        name: 'New Student',
        image: 'https://codehs.com/uploads/3b3014173329e818b68892fdab5d53ce',
        gradeHistory: [],
        gpa: '0.00',
        accountIndex: 0,
      },
    ]
  }

  screenDisplay = (show) => {
    this.setState({
      reportPage: 'none',
      gradePage: 'none',
      accountPage: 'none',
      [show]: 'block',
    })
  }

  addSingleGrade = () => {
    let newGrade = parseFloat(this.state.currentGradeInput);

    if (isNaN(newGrade) || newGrade < 0 || newGrade > 4.0) {
      alert("Invalid Grade. Please enter a number between 0 and 4.0.");
      return;
    }

    let updatedAccounts = [...this.state.accountList];
    let currentAccount = updatedAccounts[this.state.activeStudentIndex];

    currentAccount.gradeHistory.push(newGrade);

    let totalPoints = 0;

    for (let i = 0; i < currentAccount.gradeHistory.length; i++) {
      totalPoints += currentAccount.gradeHistory[i];
    }

    currentAccount.gpa = (totalPoints / currentAccount.gradeHistory.length).toFixed(2);

    this.setState({
      currentGradeInput: 'Enter Grade (e.g. 3.7)',
    });
  }

  createAccount = () => {
    let newAccountInfo = {
      name: this.state.studentName,
      image: this.state.profilePicture,
      gradeHistory: [],
      gpa: '0.00',
      accountIndex: this.state.totalIndex,
    }

    this.setState({
      accountList: [
        ...this.state.accountList, newAccountInfo
      ],
            
      studentName: 'New Student',
      profilePicture: 'https://codehs.com/uploads/3b3014173329e818b68892fdab5d53ce',
      totalIndex: this.state.totalIndex + 1
    })
  }

  changeAccount = (index) => {
    this.setState({
     activeStudentIndex: index,
    })
  }

  render() {
    return (
      <View style = {styles.container}>

        {/* Header */}
        <View style = {styles.headerContainer}>
          {/*
          <View style = {styles.profilePictureContainer}>
            <Image
              source={this.state.profilePicture}
              style={styles.profilePictureImage}
            />
          </View>
          */}
          <Text style = {styles.headerText}>
            GPA Tracker
          </Text>
        </View>
        
        {/* Main Pages */}
        {/* Report Page */}
        <View style = {{display: this.state.reportPage}}>

          <ImageBackground
            style = {styles.background}
            source = {{ uri: 'https://codehs.com/uploads/0b006110c14f89ff803e444e8d398bad'}}
          >

            <View style = {styles.contentContainer}>
              
              <View style = {styles.row}>

                <View style = {styles.reportIconContainer}>
                  <Image
                    source={{uri: this.state.accountList[this.state.activeStudentIndex].image}}
                    style={styles.reportImage}
                  />
                </View>

                <View style = {styles.reportHeaderContainer}>
                  <Text style = {styles.reportHeaderMainText}>
                    {this.state.accountList[this.state.activeStudentIndex].name}
                  </Text>
                  <Text style = {styles.reportHeaderSubText}>
                    Active Profile
                  </Text>
                </View>
                
              </View>

              <View style = {styles.accountBox}>
                
                <Text style = {styles.reportBoxHeader}>
                  Unweighted GPA
                </Text>

                <Text style = {styles.reportBoxGPA}>
                  {this.state.accountList[this.state.activeStudentIndex].gpa}
                </Text>

                <Text style = {styles.reportBoxGrades}>
                  Grades Recorded: {this.state.accountList[this.state.activeStudentIndex].gradeHistory.length}
                </Text>

              </View>

            </View>

          </ImageBackground>

        </View>

        {/* Grade Page */}
        <View style = {{display: this.state.gradePage}}>

          <ImageBackground
            style = {styles.background}
            source = {{ uri: 'https://codehs.com/uploads/0b006110c14f89ff803e444e8d398bad'}}
          >

            <View style = {styles.contentContainer}>
              
              <View style = {styles.row}>
                <View style = {styles.pageHeaderContainer}>
                  <Text style = {styles.pageHeaderText}>
                    Add Grade for {this.state.accountList[this.state.activeStudentIndex].name}
                  </Text>
                </View>

                <View style = {styles.pageIconContainer}>
                  <Image
                    source={{ uri: this.state.accountList[this.state.activeStudentIndex].image}}
                    style={styles.profilePictureImage}
                  />
                </View>
              </View>

              <TextInput
                value={this.state.currentGradeInput}
                onChangeText={(currentGradeInput) => this.setState({currentGradeInput})}
                style={styles.gradeInput}
              />
              
              <TouchableHighlight 
                style = {styles.button}
                onPress = {this.addSingleGrade}
              >
                <Text style={styles.buttonText}>
                  Submit Grade
                </Text>
              </TouchableHighlight>

              <View style = {styles.gradeBox}>
                
                <View style = {styles.gradeHeaderContainer}>
                  <Text style = {styles.gradeHeaderText}>
                    GPA Reference Scale
                  </Text>
                </View>
                <View style = {styles.gradeTextContainer}>
                  <Text style = {styles.gradeTextLetter}>
                    A
                  </Text>
                  <Text style = {styles.gradeTextNumber}>
                    4.0
                  </Text>
                </View>
                <View style = {styles.gradeTextContainer}>
                  <Text style = {styles.gradeTextLetter}>
                    A-
                  </Text>
                  <Text style = {styles.gradeTextNumber}>
                    3.7
                  </Text>
                </View>
                <View style = {styles.gradeTextContainer}>
                  <Text style = {styles.gradeTextLetter}>
                    B+
                  </Text>
                  <Text style = {styles.gradeTextNumber}>
                    3.3
                  </Text>
                </View>
                <View style = {styles.gradeTextContainer}>
                  <Text style = {styles.gradeTextLetter}>
                    B
                  </Text>
                  <Text style = {styles.gradeTextNumber}>
                    3.0
                  </Text>
                </View>
                <View style = {styles.gradeTextContainer}>
                  <Text style = {styles.gradeTextLetter}>
                    B-
                  </Text>
                  <Text style = {styles.gradeTextNumber}>
                    2.7
                  </Text>
                </View>
                <View style = {styles.gradeTextContainer}>
                  <Text style = {styles.gradeTextLetter}>
                    C+
                  </Text>
                  <Text style = {styles.gradeTextNumber}>
                    2.3
                  </Text>
                </View>
                <View style = {styles.gradeTextContainer}>
                  <Text style = {styles.gradeTextLetter}>
                    C
                  </Text>
                  <Text style = {styles.gradeTextNumber}>
                    2.0
                  </Text>
                </View>
                <View style = {styles.gradeTextContainer}>
                  <Text style = {styles.gradeTextLetter}>
                    D
                  </Text>
                  <Text style = {styles.gradeTextNumber}>
                    1.0
                  </Text>
                </View>
                <View style = {styles.gradeTextContainer}>
                  <Text style = {styles.gradeTextLetter}>
                    F
                  </Text>
                  <Text style = {styles.gradeTextNumber}>
                    0.0
                  </Text>
                </View>

              </View>

            </View>

          </ImageBackground>

        </View>

        {/* Account Page */}
        <View style = {{display: this.state.accountPage}}>

          <ImageBackground
            style = {styles.background}
            source = {{ uri: 'https://codehs.com/uploads/0b006110c14f89ff803e444e8d398bad'}}
          >

            <View style = {styles.contentContainer}>
              
              <View style = {styles.row}>
                <View style = {styles.pageHeaderContainer}>
                  <Text style = {styles.pageHeaderText}>
                    Student Accounts
                  </Text>
                </View>

                <View style = {styles.pageIconContainer}>
                  <Image
                    source={{ uri: this.state.accountList[this.state.activeStudentIndex].image}}
                    style={styles.profilePictureImage}
                  />
                </View>
              </View>

              <ScrollView>
              {this.state.accountList.map((account, index) => (
              <TouchableHighlight
                key = {index}
                style = {styles.accountListButton}
                onPress = {() => this.changeAccount(index)}
              >
                <View style={styles.accountListContainer}>
                  <Image
                    source = {{ uri: account.image}}
                    style = {styles.accountImage}
                  />
                  <Text style = {styles.accountText}>
                    {account.name}
                  </Text>
                </View>
              </TouchableHighlight>
              ))}
              </ScrollView>

              <View style = {styles.accountBox}>

                <Text style = {styles.pageHeaderText}>
                  New Student Profile
                </Text>
                  
                <TextInput
                  value={this.state.studentName}
                  onChangeText={(studentName) => this.setState({studentName})}
                  style={styles.profileInput}
                />
                <TextInput
                  value={this.state.profilePicture}
                  onChangeText={(profilePicture) => this.setState({profilePicture})}
                  style={styles.profileInput}
                />
                
                <TouchableHighlight 
                  style = {styles.button}
                  onPress = {this.createAccount}
                >
                  <Text style={styles.buttonText}>
                    Create Account
                  </Text>
                </TouchableHighlight>

              </View>

            </View>

          </ImageBackground>

        </View>  

        <View style = {styles.navbarContainer}>
          <TouchableHighlight 
              style = {styles.navButton}
              onPress = {() => this.screenDisplay('reportPage')}
          >
              <Text style={styles.navButtonText}>
                Report
              </Text>
          </TouchableHighlight>
          
          <TouchableHighlight 
              style = {styles.navButton}
              onPress = {() => this.screenDisplay('gradePage')}
          >
              <Text style={styles.navButtonText}>
                + Grade
              </Text>
          </TouchableHighlight>
          
          <TouchableHighlight 
              style = {styles.navButton}
              onPress = {() => this.screenDisplay('accountPage')}
          >
              <Text style={styles.navButtonText}>
                Account
              </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header
  headerContainer: {
    height: deviceHeight*1/7,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'white',
    //backgroundColor: '#fab66b',
    backgroundColor: '#8bd0f0',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  /*
  profilePictureContainer: {
    height: deviceHeight*1/64,
    width: deviceWidth,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 5,
  },
  */
  profilePictureImage: {
    width: deviceHeight*1/16,
    height: deviceHeight*1/16,
  },
  // Content
  background: {
    width: deviceWidth,
    height: deviceHeight*41/57,
  },
  row: {
    flexDirection: 'row',
    width: deviceWidth*9/10,
    borderRadius: 8,
    backgroundColor: 'white',
    margin: 8,
  },
  contentContainer: {
    height: deviceHeight*41/57,
    //backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  pageHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: deviceWidth*15/20,
    height: deviceHeight*1/12,
  },
  pageHeaderText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 12,
  },
  // Report
  reportIconContainer: {
    width: deviceHeight*1/7,
    height: deviceHeight*1/7,
    margin: 10,
  },
  reportImage: {
    width: deviceHeight*1/7,
    height: deviceHeight*1/7,
    borderWidth: 3,
    borderColor: '#E31C79',
    borderRadius: 200,
  },
  reportHeaderContainer: {
    width: deviceWidth*5/10,
    height: deviceHeight*1/7,
    margin: 10,
    justifyContent: 'center',
  },
  reportHeaderMainText: {
    color: '#E31C79',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
  },
  reportHeaderSubText: {
    color: 'gray',
    fontSize: 10,
    marginTop: 2,
  },
  reportBoxHeader: {
    color: '#E31C79',
    fontSize: 22,
    margin: 10,
  },
  reportBoxGPA: {
    color: '#E31C79',
    fontSize: 72,
    fontWeight: 'bold',
    margin: 10,
  },
  reportBoxGrades: {
    color: 'black',
    fontSize: 12,
    margin: 10,
  },
  // Grade
  gradeInput: {
    borderColor: 'lightgray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    width: deviceWidth*8/10,
    height: deviceHeight*1/16,
    margin: 8,
    padding: 12,
    fontSize: 16,
  },
  gradeBox: {
    width: deviceWidth*9/10,
    height: deviceHeight*7.9/20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E31C79',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  gradeHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth*9/11,
    height: deviceHeight*0.79/20,
    borderColor: '#f0f0f0',
    borderBottomWidth: 1,
    margin: 2,
  },
  gradeHeaderText: {
    textAlign: 'center',
    color: '#E31C79',
    fontWeight: 'bold',
    fontSize: deviceHeight*0.5/20,
  },
  gradeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: deviceWidth*9/11,
    height: deviceHeight*0.7/20,
    marginBottom: 1,
    borderColor: '#f7f7f7',
    borderBottomWidth: 1,
  },
  gradeTextLetter: {
    textAlign: 'center',
    color: 'black',
    //fontWeight: 'bold',
    fontSize: deviceHeight*0.45/20,
  },
  gradeTextNumber: {
    textAlign: 'center',
    color: '#E31C79',
    fontWeight: 'bold',
    fontSize: deviceHeight*0.45/20,
  },
  // Account
  accountBox: {
    width: deviceWidth*9/10,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  pageIconContainer: {
    width: deviceWidth*1/10,
    height: deviceHeight*1/12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInput: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 4,
    width: deviceWidth*8/10,
    height: deviceHeight*1/16,
    margin: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E31C79',
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight*1/16,
    width: deviceWidth*8/10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  accountListButton: {
    width: deviceWidth*8/10,
    height: deviceHeight*1/15,
    borderRadius: 8,
    padding: 5,
    margin: 5,
    //backgroundColor: 'white',
    backgroundColor: '#E31C79',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountImage: {
    width: deviceHeight*1/22,
    height: deviceHeight*1/22,
    margin: 10,
  },
  accountText: {
    //color: '#E31C79',
    color: 'white',
    fontWeight: 'bold',
    fontSize: deviceHeight*1/38,
    margin: 10,
  },
  // Navbar
  navbarContainer: {
    height: deviceHeight*1/8,
    width: deviceWidth,
    //backgroundColor: '#fab66b',
    backgroundColor: '#8bd0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 3,
    borderColor: 'white',
  },
  navButton: {
    height: deviceHeight*1/16,
    width: deviceWidth/4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 4,
    borderColor: '#E31C79',
    margin: deviceWidth/32,
  },
  navButtonText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#0b16b5',
  },
})