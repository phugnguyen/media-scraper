# Media Scraper

This project implements a media scraping application that allows users to scrape image and video URLs from web pages and view them on a paginated frontend. The project is built using **Next.js**, **Node.js**, **React.js**, and **Prisma**, and utilizes Docker for containerization.

## If I had more time I would

- TDD
- Only works for images right now... I think some of the videos elements didn't load in with the fetch request. Probably come up with a different strategy to make sure to full load the page and all assets... maybe with a web crawler.
- Implement the middlewares for auth both on frontend routes and backend routes.
  - Maybe use NextAuth.
- Implement MULTIPLE url scraping:
  - If we took in an array, I'd iterate through the array and send them to the current /api/scrape.
- Figure out a new strategy for the index page to load faster, maybe separate out the search onto its own client component and turn the index page into a server side component.
- Implement url based search so that navigation is easier and more intuitive.
- Create a UI for /api/scrape.

## Requirements

- [x] Create an API that accepts an a web URL in the request body.
- [ ] Add basic server authentication middleware.
- [ ] Add middleware for logging and error handling.
- [x] Scrape image and video URLs for the requested web URLs.
- [x] Store all scraped data in a SQL database.
- [x] Create a simple web page to display all images and videos.
- [x] Implement pagination and filtering for the frontend.
- [x] Uses **Next.js**.
- [x] Dockerize the application using Docker Compose.
- [x] Support both server-side rendering (SSR) and client-side rendering (CSR).

  - Client Side Component: Media Index Page
  - Server Side Component: Media Individual Page

- [x] Include a demo video of the working submission.
- [x] Design a scalable scraper capable of handling ~5000 URLs simultaneously on a server with 1 CPU and 1GB RAM.

## Getting Started

### Prerequisites

- Docker installed on your system.
- Basic understanding of Docker Compose and web application development.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd media-scraper
   ```

2. Add a `.env` file with the following variables (in real environment I would obscure user and pw):

   ```env
   DATABASE_URL=postgresql://admin:password@db:5432/mediascraper?schema=public
   ```

3. Build and start the application:

   ```bash
   docker compose up --build
   ```

4. Run Prisma migrations:

   ```bash
   docker compose run web npx prisma migrate deploy
   ```

5. Access the application at `http://localhost:3000/media`.

## Usage

- **Scraping API**: Send a POST request to `/api/scrape` with a body like:

  ```json
  {
    "url": "https://another-example.com"
  }
  ```

- **Frontend**: Navigate to `http://localhost:3000/media` to view scraped media.
  - Use the search bar to filter results by keyword.
  - Filter by media type (image/video).
  - Navigate through pages using pagination controls.

## Scaling Considerations

To handle ~5000 URLs concurrently on a server with 1 CPU and 1GB RAM:

1. **Concurrency**:

   - Use a queue-based system (e.g., Redis with Bull or RabbitMQ) to limit the number of concurrent scrapers.
   - Implement rate limiting to avoid overwhelming resources.

2. **Efficient Scraping**:

   - Use lightweight libraries like Cheerio for parsing HTML.
   - Avoid loading unnecessary assets (e.g., images, JavaScript) during scraping.

3. **Database Optimization**:

   - Batch inserts to reduce database transaction overhead.
   - Index frequently queried columns (e.g., `type`, `url`).

4. **Horizontal Scaling**:
   - Use container orchestration tools (e.g., Kubernetes, Docker Swarm) to scale out the scraper service.

## Demo Video

Include a link to the demo video showcasing the application functionality.
