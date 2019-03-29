<?php

if ( ! class_exists( 'Timber' ) ) {
  add_action( 'admin_notices', function() {
    echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
  } );
  return;
}

Timber::$dirname = array('templates', 'views');

class ChangeThisClassName extends TimberSite {

  function __construct() {
    add_theme_support( 'post-formats' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'menus' );
    add_filter( 'timber_context', array( $this, 'add_to_context' ) );
    add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
    add_action( 'init', array( $this, 'register_post_types' ) );
    add_action( 'init', array( $this, 'register_taxonomies' ) );
    parent::__construct();
  }

  function register_post_types() {
    //this is where you can register custom post types
    /* Team Member */
		register_post_type( 'team_member',
      array(
        'labels' => array(
          'name' => __( 'Team Members' ),
          'singular_name' => __( 'Team Member' )
          ),
          'public' => true,
          'has_archive' => false,
          'show_in_rest' => true
      )
    );
    /* Application (for position openings) */
    register_post_type( 'position',
      array(
        'labels' => array(
          'name' => __( 'Position' ),
          'singular_name' => __( 'Position' )
          ),
          'public' => true,
          'has_archive' => true,
          'show_in_rest' => true
      )
    );
  }

  function register_taxonomies() {
    //this is where you can register custom taxonomies
    register_taxonomy('team-type', 'team_member', array(
			'hierarchical' => true,
			'show_ui' => true,
			// This array of options controls the labels displayed in the WordPress Admin UI
			'labels' => array(
				'name' => _x( 'Team Type', 'taxonomy general name' ),
				'singular_name' => _x( 'Team Type', 'taxonomy singular name' ),
				'search_items' =>  __( 'Search Team Types' ),
				'all_items' => __( 'All Team Types' ),
				'parent_item' => __( 'Parent Team Type' ),
				'parent_item_colon' => __( 'Parent Team Type:' ),
				'edit_item' => __( 'Edit Team Type' ),
				'update_item' => __( 'Update Team Type' ),
				'add_new_item' => __( 'Add New Team Type' ),
				'new_item_name' => __( 'New Team Type Name' ),
				'menu_name' => __( 'Team Types' ),
			),
			// Control the slugs used for this taxonomy
			'rewrite' => array(
				'slug' => 'team-types', // This controls the base slug that will display before each term
				'with_front' => false, // Don't display the category base before "/locations/"
				'hierarchical' => true // This will allow URL's like "/locations/boston/cambridge/"
			)
		));

  }

  function add_to_context( $context ) {
    $context['keywords'] = 'your, site, keywords, here';
    $context['topNav'] = new TimberMenu();
    $context['site'] = $this;
    return $context;
  }

  function add_to_twig( $twig ) {
    /* this is where you can add your own fuctions to twig */
    $twig->addExtension( new Twig_Extension_StringLoader() );
    $twig->addFilter( 'myfoo', new Twig_Filter_Function( 'myfoo' ) );
    return $twig;
  }

}

new ChangeThisClassName();

function myfoo( $text ) {
  $text .= ' bar!';
  return $text;
}

