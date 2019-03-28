<?php

$context = Timber::get_context();
$homePage = Timber::query_post();
$context['homePage'] = $homePage;

Timber::render('home.twig', $context);
