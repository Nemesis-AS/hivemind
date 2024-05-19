# Hivemind
![Image](assets/logo.jpg)

Hivemind is a Blockchain-based platform that connects freelancers and jobseekers directly with clients, eliminating the need for middlemen and addressing the challenges of the gig economy

## Getting Started

1. Clone this repo
2. Create a file named `.env` at the root directory and add the follownig content:
```ini
POSTING_KEY=<YOUR-HIVE-POSTING-KEY>
```
3. Install dependencies
```sh
npm i
```
4. Create a Database called `hivemind` on MongoDB
5. Add the following collections to the DB
```txt
Applications, Customers, Gigs, Jobs, Offers, Reviews, Users
```
6. Run the dev server
```sh
npm run dev
```

## Tech Stack

1. HTML
2. CSS
3. Javascript
4. Tailwind CSS
5. NodeJS
6. ExpressJS
7. MongoDB
8. Hive Blockchain

## Todo

- [ ] Add query filters for db
- [ ] Routes for user/customer auth
- [x] Routes for applications/offers
- [ ] Add views
- [ ] Add an init db function