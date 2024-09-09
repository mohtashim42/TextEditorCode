import React, { useRef } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

const HomeScreen = () => {
  const richText = useRef();  // Ref for RichEditor

  const handleChange = (text) => {
    console.log("Description text:", text);
  };

  const dismissKeyboard = () => {
    // Dismiss the keyboard for other inputs
    Keyboard.dismiss();

    // Dismiss the keyboard for RichEditor
    if (richText.current) {
      richText.current.dismissKeyboard();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.editorContainer}>
            <RichToolbar
              editor={richText}
              style={styles.toolbar}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.heading1,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.alignLeft,
                actions.alignCenter,
                actions.alignRight,
                actions.insertLink,
                actions.undo,
                actions.redo,
              ]}
              iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
            />
            <RichEditor
              ref={richText}
              style={styles.editor}
              placeholder="Enter your description here..."
              onChange={handleChange}
              editorInitializedCallback={() => console.log('Editor is ready')}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  editorContainer: {
    marginHorizontal: 10,
    minHeight: 200,
    maxHeight: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  toolbar: {
    backgroundColor: '#f7f7f7',
  },
  editor: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
