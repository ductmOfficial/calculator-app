# Calculator App

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Usage](#usage)
  - [Installation](#installation)
  - [Usage Notes](#usage-notes)
- [Functionality](#functionality)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Overview

This is a simple calculator web application built using React. It performs basic arithmetic operations and handles keyboard input for ease of use.

## Features

- Arithmetic operations: addition (+), subtraction (‑), multiplication (x), division (/)
- Decimal point (.) for floating-point numbers
- Clear button (AC) to reset the calculator
- Evaluate button (=) to compute the result
- Responsive design for various screen sizes
- Keyboard support for intuitive input (numeric keys, operators, Enter for evaluate, Backspace for clear)

## Usage

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ductmOfficial/calculator-app.git
   cd calculator-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the app.

### Usage Notes

- **Keyboard Input**: You can use your keyboard to input numbers and perform operations:
  - Numeric keys (0-9) input corresponding numbers.
  - Operators: + (addition), - (subtraction), * (multiplication), / (division).
  - Decimal point (.) for decimal numbers.
  - Enter key evaluates the expression.
  - Backspace key clears the calculator.

- **Button Clicks**: Alternatively, you can use the buttons displayed on the calculator interface to perform operations.

## Functionality

- **Display**: The top section (`formula-screen`) displays the current mathematical expression or formula being evaluated.
- **Output**: The main display (`output-screen`) shows the current input or the result of the calculation.
- **Limit Handling**: If the input exceeds 21 characters, a warning message (`Digit Limit Met`) briefly appears to indicate the limit.

## Technologies Used

- React
- JavaScript (ES6+)
- HTML5
- CSS3

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
