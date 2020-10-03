import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
  },

  teacherList: {
    marginTop: -40,
  },

  searchForm: {
    marginTop: 24,
    marginBottom: 8,
  },

  label: {
    color: '#D4C2FF',
    fontFamily: 'Poppins_400Regular',
  },

  selectBlock: {
    width: '48%'
  },

  selectGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  datePickerView: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 16,
  },

  datePickerButton: {
    height: 50,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },

  datePickerText: {
    color: '#C1BCCC',
  }
});

export default styles;
