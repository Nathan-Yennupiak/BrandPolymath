import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { NextResponse } from 'next/server';

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const endpoint = process.env.AZURE_ENDPOINT;
const apiKey = process.env.AZURE_API_KEY; 
const model = process.env.AZURE_MODEL;

export async function POST(req){
	
	const { messages } = await req.json();

	const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

	messages.unshift({
		role: 'system',
content: `
You are PortfolioGPT, designed to provide information based solely on the resume provided.

Resume:
${DATA_RESUME}

Your goal is to help users learn more about Nathan based on his resume. Follow these detailed instructions:

1. Always refer to Nathan by his first name unless the user explicitly asks for his full name.
2. Format your responses in a clear and structured manner, using bullet points for lists and paragraphs for detailed explanations.
3. Provide concise yet comprehensive answers that directly relate to the details in Nathan's resume.
4. If a user asks about skills, experiences, or projects, include relevant examples from Nathan's resume where possible.
5. Use professional language and avoid colloquialisms or informal expressions in your responses.
6. If unsure about a response, prioritize accuracy based on the information provided in Nathan's resume.
7. Ensure all responses are relevant to Nathan's professional background and achievements as outlined in the resume.
8. Nathan is based in Ghana NOT in Ghana/Australia.

Your responses should aim to showcase Nathan's qualifications effectively and professionally.
`

	})

	const response = await client.getChatCompletions(model, messages, {
		maxTokens: 128,
	})

	return NextResponse.json({ 
		message: response.choices[0].message.content
	 })
}


const DATA_RESUME = `Firstname: NATHAN YENNUPIAK ALI
Email Address: Nathanyennupiak1@gmail.com
Phone: +233546101828

EDUCATION

University of Cape Coast
BSc. Computer Science
August 2017 - October 2021

EXPERIENCE

IT Training and Support Assistant (National Service)
University of Cape Coast
October 2021 - August 2022
• Oversaw computer labs, ensuring proper usage and maintenance.
• Managed attendance records and provided tutoring sessions for students.
• Troubleshot computer issues and provided technical support.
• Conducted training on Information Technology Skills, including Google Apps and Microsoft Office Suite.

Developer – Tender Hearts Foundation
Los Angeles, USA
Contract
• Designed and developed the official website for the foundation.
• Implemented updates and maintenance tasks for websites and plugins.
• Ensured the accuracy and relevance of information on the website.

Software Developer – Amplified Communications
Ghana/Australia
Seasonal
• Designed and developed the official website for the Agency.
• Regularly updated and maintained plugins to enhance website functionality.
• Ensured the website contained up-to-date and accurate information.
• Designed and developed dynamic web applications for clients.

USEFUL LINKS

LinkedIn: https://gh.linkedin.com/in/nathanyennupiak
GitHub: https://github.com/Nathan-Yennupiak
Portfolio: https://thepolymath.netlify.app/

SKILLS

Programming languages: JavaScript, Python, Dart, PHP.
Back-end technologies: Node.js, Express, Laravel, RESTful APIs.
Front-end technologies: HTML5, CSS, TailwindCSS, ReactJS, NextJS, Responsive design.
Mobile App Development: Flutter.
Database Systems: MongoDB, PostgreSQL, MySQL.
Content Management Systems (CMS): WordPress, Shopify.
Publishing – Microsoft Office Suite, Adobe InDesign.
Graphic Design: Adobe Photoshop, Canva.

LEADERSHIP

Lead, Google Developer Students Club
August 2020 – August 2021
• Organized and conducted coding training sessions for the community.
• Supervised the Annual Global Google Solution Challenge.
• Contributed to the development of the GDSC UCC Mobile App, enhancing its features and functionality.

Science Club President, Ghana Senior High School
March 2015 – March 2016
• Led the Science Club, organizing educational activities and events.
• Fostered a passion for science among club members through engaging initiatives.

HOBBIES

• Reading, Creative writing
• Graphic Design
• Leadership and Community Service
• Tech Training and Mentoring
• Web Development Projects

RECOMMENDATION

Google Developer Students Club
Link to file`;
