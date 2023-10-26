// routes/report.js
const express = require('express');
const router = express.Router();
const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Business = require('../models/Business');

// Generate a financial report for a business within a specific time interval
router.get('/generate/:businessId/:interval', async (req, res) => {
    
  const businessId = req.params.businessId;
  const interval = req.params.interval; // Interval can be 'daily', 'weekly'

  if (!businessId || !interval) return res.send("business not found or error occured")
  // Get the start and end dates based on the selected interval
  const { startDate, endDate } = getReportDateRange(interval);

  // console.log(startDate, endDate)

  // Find the business to get its income percentage
  const business = await Business.Business.findById(businessId);
  if (!business) return res.send("Business not found");

  // Calculate total income for the selected time interval
  const income = await Income.Income.aggregate([
    {
      $match: {
        businessId: business._id,
        date_created: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' },
      },
    },
  ]);
  if (!income) return res.send('Income data not found');

  
  // Calculate total expenses for the selected time interval
  const expenses = await Expense.Expense.aggregate([
    {
      $match: {
        businessId: business._id,
        date_created: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' },
      },
    },
  ]);
  if (!expenses) return res.send('expenses data not found');

  // Calculate profit/loss
  const totalIncome = income.length > 0 ? income[0].total : 0;
  const totalExpenses = expenses.length > 0 ? expenses[0].total : 0;
  const profitLoss = totalIncome - totalExpenses;

  // Calculate self-payment based on the income percentage
  const selfPayment = (totalIncome * business.incomePercentage) / 100;

  res.status(200).json({
    income: totalIncome,
    expenses: totalExpenses,
    profitLoss,
    selfPayment,
  });
});

// Helper function to calculate start and end dates for the report
function getReportDateRange(interval) {
  const currentDate = new Date();
  let startDate, endDate;

  switch (interval) {
    case 'daily':
      // For daily reports, start from the current day and end at the same day
      startDate = new Date(currentDate);
      endDate = new Date(currentDate);
      break;
    case 'weekly':
      // For weekly reports, start from the beginning of the current week and end at the end of the current week
      const daysUntilSunday = 7 - currentDate.getDay();
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - daysUntilSunday);
      endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + daysUntilSunday);
      break;
    case 'monthly':
      // For monthly reports, start from the beginning of the current month and end at the end of the current month
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      break;
    case 'yearly':
      // For yearly reports, start from the beginning of the current year and end at the end of the current year
      startDate = new Date(currentDate.getFullYear(), 0, 1);
      endDate = new Date(currentDate.getFullYear(), 11, 31);
      break;
    default:
      return new Error('Case not Found');
      break;
  }

  // Return an object with startDate and endDate
  return { startDate, endDate };
}


module.exports = router;
