
	# Server-Side Code Syntax Highlighting Block

A WordPress plugin which extends Gutenberg by adding *server-side* syntax highlighting to the WordPress core code block. Forked from [westonruter's fork](https://github.com/westonruter/code-syntax-block) of [code-syntax-block](https://github.com/mkaz/code-syntax-block) to suit my own needs.

Example:

<img src="screenshot.png" title="Screenshot example in use" alt="screen shot" width="554" height="202" style="border:1px solid #333">

### Usage

Install nccomau-code-syntax-block to your WordPress plugins directory and activate. You can download a ZIP from the [GitHub](https://github.com/nathanchere/nccomau-code-syntax-block), without any build step required. You can also run `npm run zip` to create a ZIP of the non-development files.

This plugin upgrades the existing Code block in core. It uses auto-detection for the language in the block to add syntad highlighting, but you can override the language in the block inspector.

On the front-end when the post is being viewed, the code will be color syntax highlighted. Syntax highighting is performed server-side via [highlight.php](https://github.com/scrivo/highlight.php), so there is no JavaScript required on the frontend (e.g. Prism.js). Because of this, AMP pages get the same syntax highlighting as non-AMP pages. 

### Changes from upstream

* Adds support for updating from GitHub through https://github.com/afragen/github-updater
* Adds support for languages I care about (e.g. Elixir, C#) and drops support for those I don't

### License

Licensed under [GPL 2.0 or later](https://opensource.org/licenses/GPL-2.0).
