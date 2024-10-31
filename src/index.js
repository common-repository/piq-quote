/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import { TextControl, FocusableIframe } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, ColorPalette } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import name from './block.json';

const baseIFrameUrl = 'https://www.petinsurancequotes.com/quote/embedded-form';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( name, {
	/**
	 * Used to construct a preview for the block to be shown in the block inserter.
	 */
	attributes: {
		affiliateId: {
			type: "string",
			default: ''
		},
		iframeUrl: {
			type: "string",
			default: `${baseIFrameUrl}?affiliateId=${window.location.hostname}`
		},
	},
	example: {
		attributes: {
			affiliateId: 'myAffiliateId',
		},
	},
	/**
	 * @see ./edit.js
	 */
	edit: ( {attributes, setAttributes } ) => {
		const blockProps = useBlockProps();
		const onChangeAffiliateId = (newAffiliateId) => {
			setAttributes({
				affiliateId: newAffiliateId,
				iframeUrl: baseIFrameUrl+"?affiliateID="+newAffiliateId
			});
		};
		return (
			<div { ...blockProps }>
				<InspectorControls key="setting">
					<div id="piq-quote-controls">
						<fieldset>
							<legend className="blocks-base-control__label" style={{fontWeight: 'bold'}}>
								{ __( 'Set up your PetInsuranceQuotes Affiliate ID ', 'piq-quote' ) }
							</legend>
							<TextControl
								label="Affiliate ID"
								value={ attributes.affiliateId }
								onChange={ onChangeAffiliateId }
							/>
						</fieldset>
					</div>
				</InspectorControls>
				<FocusableIframe
					class='petco-iframe'
					src={ attributes.iframeUrl }
					title='Pet Insurance Quotes'
					frameBorder='0'
				/>
			</div>
		);
	},
	/**
	 * @see ./save.js
	 */
	save: ({ attributes } ) => {
		const blockProps = useBlockProps.save({
			className: 'petco-iframe',
			'data-affiliate-id': attributes.affiliateId,
			'title': 'Pet Insurance Quotes',
			'frameBorder': '0'
		});
		return (
			<iframe
				{ ...blockProps }
				src={ attributes.iframeUrl }
				// class='petco-iframe'
				// title='Pet Insurance Quotes'
				// frameBorder='0'
			></iframe>
		);
	},
} );
