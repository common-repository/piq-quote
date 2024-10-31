<?php
/**
 * Plugin Name:       Pet Insurance Quotes
 * Description:       This plug-in inserts a quote form on your page that will launch a results page that lists all of the available insurance providers' offerings.
 * Version:           1.0.3
 * Requires at least: 5.5
 * Requires PHP:      7.0
 * Author:            QStart Labs
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       piq-quote
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_piq_quote_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_piq_quote_block_init' );


/**
 * Registers the shortcode that allows the PIQ Quote form to be embedded using the [piq-quote] shortcode.
 *
 * Accepts an affiliate-id and will display a box.
 *
 * @param array  $atts    Shortcode attributes. Default empty.
 * @param string $content Shortcode content. Default null.
 * @param string $tag     Shortcode tag (name). Default empty.
 * @return string Shortcode output.
 */
function piqquote_shortcode($atts = [], $content = null, $tag = ''){

    // normalize attribute keys, lowercase
    $atts = array_change_key_case( (array) $atts, CASE_LOWER );

    // override default attributes with user attributes
    $piqquote_atts = shortcode_atts(
        array(
            'affiliate-id' => $_SERVER['SERVER_NAME'],
        ),
        $atts,
        $tag
    );

    return '
        <style>.petco-iframe{border:0;min-height:77rem;min-width:100%}.quote-box{border-width:0}</style>
        <iframe class="petco-iframe" src="https://www.petinsurancequotes.com/quote/embedded-form?affiliateId=' . $piqquote_atts['affiliate-id'] . '" data-affiliate-id="'.$piqquote_atts['affiliate-id'].'" title="Pet Insurance Quotes" frameBorder="0"></iframe>
    ';
}

/**
 * Central location to create all shortcodes.
 */
function piqquote_shortcodes_init() {
    add_shortcode('piq-quote', 'piqquote_shortcode');
}

add_action( 'init', 'piqquote_shortcodes_init' );

