# JobHub

JobHub is a web application that helps users find their dream jobs by providing job listings from various sources like LinkedIn and Naukri. Users can filter job listings based on keywords, location, company, technology, and source.

This project was done as an assignment for Product Space company.

## Features

- Infinite scrolling for job listings
- Filter jobs by keyword, location, company, technology, and source
- View job details in a modal
- Fetch personalized jobs if no jobs are found

## Technologies Used

- React
- Axios
- Infinite Scroll Component
- Font Awesome Icons

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/jobhub.git
   cd jobhub/frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the App

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

### Code Explanation

#### `src/App.jsx`

This file contains the main component of the application. It handles fetching job listings, filtering jobs, and displaying job details in a modal.

- **State Variables:**
  - `jobs`: Array of job listings
  - `filters`: Object containing filter values (keyword, location, company, technology, source)
  - `offset`: Pagination offset for fetching jobs
  - `hasMore`: Boolean indicating if there are more jobs to load
  - `loading`: Boolean indicating if jobs are being fetched
  - `showFilters`: Boolean indicating if the filter section is visible
  - `currentTime`: Current time displayed in the header
  - `currentUser`: Current user's name
  - `selectedJob`: Job selected for viewing details in a modal
  - `showToast`: Boolean indicating if the toast message is visible

- **Functions:**
  - `fetchJobs`: Fetches job listings from the API based on filters and pagination offset
  - `fetchPersonalizedJobs`: Fetches personalized jobs by calling the `fetch-jobs` API and shows a toast message
  - `handleFilterChange`: Updates filter values based on user input
  - `handleSubmit`: Handles form submission to fetch jobs based on filters
  - `toggleFilters`: Toggles the visibility of the filter section
  - `extractSkills`: Extracts common skills from the job description
  - `openModal`: Opens the modal to view job details
  - `closeModal`: Closes the modal

#### `src/App.css`

This file contains the styles for the application, including animations, layout, and component-specific styles.

- **Key Styles:**
  - `.app-container`: Main container for the application
  - `.app-header`: Styles for the header section
  - `.filters-container`: Styles for the filter section
  - `.jobs-list`: Styles for the job listings
  - `.job-card`: Styles for individual job cards
  - `.modal-overlay`: Styles for the modal overlay
  - `.modal-content`: Styles for the modal content
  - `.toast`: Styles for the toast message

### API Endpoints

- **Get Jobs:**
  - URL: `https://ps-backend-bt57.onrender.com/get-jobs`
  - Method: `GET`
  - Parameters: `keyword`, `location`, `company`, `technology`, `source`, `limit`, `offset`

- **Fetch Personalized Jobs:**
  - URL: `https://ps-backend-bt57.onrender.com/fetch-jobs`
  - Method: `GET`
  - Parameters: `keyword`, `location`

### Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

### License

This project is licensed under the MIT License.
