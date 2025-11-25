# eXtended XForms

This project extends the standard XForms syntax by introducing additional controls and features. It leverages XSLT to transform this extended syntax into basic XForms, thereby simplifying the implementation of common web application tasks such as routing, theming, and other functionalities.

## Features

- Reading, writing, and listening to XForms model using Javascript functions.
- Dynamic (light and dark) theming with the possibility to add custom styles using CSS variables.
- Easily use icon libraries (FontAwesome, Material Icons, and Bootstrap Icons) with basic transformation and animation.
- Interactive dynamic charts.
- Global and context menus.
- Tabs.
- Code blocks with syntax highlighting using [Speed Highlight JS](https://speed-highlight.github.io/core).
- Client routing for single page applications.
- Button groups.

## Requirements

- Java (Tested with OpenJDK 21)
- Node.js (Tested with Node.js 22.10.0)

## Installation

To install dependencies:
```sh
npm install
```

## Development

To run:
```sh
npm run dev
```

open http://localhost:3000

> You can set the port with the `PORT` environment variable.

## Planned features

- **Firestore integration**: Use Firestore as a realtime connected offline-first instance.
