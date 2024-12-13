import { Text, TextInput, SafeAreaView, Button, StyleSheet, View, Image, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../../../slices/reviewSlice'; // Adjust the path as necessary

const GameDetails = () => {

    const [review, onChangeReview] = useState('');
    const [rating, onChangeRating] = useState('');
  const dispatch = useDispatch();

  const identity = useSelector((state: { user: { username: string } }) => state.user.username);
  // game data passed from home
  const game = useSelector((state: any) => state.game.currentGame);
  

    const rateAndReviewHandler = () => {
        let reviewToBeAdded =         
        {rating: rating,
            username: identity,
            gameId: game.id,
            review: review}
            console.log(reviewToBeAdded)
        dispatch(
          addReview(reviewToBeAdded)
        );
      };



    // Validation logic for buttons
    const isReviewEmpty = review.trim() === '';
    const isRatingEmpty = rating.trim() === '';
    const canSubmit = !isReviewEmpty && !isRatingEmpty;
  
  return (
    
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Game Details</Text>
        {/* <Image style={styles.gameImage} source={{ uri: game.image.medium_url }} /> */}
        <Text style={styles.detail}>Name: {game.name}</Text>
        <Text style={styles.detail}>Description: {game.deck}</Text>
        <Text style={styles.detail}>Release Date: {game.original_release_date}</Text>
        <Text style={styles.detail}>Platform: {game.platforms?.[0]?.name}</Text>
        <Text style={styles.detail}>Game ID: {game.id}</Text> 
        <TextInput
          placeholder="Write your review here!"
          style={styles.textBox}
          onChangeText={onChangeReview}
          value={review}
        />
        <TextInput
          placeholder="Write your rating here!"
          style={styles.textBox}
          keyboardType="numeric"
          onChangeText={onChangeRating}
          value={rating}
        />

{!canSubmit && (
          <View style={styles.buttonContainer}>
            <Button
              title={
                isReviewEmpty && isRatingEmpty
                  ? "Add a Review and Rating"
                  : isReviewEmpty
                  ? "Must Add Review"
                  : "Must Add Rating"
              }
              disabled
              color="#d3d3d3" // Light gray for disabled state
            />
          </View>
        )}
        {canSubmit && (
          <View style={styles.buttonContainer}>
            <Button
              title="Rate & Review"
              onPress={rateAndReviewHandler}
              color="#4CAF50" // Green for active state
            />
          </View>
        )}

      </View>
    </SafeAreaView>
  );
};

export default GameDetails;

// Add basic styles
const styles = StyleSheet.create({
    gameImage: { width: '100%', height: 200, resizeMode: 'contain' },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: 'white',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    detail: {
      fontSize: 16,
      marginBottom: 8,
    },
    textBox: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 16,
      borderRadius: 4,
    },
    buttonContainer: {
      marginBottom: 16,
    },
  });