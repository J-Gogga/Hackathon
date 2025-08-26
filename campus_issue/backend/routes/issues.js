const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API client using the correct library name.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Safely parses the JSON from a Gemini API response.
 * Handles potential errors and returns a fallback object if parsing fails.
 * @param {object} response - The raw response object from the Gemini API.
 * @returns {object} The parsed JSON data or a fallback object.
 */
function parseGeminiResponse(response) {
    if (!response || !response.candidates || !response.candidates[0] || !response.candidates[0].content || !response.candidates[0].content.parts || !response.candidates[0].content.parts[0].text) {
        return { summary: "No summary", category: "Other", priority: "Medium", tags: [] };
    }

    const rawText = response.candidates[0].content.parts[0].text;
    try {
        const cleanedText = rawText.replace(/```json\n|```/g, '').trim();
        const parsedJson = JSON.parse(cleanedText);
        return parsedJson;
    } catch (e) {
        console.error("Failed to parse Gemini JSON response:", e.message);
        return { summary: rawText, category: "Other", priority: "Medium", tags: [] };
    }
}

//---

// Submit Issue (POST /)
router.post('/', async (req, res) => {
    const { userId, description } = req.body;

    // A more explicit and robust AI prompt to ensure a valid JSON response.
    const aiPrompt = `
You are a helpful assistant for campus issues. Analyze the following issue description and provide a structured JSON response.

1.  **Summary**: Provide a one-line summary of the issue.
2.  **Category**: Assign a category from these options: "Electrical", "Plumbing", "Wi-Fi", "Other".
3.  **Priority**: Assign a priority from these options: "Low", "Medium", "High".
4.  **Tags**: Extract 2-3 relevant keywords as tags.

Issue Description: "${description}"

Respond ONLY with a valid JSON object. Do not include any other text, explanations, or code block syntax.
Example JSON response:
{
  "summary": "Example issue summary.",
  "category": "Electrical",
  "priority": "High",
  "tags": ["example", "issue", "light"]
}
`;

    let aiData = { summary: "No summary", category: "Other", priority: "Medium", tags: [] };

    try {
        // Use the correct method to get the model and generate content.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(aiPrompt);
        aiData = parseGeminiResponse(result);
    } catch (err) {
        console.error("Gemini API failed:", err.message);
        // Fallback to default data if the AI call fails.
    }

    try {
        // Use the AI-generated data as the primary source for the new issue.
        const issue = new Issue({
            userId,
            description,
            summary: aiData.summary,
            category: aiData.category,
            priority: aiData.priority,
            tags: aiData.tags
        });

        await issue.save();
        res.json({ success: true, issue });

    } catch (err) {
        console.error("Database or saving error:", err.message);
        res.status(500).json({ success: false, message: "Failed to save issue." });
    }
});

//---

// Get all issues for a user (GET /:userId)
router.get('/:userId', async (req, res) => {
    try {
        const issues = await Issue.find({ userId: req.params.userId });
        res.json(issues);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;