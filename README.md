#  Campus Issue Tracker

An intelligent, AI-powered platform for students to report and track campus infrastructure issues. This application uses the Google Gemini API to automatically categorize, summarize, and prioritize reported problems, ensuring a smarter and more efficient resolution process. 

##  Key Features

  * *Secure User Authentication:* A bcryptjs login and registration system for students ensures a secure experience.
  * *Intuitive Issue Submission:* Students can easily report new issues using a clean, simple form with fields for titles, descriptions, and categories.
  * *Dynamic Dashboard:* View all submitted issues in a clean, card-based layout with real-time status updates.
  * *Responsive Design:* The platform is built with Bootstrap to provide a seamless experience on both desktop and mobile devices.

-----

##  AI-Powered by Google Gemini

The core of this application's intelligence comes from the Google Gemini API, which enhances the issue management process.

  * *Auto-Categorization:* Gemini analyzes the text of a user's issue description to suggest the most relevant category (e.g., "Plumbing", "Electrical", "Wi-Fi").
  * *AI Summarization:* For lengthy descriptions, Gemini provides a concise, one-sentence summary, allowing for quick administrative review.
  * *Smart Prioritization:* Gemini assesses the language and context of an issue to assign a priority level (Low, Medium, High, Critical), helping maintenance teams address the most urgent problems first.

-----

##  Tech Stack

| Category | Technology |
| :--- | :--- |
| Frontend | React, React Bootstrap, Axios |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| AI | Google Gemini API |
| Auth | bycryptjs |

-----

##  Getting Started

Follow these steps to get your local development environment up and running.

### Prerequisites

  * Node.js installed on your machine
  * MongoDB Atlas account or a local MongoDB instance
  * Google Gemini API key

### Installation

1.  *Clone the repository:*

    ```bash
    git clone https://github.com/J-Gogga/Hackathon.git
    cd Hackathon
    ```

2.  *Set up environment variables:*
    Create a .env file in the server directory and add your MongoDB connection string and Gemini API key.

    ```env
    MONGODB_URI=your_mongodb_connection_string
    GEMINI_API_KEY=your_gemini_api_key
    ```

3.  *Install dependencies for both frontend and backend:*

    ```bash
    # Install backend dependencies
    cd backend
    npm install (all the requirements)

    # Install frontend dependencies
    cd frontend
    npm install (all the requirements)
    ```

### Run the Application

  * *Start the Backend Server:*
    From the server directory, run:

    ```bash
    npm start
    ```

    The server will start on http://localhost:5000.

  * *Start the Frontend Client:*
    From the client directory, run:

    ```bash
    npm run dev
    ```

    The React application will open in your browser at http://localhost:5173 (or another available port).

-----

##  API Endpoints

The backend provides the following RESTful API endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | /api/auth/register | Register a new user. |
| POST | /api/auth/login | Log in a user and return a JWT. |
| POST | /api/issues | Create a new issue (requires authentication). |
| GET | /api/issues/:userId | Get a list of all issues for a specific user. |
| POST | /api/ai/analyze-issue | Get AI analysis (category, priority, summary). |

-----

