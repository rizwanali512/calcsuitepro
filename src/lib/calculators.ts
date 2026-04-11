export type Calculator = {
  id: string;
  name: string;
  slug: string;
  category: 'finance' | 'math' | 'physics' | 'health';
  subcategory?: string;
  keywords?: {
    primary: string;
    secondary: string[];
  };
  formula: string;
  description: string;
  inputs: {
    name: string;
    label: string;
    type: 'number' | 'select';
    /** Unit or helper line under the label (e.g. "Kilograms"). */
    hint?: string;
    /** Required when type is "select". */
    options?: { value: string; label: string }[];
    /** Optional input placeholder (falls back to sensible defaults in the template). */
    placeholder?: string;
    /** Centralized validation and UX hints (merged with global inference in `validateInputs`). */
    validation?: {
      min?: number;
      max?: number;
      message?: string;
      placeholder?: string;
    };
  }[];
};

export const calculators: Calculator[] = [
  {
    id: 'compound_interest',
    name: 'Compound Interest',
    slug: 'compound-interest-calculator',
    category: 'finance',
    subcategory: 'investment',
    formula: 'A = P(1 + r/n)^{nt}',
    description:
      'Estimate investment growth with compounding using principal, rate, time, and compounding frequency.',
    inputs: [
      { name: 'principal', label: 'Principal', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'timePeriod', label: 'Time Period (years)', type: 'number' },
      { name: 'compoundingFrequency', label: 'Compounding Frequency', type: 'number' },
    ],
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    slug: 'emi-calculator',
    category: 'finance',
    subcategory: 'loans',
    formula: 'EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]',
    description:
      'Calculate monthly EMI from principal amount, interest rate, and loan tenure.',
    inputs: [
      { name: 'principal', label: 'Principal', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'tenure', label: 'Tenure (months)', type: 'number' },
    ],
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    category: 'math',
    formula: '(value / total) x 100',
    description:
      'Find percentage from value and total for marks, growth, discounts, and comparisons.',
    inputs: [
      { name: 'value', label: 'Value', type: 'number' },
      { name: 'total', label: 'Total', type: 'number' },
    ],
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    slug: 'bmi-calculator',
    category: 'health',
    keywords: {
      primary: 'bmi calculator',
      secondary: ['body mass index calculator', 'calculate bmi online', 'bmi formula kg m'],
    },
    formula: 'BMI = weight (kg) ÷ height (m)²',
    description:
      'Compute Body Mass Index from weight in kilograms and height in meters or centimeters. Educational screening metric only—not a diagnosis.',
    inputs: [
      {
        name: 'weight',
        label: 'Weight',
        type: 'number',
        hint: 'Kilograms',
        validation: {
          min: 30,
          max: 300,
          message: 'Weight must be between 30 and 300 kg',
          placeholder: 'e.g. 70',
        },
      },
      {
        name: 'height',
        label: 'Height (m or cm)',
        type: 'number',
        hint: 'e.g. 1.75 m or 175 cm',
        validation: {
          min: 1,
          max: 2.5,
          message: 'Use meters (1–2.5) or centimeters (100–250)',
          placeholder: 'e.g. 1.75 or 175',
        },
      },
    ],
  },
  {
    id: 'simple_interest',
    name: 'Simple Interest',
    slug: 'simple-interest-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'SI = (P x R x T) / 100',
    description:
      'Compute simple interest using principal amount, annual rate, and time period.',
    inputs: [
      { name: 'principal', label: 'Principal', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'timePeriod', label: 'Time Period (years)', type: 'number' },
    ],
  },
  {
    id: 'profit_margin',
    name: 'Profit Margin Calculator',
    slug: 'profit-margin-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: '(profit / revenue) x 100',
    description:
      'Calculate profit margin percentage from cost and revenue values.',
    inputs: [
      { name: 'cost', label: 'Cost', type: 'number' },
      { name: 'revenue', label: 'Revenue', type: 'number' },
    ],
  },
  {
    id: 'loan',
    name: 'Loan Calculator',
    slug: 'loan-calculator',
    category: 'finance',
    subcategory: 'loans',
    formula: 'Monthly Payment = [P x r x (1+r)^n] / [(1+r)^n - 1]',
    description:
      'Estimate monthly loan payments from principal, interest rate, and tenure.',
    inputs: [
      { name: 'principal', label: 'Principal', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'tenure', label: 'Tenure (months)', type: 'number' },
    ],
  },
  {
    id: 'savings',
    name: 'Savings Calculator',
    slug: 'savings-calculator',
    category: 'finance',
    subcategory: 'investment',
    formula: 'Future Value = P(1 + r)^t',
    description:
      'Calculate projected savings growth based on initial amount, rate, and time.',
    inputs: [
      { name: 'principal', label: 'Initial Savings', type: 'number' },
      { name: 'interestRate', label: 'Annual Interest Rate (%)', type: 'number' },
      { name: 'timePeriod', label: 'Time Period (years)', type: 'number' },
    ],
  },
  {
    id: 'roi',
    name: 'ROI Calculator',
    slug: 'roi-calculator',
    category: 'finance',
    subcategory: 'investment',
    formula: 'ROI = [(Return - Investment) / Investment] x 100',
    description:
      'Measure return on investment percentage using gain and investment amount.',
    inputs: [
      { name: 'investment', label: 'Investment', type: 'number' },
      { name: 'returnValue', label: 'Return Value', type: 'number' },
    ],
  },
  {
    id: 'tax',
    name: 'Tax Calculator',
    slug: 'tax-calculator',
    category: 'finance',
    subcategory: 'tax',
    formula: 'Tax = Income x (Tax Rate / 100)',
    description:
      'Estimate tax amount from taxable income and tax rate percentage.',
    inputs: [
      { name: 'income', label: 'Taxable Income', type: 'number' },
      { name: 'taxRate', label: 'Tax Rate (%)', type: 'number' },
    ],
  },
  {
    id: 'discount',
    name: 'Discount Calculator',
    slug: 'discount-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'Discounted Price = Original Price x (1 - Discount/100)',
    description:
      'Calculate final price after applying a percentage discount.',
    inputs: [
      { name: 'originalPrice', label: 'Original Price', type: 'number' },
      { name: 'discountRate', label: 'Discount Rate (%)', type: 'number' },
    ],
  },
  {
    id: 'inflation',
    name: 'Inflation Calculator',
    slug: 'inflation-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'Future Cost = Present Cost x (1 + Inflation Rate)^Years',
    description:
      'Estimate future purchasing cost using inflation rate and time.',
    inputs: [
      { name: 'presentCost', label: 'Present Cost', type: 'number' },
      { name: 'inflationRate', label: 'Inflation Rate (%)', type: 'number' },
      { name: 'timePeriod', label: 'Time Period (years)', type: 'number' },
    ],
  },
  {
    id: 'salary',
    name: 'Salary Calculator',
    slug: 'salary-calculator',
    category: 'finance',
    subcategory: 'tax',
    formula: 'Net Salary = Gross Salary - Deductions',
    description:
      'Estimate net salary from gross salary and total deductions.',
    inputs: [
      { name: 'grossSalary', label: 'Gross Salary', type: 'number' },
      { name: 'deductions', label: 'Deductions', type: 'number' },
    ],
  },
  {
    id: 'area',
    name: 'Area Calculator',
    slug: 'area-calculator',
    category: 'math',
    formula: 'Area = Length x Width',
    description:
      'Calculate area of a rectangle using length and width.',
    inputs: [
      { name: 'length', label: 'Length', type: 'number' },
      { name: 'width', label: 'Width', type: 'number' },
    ],
  },
  {
    id: 'volume',
    name: 'Volume Calculator',
    slug: 'volume-calculator',
    category: 'math',
    formula: 'Volume = Length x Width x Height',
    description:
      'Calculate volume of a cuboid using length, width, and height.',
    inputs: [
      { name: 'length', label: 'Length', type: 'number' },
      { name: 'width', label: 'Width', type: 'number' },
      { name: 'height', label: 'Height', type: 'number' },
    ],
  },
  {
    id: 'average',
    name: 'Average Calculator',
    slug: 'average-calculator',
    category: 'math',
    formula: 'Average = Sum of Values / Number of Values',
    description:
      'Compute average from total sum and count of values.',
    inputs: [
      { name: 'sum', label: 'Sum of Values', type: 'number' },
      { name: 'count', label: 'Count of Values', type: 'number' },
    ],
  },
  {
    id: 'ratio',
    name: 'Ratio Calculator',
    slug: 'ratio-calculator',
    category: 'math',
    formula: 'Ratio = a : b',
    description:
      'Calculate and compare ratio values from two numbers.',
    inputs: [
      { name: 'a', label: 'Value A', type: 'number' },
      { name: 'b', label: 'Value B', type: 'number' },
    ],
  },
  {
    id: 'fraction',
    name: 'Fraction Calculator',
    slug: 'fraction-calculator',
    category: 'math',
    formula: 'Decimal = Numerator / Denominator',
    description:
      'Convert fraction to decimal using numerator and denominator.',
    inputs: [
      { name: 'numerator', label: 'Numerator', type: 'number' },
      { name: 'denominator', label: 'Denominator', type: 'number' },
    ],
  },
  {
    id: 'square_root',
    name: 'Square Root Calculator',
    slug: 'square-root-calculator',
    category: 'math',
    formula: 'Square Root = sqrt(x)',
    description:
      'Find square root of a number instantly.',
    inputs: [{ name: 'value', label: 'Value', type: 'number' }],
  },
  {
    id: 'algebra',
    name: 'Algebra Calculator',
    slug: 'algebra-calculator',
    category: 'math',
    formula: 'x = (c - b) / a',
    description:
      'Solve a basic linear algebra equation of form ax + b = c.',
    inputs: [
      { name: 'a', label: 'Coefficient a', type: 'number' },
      { name: 'b', label: 'Coefficient b', type: 'number' },
      { name: 'c', label: 'Constant c', type: 'number' },
    ],
  },
  {
    id: 'perimeter',
    name: 'Perimeter Calculator',
    slug: 'perimeter-calculator',
    category: 'math',
    formula: 'Perimeter = 2 x (Length + Width)',
    description:
      'Calculate perimeter of a rectangle from length and width.',
    inputs: [
      { name: 'length', label: 'Length', type: 'number' },
      { name: 'width', label: 'Width', type: 'number' },
    ],
  },
  {
    id: 'distance',
    name: 'Distance Calculator',
    slug: 'distance-calculator',
    category: 'math',
    formula: 'Distance = Speed x Time',
    description:
      'Calculate distance using speed and time values.',
    inputs: [
      { name: 'speed', label: 'Speed', type: 'number' },
      { name: 'time', label: 'Time', type: 'number' },
    ],
  },
  {
    id: 'velocity',
    name: 'Velocity Calculator',
    slug: 'velocity-calculator',
    category: 'physics',
    formula: 'Velocity = Displacement / Time',
    description:
      'Compute velocity from displacement and time.',
    inputs: [
      { name: 'displacement', label: 'Displacement', type: 'number' },
      { name: 'time', label: 'Time', type: 'number' },
    ],
  },
  {
    id: 'acceleration',
    name: 'Acceleration Calculator',
    slug: 'acceleration-calculator',
    category: 'physics',
    formula: 'Acceleration = (Final Velocity - Initial Velocity) / Time',
    description:
      'Calculate acceleration using initial velocity, final velocity, and time.',
    inputs: [
      { name: 'initialVelocity', label: 'Initial Velocity', type: 'number' },
      { name: 'finalVelocity', label: 'Final Velocity', type: 'number' },
      { name: 'time', label: 'Time', type: 'number' },
    ],
  },
  {
    id: 'force',
    name: 'Force Calculator',
    slug: 'force-calculator',
    category: 'physics',
    formula: 'Force = Mass x Acceleration',
    description:
      'Calculate force using mass and acceleration.',
    inputs: [
      { name: 'mass', label: 'Mass', type: 'number' },
      { name: 'acceleration', label: 'Acceleration', type: 'number' },
    ],
  },
  {
    id: 'energy',
    name: 'Energy Calculator',
    slug: 'energy-calculator',
    category: 'physics',
    formula: 'Kinetic Energy = 1/2 x m x v^2',
    description:
      'Estimate kinetic energy using mass and velocity.',
    inputs: [
      { name: 'mass', label: 'Mass', type: 'number' },
      { name: 'velocity', label: 'Velocity', type: 'number' },
    ],
  },
  {
    id: 'power',
    name: 'Power Calculator',
    slug: 'power-calculator',
    category: 'physics',
    formula: 'Power = Work / Time',
    description:
      'Calculate power from work done and time.',
    inputs: [
      { name: 'work', label: 'Work', type: 'number' },
      { name: 'time', label: 'Time', type: 'number' },
    ],
  },
  {
    id: 'density',
    name: 'Density Calculator',
    slug: 'density-calculator',
    category: 'physics',
    formula: 'Density = Mass / Volume',
    description:
      'Compute density from mass and volume.',
    inputs: [
      { name: 'mass', label: 'Mass', type: 'number' },
      { name: 'volume', label: 'Volume', type: 'number' },
    ],
  },
  {
    id: 'pressure',
    name: 'Pressure Calculator',
    slug: 'pressure-calculator',
    category: 'physics',
    formula: 'Pressure = Force / Area',
    description:
      'Calculate pressure using force and surface area.',
    inputs: [
      { name: 'force', label: 'Force', type: 'number' },
      { name: 'area', label: 'Area', type: 'number' },
    ],
  },
  {
    id: 'frequency',
    name: 'Frequency Calculator',
    slug: 'frequency-calculator',
    category: 'physics',
    formula: 'Frequency = 1 / Time Period',
    description:
      'Calculate frequency from time period.',
    inputs: [{ name: 'timePeriod', label: 'Time Period', type: 'number' }],
  },
  {
    id: 'momentum',
    name: 'Momentum Calculator',
    slug: 'momentum-calculator',
    category: 'physics',
    formula: 'Momentum = Mass x Velocity',
    description:
      'Compute momentum from mass and velocity.',
    inputs: [
      { name: 'mass', label: 'Mass', type: 'number' },
      { name: 'velocity', label: 'Velocity', type: 'number' },
    ],
  },
  {
    id: 'work',
    name: 'Work Calculator',
    slug: 'work-calculator',
    category: 'physics',
    formula: 'Work = Force x Distance',
    description:
      'Calculate work done using force and distance.',
    inputs: [
      { name: 'force', label: 'Force', type: 'number' },
      { name: 'distance', label: 'Distance', type: 'number' },
    ],
  },
  {
    id: 'calorie',
    name: 'Calorie Calculator',
    slug: 'calorie-calculator',
    category: 'health',
    keywords: {
      primary: 'calorie calculator',
      secondary: ['tdee calculator', 'daily calories calculator', 'maintenance calories'],
    },
    formula:
      'TDEE = BMR × activity factor. BMR (Mifflin–St Jeor): men 10w + 6.25h − 5a + 5; women 10w + 6.25h − 5a − 161 (w=kg, h=cm, a=age).',
    description:
      'Estimate total daily energy expenditure (maintenance calories) from age, sex, height, weight, and typical activity—using Mifflin–St Jeor BMR × standard activity multipliers.',
    inputs: [
      {
        name: 'gender',
        label: 'Sex',
        type: 'select',
        options: [
          { value: 'woman', label: 'Female' },
          { value: 'man', label: 'Male' },
        ],
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        hint: 'Years',
        validation: {
          min: 10,
          max: 120,
          message: 'Age must be between 10 and 120 years',
          placeholder: 'e.g. 32',
        },
      },
      {
        name: 'heightCm',
        label: 'Height',
        type: 'number',
        hint: 'Centimeters',
        validation: {
          min: 50,
          max: 250,
          message: 'Height must be between 50 and 250 cm',
          placeholder: 'e.g. 170',
        },
      },
      {
        name: 'weight',
        label: 'Weight',
        type: 'number',
        hint: 'Kilograms',
        validation: {
          min: 30,
          max: 300,
          message: 'Weight must be between 30 and 300 kg',
          placeholder: 'e.g. 72',
        },
      },
      {
        name: 'activity',
        label: 'Activity level',
        type: 'select',
        options: [
          { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
          { value: 'light', label: 'Light (1–3 days/week)' },
          { value: 'moderate', label: 'Moderate (3–5 days/week)' },
          { value: 'active', label: 'Active (6–7 days/week)' },
          { value: 'very_active', label: 'Very active (hard daily / physical job)' },
        ],
      },
    ],
  },
  {
    id: 'bmr',
    name: 'BMR Calculator',
    slug: 'bmr-calculator',
    category: 'health',
    keywords: {
      primary: 'bmr calculator',
      secondary: ['basal metabolic rate calculator', 'mifflin st jeor calculator', 'resting calories'],
    },
    formula:
      'BMR (Mifflin–St Jeor): men = 10w + 6.25h − 5a + 5; women = 10w + 6.25h − 5a − 161 (w=kg, h=cm, a=age).',
    description:
      'Estimate basal metabolic rate (calories at rest) from weight, height, age, and sex using the Mifflin–St Jeor equation—common in apps and coaching tools.',
    inputs: [
      {
        name: 'gender',
        label: 'Sex',
        type: 'select',
        options: [
          { value: 'woman', label: 'Female' },
          { value: 'man', label: 'Male' },
        ],
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        hint: 'Years',
        validation: {
          min: 10,
          max: 120,
          message: 'Age must be between 10 and 120 years',
          placeholder: 'e.g. 32',
        },
      },
      {
        name: 'heightCm',
        label: 'Height',
        type: 'number',
        hint: 'Centimeters',
        validation: {
          min: 50,
          max: 250,
          message: 'Height must be between 50 and 250 cm',
          placeholder: 'e.g. 170',
        },
      },
      {
        name: 'weight',
        label: 'Weight',
        type: 'number',
        hint: 'Kilograms',
        validation: {
          min: 30,
          max: 300,
          message: 'Weight must be between 30 and 300 kg',
          placeholder: 'e.g. 72',
        },
      },
    ],
  },
  {
    id: 'body_fat',
    name: 'Body Fat Calculator',
    slug: 'body-fat-calculator',
    category: 'health',
    keywords: {
      primary: 'body fat calculator',
      secondary: ['body fat percentage calculator', 'fat percentage estimate', 'bmi body fat formula'],
    },
    formula:
      'Body fat % ≈ 1.20×BMI + 0.23×age − 10.8×(male=1) − 5.4 (Deurenberg-style estimate; not DEXA).',
    description:
      'Estimate body fat percentage from weight, height, age, and sex using a BMI-based regression model—useful for trends, not a lab replacement.',
    inputs: [
      {
        name: 'gender',
        label: 'Sex',
        type: 'select',
        options: [
          { value: 'woman', label: 'Female' },
          { value: 'man', label: 'Male' },
        ],
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        hint: 'Years',
        validation: {
          min: 10,
          max: 120,
          message: 'Age must be between 10 and 120 years',
          placeholder: 'e.g. 32',
        },
      },
      {
        name: 'heightCm',
        label: 'Height',
        type: 'number',
        hint: 'Centimeters',
        validation: {
          min: 50,
          max: 250,
          message: 'Height must be between 50 and 250 cm',
          placeholder: 'e.g. 170',
        },
      },
      {
        name: 'weight',
        label: 'Weight',
        type: 'number',
        hint: 'Kilograms',
        validation: {
          min: 30,
          max: 300,
          message: 'Weight must be between 30 and 300 kg',
          placeholder: 'e.g. 72',
        },
      },
    ],
  },
  {
    id: 'ideal_weight',
    name: 'Ideal Weight Calculator',
    slug: 'ideal-weight-calculator',
    category: 'health',
    formula: 'Ideal Weight = 50 + 0.9 x (Height cm - 152)',
    description:
      'Estimate ideal body weight using height-based formula.',
    inputs: [{ name: 'height', label: 'Height (cm)', type: 'number' }],
  },
  {
    id: 'water_intake',
    name: 'Water Intake Calculator',
    slug: 'water-intake-calculator',
    category: 'health',
    formula: 'Water Intake (L) = Weight x 0.033',
    description:
      'Estimate daily water intake from body weight.',
    inputs: [{ name: 'weight', label: 'Weight (kg)', type: 'number' }],
  },
  {
    id: 'pregnancy',
    name: 'Pregnancy Calculator',
    slug: 'pregnancy-calculator',
    category: 'health',
    formula: 'Due Date = Last Menstrual Period + 280 days',
    description:
      'Estimate due date based on last menstrual period.',
    inputs: [{ name: 'lmpDaysAgo', label: 'Days Since Last Menstrual Period', type: 'number' }],
  },
  {
    id: 'ovulation',
    name: 'Ovulation Calculator',
    slug: 'ovulation-calculator',
    category: 'health',
    formula: 'Ovulation Day ≈ Cycle Length - 14',
    description:
      'Estimate ovulation day from average cycle length.',
    inputs: [{ name: 'cycleLength', label: 'Cycle Length (days)', type: 'number' }],
  },
  {
    id: 'heart_rate',
    name: 'Heart Rate Calculator',
    slug: 'heart-rate-calculator',
    category: 'health',
    formula: 'Target Heart Rate = (220 - Age) x Intensity',
    description:
      'Estimate target heart rate using age and workout intensity.',
    inputs: [
      { name: 'age', label: 'Age', type: 'number' },
      { name: 'intensity', label: 'Intensity (0-1)', type: 'number' },
    ],
  },
  {
    id: 'lean_body_mass',
    name: 'Lean Body Mass Calculator',
    slug: 'lean-body-mass-calculator',
    category: 'health',
    formula: 'LBM = Weight x (1 - Body Fat % / 100)',
    description:
      'Estimate lean body mass using total weight and body fat percentage.',
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number' },
      { name: 'bodyFat', label: 'Body Fat (%)', type: 'number' },
    ],
  },
  {
    id: 'waist_hip_ratio',
    name: 'Waist to Hip Ratio Calculator',
    slug: 'waist-hip-ratio-calculator',
    category: 'health',
    formula: 'Waist to Hip Ratio = Waist / Hip',
    description:
      'Calculate waist-to-hip ratio from waist and hip measurements.',
    inputs: [
      { name: 'waist', label: 'Waist', type: 'number' },
      { name: 'hip', label: 'Hip', type: 'number' },
    ],
  },
  {
    id: 'sip',
    name: 'SIP Calculator',
    slug: 'sip-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'FV = P x [((1 + r)^n - 1) / r] x (1 + r)',
    description: 'Estimate future value of monthly SIP investments.',
    inputs: [
      { name: 'monthlyInvestment', label: 'Monthly Investment', type: 'number' },
      { name: 'annualReturn', label: 'Expected Annual Return (%)', type: 'number' },
      { name: 'months', label: 'Investment Duration (months)', type: 'number' },
    ],
  },
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    slug: 'mortgage-calculator',
    category: 'finance',
    subcategory: 'mortgage',
    formula: 'M = [P x r x (1+r)^n] / [(1+r)^n - 1]',
    description: 'Estimate monthly mortgage payment for home loans.',
    inputs: [
      { name: 'principal', label: 'Loan Principal', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'tenure', label: 'Loan Term (months)', type: 'number' },
    ],
  },
  {
    id: 'loan_interest',
    name: 'Loan Interest Calculator',
    slug: 'loan-interest-calculator',
    category: 'finance',
    subcategory: 'loans',
    formula: 'Interest = Total Repayment - Principal',
    description: 'Calculate total interest paid over the full loan term.',
    inputs: [
      { name: 'principal', label: 'Principal', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'tenure', label: 'Tenure (months)', type: 'number' },
    ],
  },
  {
    id: 'retirement',
    name: 'Retirement Calculator',
    slug: 'retirement-calculator',
    category: 'finance',
    subcategory: 'retirement',
    formula: 'Corpus = Current Savings x (1+r)^t + Contributions',
    description: 'Estimate retirement corpus using savings, contribution, and return assumptions.',
    inputs: [
      { name: 'currentSavings', label: 'Current Savings', type: 'number' },
      { name: 'monthlyContribution', label: 'Monthly Contribution', type: 'number' },
      { name: 'annualReturn', label: 'Expected Annual Return (%)', type: 'number' },
      { name: 'years', label: 'Years to Retirement', type: 'number' },
    ],
  },
  {
    id: 'income_tax',
    name: 'Income Tax Calculator',
    slug: 'income-tax-calculator',
    category: 'finance',
    subcategory: 'tax',
    formula: 'Tax = Taxable Income x Tax Rate',
    description: 'Estimate income tax from taxable income and tax slab rate.',
    inputs: [
      { name: 'taxableIncome', label: 'Taxable Income', type: 'number' },
      { name: 'taxRate', label: 'Tax Rate (%)', type: 'number' },
    ],
  },
  {
    id: 'credit_card_balance',
    name: 'Credit Card Payoff Calculator',
    slug: 'credit-card-payoff-calculator',
    category: 'finance',
    subcategory: 'loans',
    formula: 'Months = -log(1 - rB/P) / log(1 + r)',
    description: 'Estimate payoff time for credit card balances.',
    inputs: [
      { name: 'balance', label: 'Current Balance', type: 'number' },
      { name: 'apr', label: 'APR (%)', type: 'number' },
      { name: 'monthlyPayment', label: 'Monthly Payment', type: 'number' },
    ],
  },
  {
    id: 'fd',
    name: 'Fixed Deposit Calculator',
    slug: 'fixed-deposit-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'Maturity = P x (1 + r/n)^(nt)',
    description: 'Calculate fixed deposit maturity amount with compounding.',
    inputs: [
      { name: 'principal', label: 'Deposit Amount', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'timePeriod', label: 'Tenure (years)', type: 'number' },
      { name: 'compoundingFrequency', label: 'Compounding Frequency', type: 'number' },
    ],
  },
  {
    id: 'rd',
    name: 'Recurring Deposit Calculator',
    slug: 'recurring-deposit-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'M = R x [(1+i)^n - 1] / [1 - (1+i)^(-1/3)]',
    description: 'Estimate recurring deposit maturity value from monthly deposits.',
    inputs: [
      { name: 'monthlyDeposit', label: 'Monthly Deposit', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'months', label: 'Tenure (months)', type: 'number' },
    ],
  },
  {
    id: 'break_even',
    name: 'Break Even Calculator',
    slug: 'break-even-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'Break-even Units = Fixed Cost / (Price - Variable Cost)',
    description: 'Find units required to break even on costs.',
    inputs: [
      { name: 'fixedCost', label: 'Fixed Cost', type: 'number' },
      { name: 'pricePerUnit', label: 'Price per Unit', type: 'number' },
      { name: 'variableCostPerUnit', label: 'Variable Cost per Unit', type: 'number' },
    ],
  },
  {
    id: 'depreciation',
    name: 'Depreciation Calculator',
    slug: 'depreciation-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'Depreciation = (Cost - Salvage Value) / Useful Life',
    description: 'Estimate annual depreciation using straight-line method.',
    inputs: [
      { name: 'assetCost', label: 'Asset Cost', type: 'number' },
      { name: 'salvageValue', label: 'Salvage Value', type: 'number' },
      { name: 'usefulLife', label: 'Useful Life (years)', type: 'number' },
    ],
  },
  {
    id: 'currency',
    name: 'Currency Converter Calculator',
    slug: 'currency-converter-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'Converted Amount = Amount x Exchange Rate',
    description: 'Convert one currency amount into another.',
    inputs: [
      { name: 'amount', label: 'Amount', type: 'number' },
      { name: 'exchangeRate', label: 'Exchange Rate', type: 'number' },
    ],
  },
  {
    id: 'cagr',
    name: 'CAGR Calculator',
    slug: 'cagr-calculator',
    category: 'finance',
    subcategory: 'investment',
    formula: 'CAGR = [(Ending / Beginning)^(1/n) - 1] x 100',
    description: 'Calculate compound annual growth rate over multiple years.',
    inputs: [
      { name: 'beginningValue', label: 'Beginning Value', type: 'number' },
      { name: 'endingValue', label: 'Ending Value', type: 'number' },
      { name: 'years', label: 'Years', type: 'number' },
    ],
  },
  {
    id: 'npv',
    name: 'NPV Calculator',
    slug: 'npv-calculator',
    category: 'finance',
    subcategory: 'investment',
    formula: 'NPV = Sum[Cash Flow_t / (1+r)^t] - Initial Investment',
    description: 'Estimate net present value for investment cash flows.',
    inputs: [
      { name: 'initialInvestment', label: 'Initial Investment', type: 'number' },
      { name: 'cashFlow', label: 'Annual Cash Flow', type: 'number' },
      { name: 'discountRate', label: 'Discount Rate (%)', type: 'number' },
      { name: 'years', label: 'Years', type: 'number' },
    ],
  },
  {
    id: 'irr',
    name: 'IRR Approximation Calculator',
    slug: 'irr-calculator',
    category: 'finance',
    subcategory: 'investment',
    formula: 'IRR ≈ Rate where NPV = 0',
    description: 'Estimate internal rate of return for project evaluation.',
    inputs: [
      { name: 'initialInvestment', label: 'Initial Investment', type: 'number' },
      { name: 'annualCashFlow', label: 'Annual Cash Flow', type: 'number' },
      { name: 'years', label: 'Years', type: 'number' },
    ],
  },
  {
    id: 'payback_period',
    name: 'Payback Period Calculator',
    slug: 'payback-period-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'Payback Period = Initial Investment / Annual Cash Flow',
    description: 'Find time required to recover an investment.',
    inputs: [
      { name: 'initialInvestment', label: 'Initial Investment', type: 'number' },
      { name: 'annualCashFlow', label: 'Annual Cash Flow', type: 'number' },
    ],
  },
  {
    id: 'percentage_increase',
    name: 'Percentage Increase Calculator',
    slug: 'percentage-increase-calculator',
    category: 'math',
    formula: 'Increase % = [(New - Old) / Old] x 100',
    description: 'Calculate percentage increase from old and new values.',
    inputs: [
      { name: 'oldValue', label: 'Old Value', type: 'number' },
      { name: 'newValue', label: 'New Value', type: 'number' },
    ],
  },
  {
    id: 'percentage_decrease',
    name: 'Percentage Decrease Calculator',
    slug: 'percentage-decrease-calculator',
    category: 'math',
    formula: 'Decrease % = [(Old - New) / Old] x 100',
    description: 'Calculate percentage decrease between two values.',
    inputs: [
      { name: 'oldValue', label: 'Old Value', type: 'number' },
      { name: 'newValue', label: 'New Value', type: 'number' },
    ],
  },
  {
    id: 'lcm',
    name: 'LCM Calculator',
    slug: 'lcm-calculator',
    category: 'math',
    formula: 'LCM(a,b) = |a x b| / HCF(a,b)',
    description: 'Find least common multiple of two numbers.',
    inputs: [
      { name: 'a', label: 'Number A', type: 'number' },
      { name: 'b', label: 'Number B', type: 'number' },
    ],
  },
  {
    id: 'hcf',
    name: 'HCF Calculator',
    slug: 'hcf-calculator',
    category: 'math',
    formula: 'HCF = Greatest common divisor of a and b',
    description: 'Find highest common factor of two numbers.',
    inputs: [
      { name: 'a', label: 'Number A', type: 'number' },
      { name: 'b', label: 'Number B', type: 'number' },
    ],
  },
  {
    id: 'quadratic',
    name: 'Quadratic Equation Calculator',
    slug: 'quadratic-calculator',
    category: 'math',
    formula: 'x = [-b ± sqrt(b^2 - 4ac)] / 2a',
    description: 'Solve quadratic equations using coefficients a, b, and c.',
    inputs: [
      { name: 'a', label: 'Coefficient a', type: 'number' },
      { name: 'b', label: 'Coefficient b', type: 'number' },
      { name: 'c', label: 'Coefficient c', type: 'number' },
    ],
  },
  {
    id: 'linear_equation',
    name: 'Linear Equation Calculator',
    slug: 'linear-equation-calculator',
    category: 'math',
    formula: 'x = (c - b) / a',
    description: 'Solve linear equation of form ax + b = c.',
    inputs: [
      { name: 'a', label: 'Coefficient a', type: 'number' },
      { name: 'b', label: 'Constant b', type: 'number' },
      { name: 'c', label: 'Constant c', type: 'number' },
    ],
  },
  {
    id: 'exponent',
    name: 'Exponent Calculator',
    slug: 'exponent-calculator',
    category: 'math',
    formula: 'Result = base^exponent',
    description: 'Calculate powers with base and exponent.',
    inputs: [
      { name: 'base', label: 'Base', type: 'number' },
      { name: 'exponent', label: 'Exponent', type: 'number' },
    ],
  },
  {
    id: 'logarithm',
    name: 'Logarithm Calculator',
    slug: 'logarithm-calculator',
    category: 'math',
    formula: 'log_b(x) = ln(x) / ln(b)',
    description: 'Calculate logarithm value using number and base.',
    inputs: [
      { name: 'value', label: 'Value', type: 'number' },
      { name: 'base', label: 'Base', type: 'number' },
    ],
  },
  {
    id: 'permutation',
    name: 'Permutation Calculator',
    slug: 'permutation-calculator',
    category: 'math',
    formula: 'nPr = n! / (n-r)!',
    description: 'Calculate number of permutations for n and r.',
    inputs: [
      { name: 'n', label: 'n', type: 'number' },
      { name: 'r', label: 'r', type: 'number' },
    ],
  },
  {
    id: 'combination',
    name: 'Combination Calculator',
    slug: 'combination-calculator',
    category: 'math',
    formula: 'nCr = n! / [r! x (n-r)!]',
    description: 'Calculate number of combinations for n and r.',
    inputs: [
      { name: 'n', label: 'n', type: 'number' },
      { name: 'r', label: 'r', type: 'number' },
    ],
  },
  {
    id: 'standard_deviation',
    name: 'Standard Deviation Calculator',
    slug: 'standard-deviation-calculator',
    category: 'math',
    formula: 'SD = sqrt(sum((x - mean)^2) / n)',
    description: 'Estimate standard deviation from variance inputs.',
    inputs: [
      { name: 'sumSquaredDiff', label: 'Sum of Squared Differences', type: 'number' },
      { name: 'count', label: 'Count of Values', type: 'number' },
    ],
  },
  {
    id: 'median',
    name: 'Median Calculator',
    slug: 'median-calculator',
    category: 'math',
    formula: 'Median = Middle value of ordered dataset',
    description: 'Estimate median from two middle values for even datasets.',
    inputs: [
      { name: 'middleLow', label: 'Middle Value 1', type: 'number' },
      { name: 'middleHigh', label: 'Middle Value 2', type: 'number' },
    ],
  },
  {
    id: 'mode',
    name: 'Mode Calculator',
    slug: 'mode-calculator',
    category: 'math',
    formula: 'Mode = Most frequently occurring value',
    description: 'Check mode candidate using highest frequency count.',
    inputs: [
      { name: 'modeValue', label: 'Mode Candidate Value', type: 'number' },
      { name: 'frequency', label: 'Frequency', type: 'number' },
    ],
  },
  {
    id: 'probability',
    name: 'Probability Calculator',
    slug: 'probability-calculator',
    category: 'math',
    formula: 'P(E) = Favorable Outcomes / Total Outcomes',
    description: 'Calculate event probability from favorable and total outcomes.',
    inputs: [
      { name: 'favorable', label: 'Favorable Outcomes', type: 'number' },
      { name: 'total', label: 'Total Outcomes', type: 'number' },
    ],
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry Calculator',
    slug: 'trigonometry-calculator',
    category: 'math',
    formula: 'sin(theta) = opposite / hypotenuse',
    description: 'Calculate sine ratio from opposite and hypotenuse.',
    inputs: [
      { name: 'opposite', label: 'Opposite Side', type: 'number' },
      { name: 'hypotenuse', label: 'Hypotenuse', type: 'number' },
    ],
  },
  {
    id: 'kinetic_energy',
    name: 'Kinetic Energy Calculator',
    slug: 'kinetic-energy-calculator',
    category: 'physics',
    formula: 'KE = 1/2 x m x v^2',
    description: 'Compute kinetic energy from mass and velocity.',
    inputs: [
      { name: 'mass', label: 'Mass', type: 'number' },
      { name: 'velocity', label: 'Velocity', type: 'number' },
    ],
  },
  {
    id: 'potential_energy',
    name: 'Potential Energy Calculator',
    slug: 'potential-energy-calculator',
    category: 'physics',
    formula: 'PE = m x g x h',
    description: 'Calculate gravitational potential energy.',
    inputs: [
      { name: 'mass', label: 'Mass', type: 'number' },
      { name: 'gravity', label: 'Gravity', type: 'number' },
      { name: 'height', label: 'Height', type: 'number' },
    ],
  },
  {
    id: 'gravitational_force',
    name: 'Gravitational Force Calculator',
    slug: 'gravitational-force-calculator',
    category: 'physics',
    formula: 'F = G x (m1 x m2) / r^2',
    description: 'Estimate gravitational force between two masses.',
    inputs: [
      { name: 'mass1', label: 'Mass 1', type: 'number' },
      { name: 'mass2', label: 'Mass 2', type: 'number' },
      { name: 'distance', label: 'Distance', type: 'number' },
    ],
  },
  {
    id: 'ohms_law',
    name: "Ohm's Law Calculator",
    slug: 'ohms-law-calculator',
    category: 'physics',
    formula: 'V = I x R',
    description: 'Calculate voltage from current and resistance.',
    inputs: [
      { name: 'current', label: 'Current (A)', type: 'number' },
      { name: 'resistance', label: 'Resistance (Ohm)', type: 'number' },
    ],
  },
  {
    id: 'wave_speed',
    name: 'Wave Speed Calculator',
    slug: 'wave-speed-calculator',
    category: 'physics',
    formula: 'v = f x lambda',
    description: 'Calculate wave speed from frequency and wavelength.',
    inputs: [
      { name: 'frequency', label: 'Frequency', type: 'number' },
      { name: 'wavelength', label: 'Wavelength', type: 'number' },
    ],
  },
  {
    id: 'torque',
    name: 'Torque Calculator',
    slug: 'torque-calculator',
    category: 'physics',
    formula: 'Torque = Force x Distance',
    description: 'Compute torque from force and lever arm distance.',
    inputs: [
      { name: 'force', label: 'Force', type: 'number' },
      { name: 'distance', label: 'Distance', type: 'number' },
    ],
  },
  {
    id: 'angular_velocity',
    name: 'Angular Velocity Calculator',
    slug: 'angular-velocity-calculator',
    category: 'physics',
    formula: 'omega = theta / t',
    description: 'Calculate angular velocity from angular displacement and time.',
    inputs: [
      { name: 'angularDisplacement', label: 'Angular Displacement', type: 'number' },
      { name: 'time', label: 'Time', type: 'number' },
    ],
  },
  {
    id: 'centripetal_force',
    name: 'Centripetal Force Calculator',
    slug: 'centripetal-force-calculator',
    category: 'physics',
    formula: 'F = m x v^2 / r',
    description: 'Compute centripetal force for circular motion.',
    inputs: [
      { name: 'mass', label: 'Mass', type: 'number' },
      { name: 'velocity', label: 'Velocity', type: 'number' },
      { name: 'radius', label: 'Radius', type: 'number' },
    ],
  },
  {
    id: 'projectile_range',
    name: 'Projectile Range Calculator',
    slug: 'projectile-range-calculator',
    category: 'physics',
    formula: 'Range = (v^2 x sin(2theta)) / g',
    description: 'Estimate horizontal range of a projectile.',
    inputs: [
      { name: 'velocity', label: 'Initial Velocity', type: 'number' },
      { name: 'angle', label: 'Launch Angle (degrees)', type: 'number' },
      { name: 'gravity', label: 'Gravity', type: 'number' },
    ],
  },
  {
    id: 'refractive_index',
    name: 'Refractive Index Calculator',
    slug: 'refractive-index-calculator',
    category: 'physics',
    formula: 'n = c / v',
    description: 'Calculate refractive index from light speeds.',
    inputs: [
      { name: 'speedInVacuum', label: 'Speed in Vacuum', type: 'number' },
      { name: 'speedInMedium', label: 'Speed in Medium', type: 'number' },
    ],
  },
  {
    id: 'coulomb_force',
    name: "Coulomb's Law Calculator",
    slug: 'coulombs-law-calculator',
    category: 'physics',
    formula: 'F = k x q1 x q2 / r^2',
    description: 'Estimate electric force between two charges.',
    inputs: [
      { name: 'charge1', label: 'Charge 1', type: 'number' },
      { name: 'charge2', label: 'Charge 2', type: 'number' },
      { name: 'distance', label: 'Distance', type: 'number' },
    ],
  },
  {
    id: 'capacitance',
    name: 'Capacitance Calculator',
    slug: 'capacitance-calculator',
    category: 'physics',
    formula: 'C = Q / V',
    description: 'Compute capacitance from charge and voltage.',
    inputs: [
      { name: 'charge', label: 'Charge', type: 'number' },
      { name: 'voltage', label: 'Voltage', type: 'number' },
    ],
  },
  {
    id: 'inductance',
    name: 'Inductance Calculator',
    slug: 'inductance-calculator',
    category: 'physics',
    formula: 'L = (N x Phi) / I',
    description: 'Estimate inductance from turns, flux, and current.',
    inputs: [
      { name: 'turns', label: 'Number of Turns', type: 'number' },
      { name: 'flux', label: 'Magnetic Flux', type: 'number' },
      { name: 'current', label: 'Current', type: 'number' },
    ],
  },
  {
    id: 'heat_transfer',
    name: 'Heat Transfer Calculator',
    slug: 'heat-transfer-calculator',
    category: 'physics',
    formula: 'Q = m x c x DeltaT',
    description: 'Calculate heat transfer from mass, specific heat, and temperature change.',
    inputs: [
      { name: 'mass', label: 'Mass', type: 'number' },
      { name: 'specificHeat', label: 'Specific Heat', type: 'number' },
      { name: 'temperatureChange', label: 'Temperature Change', type: 'number' },
    ],
  },
  {
    id: 'macro',
    name: 'Macro Calculator',
    slug: 'macro-calculator',
    category: 'health',
    formula: 'Calories = (Protein x 4) + (Carbs x 4) + (Fat x 9)',
    description: 'Estimate daily macro calorie totals from protein, carbs, and fats.',
    inputs: [
      { name: 'protein', label: 'Protein (g)', type: 'number' },
      { name: 'carbs', label: 'Carbs (g)', type: 'number' },
      { name: 'fat', label: 'Fat (g)', type: 'number' },
    ],
  },
  {
    id: 'tdee',
    name: 'TDEE Calculator',
    slug: 'tdee-calculator',
    category: 'health',
    formula: 'TDEE = BMR x Activity Factor',
    description: 'Estimate total daily energy expenditure.',
    inputs: [
      { name: 'bmr', label: 'BMR', type: 'number' },
      { name: 'activityFactor', label: 'Activity Factor', type: 'number' },
    ],
  },
  {
    id: 'protein_intake',
    name: 'Protein Intake Calculator',
    slug: 'protein-intake-calculator',
    category: 'health',
    formula: 'Protein (g) = Weight x Multiplier',
    description: 'Estimate daily protein needs based on body weight.',
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number' },
      { name: 'multiplier', label: 'Protein Multiplier (g/kg)', type: 'number' },
    ],
  },
  {
    id: 'bmi_prime',
    name: 'BMI Prime Calculator',
    slug: 'bmi-prime-calculator',
    category: 'health',
    formula: 'BMI Prime = BMI / 25',
    description: 'Calculate BMI prime score from BMI value.',
    inputs: [{ name: 'bmi', label: 'BMI', type: 'number' }],
  },
  {
    id: 'heart_risk',
    name: 'Heart Risk Score Calculator',
    slug: 'heart-risk-score-calculator',
    category: 'health',
    formula: 'Risk Score = Age + Cholesterol Factor + Smoking Factor',
    description: 'Estimate a simple heart risk score from core markers.',
    inputs: [
      { name: 'age', label: 'Age', type: 'number' },
      { name: 'cholesterolFactor', label: 'Cholesterol Factor', type: 'number' },
      { name: 'smokingFactor', label: 'Smoking Factor', type: 'number' },
    ],
  },
  {
    id: 'body_water',
    name: 'Body Water Calculator',
    slug: 'body-water-calculator',
    category: 'health',
    formula: 'TBW = Weight x Water Percentage',
    description: 'Estimate total body water from body weight.',
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number' },
      { name: 'waterPercent', label: 'Water Percentage (%)', type: 'number' },
    ],
  },
  {
    id: 'visceral_fat',
    name: 'Visceral Fat Estimate Calculator',
    slug: 'visceral-fat-calculator',
    category: 'health',
    formula:
      'Visceral fat estimate = (Waist ÷ Height) + (Weight ÷ Height) − (Thigh ÷ 10). Waist/thigh in cm, height in m, weight in kg (educational only).',
    description:
      'Estimate an abdominal adiposity proxy score from gender, age, weight, height, waist, and thigh circumferences. For education only; not a medical diagnosis.',
    inputs: [
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        options: [
          { value: 'woman', label: 'Woman' },
          { value: 'man', label: 'Man' },
        ],
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        hint: 'Years',
        validation: {
          min: 10,
          max: 120,
          message: 'Age must be between 10 and 120 years',
          placeholder: 'e.g. 25',
        },
      },
      {
        name: 'weightKg',
        label: 'Weight',
        type: 'number',
        hint: 'Kilograms',
        validation: {
          min: 30,
          max: 300,
          message: 'Weight must be between 30 and 300 kg',
          placeholder: 'e.g. 70',
        },
      },
      {
        name: 'heightM',
        label: 'Height',
        type: 'number',
        hint: 'Meters (e.g. 1.72 for 172 cm)',
        validation: {
          min: 1,
          max: 2.5,
          message: 'Height must be between 1 and 2.5 meters',
          placeholder: 'e.g. 1.75',
        },
      },
      {
        name: 'waistCm',
        label: 'Waist circumference',
        type: 'number',
        hint: 'Centimeters',
        validation: {
          min: 50,
          max: 200,
          message: 'Waist circumference must be between 50 and 200 cm',
          placeholder: 'e.g. 85',
        },
      },
      {
        name: 'thighCm',
        label: 'Thigh circumference',
        type: 'number',
        hint: 'Centimeters',
        validation: {
          min: 30,
          max: 150,
          message: 'Thigh circumference must be between 30 and 150 cm',
          placeholder: 'e.g. 55',
        },
      },
    ],
  },
  {
    id: 'one_rep_max',
    name: 'One Rep Max Calculator',
    slug: 'one-rep-max-calculator',
    category: 'health',
    formula: '1RM = Weight x (1 + Reps/30)',
    description: 'Estimate one-rep max from lifted weight and repetitions.',
    inputs: [
      { name: 'weight', label: 'Weight Lifted', type: 'number' },
      { name: 'reps', label: 'Repetitions', type: 'number' },
    ],
  },
  {
    id: 'pace',
    name: 'Running Pace Calculator',
    slug: 'pace-calculator',
    category: 'health',
    formula: 'Pace = Time / Distance',
    description: 'Calculate running or walking pace.',
    inputs: [
      { name: 'time', label: 'Time (minutes)', type: 'number' },
      { name: 'distance', label: 'Distance (km)', type: 'number' },
    ],
  },
  {
    id: 'vo2_max',
    name: 'VO2 Max Calculator',
    slug: 'vo2-max-calculator',
    category: 'health',
    formula: 'VO2 Max = (Distance - 504.9) / 44.73',
    description: 'Estimate VO2 max from 12-minute test distance.',
    inputs: [{ name: 'distance', label: 'Distance in 12 Minutes (m)', type: 'number' }],
  },
  {
    id: 'blood_pressure_map',
    name: 'MAP Calculator',
    slug: 'map-calculator',
    category: 'health',
    formula: 'MAP = (SBP + 2 x DBP) / 3',
    description: 'Calculate mean arterial pressure from blood pressure values.',
    inputs: [
      { name: 'systolic', label: 'Systolic BP', type: 'number' },
      { name: 'diastolic', label: 'Diastolic BP', type: 'number' },
    ],
  },
  {
    id: 'glycemic_load',
    name: 'Glycemic Load Calculator',
    slug: 'glycemic-load-calculator',
    category: 'health',
    formula: 'GL = (GI x Carbs) / 100',
    description: 'Estimate glycemic load from GI and carbohydrate grams.',
    inputs: [
      { name: 'glycemicIndex', label: 'Glycemic Index', type: 'number' },
      { name: 'carbs', label: 'Available Carbs (g)', type: 'number' },
    ],
  },
  {
    id: 'sleep_cycle',
    name: 'Sleep Cycle Calculator',
    slug: 'sleep-cycle-calculator',
    category: 'health',
    formula: 'Wake Time = Sleep Time + (90 x Cycles) + 15',
    description: 'Estimate optimal wake time using sleep cycles.',
    inputs: [
      { name: 'sleepTimeMinutes', label: 'Sleep Start (minutes from midnight)', type: 'number' },
      { name: 'cycles', label: 'Number of Cycles', type: 'number' },
    ],
  },
  {
    id: 'target_weight',
    name: 'Target Weight Time Calculator',
    slug: 'target-weight-calculator',
    category: 'health',
    formula: 'Weeks = Weight Change / Weekly Change',
    description: 'Estimate time needed to reach target body weight.',
    inputs: [
      { name: 'currentWeight', label: 'Current Weight (kg)', type: 'number' },
      { name: 'targetWeight', label: 'Target Weight (kg)', type: 'number' },
      { name: 'weeklyChange', label: 'Weekly Change (kg)', type: 'number' },
    ],
  },
  {
    id: 'amortization',
    name: 'Amortization Calculator',
    slug: 'amortization-calculator',
    category: 'finance',
    subcategory: 'mortgage',
    formula: 'Monthly Payment = [P x r x (1+r)^n] / [(1+r)^n - 1]',
    description: 'Estimate amortized monthly mortgage payment.',
    inputs: [
      { name: 'principal', label: 'Principal', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'tenure', label: 'Term (months)', type: 'number' },
    ],
  },
  {
    id: 'mortgage_payoff',
    name: 'Mortgage Payoff Calculator',
    slug: 'mortgage-payoff-calculator',
    category: 'finance',
    subcategory: 'mortgage',
    formula: 'Payoff Months ≈ -log(1-rP/M) / log(1+r)',
    description: 'Estimate months to pay off mortgage with monthly payment.',
    inputs: [
      { name: 'principal', label: 'Outstanding Principal', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'monthlyPayment', label: 'Monthly Payment', type: 'number' },
    ],
  },
  {
    id: 'house_affordability',
    name: 'House Affordability Calculator',
    slug: 'house-affordability-calculator',
    category: 'finance',
    subcategory: 'mortgage',
    formula: 'Affordable Loan ≈ Monthly Budget x Affordability Multiplier',
    description: 'Estimate home affordability from income and expenses.',
    inputs: [
      { name: 'monthlyIncome', label: 'Monthly Income', type: 'number' },
      { name: 'monthlyExpenses', label: 'Monthly Expenses', type: 'number' },
      { name: 'downPayment', label: 'Down Payment', type: 'number' },
    ],
  },
  {
    id: 'refinance',
    name: 'Refinance Calculator',
    slug: 'refinance-calculator',
    category: 'finance',
    subcategory: 'mortgage',
    formula: 'Savings = Old EMI - New EMI',
    description: 'Compare old and new mortgage monthly payment.',
    inputs: [
      { name: 'principal', label: 'Principal', type: 'number' },
      { name: 'oldRate', label: 'Old Rate (%)', type: 'number' },
      { name: 'newRate', label: 'New Rate (%)', type: 'number' },
      { name: 'tenure', label: 'Tenure (months)', type: 'number' },
    ],
  },
  {
    id: 'rent_vs_buy',
    name: 'Rent vs Buy Calculator',
    slug: 'rent-vs-buy-calculator',
    category: 'finance',
    subcategory: 'mortgage',
    formula: 'Difference = Total Buy Cost - Total Rent Cost',
    description: 'Compare estimated rent and buy costs over a period.',
    inputs: [
      { name: 'monthlyRent', label: 'Monthly Rent', type: 'number' },
      { name: 'monthlyMortgage', label: 'Monthly Mortgage', type: 'number' },
      { name: 'months', label: 'Comparison Period (months)', type: 'number' },
    ],
  },
  {
    id: 'auto_loan',
    name: 'Auto Loan Calculator',
    slug: 'auto-loan-calculator',
    category: 'finance',
    subcategory: 'auto',
    formula: 'EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]',
    description: 'Estimate monthly payment for vehicle financing.',
    inputs: [
      { name: 'principal', label: 'Loan Amount', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'tenure', label: 'Tenure (months)', type: 'number' },
    ],
  },
  {
    id: 'auto_lease',
    name: 'Auto Lease Calculator',
    slug: 'auto-lease-calculator',
    category: 'finance',
    subcategory: 'auto',
    formula: 'Lease Payment ≈ Depreciation + Finance Charge',
    description: 'Estimate monthly auto lease cost.',
    inputs: [
      { name: 'vehiclePrice', label: 'Vehicle Price', type: 'number' },
      { name: 'residualValue', label: 'Residual Value', type: 'number' },
      { name: 'leaseTerm', label: 'Lease Term (months)', type: 'number' },
    ],
  },
  {
    id: 'investment',
    name: 'Investment Calculator',
    slug: 'investment-calculator',
    category: 'finance',
    subcategory: 'investment',
    formula: 'Future Value = Principal x (1 + r)^t',
    description: 'Estimate future investment value with annual growth.',
    inputs: [
      { name: 'principal', label: 'Principal', type: 'number' },
      { name: 'interestRate', label: 'Annual Return (%)', type: 'number' },
      { name: 'timePeriod', label: 'Time Period (years)', type: 'number' },
    ],
  },
  {
    id: 'interest',
    name: 'Interest Calculator',
    slug: 'interest-calculator',
    category: 'finance',
    subcategory: 'investment',
    formula: 'Interest = Principal x Rate x Time',
    description: 'Calculate interest amount from principal, rate, and time.',
    inputs: [
      { name: 'principal', label: 'Principal', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'timePeriod', label: 'Time Period (years)', type: 'number' },
    ],
  },
  {
    id: 'present_value',
    name: 'Present Value Calculator',
    slug: 'present-value-calculator',
    category: 'finance',
    subcategory: 'investment',
    formula: 'PV = FV / (1 + r)^t',
    description: 'Discount future value to present value.',
    inputs: [
      { name: 'futureValue', label: 'Future Value', type: 'number' },
      { name: 'interestRate', label: 'Discount Rate (%)', type: 'number' },
      { name: 'timePeriod', label: 'Time Period (years)', type: 'number' },
    ],
  },
  {
    id: 'future_value',
    name: 'Future Value Calculator',
    slug: 'future-value-calculator',
    category: 'finance',
    subcategory: 'investment',
    formula: 'FV = PV x (1 + r)^t',
    description: 'Project future value from present amount.',
    inputs: [
      { name: 'presentValue', label: 'Present Value', type: 'number' },
      { name: 'interestRate', label: 'Growth Rate (%)', type: 'number' },
      { name: 'timePeriod', label: 'Time Period (years)', type: 'number' },
    ],
  },
  {
    id: 'annuity',
    name: 'Annuity Calculator',
    slug: 'annuity-calculator',
    category: 'finance',
    subcategory: 'retirement',
    formula: 'FV = P x [((1+r)^n - 1) / r]',
    description: 'Estimate annuity future value from recurring payments.',
    inputs: [
      { name: 'payment', label: 'Periodic Payment', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'periods', label: 'Number of Periods', type: 'number' },
    ],
  },
  {
    id: 'pension',
    name: 'Pension Calculator',
    slug: 'pension-calculator',
    category: 'finance',
    subcategory: 'retirement',
    formula: 'Pension Corpus = Contribution x Growth Factor',
    description: 'Estimate pension corpus from contribution and growth assumptions.',
    inputs: [
      { name: 'annualContribution', label: 'Annual Contribution', type: 'number' },
      { name: 'interestRate', label: 'Expected Return (%)', type: 'number' },
      { name: 'years', label: 'Years', type: 'number' },
    ],
  },
  {
    id: 'sales_tax',
    name: 'Sales Tax Calculator',
    slug: 'sales-tax-calculator',
    category: 'finance',
    subcategory: 'tax',
    formula: 'Tax = Price x (Rate/100)',
    description: 'Calculate sales tax and total payable amount.',
    inputs: [
      { name: 'price', label: 'Price', type: 'number' },
      { name: 'taxRate', label: 'Sales Tax Rate (%)', type: 'number' },
    ],
  },
  {
    id: 'vat',
    name: 'VAT Calculator',
    slug: 'vat-calculator',
    category: 'finance',
    subcategory: 'tax',
    formula: 'VAT = Amount x (VAT Rate/100)',
    description: 'Calculate VAT amount and VAT-inclusive total.',
    inputs: [
      { name: 'amount', label: 'Amount', type: 'number' },
      { name: 'vatRate', label: 'VAT Rate (%)', type: 'number' },
    ],
  },
  {
    id: 'payment',
    name: 'Payment Calculator',
    slug: 'payment-calculator',
    category: 'finance',
    subcategory: 'loans',
    formula: 'Payment = Loan Formula Based Installment',
    description: 'Estimate periodic payment from principal, rate, and term.',
    inputs: [
      { name: 'principal', label: 'Principal', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'tenure', label: 'Term (months)', type: 'number' },
    ],
  },
  {
    id: 'credit_card',
    name: 'Credit Card Calculator',
    slug: 'credit-card-calculator',
    category: 'finance',
    subcategory: 'loans',
    formula: 'Interest = Balance x APR / 12',
    description: 'Estimate monthly credit card interest and payment impact.',
    inputs: [
      { name: 'balance', label: 'Outstanding Balance', type: 'number' },
      { name: 'apr', label: 'APR (%)', type: 'number' },
      { name: 'monthlyPayment', label: 'Monthly Payment', type: 'number' },
    ],
  },
  {
    id: 'debt_payoff',
    name: 'Debt Payoff Calculator',
    slug: 'debt-payoff-calculator',
    category: 'finance',
    subcategory: 'loans',
    formula: 'Payoff Time depends on Debt, APR, and Payment',
    description: 'Estimate debt payoff timeline from payment strategy.',
    inputs: [
      { name: 'debt', label: 'Total Debt', type: 'number' },
      { name: 'apr', label: 'APR (%)', type: 'number' },
      { name: 'monthlyPayment', label: 'Monthly Payment', type: 'number' },
    ],
  },
  {
    id: 'student_loan',
    name: 'Student Loan Calculator',
    slug: 'student-loan-calculator',
    category: 'finance',
    subcategory: 'loans',
    formula: 'EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]',
    description: 'Calculate monthly payment for student loans.',
    inputs: [
      { name: 'principal', label: 'Loan Amount', type: 'number' },
      { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'tenure', label: 'Repayment Term (months)', type: 'number' },
    ],
  },
  {
    id: 'margin',
    name: 'Margin Calculator',
    slug: 'margin-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'Margin % = (Selling Price - Cost) / Selling Price x 100',
    description: 'Calculate margin percentage from cost and selling price.',
    inputs: [
      { name: 'cost', label: 'Cost', type: 'number' },
      { name: 'sellingPrice', label: 'Selling Price', type: 'number' },
    ],
  },
  {
    id: 'commission',
    name: 'Commission Calculator',
    slug: 'commission-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'Commission = Sales x Commission Rate',
    description: 'Calculate commission earned from sales amount.',
    inputs: [
      { name: 'sales', label: 'Total Sales', type: 'number' },
      { name: 'commissionRate', label: 'Commission Rate (%)', type: 'number' },
    ],
  },
  {
    id: 'budget',
    name: 'Budget Calculator',
    slug: 'budget-calculator',
    category: 'finance',
    subcategory: 'general',
    formula: 'Budget Balance = Income - Expenses',
    description: 'Find remaining budget after subtracting expenses from income.',
    inputs: [
      { name: 'income', label: 'Income', type: 'number' },
      { name: 'expenses', label: 'Expenses', type: 'number' },
    ],
  },
  {
    id: 'scientific',
    name: 'Scientific Calculator',
    slug: 'scientific-calculator',
    category: 'math',
    keywords: {
      primary: 'scientific calculator online',
      secondary: [
        'free scientific calculator',
        'advanced calculator',
        'scientific calculator',
        'online scientific calculator',
        'trig calculator',
      ],
    },
    formula: 'Expression evaluation (arithmetic, trig, log, ln, sqrt, powers, factorial, parentheses)',
    description:
      'Free scientific calculator online with sin, cos, tan, log, ln, powers, memory, history, and keyboard shortcuts.',
    inputs: [],
  },
  {
    id: 'graph_calculator',
    name: 'Graph Calculator',
    slug: 'graph-calculator',
    category: 'math',
    keywords: {
      primary: 'graph calculator online',
      secondary: [
        'free graph calculator',
        'plot functions online',
        'function grapher',
        'graphing calculator',
        'y = f(x) plotter',
      ],
    },
    formula: 'y = f(x) — plotted with function-plot (zoom, pan, grid)',
    description:
      'Free graph calculator online: plot y = f(x), zoom and pan, multiple equations, plus a 3D z = f(x, y) surface.',
    inputs: [],
  },
  {
    id: 'random_number',
    name: 'Random Number Generator',
    slug: 'random-number-generator',
    category: 'math',
    formula: 'Random = min + rand() x (max - min)',
    description: 'Generate random numbers between a minimum and maximum range.',
    inputs: [
      { name: 'min', label: 'Minimum', type: 'number' },
      { name: 'max', label: 'Maximum', type: 'number' },
    ],
  },
  {
    id: 'percent_error',
    name: 'Percent Error Calculator',
    slug: 'percent-error-calculator',
    category: 'math',
    formula: 'Percent Error = |(Experimental - Theoretical) / Theoretical| x 100',
    description: 'Calculate percent error between experimental and theoretical values.',
    inputs: [
      { name: 'experimentalValue', label: 'Experimental Value', type: 'number' },
      { name: 'theoreticalValue', label: 'Theoretical Value', type: 'number' },
    ],
  },
  {
    id: 'binary',
    name: 'Binary Calculator',
    slug: 'binary-calculator',
    category: 'math',
    formula: 'Binary arithmetic using selected operation',
    description: 'Perform binary-based arithmetic calculations.',
    inputs: [
      { name: 'a', label: 'Binary Value A', type: 'number' },
      { name: 'b', label: 'Binary Value B', type: 'number' },
      { name: 'operationCode', label: 'Operation (1:+, 2:-, 3:*, 4:/)', type: 'number' },
    ],
  },
  {
    id: 'hex',
    name: 'Hex Calculator',
    slug: 'hex-calculator',
    category: 'math',
    formula: 'Hex arithmetic using selected operation',
    description: 'Calculate hexadecimal-style operations from numeric input.',
    inputs: [
      { name: 'a', label: 'Hex Value A', type: 'number' },
      { name: 'b', label: 'Hex Value B', type: 'number' },
      { name: 'operationCode', label: 'Operation (1:+, 2:-, 3:*, 4:/)', type: 'number' },
    ],
  },
  {
    id: 'quadratic_formula',
    name: 'Quadratic Formula Calculator',
    slug: 'quadratic-formula-calculator',
    category: 'math',
    formula: 'x = [-b ± sqrt(b^2 - 4ac)] / 2a',
    description: 'Solve quadratic equations using the quadratic formula.',
    inputs: [
      { name: 'a', label: 'Coefficient a', type: 'number' },
      { name: 'b', label: 'Coefficient b', type: 'number' },
      { name: 'c', label: 'Coefficient c', type: 'number' },
    ],
  },
  {
    id: 'log',
    name: 'Log Calculator',
    slug: 'log-calculator',
    category: 'math',
    formula: 'log_b(x) = ln(x) / ln(b)',
    description: 'Calculate logarithm using value and base.',
    inputs: [
      { name: 'value', label: 'Value', type: 'number' },
      { name: 'base', label: 'Base', type: 'number' },
    ],
  },
  {
    id: 'root',
    name: 'Root Calculator',
    slug: 'root-calculator',
    category: 'math',
    formula: 'Root = value^(1/degree)',
    description: 'Find nth root using value and root degree.',
    inputs: [
      { name: 'value', label: 'Value', type: 'number' },
      { name: 'degree', label: 'Root Degree', type: 'number' },
    ],
  },
  {
    id: 'gcf',
    name: 'GCF Calculator',
    slug: 'gcf-calculator',
    category: 'math',
    formula: 'GCF = greatest common divisor(a,b)',
    description: 'Find greatest common factor of two numbers.',
    inputs: [
      { name: 'a', label: 'Number A', type: 'number' },
      { name: 'b', label: 'Number B', type: 'number' },
    ],
  },
  {
    id: 'factor',
    name: 'Factor Calculator',
    slug: 'factor-calculator',
    category: 'math',
    formula: 'Factors are numbers that divide n exactly',
    description: 'Estimate factors for an integer value.',
    inputs: [{ name: 'value', label: 'Number', type: 'number' }],
  },
  {
    id: 'rounding',
    name: 'Rounding Calculator',
    slug: 'rounding-calculator',
    category: 'math',
    formula: 'Rounded = round(value, decimals)',
    description: 'Round numbers to selected decimal places.',
    inputs: [
      { name: 'value', label: 'Value', type: 'number' },
      { name: 'decimals', label: 'Decimal Places', type: 'number' },
    ],
  },
  {
    id: 'matrix',
    name: 'Matrix Calculator',
    slug: 'matrix-calculator',
    category: 'math',
    formula: 'Matrix operation based on selected method',
    description: 'Perform matrix operation placeholders for quick setup.',
    inputs: [
      { name: 'a11', label: 'A11', type: 'number' },
      { name: 'a12', label: 'A12', type: 'number' },
      { name: 'b11', label: 'B11', type: 'number' },
      { name: 'b12', label: 'B12', type: 'number' },
    ],
  },
  {
    id: 'scientific_notation',
    name: 'Scientific Notation Calculator',
    slug: 'scientific-notation-calculator',
    category: 'math',
    formula: 'Value = coefficient x 10^exponent',
    description: 'Convert between scientific notation and decimal.',
    inputs: [
      { name: 'coefficient', label: 'Coefficient', type: 'number' },
      { name: 'exponent', label: 'Exponent', type: 'number' },
    ],
  },
  {
    id: 'big_number',
    name: 'Big Number Calculator',
    slug: 'big-number-calculator',
    category: 'math',
    formula: 'Operation over large numeric values',
    description: 'Calculate large numbers with operation-based input.',
    inputs: [
      { name: 'a', label: 'Large Number A', type: 'number' },
      { name: 'b', label: 'Large Number B', type: 'number' },
      { name: 'operationCode', label: 'Operation (1:+, 2:-, 3:*, 4:/)', type: 'number' },
    ],
  },
  {
    id: 'number_sequence',
    name: 'Number Sequence Calculator',
    slug: 'number-sequence-calculator',
    category: 'math',
    formula: 'nth Term = a + (n-1)d',
    description: 'Calculate nth term of arithmetic sequence.',
    inputs: [
      { name: 'firstTerm', label: 'First Term', type: 'number' },
      { name: 'difference', label: 'Common Difference', type: 'number' },
      { name: 'n', label: 'Term Number (n)', type: 'number' },
    ],
  },
  {
    id: 'sample_size',
    name: 'Sample Size Calculator',
    slug: 'sample-size-calculator',
    category: 'math',
    formula: 'n = (Z^2 x p(1-p)) / e^2',
    description: 'Estimate sample size for surveys and studies.',
    inputs: [
      { name: 'zScore', label: 'Z Score', type: 'number' },
      { name: 'proportion', label: 'Estimated Proportion', type: 'number' },
      { name: 'marginError', label: 'Margin of Error', type: 'number' },
    ],
  },
  {
    id: 'statistics',
    name: 'Statistics Calculator',
    slug: 'statistics-calculator',
    category: 'math',
    formula: 'Mean = Sum / Count',
    description: 'Calculate basic statistics from summary values.',
    inputs: [
      { name: 'sum', label: 'Sum of Values', type: 'number' },
      { name: 'count', label: 'Count of Values', type: 'number' },
    ],
  },
  {
    id: 'mean_median_mode_range',
    name: 'Mean Median Mode Range Calculator',
    slug: 'mean-median-mode-range-calculator',
    category: 'math',
    formula: 'Mean = Sum/Count, Median = Midpoint, Mode = Most frequent, Range = Max-Min',
    description: 'Get key descriptive statistics from summary inputs.',
    inputs: [
      { name: 'sum', label: 'Sum of Values', type: 'number' },
      { name: 'count', label: 'Count of Values', type: 'number' },
      { name: 'middleLow', label: 'Middle Value 1', type: 'number' },
      { name: 'middleHigh', label: 'Middle Value 2', type: 'number' },
      { name: 'modeValue', label: 'Mode Value', type: 'number' },
      { name: 'min', label: 'Minimum Value', type: 'number' },
      { name: 'max', label: 'Maximum Value', type: 'number' },
    ],
  },
  {
    id: 'permutation_combination',
    name: 'Permutation Combination Calculator',
    slug: 'permutation-combination-calculator',
    category: 'math',
    formula: 'nPr = n!/(n-r)!, nCr = n!/[r!(n-r)!]',
    description: 'Calculate permutation and combination counts.',
    inputs: [
      { name: 'n', label: 'n', type: 'number' },
      { name: 'r', label: 'r', type: 'number' },
      { name: 'operationCode', label: '1: Permutation, 2: Combination', type: 'number' },
    ],
  },
  {
    id: 'z_score',
    name: 'Z Score Calculator',
    slug: 'z-score-calculator',
    category: 'math',
    formula: 'z = (x - mean) / sd',
    description: 'Calculate z-score from value, mean, and standard deviation.',
    inputs: [
      { name: 'value', label: 'Value', type: 'number' },
      { name: 'mean', label: 'Mean', type: 'number' },
      { name: 'standardDeviation', label: 'Standard Deviation', type: 'number' },
    ],
  },
  {
    id: 'confidence_interval',
    name: 'Confidence Interval Calculator',
    slug: 'confidence-interval-calculator',
    category: 'math',
    formula: 'CI = mean ± z x (sd / sqrt(n))',
    description: 'Estimate confidence interval from sample statistics.',
    inputs: [
      { name: 'mean', label: 'Mean', type: 'number' },
      { name: 'standardDeviation', label: 'Standard Deviation', type: 'number' },
      { name: 'sampleSize', label: 'Sample Size', type: 'number' },
      { name: 'zScore', label: 'Z Score', type: 'number' },
    ],
  },
  {
    id: 'triangle',
    name: 'Triangle Calculator',
    slug: 'triangle-calculator',
    category: 'math',
    formula: 'Area = 1/2 x base x height',
    description: 'Calculate triangle area using base and height.',
    inputs: [
      { name: 'base', label: 'Base', type: 'number' },
      { name: 'height', label: 'Height', type: 'number' },
    ],
  },
  {
    id: 'slope',
    name: 'Slope Calculator',
    slug: 'slope-calculator',
    category: 'math',
    formula: 'Slope = (y2 - y1) / (x2 - x1)',
    description: 'Calculate slope between two coordinate points.',
    inputs: [
      { name: 'x1', label: 'x1', type: 'number' },
      { name: 'y1', label: 'y1', type: 'number' },
      { name: 'x2', label: 'x2', type: 'number' },
      { name: 'y2', label: 'y2', type: 'number' },
    ],
  },
  {
    id: 'circle',
    name: 'Circle Calculator',
    slug: 'circle-calculator',
    category: 'math',
    formula: 'Area = pi r^2, Circumference = 2 pi r',
    description: 'Calculate circle area and circumference from radius.',
    inputs: [{ name: 'radius', label: 'Radius', type: 'number' }],
  },
  {
    id: 'surface_area',
    name: 'Surface Area Calculator',
    slug: 'surface-area-calculator',
    category: 'math',
    formula: 'Surface Area = 2(lw + lh + wh)',
    description: 'Calculate cuboid surface area.',
    inputs: [
      { name: 'length', label: 'Length', type: 'number' },
      { name: 'width', label: 'Width', type: 'number' },
      { name: 'height', label: 'Height', type: 'number' },
    ],
  },
  {
    id: 'pythagorean_theorem',
    name: 'Pythagorean Theorem Calculator',
    slug: 'pythagorean-theorem-calculator',
    category: 'math',
    formula: 'c = sqrt(a^2 + b^2)',
    description: 'Calculate hypotenuse from right triangle sides.',
    inputs: [
      { name: 'a', label: 'Side a', type: 'number' },
      { name: 'b', label: 'Side b', type: 'number' },
    ],
  },
  {
    id: 'right_triangle',
    name: 'Right Triangle Calculator',
    slug: 'right-triangle-calculator',
    category: 'math',
    formula: 'Area = 1/2 x base x height',
    description: 'Calculate right triangle area from base and height.',
    inputs: [
      { name: 'base', label: 'Base', type: 'number' },
      { name: 'height', label: 'Height', type: 'number' },
    ],
  },
];

export function getCalculatorBySlug(slug: string) {
  return calculators.find((calculator) => calculator.slug === slug);
}

export function getCalculatorsByCategory(category: Calculator['category']) {
  return calculators.filter((calculator) => calculator.category === category);
}

/** Curated order for internal linking / “popular tools” (not the full catalog). */
export const POPULAR_CALCULATOR_SLUGS: readonly string[] = [
  'compound-interest-calculator',
  'emi-calculator',
  'percentage-calculator',
  'bmi-calculator',
  'calorie-calculator',
  'bmr-calculator',
  'body-fat-calculator',
  'scientific-calculator',
  'graph-calculator',
  'visceral-fat-calculator',
  'velocity-calculator',
  'simple-interest-calculator',
  'profit-margin-calculator',
  'loan-calculator',
  'mortgage-calculator',
  'tax-calculator',
  'retirement-calculator',
];

function mapCalculatorToHref(calculator: Calculator) {
  return {
    name: calculator.name,
    description: calculator.description,
    slug: calculator.slug,
    href: `/${calculator.slug}`,
  };
}

export function getTopCalculators(): Array<{
  name: string;
  description: string;
  slug: string;
  href: string;
}> {
  return POPULAR_CALCULATOR_SLUGS.slice(0, 6)
    .map((slug) => getCalculatorBySlug(slug))
    .filter((calculator): calculator is Calculator => Boolean(calculator))
    .map(mapCalculatorToHref);
}

export function getPopularCalculators(): Array<{
  name: string;
  description: string;
  slug: string;
  href: string;
}> {
  return POPULAR_CALCULATOR_SLUGS.map((slug) => getCalculatorBySlug(slug))
    .filter((calculator): calculator is Calculator => Boolean(calculator))
    .map(mapCalculatorToHref);
}

function normalizeBaseKeyword(name: string) {
  return name.toLowerCase().replace(/\s+/g, ' ').trim();
}

function deriveKeywordTarget(calculator: Calculator) {
  const baseName = normalizeBaseKeyword(calculator.name);
  const primary = baseName.includes('calculator')
    ? baseName
    : `${baseName} calculator`;
  const categoryPhrase = `${calculator.category} calculator`;
  const subcategoryPhrase = calculator.subcategory
    ? `${calculator.subcategory.replace(/-/g, ' ')} calculator`
    : `${calculator.category} formula calculator`;

  const secondary = Array.from(
    new Set([
      `${baseName} formula`,
      `calculate ${baseName} online`,
      `${subcategoryPhrase} online`,
      `${categoryPhrase} tool`,
    ])
  ).slice(0, 3);

  return { primary, secondary };
}

export const calculatorKeywordMap: Record<
  string,
  {
    primary: string;
    secondary: string[];
  }
> = Object.fromEntries(
  calculators.map((calculator) => [calculator.slug, calculator.keywords ?? deriveKeywordTarget(calculator)])
);

export function getCalculatorKeywords(slug: string) {
  return calculatorKeywordMap[slug] ?? null;
}
