---
name: worst-model-picker
description: Launch the Worst Model Picker game from Codex when the user wants to pick a Codex model, reasoning level, or speed in the deliberately awful soccer penalty UI. Trigger on requests like "open the worst model picker", "use the worst UI picker", "pick my Codex model badly", or "launch the model picker game".
---

# Worst Model Picker

Use this skill when the user wants to launch or use the Worst Model Picker.

## Launch

Run the launcher from the plugin root:

```bash
node scripts/open-picker.mjs
```

The launcher opens the bundled `index.html` in the default browser. If Codex has the Browser plugin available and the user wants the in-app browser specifically, open the same `file://` URL there instead.

## Usage

After launch, tell the user the game is open and that the final screen contains the selected model, reasoning level, and speed.

Controls:

- Arrow keys aim the shot.
- Space starts the power meter.
- Space again kicks.
- `M` toggles mute.
- `R` restarts.
- `Esc` returns to title.
