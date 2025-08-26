# Campus Issue Tracker
An intelligent, AI-powered platform for students to report and track campus infrastructure issues. This application uses the Google Gemini API to automatically categorize, summarize, and prioritize reported problems, ensuring a smarter and more efficient resolution process.

## Key Features
1. Secure User Authentication: bycryptjs login and registration system for students.

2. Intuitive Issue Submission: A clean and simple form for reporting new issues with titles, descriptions, and categories.

3. Dynamic Dashboard: View all submitted issues in a clean, card-based layout with real-time status updates.

4. Responsive Design: A seamless experience across desktop and mobile devices using Bootstrap.

### AI-Powered by Google Gemini
1. Auto-Categorization: When a user describes an issue, Gemini analyzes the text and suggests the most relevant category (e.g., "Plumbing", "Electrical", "Wi-Fi").

2. AI Summarization: For lengthy descriptions, Gemini provides a concise, one-sentence summary for quick administrative review.

3. Smart Prioritization: Gemini assesses the language and context of an issue to assign a priority level (Low, Medium, High, Critical), helping maintenance teams address the most urgent problems first.

#### Tech Stack
Category	    Technology
Frontend	    React, React Bootstrap, Axios
Backend	        Node.js, Express
Database	    MongoDB with Mongoose
AI	            Google Gemini API
Auth	        bycryptjs




Run the Application:

Start the Backend Server: From the server directory, run:

npm start
The server will start on http://localhost:5000.

Start the Frontend Client: From the client directory, run:



npm run dev
The React application will open in your browser at http://localhost:5173 (or another available port).

API Endpoints
The backend provides the following RESTful API endpoints:

Method	Endpoint	            Description
POST	/api/auth/register	    Register a new user.
POST	/api/auth/login	        Log in a user and return a JWT.
POST	/api/issues	            Create a new issue (protected).
GET	    /api/issues/userId      Get a list of all issues of specified user.
POST	/api/ai/analyze-issue	Get AI analysis (category, priority, summary).


Future Enhancements
Admin Dashboard: A separate interface for maintenance staff to update issue statuses.

Email Notifications: Send automated emails to students and admins upon issue creation and status changes.

Image Uploads: Allow students to upload photos of the issue for better context.





