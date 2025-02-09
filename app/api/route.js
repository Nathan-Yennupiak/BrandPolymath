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

1.
Software Engineer
Amplified Communications	 	 	 	 	 	 
2023 - Present
•	Designed and developed the company's official website, ensuring speed, security, and a seamless user experience.
•	Built full-stack applications for inventory management and client projects, handling front-end and back-end development.
•	Designed and developed RESTful APIs, making it easy for frontend apps to communicate with the backend.
•	Integrated third-party APIs and tools to enhance functionality and streamline business operations.

2.
Backend Developer
Bit-Alpha Innovations	 	 	 	 	 	 
2022-2023
•	Built and maintained the backend for various web applications, ensuring they were fast and scalable.
•	Designed and developed RESTful APIs, making it easy for frontend apps to communicate with the backend.
•	Handled database management, optimizing queries and ensuring data integrity.
•	Implemented secure authentication and authorization systems to protect user data.
•	Worked closely with front-end developers to create seamless and efficient applications.

3.
Software Engineer
University of Cape Coast  	 
October 2021 - August 2022 
•	Tutored students on software development concepts, Microsoft Suite, and Google Workspace.
•	Developed an automated script to efficiently enter results from Alison into an Excel sheet, significantly reducing manual effort and processing time.
•	Collaborated with faculty and IT teams to enhance the security and performance of university portals.


USEFUL LINKS

LinkedIn: https://gh.linkedin.com/in/nathanyennupiak
GitHub: https://github.com/Nathan-Yennupiak
Portfolio: https://brandpolymath.netlify.app/

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

Google Developer Students Club`;
