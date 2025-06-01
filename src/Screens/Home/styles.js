import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bgPrimary},

  topContainer: {
    flex: 0.15,
  },
  downContainer: {
    flex: 0.75,
  },
  addButton: {
    backgroundColor: colors.primary,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 5,
    alignSelf: 'flex-end',
    marginRight: 20,
  },

  expenseContainer: {
    borderWidth: 1,
    borderColor: colors.primaryDark,
    paddingVertical: 20,
    flexDirection: 'row',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'space-evenly',
  },
  expensesContainer: {
    alignItems: 'center',
  },
  textRed: {
    color: 'red',
    marginVertical: 2,
    fontSize: 12,
    fontFamily: fonts.SplineSansRegular,
  },
  textGreen: {
    color: 'green',
    fontSize: 12,
    fontFamily: fonts.SplineSansRegular,
    marginVertical: 2,
  },
  textBlue: {
    color: '#007bff',
    fontSize: 12,
    marginVertical: 2,

    fontFamily: fonts.SplineSansRegular,
  },
  tvExpenses: {
    fontFamily: fonts.SplineSansBold,
    fontSize: 12,
  },
  label: {
    marginHorizontal: 15,
    fontWeight: '600',
    marginTop: 10,
  },
  itemContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.bgPrimary,
    elevation: 2,
    marginBottom: 5,
    justifyContent: 'center',
  },
  date: {
    fontSize: 12,
    fontFamily: fonts.SplineSansBold,
  },
  category: {
    color: '#777',
    fontSize: 12,
    fontFamily: fonts.SplineSansRegular,
  },
  amount: {
    fontSize: 12,
    fontWeight: '500',
    alignSelf: 'flex-end',
    color: '#444',
  },
});

export default styles;
