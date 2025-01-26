# Financial Agent - GeeseHacks 2025

Financial Agent is a Next.js-based web application designed for a web extension to help users make an account and fill a survey to determine their experience with investing. Leveraging modern web technologies such as React and Tailwind CSS, the application offers a responsive and user-friendly interface for gathering user details.

# Demo
![Sign-up Page Demo](/financial-agent/public/fa-signup.png)
Screenshot showcasing the Financial Agent Sign up Page

# Features
* Responsive Design: Utilizes Tailwind CSS to ensure the application is accessible and visually appealing across various devices and screen sizes.
* Intuitive Navigation: Easy-to-use interface that allows users to navigate through different sections effortlessly.
* Optimized Performance: Built with performance in mind to provide a smooth user experience.

# Technologies Used
* [Next.js](nextjs.org) - React framework for server-rendered applications.
* [React](react.dev) - JavaScript library for building user interfaces.
* [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
* [Vercel](vercel.com) - Platform for deploying Next.js applications.

# Getting Started

Follow these instructions to set up the Financial Agent project locally.
## Prerequisites
Ensure you have the following installed on your machine:
* Node.js (v14 or later)
* npm or Yarn
* Git

## Installation

1. Clone the Repository
```bash
git clone https://github.com/karanjot-gaidu/financial-agent
```

2. Navigatet to the Proeject Directory
```bash
cd financial-agent
```

2. Install Dependencies
Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```
## Running the Development Server
Start the development server to run the application locally.
Using npm:
```bash
npm run dev
```
Or using Yarn:
```bash
yarn dev
```
Open http://localhost:3000 in your browser to view the application.

# Project Structure

```
financial-agent/
├── README.md
├── package.json
├── public/
│   ├── demo-screenshot.png
│   └── ...
├── src/
│   ├── app/
        ├── api
        |   ├──user
        |   |  └──route.ts
        |   login
        |      └──route.ts
│   │   └── page.tsx
│   ├── survey/
│   │   └── page.tsx
│   ├── styles/
│   │   └── globals.css
│   └── ...
├── tailwind.config.js
└── ...
```

- **`public/`**: Static assets such as images and icons.
- **`src/app/`**: Contains the main pages of the application.

- **`src/styles/`**: Global CSS and Tailwind configurations.
- **`tailwind.config.js`**: Tailwind CSS configuration file.

# Deployment

The Financial Agent Sign Up application has been deployed using Vercel, the creators of Next.js.

## Link

[Live App](https://financial-agent-iota.vercel.app/)

## Contributors
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aryanp05"><img src="https://avatars.githubusercontent.com/u/157305621?v=4" width="100px;" alt="Aryan Patel"/><br /><sub><b>Aryan Patel</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/matt4tch"><img src="https://avatars.githubusercontent.com/u/107216405?v=4" width="100px" alt="Matthew Tchouikine"/><br /><sub><b>Matthew Tchouikine</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/utkarshg20"><img src="https://avatars.githubusercontent.com/u/88526325?v=4" width="100px;" alt="Utkarsh"/><br /><sub><b>Utkarsh</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/karanjot-gaidu"><img src="https://avatars.githubusercontent.com/u/90838376?v=4" width="100px;" alt="Karanjot Gaidu"/><br /><sub><b>Karanjot Gaidu</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

# License

This project is licensed under the [MIT License](./LICENSE).

