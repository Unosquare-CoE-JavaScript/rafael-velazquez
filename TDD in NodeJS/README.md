# Testing tools

## Istanbul

Install:

```bash
npm install --save-dev nyc
```

Add to package.json:

```json
{
  "scripts": {
    "nyctest": "nyc mocha"
  }
}
```

Run coverage tool:

```bash
npm run nyctest
```