# Budget Tracker

- [Live Demo](https://main--wishlist-budget-tracker.netlify.app/)

## Built With

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/en/6.17.0/start/tutorial)
- [React Testing Library](https://testing-library.com/)
- [React-Bootstrap](https://react-bootstrap.netlify.app/)

## Budget Tracker Features

This is a simple budget tracker used for tracking income and expenses and for visualizing spendings on a basic level. The app also features a wishlist tracker and budget table to determine costs per category. All data is stored using local storage so the user can return to their budget again the next time they open the website.

### Transactions Tab

By default, on initial load, dummy values are used as placeholders for sample display. Simply entering a new transaction via the Transactions tab will override existing placeholders. All transactions entered are summarized into a doughnut chart that can be viewed on the Dashboard tab, where the 10 most recent transactions are also shown in table format.

### Wishlist Tracker Tab

Similar to the Transactions tab, the Wishlist Tracker tab also uses dummy values for placeholders, which can be overrided by submitting a new entry. New wishlist entries are displayed in a table format for easy viewing and items can be selected to quickly calculate the total for those items.

The Outstanding Balances section features a table with a "Current Balance", at least one expense category, and a "Wishlist Expenses" category.

- Current Balance is the user's starting balance for the current period
- Expense categories are categories added or deleted by the user, as needed
- Wishlist Expenses is the total calculated from all selected wishlisted items (if applicable)
