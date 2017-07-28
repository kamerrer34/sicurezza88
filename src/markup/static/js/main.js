'use strict';

import polyfills from './libraries/polyfills';

import 'components/header-nav/header-nav';
import 'components/slider/slider';
import 'components/s9-form/s9-form';

$(() => {
    polyfills.init();
    // ================ Здесь инициализируем модули =====================
});
