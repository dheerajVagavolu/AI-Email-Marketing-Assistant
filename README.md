## AI CHALLENGE:

Your task is to create an "email marketing content assistant". The user types certain parameters and criteria about their business and campaign goals, and your system will recommend 5 emails that the customer can use. You can leverage any AI/ML models or APIs to get this task done. it's your time to shine!
OPTIONAL BONUS task: Your system will miss the brand tone and voice of the customer. You can ask the user to type their website and twitter, so you can fine tune your model by scrapping customer data such as social posts or website content.

### Overview
**Platform**: I decided to go with NextJS for building a full-stack application, drawing inspiration from your company's tech stack.

**Database**: Leveraging NoSQL MongoDB, I ensured seamless storage functionality.

**AI/ML Integration**: My go-to choice was the GPT-3 Turbo model. A bit of prompt engineering helped me achieve desired content outputs. I used Open AIs API to achieve this.

**Additional Features**: The "like" and "customize" features I incorporated will be instrumental for future human feedback to the model, enhancing the RLHF approach.

**Web Scraping**: Using cheerio, I implemented a simple web scraper to assimilate website data, ensuring that the brand's tone was accurately captured in the recommendations.

**Twitter Integration**: Although I did explore the possibility of incorporating Twitter posts, the absence of a free API version led me to hold off on this integration. Still, I believe the foundation I've laid makes it relatively straightforward to plug in similar data in the future.

#### Production Link: https://recommender-tawny.vercel.app/

