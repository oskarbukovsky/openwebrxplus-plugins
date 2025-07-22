---
layout: page
title: "OpenWebRX+ Receiver Plugin: More Steps"
permalink: /receiver/more_steps
---

This `receiver` plugin will add some new profiles, or enable you to add your own

The plugin depends on [utils](https://0xaf.github.io/openwebrxplus-plugins/receiver/utils) plugin.

## Load

Add this lines in your `init.js` file:

```js
await Plugins.load('https://0xaf.github.io/openwebrxplus-plugins/receiver/utils/utils.js');
Plugins.load('https://raw.githubusercontent.com/oskarbukovsky/openwebrxplus-plugins/refs/heads/main/receiver/more_steps/more_steps.js');
```

## init.js

Learn how to [load plugins](/openwebrxplus-plugins/#load-plugins).
