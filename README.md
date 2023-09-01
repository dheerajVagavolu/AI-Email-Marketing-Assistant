# AI Challenge: Email Marketing Content Assistant

## Description
Your mission, should you choose to accept it, is to craft an "email marketing content assistant". With this system, users input specific parameters about their business and campaign goals. In response, the system recommends 5 emails tailored to their needs. Participants are encouraged to use any AI/ML models or APIs to accomplish this challenge. Show us what you got!

### **Bonus Task** (Optional):
Add a feature where the system can understand and adapt to the brand's tone and voice. One way to achieve this might be to allow users to input their website and Twitter handles, enabling the model to fine-tune its recommendations by scraping relevant content from these platforms.

## My Solution:

### Platform:
- **Framework**: [NextJS](https://nextjs.org/) - I chose this to build a full-stack application, influenced by your company's tech preferences.

### Database:
- **Database Management System**: [MongoDB](https://www.mongodb.com/) (NoSQL) - Ensuring robust data storage functionality.

### AI/ML Integration:
- **Model**: [GPT-3 Turbo](https://openai.com/blog/dall-e-2/) from OpenAI. With the right prompt engineering, I achieved content outputs that closely align with the users' requirements.

### Additional Features:
- **Interactivity**: Incorporated "like" and "customize" features. These will be pivotal in gathering human feedback, refining the RLHF (Reinforcement Learning from Human Feedback) approach in future iterations.

### Web Scraping:
- **Tool Used**: [Cheerio](https://cheerio.js.org/) - With this, I was able to scrape websites, ensuring recommendations align well with the brand's tone and style.

### **Live Demo**:
Experience my solution live at [recommender-tawny.vercel.app](https://recommender-tawny.vercel.app/)

---

*Feedback, issues, and contributions are warmly welcomed. Feel free to open a PR or issue!*
