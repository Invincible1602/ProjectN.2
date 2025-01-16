import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { Component } from 'react';

// TextAnimator is a class component to animate text words
class TextAnimator extends Component {
  // Constructor to initialize the component
  constructor(props) {
    super(props);
    this.animatedValues = []; // Array to hold animated values for each word

    // Split the content prop into individual words
    const textArr = props.content.trim().split(' ');

    // Initialize an Animated.Value for each word
    textArr.forEach((_, i) => {
      this.animatedValues[i] = new Animated.Value(0);
    });

    this.textArr = textArr; // Store the words in the component instance
  }

  // Lifecycle method that runs after the component mounts
  componentDidMount() {
    this.animate(); // Start the animation
  }

  // Method to animate the words
  animate(toValue = 1) {
    // Create an array of animations for each word
    const animations = this.textArr.map((_, i) => {
      return Animated.timing(this.animatedValues[i], {
        toValue, // Animate to the given value (default is 1)
        duration: 500, // Duration of each animation
        useNativeDriver: true, // Use native driver for better performance
      });
    });

    // Start the animations in a staggered manner with 100ms delay between each
    Animated.stagger(100, animations).start();
  }

  // Render method to display the component
  render() {
    return (
      // Wrapper View for the text
      <View style={[this.props.style, styles.textWrapper]}>
        {/* Map over the words and create an Animated.Text for each */}
        {this.textArr.map((word, index) => {
          return (
            <Animated.Text
              key={`${word}-${index}`} // Unique key for each word
              style={[
                this.props.textStyle, // Apply passed text styles
                {
                  opacity: this.animatedValues[index], // Animate opacity
                  transform: [
                    {
                      translateY: this.animatedValues[index].interpolate({
                        inputRange: [0, 1], // Input range for animation
                        outputRange: [20, 0], // Translate from 20 to 0
                      }),
                    },
                  ],
                },
              ]}
            >
              {word}
              {/* Add a space between words */}
              {index < this.textArr.length - 1 ? ' ' : ''}
            </Animated.Text>
          );
        })}
      </View>
    );
  }
}

export default TextAnimator;

// Styles for the component
const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row', // Arrange words in a row
    flexWrap: 'wrap', // Allow words to wrap to the next line
    justifyContent: 'center', // Center the words horizontally
  },
});
