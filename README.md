## Uniform vNext Baseline Demo

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Environment Variables

- `UNIFORM_API_KEY`: your uniform api key
  > ⚠️ For the initial setup, this API key needs the Developer role assigned to it.
- `UNIFORM_PROJECT_ID`: your uniform project
- `GOOGLE_ANALYTICS_ID`: optional, for [ga-plugin](https://docs.uniform.app/integrations/data/google-analytics#activate-ga-plugin)

### Init and start Baseline Demo

1. In your terminal, from the project root, run the following command:

   ```bash
   npm i
   ```

2. Navigate to `/apps/baseline` folder:

   ```bash
   cd apps/baseline/
   ```

3. In your code editor and rename `.env.example` to `.env` file and add your `UNIFORM_API_KEY` and `UNIFORM_PROJECT_ID` variables
   > ⚠️ For the initial setup, this API key needs the Developer role assigned to it.
4. This command pushes all configurations to your new Uniform project.

   ```bash
   npm run push
   ```

5. Run the production server:

   ```bash
   npm run build && npm run start
   ```

   or development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Supported features

- Hardcoded top navigation menu with 3 links only (home, landing page, contact us)
- Personalized home page Hero
- A/B tested landing page Hero
- Landing page, Accordion nested canvas component example
- Contact us page, Container/Section smart canvas component example
- Visual Canvas & Project Map & Project Map Links
- [Static page generation based on project map canvas API](https://docs.uniform.app/reference/packages/uniformdev-project-map#projectmapclient)
- Canvas components with default Title Parameter and Screenshot for better Visual Canvas experience
- Next SDK for components registration [DRAFT: Canvas + Next.js Getting Started Optimization](https://www.notion.so/DRAFT-Canvas-Next-js-Getting-Started-Optimization-579fa27b2ad0428392d19b7db2912aa8)
- GA plugin integration
- Standard context output type (client side personalization)

### Components

- Accordion / Accordion Item (nested components example)
- Call to action (2 variants)
- Contact Form (as a form component example)
- Container / Section - Two Columns (advanced usage example)
- Featured Callout (3 variants)
- Hero (2 variants)
- Page (composition component)

### Compositions

- Home page
  - hardcoded top navigation menu
  - Hero personalized component
  - Call To Action
  - Featured Callout (left image)
  - hardcoded footer
- Landing page
  - hardcoded top navigation menu
  - Hero A/B test component
  - Call To Action
  - Featured Callout (left image)
  - Featured Callout (right image)
  - Featured Callout (left image)
  - Accordion / Accordion Item (4 items)
  - hardcoded footer
- Contact Us page
  - hardcoded top navigation menu
  - Container / Section - Two Columns / Contact Form
  - hardcoded footer
