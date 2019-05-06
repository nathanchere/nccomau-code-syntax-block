/* global codeSyntaxBlockLanguages */

const html = htm.bind(wp.element.createElement);
const { addFilter } = wp.hooks;
const { PlainText, InspectorControls } = wp.editor;
const { SelectControl } = wp.components;
const { Fragment } = wp.element;

const addSyntaxToCodeBlock = (settings) => {
    if ('core/code' !== settings.name) {
        return settings;
    }

    return {
        ...settings,

        attributes: {
            ...settings.attributes,
            language: {
                type: 'string'
            }
        },

        edit({ attributes, setAttributes, isSelected, className }) {
            const updateLanguage = language => {
                setAttributes({ language });
            };

            // Note: Use of Fragment can be eliminated after https://github.com/developit/htm/issues/15.
            return html `
				<${Fragment}>
					<${InspectorControls} key="controls">
						<${SelectControl}
							label=${ 'Language'}
							value=${ attributes.language}
							options=${
				[
					{ label: 'Auto-detect', value: '' },
					...codeSyntaxBlockLanguages
				]
				}
							onChange=${ updateLanguage}
						/>
					</${InspectorControls}>
					<div key="editor-wrapper" className=${ className}>
						<${PlainText}
							value=${ attributes.content}
							onChange=${ (content) => setAttributes({ content })}
							placeholder=${ 'Write code…' }
							aria-label=${ 'Code' }
						/>
					</div>
				</${Fragment}>
			`;
        },

        save({ attributes }) {
            return html `
				<pre><code>${ attributes.content}</code></pre>
			`;
        },

        // Automatically convert core code blocks to this new extended code block.
        deprecated: [
            ...(settings.deprecated || []),
            {
                attributes: {
                    ...settings.attributes,
                    language: {
                        type: 'string'
                    }
                },

                save: function({ attributes }) {
                    const className = (attributes.language) ? 'language-' + attributes.language : '';
                    return html `
						<pre><code lang=${ attributes.language} className=${className}>${attributes.content}</code></pre>
					`;
                }
            }
        ]
    };
};

addFilter(
    'blocks.registerBlockType',
    'nathanchere/nccomau-code-syntax-block',
    addSyntaxToCodeBlock
);