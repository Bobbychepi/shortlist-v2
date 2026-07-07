# Shortlist

Shortlist is an AI-powered resume analysis platform that helps job seekers understand how well their resume matches a specific job description.

Users can upload a resume, provide a job description, and receive a structured analysis with a match score, ATS compatibility score, strengths, missing skills, keyword insights, and improvement recommendations.

## Features
* Resume upload support for PDF and DOCX files
* Job description analysis
* Resume-to-job match scoring
* ATS compatibility scoring
* Keyword and skill gap detection
* Strengths and improvement recommendations
* Saved analysis history in browser storage
* Dashboard with score statistics and timeline chart
* Recent analysis history with quick access to past reports
* Responsive dark-mode interface
* Authentication with Clerk

## Tech Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Clerk Authentication
- Groq SDK
- Motion
- Lucide React
- Recharts
- Radix UI Accordion
- PDF parsing with `pdf2json`
- DOCX parsing with `mammoth`
- Code quality with ESLint and Prettier

## How It Works
1. The user uploads a resume in PDF or DOCX format.
2. The user pastes a target job description.
3. The API extracts text from the resume.
4. The resume and job description are sent to the AI analysis service.
5. The system generates match scores, ATS feedback, skills analysis, and recommendations.
6. Results are saved locally in browser storage.
7. The dashboard displays saved analyses, statistics, and score history.

## Future Improvements
* Export/Downalod analysis reports as PDF
* Cloud database storage
* User profile and saved resumes
* Job application tracker
* Cover letter generator
* Resume version comparison
* Shareable analysis reports
* More detailed ATS keyword scoring

## Author
Bobby Chepi
Full-Stack Software Developer

## License
This project is for portfolio and educational purposes.
