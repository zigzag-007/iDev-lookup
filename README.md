# 🚀 iDev Lookup - Apple Identifier Lookup & Firmware Helper

[![GitHub Stars](https://img.shields.io/github/stars/zigzag-007/iDev-lookup?style=social)](https://github.com/zigzag-007/iDev-lookup/stargazers)
[![GitHub License](https://img.shields.io/github/license/zigzag-007/iDev-lookup)](https://github.com/zigzag-007/iDev-lookup/blob/main/LICENSE)

> **Fast Apple device identifier lookup** with direct links to EveryMac, IPSW firmware pages, and FMI checker tools.

## 🌟 What is iDev Lookup?

iDev Lookup is a clean web tool to resolve Apple identifiers like `iPhone18,3`, `iPad16,10`, `Watch5,4`, and `AppleTV5,3`.

It helps technicians, enthusiasts, and resellers quickly discover:
- Device name and family
- Model number
- EMC reference (when available)
- Signed iOS and firmware links
- Direct jump links for external checks

## ✨ Key Features

### 🔎 **Identifier Lookup**

- Lookup by Apple identifier format (`PrefixN,M`)
- Real-time status and result panel
- Built-in quick examples for one-click testing

### 🔗 **Direct Links**

- EveryMac lookup page
- IPSW firmware page and signed version info
- FMI checker shortcut

### 🎨 **Modern UI**

- Responsive layout for mobile and desktop
- Light and dark theme toggle
- Clean glass-style card design

### 🛡️ **Robust Parsing**

- Server-side EveryMac scraping with fallback matching
- Model and EMC extraction hardened for footnote-marked values
- Graceful error handling for unavailable lookups

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/zigzag-007/iDev-lookup.git

# Enter project
cd iDev-lookup

# Install dependencies
npm install

# Run development server
npm run dev
```

Open `http://localhost:3000` in your browser.

## 🛠️ Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React + Tailwind CSS
- **Icons**: Lucide React
- **Data Sources**: EveryMac + ipsw.me

## 📱 Example Identifiers

- `iPhone18,3`
- `iPad16,10`
- `Watch5,4`
- `AppleTV5,3`

## 🤝 Contributing

Contributions are welcome.

1. Fork the project
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push (`git push origin feature/your-feature`)
5. Open a pull request

## 📄 License

This project is licensed under the AGPL-3.0 License. See `LICENSE` for details.

## 👨‍💻 Author

**Zig Zag** - [GitHub Profile](https://github.com/zigzag-007)

---

### 🚀 iDev Lookup

**[Open Repository →](https://github.com/zigzag-007/iDev-lookup)**
